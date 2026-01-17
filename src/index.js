
import {
	fahrenheitToCelsius,
	weatherIconsList,
	icons
	
} from './dom.js';
import { getLocation } from './api.js';
import './style.css';
import { format } from 'date-fns';
import { da } from 'date-fns/locale';
import { formatInTimeZone } from 'date-fns-tz';

console.log(weatherIconsList);


const form = document.querySelector('.search');
const weatherContainer = document.querySelector('#weatherHere');
function currentLocalTime(data) {
    return new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: data.timezone
    });
}




function epochTime(data) {
    const epoch = data.currentConditions.datetimeEpoch * 1000;

    return new Date(epoch).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: data.timezone
    });
}



const switchBox = document.querySelector('#switch');

const address = document.createElement('div');
address.setAttribute('class', 'address card');
address.setAttribute('id', 'address');
const townName = document.createElement('h1');

const tempBox = document.createElement('div');
tempBox.setAttribute('class', 'temp card');
tempBox.setAttribute('id', 'temp');
const tempNow = document.createElement('div');
const maxTemp = document.createElement('div');
const minTemp = document.createElement('div');
const feelsLike = document.createElement('div');
const condition = document.createElement('div');
condition.setAttribute('class', 'condition card');
condition.setAttribute('id', 'condition');
const humidity = document.createElement('div');
humidity.setAttribute('class', 'humidity card');
humidity.setAttribute('id', 'humidity');
const sun = document.createElement('div');
sun.setAttribute('class', 'sun card');
sun.setAttribute('id', 'sun');
const sunrise = document.createElement('div');
const sunset = document.createElement('div');
const wind = document.createElement('div');
wind.setAttribute('class', 'wind card');
wind.setAttribute('id', 'wind');
const windSpeed = document.createElement('div');
const windGust = document.createElement('div');
const time = document.createElement('div');
function appendWeather() {
	weatherContainer.appendChild(address);
	address.appendChild(townName);
	address.appendChild(time);
	weatherContainer.appendChild(tempBox);
	tempBox.appendChild(tempNow);
	tempBox.appendChild(maxTemp);
	tempBox.appendChild(minTemp);
	tempBox.appendChild(feelsLike);
	weatherContainer.appendChild(condition);
	weatherContainer.appendChild(humidity);
	weatherContainer.appendChild(sun);
	sun.appendChild(sunrise);
	sun.appendChild(sunset);
	weatherContainer.appendChild(wind);
	wind.appendChild(windSpeed);
	wind.appendChild(windGust);
}

function getLocalNowMinutes(data) {
    const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: data.timezone,
		year: "numeric",   
        month: "numeric",  
        day: "numeric",     
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });

    const parts = formatter.formatToParts(new Date());
    const h = Number(parts.find(p => p.type === "hour").value);
    const m = Number(parts.find(p => p.type === "minute").value);

    return h * 60 + m;
}
function convertToMinutes(timeString, data) {
    if (!timeString) return NaN;

    const [h, m, s] = timeString.split(':').map(Number);

    // Create a date in the target timezone using Intl
    const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: data.timezone,
        year: "numeric",   
        month: "numeric",  
        day: "numeric",     
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });

    // Format "now" in the target timezone
    const parts = formatter.formatToParts(new Date());

    // Build a real Date object using the target timezone's date
    const year = Number(parts.find(p => p.type === "year").value);
    const month = Number(parts.find(p => p.type === "month").value) - 1;
    const day = Number(parts.find(p => p.type === "day").value);

    const d = new Date(year, month, day, h, m, s || 0);

    return d.getHours() * 60 + d.getMinutes();
}


