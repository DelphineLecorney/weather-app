import { autocompleteCityInput } from "./modules/autocompleteCityInput.js";
import { fetchPhoto } from "./modules/fetchPhoto.js";
import { fetchWeather } from "./modules/fetchWeather.js";
import { apiCityKey } from "./modules/keys.js";
import { updateDateTime } from "./modules/updateDateTime.js";

const form = document.querySelector('.weather-form');
const cityInput = document.querySelector('#city-input');

/* Function to update the date and time */

export const dateElement = document.getElementById('date');
export const timeElement = document.getElementById('time');

updateDateTime();
setInterval(updateDateTime, 1000);


/* Function to manage the submission of the form */

const handleFormSubmit = async (e) => {
  e.preventDefault();
  const city = cityInput.value;
  await fetchWeather(city);
  await fetchPhoto(city);
};

form.addEventListener('submit', handleFormSubmit);

cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleFormSubmit(e);
  }
});

autocompleteCityInput(cityInput, apiCityKey);
