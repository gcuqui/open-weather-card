const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q={city}&appid={appId}&lang={lang}&units={units}`;

export const getWeather = async (cityName, appId, lang, units) => {
    const response = await fetch(
        BASE_URL
        .replace('{city}', cityName)
        .replace('{appId}', appId)
        .replace('{lang}', lang)
        .replace('{units}', units)
    );
    return response.json();
}