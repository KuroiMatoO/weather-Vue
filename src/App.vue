<script>
import axios from "axios"
import LocationChangeC from "./components/LocationChangeC.vue"
import ChartC from "./components/ChartC.vue"
import CurrentC from "./components/CurrentC.vue"
import WeeklyC from "./components/WeeklyC.vue"

export default {
	components: { LocationChangeC, ChartC, CurrentC, WeeklyC },
	data() {
		return {
			locationData: null,
			locChangeIsHidden: true,
			lat: null,
			lng: null,

			weatherData: null,
			weatherData24h: [],

			timeZoneData: null,
			timeData24h: [],

			localCurrentHours: null,
			localCurrentMinutes: null,

			allDataReady: false
		}
	},
	computed: {
		locationDataReady(){
			return this.locationData	
		},
		weatherAndTimeDataReady() {
			return this.weatherData && this.timeZoneData;
		}
	},
	watch: {
		locationDataReady(newValue){
			if (newValue){
				this.getWeather(this.lat, this.lng);
				this.getTimeZone(this.lat,this.lng);
			}
		},
		weatherAndTimeDataReady(newValue) {
			if (newValue) {
				this.localCurrentTime();
				this.weather24h();
				this.time24h();
				this.allDataReady = true;
			}
		},
	}, 
	mounted() {
		this.getLocation();
	},
	methods: {
		locToggle(){ //top right button
			if (this.locChangeIsHidden == true){
				this.locChangeIsHidden = false; 
			} else {
				this.locChangeIsHidden = true;
			}
		},
		getLocation(){
			axios.get("https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=en")
				.then(res => {
					this.locationData = res;
					this.lat = res.data.latitude;
					this.lng = res.data.longitude;
					console.log("location data fetched successfully")
					console.log(this.locationData);
				})
				.catch(err => {
					console.error("Error fetching location:", err);
				});
		},
		getWeather(lat, lng){
			axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,snowfall,cloud_cover,pressure_msl,wind_speed_10m&hourly=temperature_2m&daily=temperature_2m_max,sunshine_duration,temperature_2m_min,precipitation_sum,rain_sum,showers_sum,snowfall_sum&wind_speed_unit=ms&forecast_days=16&timezone=Europe%2FMoscow`)
				.then(res => {
					this.weatherData = res;
					console.log("weather data fetched successfully")
					console.log(this.weatherData);
				})
				.catch(err => {
					console.error("Error fetching weather:", err);
				});
		},
		getTimeZone(lat, lng){
			axios.get(`https://api-bdc.net/data/timezone-by-location?latitude=${lat}&longitude=${lng}&key=${import.meta.env.VITE_TIME_ZONE_KEY}`) //чекнуть билдится ли оно при gitignore
				.then(res => {
					this.timeZoneData = res;
					console.log("time zone data fetched successfully")
					console.log(this.timeZoneData)
				})
				.catch(err => {
					console.error("Error fetching time zone:", err);
				});
		},
		localCurrentTime(){
			this.localCurrentHours = this.timeZoneData.data.localTime.slice(11,13);
			this.localCurrentMinutes = this.timeZoneData.data.localTime.slice(14,16);
			console.log(`Local time: ${this.localCurrentHours}:${this.localCurrentMinutes}`);
		},
		weather24h(){
			for (let i = 0; i < 24; i++){
				this.weatherData24h[i] = this.weatherData.data.hourly.temperature_2m[parseInt(this.localCurrentHours) + i]
			}
		},
		time24h(){
			for (let i = 0; i < 24; i++){
				this.timeData24h[i] = this.weatherData.data.hourly.time[parseInt(this.localCurrentHours) + i].slice(11,13) + ":00"
			}	
		}
	}
}

</script> 

<template>
  <div class="wrapper">
    <button
      class="location_change_button"
      @click="locToggle()"
    />
    <LocationChangeC v-if="!locChangeIsHidden" />
    <CurrentC
      v-if="allDataReady"
      :location="locationData"
      :weather="weatherData"
      :local-hour="localCurrentHours"
      :local-minute="localCurrentMinutes"
    />
    <ChartC
      v-if="allDataReady"
      :weather="weatherData24h"
      :time="timeData24h"
    />
    <WeeklyC />
  </div>
</template>

<style scoped>
  .wrapper{
    width: 95vw;
    height: 90vh;
    background: skyblue;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column wrap;
    position: relative;
  }
  .location_change_button{
    width: 32px;
    height: 32px;
    position: absolute;
    top: 10px;
    right: 15px;
  }

</style>
