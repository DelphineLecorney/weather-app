import { apiUnsplashKey, apiWeatherKey } from "./keys.js";
import { apiWeatherUrl, apiUnsplashUrl } from "../script.js";

// Fonction pour effectuer la requête météo et afficher les résultats
export async function fetchWeather(city) {
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

    const temperatureData = [];
    temperatureData.push(weatherData.main.temp);

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    const chartData = {
      labels: ['Temperature'],
      datasets: [
        {
          label: 'Temperature',
          data: temperatureData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    const temperatureChart = new Chart(temperatureElement, {
      type: 'line',
      data: chartData,
      options: chartOptions,
    });

    if (photoData.urls && photoData.urls.regular) {
      cityPhoto.src = photoData.urls.regular;
    } else {
      cityPhoto.src = 'assets/pictures/imageRemplacement.jpg';
    }

  } catch (error) {
    console.log(error);
  } finally {
    const loader = document.getElementById('loader');
    loader.classList.add('loader-hidden');
  }
}
