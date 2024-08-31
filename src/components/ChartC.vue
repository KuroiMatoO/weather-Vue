<script>
import { Line as LineChart } from "vue-chartjs"
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Filler
} from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels";


ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Filler,
	ChartDataLabels,
)

export default {
	components: {
		LineChart
	},
	props:{
		weather:{
			type: Array,
			required: true
		},
		time:{
			type: Array,
			required: true
		}
	},
	data() {
		return {
			chartData: {
				labels: this.time,
				datasets: [
					{ 
						// backgroundColor: "#fff",
						// color: "blue",
						// borderColor: "red",
						// hoverBackgroundColor: "green",
						data: this.weather,
						fill: true,
						backgroundColor: (ctx) => {
							const canvas = ctx.chart.ctx;
							const gradient = canvas.createLinearGradient(0,0,0,this.$el.clientHeight);

							gradient.addColorStop(0, "#fdbb2d");
							gradient.addColorStop(1, "#87ceeb");

							return gradient;
						},
						datalabels: {
							color: "#FFF",
							// anchor: "end",
							align:	"end",
							offset:	"-2"
						},
						tension: 0.25,

					},
				]
			},
			chartOptions: {
				responsive: true,
				maintainAspectRatio: false,
				color: "white",
				layout: {
					padding: {
						top: 20
					}
				},
				scales: {
					x: {
						display: true
					},
					y: {
						display: false
					}
				}
			}
		}
	}
}
</script>

<template>
  <div class="chart">
    <LineChart
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<style scoped>
.chart{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30%;
    width: 90%;
    background: #474747;
    color:aliceblue;
    font-size: larger;
    margin: auto;
}
</style>