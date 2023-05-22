import { groupWeatherData } from './groupWeatherData.js';
import { apiWeatherKey } from './keys.js';

const apiWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast';


// Function asynchronous takes a city parameter
export async function fetchWeather(city) {
  try {
    const loader = document.getElementById('loader');
    loader.classList.remove('loader-hidden');
    // Executes and sends a GET request with parameters city and key
    const response = await fetch(`${apiWeatherUrl}?q=${city}&appid=${apiWeatherKey}`);
    const weatherData = await response.json();

    const temperatureElement = document.getElementById('temperature-chart');

    const groupedData = groupWeatherData(weatherData.list);

    const dates = [];
    const minTemperatureData = [];
    const maxTemperatureData = [];

    // Extract date, the min and max temperature for each day and add to the arrays
    // For the chart
    groupedData.forEach(dayData => {
      const date = moment(dayData[0].dt_txt).format('YYYY-MM-DD');
      const minTemp = Math.min(...dayData.map(item => item.main.temp - 273.15));
      const maxTemp = Math.max(...dayData.map(item => item.main.temp - 273.15));

      dates.push(date);
      minTemperatureData.push(minTemp.toFixed(1));
      maxTemperatureData.push(maxTemp.toFixed(1));
    });

    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '';

    // Extract weather descriptions for each day and display in the container
    groupedData.forEach((dayData) => {
      const date = moment(dayData[0].dt_txt).format('YYYY-MM-DD');
      const minTemp = Math.min(...dayData.map(item => item.main.temp - 273.15));
      const maxTemp = Math.max(...dayData.map(item => item.main.temp - 273.15));
      const weatherDescription = dayData[0].weather[0].description;
      const sunrise = moment.unix(weatherData.city.sunrise).format('HH:mm');
      const sunset = moment.unix(weatherData.city.sunset).format('HH:mm');

      const dayDisplay = document.createElement('div');
      dayDisplay.classList.add('weather-results__day-column');

      const dayHeading = document.createElement('h2');
      dayHeading.textContent = moment(date).format('dddd D MMMM YYYY');

      const minTempElement = document.createElement('p');
      minTempElement.textContent = `Min Temperature: ${minTemp.toFixed(1)}°C`;

      const maxTempElement = document.createElement('p');
      maxTempElement.textContent = `Max Temperature: ${maxTemp.toFixed(1)}°C`;

      const weatherDescElement = document.createElement('p');
      weatherDescElement.textContent = `Weather Description: ${weatherDescription}`;

      const sunriseElement = document.createElement('p');
      sunriseElement.textContent = `Sunrise: ${sunrise}`;

      const sunsetElement = document.createElement('p');
      sunsetElement.textContent = `Sunset: ${sunset}`;

      dayDisplay.appendChild(dayHeading);
      dayDisplay.appendChild(minTempElement);
      dayDisplay.appendChild(maxTempElement);
      dayDisplay.appendChild(weatherDescElement);
      dayDisplay.appendChild(sunriseElement);
      dayDisplay.appendChild(sunsetElement);

      dataContainer.appendChild(dayDisplay);
    });


    // Create an instance with elements, data, options for visualize a line chart 
    // on the web page
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


  } catch (error) {
    console.log(error);
  } finally {
    const loader = document.getElementById('loader');
    loader.classList.add('loader-hidden');
  }
}
