import { fetchPhoto } from "./modules/fetchPhoto.js";
import { fetchWeather } from "./modules/fetchWeather.js";

const form = document.querySelector('.weather-form');
const cityInput = document.querySelector('#city-input');


// Fonction pour gérer la soumission du formulaire
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

