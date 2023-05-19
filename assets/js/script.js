import { apiUnsplashKey, apiWeatherKey } from "./modules/keys.js";

const form = document.querySelector('.weather-form');
const cityInput = document.querySelector('#city-input');
const apiWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiUnsplashUrl = 'https://api.unsplash.com';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value;

  const fetchWeather = async () => {
    try {
      const loader = document.getElementById('loader');
      loader.classList.remove('loader-hidden');

      const response = await fetch(`${apiWeatherUrl}?q=${city}&appid=${apiWeatherKey}`);
      const responsePhoto = await fetch(`${apiUnsplashUrl}/photos/random?query=${city}&client_id=${apiUnsplashKey}`);

      const weatherData = await response.json();
      const photoData = await responsePhoto.json();

      const cityPhoto = document.getElementById('city-photo');
      cityPhoto.src = photoData.urls.regular;

    } catch (error) {
      console.log(error);
    } finally {
      const loader = document.getElementById('loader');
      loader.classList.add('loader-hidden');
    }
  };

  fetchWeather();
});
