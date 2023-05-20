import { apiWeatherKey } from './keys.js';

const apiWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Fonction pour effectuer la requête météo et afficher les résultats
export async function fetchWeather(city) {
  try {
    const loader = document.getElementById('loader');
    loader.classList.remove('loader-hidden');

    const response = await fetch(`${apiWeatherUrl}?q=${city}&appid=${apiWeatherKey}`);
    const weatherData = await response.json();

    const temperatureElement = document.getElementById('temperature-chart');
    const descriptionElement = document.getElementById('description');

    temperatureElement.textContent = `${weatherData.main.temp}°C`;

    const temperatureKelvin = weatherData.main.temp;
    const temperatureCelsius = temperatureKelvin - 273.15;
    
    temperatureElement.textContent = `${temperatureCelsius.toFixed(2)}°C`;
    

    descriptionElement.textContent = weatherData.weather[0].description;

    const temperatureData = [];
    temperatureData.push(temperatureCelsius);

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

  } catch (error) {
    console.log(error);
  } finally {
    const loader = document.getElementById('loader');
    loader.classList.add('loader-hidden');
  }
}
