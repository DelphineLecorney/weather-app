import { formatTime } from "./formatTime.js";
import { formatDate } from "./formatDate.js";

export function updateDataContainer(groupedData, cityData) {
  const dataContainer = document.getElementById('data-container');
  dataContainer.innerHTML = '';

  for (const date in groupedData) {
    const dayData = groupedData[date];
    const minTemp = Math.min(...dayData.map(item => item.main.temp - 273.15));
    const maxTemp = Math.max(...dayData.map(item => item.main.temp - 273.15));
    const weatherDescription = dayData[0].weather[0].description;

    const sunrise = formatTime(cityData.sunrise);
    const sunset = formatTime(cityData.sunset);

    const dayDisplay = document.createElement('div');
    dayDisplay.classList.add('weather-results__day-display');

    const dayHeading = document.createElement('h2');
    dayHeading.textContent = formatDate(date);

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
  }
}
