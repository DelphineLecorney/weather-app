import { apiWeatherKey } from "./modules/keys.js";

const form = document.querySelector('.weather-form');
const cityInput = document.querySelector('#city-input');
const api_WeatherKey = apiWeatherKey;
const apiWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const city = cityInput.value;

    const fetchWeather = async () => {
        try{
            const loader = document.getElementById('loader');
            loader.classList.remove('hidden');

            const response = await fetch(`${apiWeatherUrl}?q=${city}&appid=${api_WeatherKey}`);
            const data = await response.json();

            console.log(data);

            loader.classList.add('hidden');
        }catch(error) {
            console.log(error);
        }finally {
            const loader = document.getElementById('loader');
            loader.classList.add('hidden');
        }
    }
    fetchWeather();
});