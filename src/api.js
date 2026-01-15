

async function getLocation(location) {
const response = await fetch( `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=PJ7RXR8YLKWRNKTRHP9TBEUXM`);
if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
}


const data = await response.json();
return data;
};
export {getLocation}