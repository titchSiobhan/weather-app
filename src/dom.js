// import { getBackground} from './api.js';

function fahrenheitToCelsius(num) {
	return (((num - 32) * 5) / 9).toFixed(2);
}



class weatherIcons {
	constructor(name, iconClass){
		this.name = name;
		this.icon = document.createElement('i');
		this.icon.className = iconClass;
	}
	
	
}

const weatherIconsList = [];


	const cloudy = new weatherIcons('cloudy', 'fa-solid fa-cloud');
	const clearDay = new weatherIcons('clear-day', 'fa-solid fa-sun');
	const rain = new weatherIcons('rain', 'fa-solid fa-cloud-showers-heavy');
	const snow = new weatherIcons('snow', 'fa-regular fa-snowflake');
	const clearNight = new weatherIcons('clear-night', 'fa-solid fa-moon');
	const storm = new weatherIcons('ThunderStorm', 'fa-solid fa-cloud-bolt');
	const fog = new weatherIcons('fog', 'fa-solid fa-smog');
	const wind = new weatherIcons('wind', 'fa-solid fa-wind');
	const partlyCloudyDay = new weatherIcons('partly-cloudy-day', 'fa-solid fa-cloud-sun');
	const partlyCloudyNight =new weatherIcons('partly-cloudy-night', 'fa-solid fa-cloud-moon');
	



	weatherIconsList.push(cloudy, clearDay, rain, snow, clearNight, storm, fog, wind, partlyCloudyDay, partlyCloudyNight);

const icons = [
  cloudy,
  clearDay,
  rain,
  snow,
  clearNight,
  storm,
  fog,
  wind,
  partlyCloudyDay,
  partlyCloudyNight
];
// function choseBackgroundCondition(data) {
// 	switch (data.currentConditions.conditions) {
// 		case 'cloudy':

// 		case 'partly-cloudy-day':

// 		case 'partly-cloudy-night':

// 		case 'fog': // fallthrough

// 			return 'cloudy';
			
// 		case 'rain':
// 			return 'rainy';// fallthrough

			
// 		case 'storm':
// 			return 'stormy';// fallthrough

			
// 		case 'snow':
// 			return 'snowy'; // fallthrough


			
// 		case 'clear-day':

// 		case 'clear-night':

// 		case 'wind': // fallthrough

// 			return 'sunny';
			
// 	}
// }


export { fahrenheitToCelsius, weatherIconsList, icons};
