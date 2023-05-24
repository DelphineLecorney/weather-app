import { createLineChart } from './createLineChart.js';
import { groupWeatherData } from './groupWeatherData.js';
import { apiWeatherKey } from './keys.js';
import { prepareChartData } from './prepareChartData.js';
import { updateDataContainer } from './updateDataContainer.js';

const apiWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast';

export async function fetchWeather(city) {
  try {
    const loader = document.getElementById('loader');
    loader.classList.remove('loader-hidden');

    const response = await fetch(`${apiWeatherUrl}?q=${city}&appid=${apiWeatherKey}`);
    const weatherData = await response.json();

    const temperatureElement = document.getElementById('temperature-chart');
    const groupedData = groupWeatherData(weatherData.list);
    const chartData = prepareChartData(groupedData);

    updateDataContainer(groupedData, weatherData.city);

    createLineChart(temperatureElement, chartData);

  } catch (error) {
    console.log(error);
  } finally {
    const loader = document.getElementById('loader');
    loader.classList.add('loader-hidden');
  }
}


