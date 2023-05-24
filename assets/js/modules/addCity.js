import { fetchWeather } from './fetchWeather.js';

export function addCity() {
  const cityInput = document.getElementById('city-input');
  const city = cityInput.value.trim();

  if (city === '') return;

  fetchWeather(city);

  cityInput.value = '';

  const addedCitiesContainer = document.getElementById('added-cities-container');
  const cityDisplay = document.createElement('li');
  cityDisplay.classList.add('weather-results__city-display');

  const cityName = document.createElement('h3');
  cityName.textContent = city;

  cityDisplay.appendChild(cityName);
  addedCitiesContainer.appendChild(cityDisplay);
}
