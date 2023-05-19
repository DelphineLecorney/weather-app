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

      const temperatureElement = document.getElementById('temperature-chart');
      const descriptionElement = document.getElementById('description');
      const cityPhoto = document.getElementById('city-photo');

      temperatureElement.textContent = `${weatherData.main.temp}°C`;
      descriptionElement.textContent = weatherData.weather[0].description;

      if (photoData.urls && photoData.urls.regular) {
        cityPhoto.src = photoData.urls.regular;
      } else {
        cityPhoto = 'assets/pictures/imageRemplacement.jpg';
      }

    } catch (error) {
      console.log(error);
    } finally {
      const loader = document.getElementById('loader');
      loader.classList.add('loader-hidden');
    }
  };


  fetchWeather();
});
