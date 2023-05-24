import { autocompleteCityInput } from "./modules/autocompleteCityInput.js";
import { fetchPhoto } from "./modules/fetchPhoto.js";
import { fetchWeather } from "./modules/fetchWeather.js";
import { apiCityKey } from "./modules/keys.js";
import { updateDateTime } from "./modules/updateDateTime.js";
import { addCity } from "./modules/addCity.js";


const form = document.querySelector('.weather-form');
const cityInput = document.querySelector('#city-input');

/* Function to update the date and time */

updateDateTime();
setInterval(updateDateTime, 1000);

/* Function to manage the submission of the form */

const handleFormSubmit = async (e) => {
  e.preventDefault();
  const city = cityInput.value;

  await fetchWeather(city);
  await fetchPhoto(city);
  addCity(city);

  // Store the city in local storage
  localStorage.setItem('lastSubmittedCity', city);
};

form.addEventListener('submit', handleFormSubmit);

cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleFormSubmit(e);
  }
});

autocompleteCityInput(cityInput, apiCityKey);

/* Delete button functionality */

const deleteButton = document.getElementById('delete-button');
deleteButton.addEventListener('click', () => {
  // Remove the city from local storage
  localStorage.removeItem('lastSubmittedCity');

  // Clear the input field
  cityInput.value = '';
});
