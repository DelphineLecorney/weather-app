import { fetchWeather } from "./modules/fetchWeather.js";

const form = document.querySelector('.weather-form');
const cityInput = document.querySelector('#city-input');
export const apiWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
export const apiUnsplashUrl = 'https://api.unsplash.com';

// Fonction pour gérer la soumission du formulaire
const handleFormSubmit = async (e) => {
  e.preventDefault();
  const city = cityInput.value;
  fetchWeather(city);
};

form.addEventListener('submit', handleFormSubmit);

cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleFormSubmit(e);
  }
});
