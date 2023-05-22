import { getWeather } from "./weather.js";
import { iconMap } from "./iconmap.js";


getWeather(10, 10 , Intl.DateTimeFormat().resolvedOptions().timeZone).then(renderWeather).catch(e=> {console.log(e),alert("error getting weather")})


function renderWeather({current, daily,hourly}){

  renderCurrentWeather(current)

  renderDailyWeather(daily)

  renderHourlyWeather(hourly)

}

function getIconstring(iconCode){
  return iconMap.get(iconCode)
}



function setValue( selector, value , {parent = document} = {}){
  parent.querySelector(`[${selector}]`).textContent = value
}


const weatherIcon = document.querySelector("[current__icon]");

function renderCurrentWeather(current){
  
  weatherIcon.classList.replace("fa-sun", getIconstring(current.iconCode));

  const date = current.date_time;


  const formattedDate = date.toLocaleDateString("en-US", {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).replaceAll(",", "  ");
  const formattedTime = date.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true });



  setValue("current__temp", current.currentTemp );
  setValue("current_temp__high", current.highTemp );
  setValue("current_temp__low", current.lowTemp );
  setValue("current_fl__high", current.fl_high );
  setValue("current_fl__low", current.fl_low );
  setValue("current_wind", current.windSpeed );
  setValue("current_percip", current.precip);
  setValue("data__today", formattedDate );
  


}


const dayFormatter = Intl.DateTimeFormat(undefined,{weekday:'long'});
const main1__a = document.querySelector("[main1__a]");
const main1__b = document.querySelector("[main1__b");
const day_template = document.getElementById("day__info_temp")
function renderDailyWeather(daily){

  main1__a.innerHTML = "";
  main1__b.innerHTML = "";


  daily.forEach((day,index) => {

    const templateClone = day_template.content.cloneNode(true);

    setValue("data-temp",day.temp_high,{parent:templateClone});
    
    setValue("data-day",dayFormatter.format( day.date_time),{parent:templateClone});
    
    templateClone.querySelector("[data-icon]").classList.add(getIconstring(day.iconCode));

     main1__a.append(templateClone)

  });



  
}

const hourFormatter = Intl.DateTimeFormat(undefined,{hour:'numeric'});

const main2 = document.querySelector("[main2]");

const hourly_template = document.getElementById("weatherAtTimes_temp")
function renderHourlyWeather(hourly){

  main2.innerHTML = "";



  hourly.forEach((hour,index) => {

    const templateClone = hourly_template.content.cloneNode(true);

    
    setValue("data-time", hourFormatter.format( hour.date_time),{parent:templateClone});

    setValue("data-day",dayFormatter.format( hour.date_time),{parent:templateClone});
    
    templateClone.querySelector("[data-icon]").classList.add(getIconstring(hour.iconCode));


    setValue("data-temp",hour.temp,{parent:templateClone});
    setValue("data-fl-temp",hour.fl_temp,{parent:templateClone});
    setValue("data-wind",hour.windSpeed,{parent:templateClone});
    setValue("data-percip",hour.percip,{parent:templateClone});

  if(index <= 15){ main2.append(templateClone)}

    

  });



  
}
