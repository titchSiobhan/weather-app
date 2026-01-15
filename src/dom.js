// import { getLocation } from './api.js';

function fahrenheitToCelsius(num) {
	return (((num - 32) * 5) / 9).toFixed(2);
}

// const temp = fahrenheitToCelsius(getLocation.currentConditions.temp);
// const feelsLikeTemp = fahrenheitToCelsius(getLocation.currentConditions.feelslike);

// const showWeather = document.createElement('div');
// const address = document.createElement('h1');
// const tempBox = document.createElement('div');
// const feelsLike = document.createElement('div');
// const condition = document.createElement('div');
// function createWeather(getLocation) {
// 	address.textContent =
// 		getLocation.address.charAt(0).toUpperCase() + getLocation.address.slice(1);

// 	if (switchBox.checked) {
// 		tempBox.textContent = `Temperature: ${getLocation.currentConditions.temp}`;
// 		feelsLike.textContent = `Feels Like: ${getLocation.currentConditions.feelslike}`;
// 	} else {
// 		tempBox.textContent = `Temperature: ${temp}`;
// 		feelsLike.textContent = `Feels Like: ${feelsLikeTemp}`;
// 	}

// 	condition.textContent = `Condition: ${getLocation.currentConditions.conditions}`;

// 	console.log(temp);
// 	console.log(feelsLikeTemp);
// 	console.log(data.currentConditions.conditions);
//     return {
//         address, tempBox, feelsLike, condition
//     }
// }

export { fahrenheitToCelsius};
