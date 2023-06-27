import { getWeather } from './open-weather.js';

window.addEventListener("load", async () => {
    const URL_PARAMS = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(URL_PARAMS.entries());
    console.log("load");
    console.log(params);
    const weather = await getWeather(params.city, params.appId, params.lang, params.units);
    console.log(weather);
    if (weather) setValues(weather);
});

const setValues = (weather) => {
    const icon = document.querySelector(".icon");
    const temp = document.querySelector(".temp");
    const description = document.querySelector(".description");
    const windNots = document.querySelector(".wind-nots");
    const windDireciton = document.querySelector(".wind-direction");
    icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}.png" alt="${weather.weather[0].description}">`;
    temp.textContent = `${parseInt(weather.main.temp)} ${String.fromCharCode(176)}C`;
    description.textContent = weather.weather[0].description;
    windNots.textContent = `${Number(weather.wind.speed * 1.852001).toFixed(2)} km/h`;
    windDireciton.textContent = `${weather.wind.deg} ${String.fromCharCode(176)}`;
}