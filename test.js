const person = document.querySelector('p');
person.addEventListener('click', updateName);

function updateName() {
    const name = prompt('Enter a new name');
    person.textContent = `Player 1: ${name}`;
}

const cityOne = document.getElementById('firstCity');
cityOne.addEventListener('click', updateCity);

function updateCity() {
    const firstCity = prompt('Enter a new name');
    cityOne.textContent = `${firstCity}`;
}

const cityTwo = document.getElementById('secondCity');
cityTwo.addEventListener('click', updateCity);

function updateCity() {
    const secondCity = prompt('Enter a new name');
    cityTwo.textContent = `${secondCity}`;
}

