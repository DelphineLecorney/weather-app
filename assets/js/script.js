import { autocompleteCityInput } from "./modules/autocompleteCityInput.js";
import { fetchPhoto } from "./modules/fetchPhoto.js";
import { fetchWeather } from "./modules/fetchWeather.js";
import { apiCityKey } from "./modules/keys.js";
import { updateDateTime } from "./modules/updateDateTime.js";


const form = document.querySelector('.weather-form');
const cityInput = document.querySelector('#city-input');

autocompleteCityInput(cityInput, apiCityKey);

/* Function to update the date and time */
updateDateTime();
setInterval(updateDateTime, 1000);

/* Function to manage the submission of the form */

const handleFormSubmit = async (e) => {
  e.preventDefault();
  const city = cityInput.value;

  const weatherPromise = fetchWeather(city);
  const photoPromise = fetchPhoto(city);

  await Promise.all([weatherPromise, photoPromise]);

  // Store the city in local storage
  localStorage.setItem('lastSubmittedCity', city);

  // Create a new element for the selected city
  const selectedCitiesDiv = document.querySelector('#selected-cities');
  const newCityElement = document.createElement('div');
  newCityElement.textContent = city;

  // Add the new city element below the existing ones
  selectedCitiesDiv.insertAdjacentElement('beforeend', newCityElement);

  // Clear the input field
  cityInput.value = '';
};


form.addEventListener('submit', handleFormSubmit);

cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleFormSubmit(e);
  }
});