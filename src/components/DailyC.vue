<script>
export default{
	props: {
		dailyTemp: {
			type: Object,
			required: true
		},
		dateTime:{
			type: String,
			required: true
		}
	},
	data() {
		return{
			icon: "Day.png",
			maxTempIcon: "high_temp.svg",
			minTempIcon: "low_temp.svg",
		}
	},
	computed: {
		daylyDate(){
			const weekDates = [];
			const startDate = new Date(this.dateTime);

			for (let i = 0; i < 7; i++){
				const date = new Date(startDate);

				date.setDate(startDate.getDate() + i)
				const options = { month: "long", day: "numeric" };
				let newDateTime = new Intl.DateTimeFormat("en-US", options).format(date);
				weekDates.push(newDateTime)
				console.log(newDateTime)
			}

			return weekDates;
		}
	}
}
</script>

<template>
  <div class="daily">
    <div
      v-for="i in 7"
      :key="i"
      class="dailyItem"
    >
      <p>{{ daylyDate[i-1] }}</p>
      <img :src="icon">
      <p>average temp</p>
      <span>
        <img
          :src="maxTempIcon"
          class="tempIcon"
        >{{ dailyTemp.tempMax[i-1] }}
      </span>
      <span>
        <img
          :src="minTempIcon"
          class="tempIcon"
        >{{ dailyTemp.tempMin[i-1] }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.daily{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30%;
    width: 90%;
    background: black;
    color:aliceblue;
    font-size: larger;
    margin: auto;
}
.dailyItem{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  background: #474747;
  width: 200px;
  height: 100%;
  margin: 0 20px;
  text-align: center;
}
p{
  width: 100%;
}
span{
  width: 50%;
}
img{
  width: 40px;
  height: 40px;
}
.tempIcon{
  width: 2.5vw;
  height: 2.5vw;
}
</style>