<script>
import weatherIcons from "@/utils/weatherAssetManager";

export default {
	props: {
		location: {
			type: Object,
			required: true
		},
		weather:{
			type:Object,
			required: true
		},
		dateTime:{
			type: String,
			required: true
		}
	},
	
	computed:{
		icon(){
			let current = this.weather.data.current;
			if (current.isday) {
				if (current.rain > 0) {
					return weatherIcons.DayRain
				} else if (current.snow > 0) {
					return weatherIcons.DaySnow
				} else if (current.cloud_cover >= 30 && current.precipitation == 0) {
					return weatherIcons.DayCloudy
				} else {
					return weatherIcons.Day
				}
			} else {
				if (current.rain > 0 && current.precipitation > 0) {
					return weatherIcons.NightRain
				} else if (current.snow > 0 && current.precipitation > 0) {
					return weatherIcons.NightSnow
				} else if (current.cloud_cover >= 30 && current.precipitation == 0) {
					return weatherIcons.NightCloudy
				} else {
					return weatherIcons.Night
				}
			}
		},
		currentTemp(){
			return this.weather.data.current.temperature_2m;
		},
		city(){
			return this.location.data.city;
		},
		pressure(){
			return this.weather.data.current.pressure_msl;
		},
		humidity(){
			return this.weather.data.current.relative_humidity_2m;
		},
		wind(){
			return this.weather.data.current.wind_speed_10m;
		},
		currentTime(){
			return this.dateTime.slice(11,16);
		},
		currentDate(){
			const date = new Date(this.dateTime);
			const options = { month: "long", day: "numeric" };
			let newDateTime = new Intl.DateTimeFormat("en-US", options).format(date);
			return newDateTime
		}
		
	}
	
}
console.log("locationData")
console.log(location)

</script>

<template>
  <div class="current">
    <div class="current_item">
      <div id="icon">
        <img :src="icon">
      </div>
      <div id="temperature">
        <span>{{ currentTemp }} °C</span>
      </div>
    </div>
	 
    <div class="current_item">
      <div id="location">
        City: <span>{{ city }}</span>
      </div>
      <div id="time">
        Local Time: <span>{{ currentTime }}</span>
      </div>
      <div id="date">
        <span>{{ currentDate }}</span>
      </div>
    </div>
	
    <div class="current_item">
      <div id="wind">
        wind: <span>{{ wind }} m/s</span> 
      </div>
      <div id="humidity">
        humidity: <span>{{ humidity }} %</span>
      </div>
      <div id="pressure">
        Pressure: <span>{{ pressure }} hPa</span>
      </div>
    </div>
  </div>
</template>
  
<style scoped>
.current{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30%;
    width: 90%;
    background: black;
    margin: auto;
	  font-size: larger;
}
.current_item{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column wrap;
    width: 25%;
    height: 100%;
    background: #474747;
    color: #b8b8b8;
    margin: auto;
}
#location, #time{
	display: flex;
	justify-content: center;
	align-items: center;
	flex-flow: column wrap;
	font-size: larger;
	margin: 5px 0;
}
span{
	color: #fff;
}
#icon img{
  width: 52px;
  height: 52px;
}
</style>