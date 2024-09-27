// Day icons
import DayCloudy from "@/assets/images/Day_cloudy.png";
import DayRain from "@/assets/images/Day_rain.png";
import DaySnow from "@/assets/images/Day_snow.png";
import Day from "@/assets/images/Day.png";

// Night icons
import NightCloudy from "@/assets/images/Night_cloudy.png";
import NightRain from "@/assets/images/Night_rain.png";
import NightSnow from "@/assets/images/Night_snow.png";
import Night from "@/assets/images/Night.png";

// Temperature icons
import HighTemp from "@/assets/images/high_temp.svg";
import LowTemp from "@/assets/images/low_temp.svg";
import HighTemperature from "@/assets/images/high_temperature.png";
import LowTemperature from "@/assets/images/low_temperature.png";

// Grouped exports
export const dayIcons = {
	cloudy: DayCloudy,
	rain: DayRain,
	snow: DaySnow,
	clear: Day,
};

export const nightIcons = {
	cloudy: NightCloudy,
	rain: NightRain,
	snow: NightSnow,
	clear: Night,
};

export const temperatureIcons = {
	high: HighTemp,
	low: LowTemp,
	highDetailed: HighTemperature,
	lowDetailed: LowTemperature,
};

// Individual exports
export {
	DayCloudy,
	DayRain,
	DaySnow,
	Day,
	NightCloudy,
	NightRain,
	NightSnow,
	Night,
	HighTemp,
	LowTemp,
	HighTemperature,
	LowTemperature,
};

// Combined default export
export default {
	...dayIcons,
	...nightIcons,
	...temperatureIcons
};