async function backgroundColour(location) {
    const data = await getLocation(location);

    const nowMinutes = getLocalNowMinutes(data);
    const sunriseMinutes = convertToMinutes(data.currentConditions.sunrise, data);
    const sunsetMinutes  = convertToMinutes(data.currentConditions.sunset, data);
	let chooseBackgroundTime;

	if (nowMinutes === sunriseMinutes) {
		chooseBackgroundTime = 'sunrise';
	} else if (nowMinutes === sunsetMinutes) {
		chooseBackgroundTime = 'sunset';
	} else if (nowMinutes > sunriseMinutes && nowMinutes < 12 * 60) {
		chooseBackgroundTime = 'morning';
	} else if (nowMinutes >= 12 * 60 && nowMinutes < 14 * 60) {
		chooseBackgroundTime = 'afternoon';
	} else if (nowMinutes >= 14 * 60 && nowMinutes < sunsetMinutes) {
		chooseBackgroundTime = 'evening';
	} else if (nowMinutes > sunsetMinutes || nowMinutes < sunriseMinutes) {
		chooseBackgroundTime = 'night';
	}

	function choseBackgroundCondition(data) {
		const raw = data.currentConditions.conditions.toLowerCase().trim();

// Take only the first condition before any comma
const primary = raw.split(',')[0].trim();

// Replace spaces with hyphens
const condition = primary.replace(/\s+/g, '-');

	switch (data.currentConditions.conditions) {
		case 'Cloudy':
		case 'Partially cloudy':
		case 'Fog': // fallthrough
			return 'cloudy';
			
		case 'Rain':
			return 'rainy';// fallthrough
	
		case 'Storm':
			return 'stormy';// fallthrough

		case 'Snow':
			return 'snowy'; // fallthrough

		case 'Clear day':
		case 'Clear night':
		case 'Clear':
		case 'Wind': // fallthrough
			return 'sunny';
			default:
      return 'sunny';
			
	}
}

	const body = document.querySelector('body');
	body.classList.forEach(cls => {
    if (cls.match(/^(morning|afternoon|evening|sunrise|sunset|night)-(cloudy|sunny|rainy|stormy|snowy)$/)) {
        body.classList.remove(cls);
    }
});

	const conditionClass = choseBackgroundCondition(data);
	body.classList.add(`${chooseBackgroundTime}-${conditionClass}`);
	console.log(chooseBackgroundTime)
	console.log(choseBackgroundCondition(data))
}
window.addEventListener('DOMContentLoaded' , async () => {
	const defaultCity = 'London';
	
	try {
		const data = await getLocation(defaultCity);
		const elements = weatherDisplay(data)
	appendWeather(elements)
		backgroundColour(defaultCity);
		console.log(backgroundColour(defaultCity))
	} catch (err) {
		console.log('default city', err)
	}
	
})


form.addEventListener('submit', async (e) => {
	e.preventDefault();
	weatherContainer.textContent = '';
	// createWeather()
	const location = document.querySelector('#search-bar').value.trim();
	const searchBar = document.querySelector('#search-bar');
	try {
		const data = await getLocation(location);
		const elements = weatherDisplay(data);
		console.log(data);
		appendWeather(elements);
		backgroundColour(location);
		console.log(backgroundColour(location))
	} catch (err) {
		console.log('didnt work');
		console.log(err);
	}
	searchBar.value = '';
	
});

function weatherConditionIconGet(data) {
	

	const conditionName = data.currentConditions.icon;
	const iconObject = icons.find((icon) => icon.name === conditionName);

	if (iconObject) {
		const clone = iconObject.icon.cloneNode(true);
		condition.appendChild(clone);
		console.log(clone);
	} else {
		console.log('no icon');
	}
	
console.log(data.currentConditions.conditions)
	return conditionName;
}
function trimSeconds(timeString) {
  return timeString.slice(0, 5); // "07:54"
}


function weatherDisplay(data) {
	const temp = fahrenheitToCelsius(data.currentConditions.temp);
	const tempMaxC = fahrenheitToCelsius(data.days[0].tempmax);
	const tempMinC = fahrenheitToCelsius(data.days[0].tempmin);
	const feelsLikeTemp = fahrenheitToCelsius(data.currentConditions.feelslike);
	townName.textContent =
		data.address.charAt(0).toUpperCase() + data.address.slice(1);

	 time.textContent = currentLocalTime(data);

	if (switchBox.checked) {
		tempNow.textContent = `Temperature: ${Math.floor(data.currentConditions.temp)}°F`;
		maxTemp.textContent = `Max Temperature: ${Math.floor(data.days[0].tempmax)}°F`;
		minTemp.textContent = `Min Temperature: ${Math.floor(data.days[0].tempmin)}°F`;
		feelsLike.textContent = `Feels Like: ${Math.floor(data.currentConditions.feelslike)}°F`;
	} else {
		tempNow.textContent = `Temperature: ${Math.floor(temp)}°C`;
		maxTemp.textContent = `Max Temperature: ${Math.floor(tempMaxC)}°C`;
		minTemp.textContent = `Min Temperature: ${Math.floor(tempMinC)}°C`;
		feelsLike.textContent = `Feels Like: ${Math.floor(feelsLikeTemp)}°C`;
	}

	condition.textContent = `Condition: ${data.currentConditions.conditions}`;


	sunrise.textContent = `Sunrise: ${trimSeconds(data.currentConditions.sunrise)}`;
	sunset.textContent = `Sunset: ${trimSeconds(data.currentConditions.sunset)}`;
	windGust.textContent = `Wind Gust: ${data.currentConditions.windgust}MPH`;
	windSpeed.textContent = `Wind speed: ${data.currentConditions.windspeed}MPH`;
	humidity.textContent = `Humidity: ${data.currentConditions.humidity}%`;
	weatherConditionIconGet(data);
	return {
		address,
		maxTemp,
		tempNow,
		minTemp,
		feelsLike,
		condition,
		sunrise,
		sunset,
		windGust,
		windSpeed,
		humidity,
	};
}
