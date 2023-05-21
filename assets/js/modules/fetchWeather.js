import { groupWeatherData } from './groupWeatherData.js';
import { apiWeatherKey } from './keys.js';

const apiWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast';

/* function makes a request to the weather API, 
processes the received data, groups them by day, 
displays them on a graph and shows the current weather description.
*/

export async function fetchWeather(city) {
  try {
    const loader = document.getElementById('loader');
    loader.classList.remove('loader-hidden');

    const response = await fetch(`${apiWeatherUrl}?q=${city}&appid=${apiWeatherKey}`);
    const weatherData = await response.json();

    const temperatureElement = document.getElementById('temperature-chart');
    const descriptionElement = document.getElementById('description');

    const groupedData = groupWeatherData(weatherData.list);

    const dates = [];
    const minTemperatureData = [];
    const maxTemperatureData = [];

    groupedData.forEach(dayData => {
      const date = moment(dayData[0].dt * 1000).format('YYYY-MM-DD');
      const minTemp = Math.min(...dayData.map(item => item.main.temp - 273.15));
      const maxTemp = Math.max(...dayData.map(item => item.main.temp - 273.15));

      dates.push(date);
      minTemperatureData.push(minTemp.toFixed(1));
      maxTemperatureData.push(maxTemp.toFixed(1));
    });

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    const chartData = {
      labels: dates,
      datasets: [
        {
          label: 'Min Temperature',
          data: minTemperatureData,
          backgroundColor: 'transparent',
          borderColor: 'rgba(192, 75, 75, 1)',
          borderWidth: 1,
        },
        {
          label: 'Max Temperature',
          data: maxTemperatureData,
          backgroundColor: 'transparent',
          borderColor: 'rgba(75, 192, 75, 1)',
          borderWidth: 1,
        },
      ],
    };

    new Chart(temperatureElement, {
      type: 'line',
      data: chartData,
      options: chartOptions,
    });

    const currentDescription = groupedData[0][0].weather[0].description;
    descriptionElement.textContent = currentDescription;

  } catch (error) {
    console.log(error);
  } finally {
    const loader = document.getElementById('loader');
    loader.classList.add('loader-hidden');
  }
}


