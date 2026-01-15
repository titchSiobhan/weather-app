//PJ7RXR8YLKWRNKTRHP9TBEUXM
//https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/bath?key=PJ7RXR8YLKWRNKTRHP9TBEUXM
import { fahrenheitToCelsius } from './dom.js';
import { getLocation} from './api.js';

// let searchBar = 
// const submit = document.querySelector('#submit');
const form = document.querySelector('.search');
const weatherContainer = document.querySelector('#weatherHere');

const switchBox = document.querySelector('#switch');
// const showWeather = document.createElement('div');

//°C = (°F - 32) × 5/9
const address = document.createElement('h1');
const tempBox = document.createElement('div');
const feelsLike = document.createElement('div');
const condition = document.createElement('div');
function appendWeather(){
weatherContainer.appendChild(address);
weatherContainer.appendChild(tempBox);
weatherContainer.appendChild(feelsLike);
weatherContainer.appendChild(condition);
}

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	weatherContainer.textContent = '';
    // createWeather()
    const location = document.querySelector('#search-bar').value.trim();
 const searchBar = document.querySelector('#search-bar');
    try {
        const data = await getLocation(location)
        const elements = weatherDisplay(data);
        appendWeather(elements);
     
    } catch (err) {
         console.log('didnt work');
    console.log(err)
    }
    searchBar.value = '';
});

function weatherDisplay(data) {

const temp = fahrenheitToCelsius(data.currentConditions.temp);
const feelsLikeTemp = fahrenheitToCelsius(data.currentConditions.feelslike);
address.textContent =
		data.address.charAt(0).toUpperCase() + data.address.slice(1);

	if (switchBox.checked) {
		tempBox.textContent = `Temperature: ${data.currentConditions.temp}`;
		feelsLike.textContent = `Feels Like: ${data.currentConditions.feelslike}`;
	} else {
		tempBox.textContent = `Temperature: ${temp}`;
		feelsLike.textContent = `Feels Like: ${feelsLikeTemp}`;
	}

	condition.textContent = `Condition: ${data.currentConditions.conditions}`;

	console.log(temp);
	console.log(feelsLikeTemp);
	console.log(data.currentConditions.conditions);
    return { address, tempBox, feelsLike, condition };
};
