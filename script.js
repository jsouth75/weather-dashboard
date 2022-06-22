
// const searchBtn = document.getElementById("searchBtn")


// function searchHisty(previousCities) {
//   var pastCity = document.getElementById("").ariaValueMax;
//   if (localStorage.getItem('initials') == null) {
//       localStorage.setItem('initials', '[]')
//   }
//   if (localStorage.getItem('points') == null) {
//       localStorage.setItem('points', '[]');
//   }
//   var pointList = JSON.parse(localStorage.getItem('points'));
//   pointList.push(points);
//   localStorage.setItem('points', JSON.stringify(pointList));
//   var initialList = JSON.parse(localStorage.getItem('initials'));
//   initialList.push(initials);
//   localStorage.setItem('initial', JSON.stringify(initialList));
//   showHighScores();
//   console.log("show me the score")
// };


// // local.storage 
// // return forecast...weather icon, temp, wind, humidity, uv index
// var requestOptions = {
//     method: 'GET',
//     redirect: 'follow'
//   };
  
//   fetch("https://api.openweathermap.org/data/2.5/onecall?lat=35.045570&lon=-89.668633&appid=428fb4ba7c4828678c18c215cc7572b9", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));


// const para = document.querySelector('#date')

// para.addEventListener('click, updateCity');

// function updateCity() {
//   const name = prompt('Enter a new name');
//   para.textContent = `City: ${name}`;
// }

// var historyEl = document.getElementById("inputCity")

// var newBtn = document.createElement("button")
// newBtn.textContent =
// newBtn.setAttribute("class", "container btn btn-success mb-2")

// historyEl.appendChild(newBtn)



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

function retrieveUV(lat, lon) {
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&appid=428fb4ba7c4828678c18c215cc7572b9&units=imperial')
    .then(function(response) {
      return response.json()
    })
    .then(function(oneCallWeatherData) {
      console.log(oneCallWeatherData)
      currentUV.innerText = "UV Index: " + oneCallWeatherData.current.uvi;
      let fiveDayData = oneCallWeatherData.daily.slice(0,5);
      console.log(fiveDayData)
      printFiveDayForecast(fiveDayData)
    })
}

function printFiveDayForecast(dataArray) {
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

searchBtn.addEventListener('click', searchWeather)

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
    console.log(data.weather[0].icon);
    currentTemp.textContent = "Temp: " + data.main.temp + ' F'
    currentWind.textContent = "Wind: " + data.wind.speed + " MPH"
    currentHumidity.textContent = "Humidity: " + data.main.humidity + " %"
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    retrieveUV(lat, lon)
  })
}

const dayOne = document.getElementById("day1")
const dayOneIcon = document.querySelector(".iconDay1")
const dayOneTemp = document.querySelector(".tempDay1")
const dayOneWind = document.querySelector(".windDay1")
const dayOneHumidity = document.querySelector(".humidityDay1")


