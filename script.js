var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://api.openweathermap.org/data/2.5/onecall?lat=35.045570&lon=-89.668633&appid=428fb4ba7c4828678c18c215cc7572b9", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));


const para = document.querySelector('#date')

para.addEventListener('click, updateCity');

function updateCity() {
  const name = prompt('Enter a new name');
  para.textContent = `City: ${name}`;
}

var historyEl = document.getElementById("inputCity")

var newBtn = document.createElement("button")
newBtn.textContent =
newBtn.setAttribute("class", "container btn btn-success mb-2")

historyEl.appendChild(newBtn)