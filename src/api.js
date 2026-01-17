// import { getTimeBackground } from "./dom";

async function getLocation(location) {
const response = await fetch( `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=PJ7RXR8YLKWRNKTRHP9TBEUXM`);
if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
}


const data = await response.json();
return data;
};

// const backgroundImage = getTimeBackground()
// async function getBackground() {
//     const img = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=e11zn3bxUiHSakPwdDcKz7i1DmHDmiRk&s=${backgroundImage}`);
//      const data = await img.json();
//   return data.data.images.original.url;


// }
export {getLocation}


// https://api.giphy.com/v1/gifs/translate?api_key=e11zn3bxUiHSakPwdDcKz7i1DmHDmiRkE&s=morning
// https://api.giphy.com/v1/gifs/translate?api_key=e11zn3bxUiHSakPwdDcKz7i1DmHDmiRkE&s=afternoon
// https://api.giphy.com/v1/gifs/translate?api_key=e11zn3bxUiHSakPwdDcKz7i1DmHDmiRkE&s=evening
// https://api.giphy.com/v1/gifs/translate?api_key=e11zn3bxUiHSakPwdDcKz7i1DmHDmiRk&s=night
