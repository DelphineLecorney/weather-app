import { apiWeatherKey } from './keys.js';

const apiWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast';

// Fonction pour effectuer la requête météo et afficher les résultats
export async function fetchWeather(city) {
  try {
    const loader = document.getElementById('loader');
    loader.classList.remove('loader-hidden');

    const response = await fetch(`${apiWeatherUrl}?q=${city}&appid=${apiWeatherKey}`);
    const weatherData = await response.json();

    const temperatureElement = document.getElementById('temperature-chart');
    const descriptionElement = document.getElementById('description');

    const temperatureData = weatherData.list.map(item => (item.main.temp - 273.15).toFixed(1));
    const descriptionData = weatherData.list.map(item => item.weather[0].description);
    const dates = weatherData.list.map(item => moment(item.dt * 1000).format('YYYY-MM-DD HH:mm'));

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    const chartData = {
      labels: dates,
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

    new Chart(temperatureElement, {
      type: 'line',
      data: chartData,
      options: chartOptions,
    });

    const currentDescription = descriptionData[0];
    descriptionElement.textContent = currentDescription;

  } catch (error) {
    console.log(error);
  } finally {
    const loader = document.getElementById('loader');
    loader.classList.add('loader-hidden');
  }
}
