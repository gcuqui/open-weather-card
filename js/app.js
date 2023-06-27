import { getWeather } from './open-weather.js';

window.addEventListener("load", async () => {
    const URL_PARAMS = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(URL_PARAMS.entries());
    console.log("load");
    console.log(params);
    const weather = await getWeather(params.city, params.appId, params.lang, params.units);
    console.log(weather);
    if (weather) setValues(weather);
    
    // define o intervalo para atualização
    setInterval(async () => {
        const weather = await getWeather(params.city, params.appId, params.lang, params.units);
        if (weather) setValues(weather);
    }, 300000); // intervalo de 5 minutos
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
    windDireciton.textContent = `${weather.wind.deg}${String.fromCharCode(176)} ${getDirection(weather.wind.deg)}`;
    setWindDirection(weather.wind.deg);
}

const setWindDirection = (degrees) => {
    const windAngleDegrees = degrees - 90;
    const arrowElement = document.querySelector('.wind-arrow');
    arrowElement.style.transform = `rotate(${windAngleDegrees}deg)`;
}

const getDirection = (degrees) => {
    const directions = [
      { min: 0, max: 22.5, direction: "N" },
      { min: 22.5, max: 45, direction: "NNE" },
      { min: 45, max: 67.5, direction: "NE" },
      { min: 67.5, max: 90, direction: "ENE" },
      { min: 90, max: 112.5, direction: "E" },
      { min: 112.5, max: 135, direction: "ESE" },
      { min: 135, max: 157.5, direction: "SE" },
      { min: 157.5, max: 180, direction: "SSE" },
      { min: 180, max: 202.5, direction: "S" },
      { min: 202.5, max: 225, direction: "SSO" },
      { min: 225, max: 247.5, direction: "SO" },
      { min: 247.5, max: 270, direction: "OSO" },
      { min: 270, max: 292.5, direction: "O" },
      { min: 292.5, max: 315, direction: "ONO" },
      { min: 315, max: 337.5, direction: "NO" },
      { min: 337.5, max: 360, direction: "NNO" },
    ];
  
    for (let i = 0; i < directions.length; i++) {
      const { min, max, direction } = directions[i];
      if (degrees >= min && degrees < max) {
        return direction;
      }
    }
  
    return "ERRO";
  }