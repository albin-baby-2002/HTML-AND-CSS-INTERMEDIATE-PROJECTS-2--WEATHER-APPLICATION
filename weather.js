import axios from "./node_modules/axios.min.js";


export function getWeather( lat ,lon , timezone) {
  return axios.get(
    "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m,temperature_80m&daily=weathercode,temperature_2m_max,apparent_temperature_max,precipitation_sum,temperature_2m_min,apparent_temperature_min&current_weather=true&windspeed_unit=mph&precipitation_unit=inch&",{
        params: {
            latitude: lat ,
            longitude: lon,
            timezone,
        }
    }
  )

  .then(({data}) => {
    return{
        current: parseCurrentWeather(data),
        daily: parseDailyWeather(data),
        hourly: parseHourlyWeather(data)
    }
  })
}

function parseCurrentWeather({current_weather, daily}){

  const {temperature: currentTemp, weathercode:iconCode , windspeed: windSpeed,time:date_time} = current_weather;

  const{
    temperature_2m_max: [temp_max],apparent_temperature_max: [fl_max],precipitation_sum: [precip],temperature_2m_min: [temp_min],apparent_temperature_min: [fl_min],
  } = daily

  return{
    currentTemp:Math.round(currentTemp),
    iconCode,
    date_time: new Date(date_time),
    highTemp:Math.round(temp_max),
    lowTemp:Math.round(temp_min),
    fl_high:Math.round(fl_max),
    fl_low:Math.round(fl_min),
    precip:Math.round(precip*100)/100,
    windSpeed:Math.round(windSpeed),


  }
};

function parseDailyWeather({daily , current_weather}){
  return daily.time.map((time,index) =>{
    return{
      date_time: new Date(time),
      temp_high:Math.round(daily.temperature_2m_max[index]),
      iconCode: daily.weathercode[index],

      
    }
  }).filter(({date_time}) => date_time.getDay() !== new Date (current_weather.time).getDay())
};

function parseHourlyWeather({hourly,current_weather}){
  return hourly.time.map((time,index)=> {
    return {
      date_time: new Date(time),
      iconCode: hourly.weathercode[index],
      temp: Math.round(hourly.temperature_2m[index]),
      fl_temp: Math.round(hourly.apparent_temperature[index]),
      windSpeed: Math.round(hourly.windspeed_10m[index]),
      percip: Math.round(hourly.precipitation[index]*100)/100,

  }}).filter( ({date_time}) => date_time.getHours() > new Date(current_weather.time).getHours())
}
