const currentCity = document.getElementById("city-date");
const currentDate = document.getElementById("date")
const weatherIcon = document.getElementById("weatherIcon");
const currentTemp = document.getElementById("currentTemp");
const currentWind = document.getElementById("currentWind");
const currentHumidity = document.getElementById("currentHumidity");
const currentUV = document.getElementById("currentUV");
const searchBtn =  document.getElementById("searchBtn")
const fiveDayForecast = document.getElementById("fiveDayForecast")

searchBtn.addEventListener('click', searchWeather)

function requestWeather() {
  localStorage.setItem("client_id", "428fb4ba7c4828678c18c215cc7572b9");
}


// search function for current
function searchWeather() {
  const city = document.getElementById("inputCity").value;
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=428fb4ba7c4828678c18c215cc7572b9&units=imperial')
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    console.log(data)
    currentCity.textContent = data.name;
    let currentTime = data.dt * 1000;
    let dateTime = new Date(currentTime);
    console.log(dateTime.getMonth());
    
    currentDate.innerText = `${dateTime.getMonth() + 1}/${dateTime.getDate()}/${dateTime.getFullYear()}`
    weatherIcon.textContent = data.weather[0].icon;
    currentTemp.textContent = "Temp: " + data.main.temp + ' F'
    currentWind.textContent = "Wind: " + data.wind.speed + " MPH"
    currentHumidity.textContent = "Humidity: " + data.main.humidity + " %"
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    retrieveUV(lat, lon)
    add(city)
    document.getElementById("inputCity").value = '';
  })
};

// search function for 5 day forecast
function retrieveUV(lat, lon) {
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&appid=428fb4ba7c4828678c18c215cc7572b9&units=imperial')
    .then(function(response) {
      return response.json()
    })
    .then(function(oneCallWeatherData) {
      console.log(oneCallWeatherData)
      currentUV.innerText = "UV Index: " + oneCallWeatherData.current.uvi;
      let fiveDayData = oneCallWeatherData.daily.slice(1,6);
      console.log(fiveDayData)
      printFiveDayForecast(fiveDayData)
    })
}

function printFiveDayForecast(dataArray) {
  fiveDayForecast.innerHTML = "";
  dataArray.forEach(day => {
    let cardContainer = document.createElement("div")
    cardContainer.classList.add("card")
    let card = document.createElement("div")
    card.classList.add("card-body", "p-3", "mb-2", "bg-primary", "text-white")
    
    let time = day.dt * 1000;
    let dateTime = new Date(time);
    
    let dayEl = document.createElement("h5");
    dayEl.classList.add("card-title");
    let iconEl = document.createElement("img");
    iconEl.classList.add("mb-2");
    let tempEl = document.createElement("p");
    tempEl.classList.add("mb-2");
    let windEl = document.createElement("p");
    windEl.classList.add("mb-2");
    let humidityEl = document.createElement("p")
    humidityEl.classList.add("mb-2");
    
    dayEl.innerText = `${dateTime.getMonth() + 1}/${dateTime.getDate()}/${dateTime.getFullYear()}`
    tempEl.innerText = `${"Temp: " + day.temp.max + " F"}`
    windEl.innerText = `${"Wind: " + day.wind_speed + " MPH"}`
    humidityEl.innerText = `${"Humidity: " + day.humidity + " %"}`

    card.appendChild(dayEl);
    card.appendChild(iconEl);
    card.appendChild(tempEl);
    card.appendChild(windEl);
    card.appendChild(humidityEl);
    cardContainer.appendChild(card);
    fiveDayForecast.appendChild(card);
  });
}

// function to save search history
function searchByBtn(event) {
  const city = event.target.textContent
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=428fb4ba7c4828678c18c215cc7572b9&units=imperial')
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    currentCity.textContent = data.name;
    let currentTime = data.dt * 1000;
    let dateTime = new Date(currentTime);
  
    currentDate.innerText = `${dateTime.getMonth() + 1}/${dateTime.getDate()}/${dateTime.getFullYear()}`
    weatherIcon.textContent = data.weather[0].icon;
    currentTemp.textContent = "Temp: " + data.main.temp + ' F'
    currentWind.textContent = "Wind: " + data.wind.speed + " MPH"
    currentHumidity.textContent = "Humidity: " + data.main.humidity + " %"
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    retrieveUV(lat, lon)
  })
};

const cityList = document.getElementById("cityHistory");
const city = document.getElementById("inputCity");
let cityArray = localStorage.getItem("cities") ?
JSON.parse(localStorage.getItem("cities")) : [];

cityArray.forEach(liMaker);
function liMaker(text){
  const li = document.createElement('li')
  li.textContent = text;
  li.addEventListener("click", searchByBtn)
  li.setAttribute("class","btn btn-danger mb-2");
  cityList.appendChild(li);
};

function add(cityAdded){
  console.log(cityAdded)
  cityArray.push(cityAdded);
  localStorage.setItem('cities', JSON.stringify(cityArray));
  liMaker(cityAdded);
}

