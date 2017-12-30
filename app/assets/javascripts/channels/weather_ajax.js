const button = document.getElementById('button');
const search = document.getElementById('search');
const weatherContainer = document.getElementById('weather-container');

button.addEventListener("click", (event) => {
  fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${search.value}&appid=231e634ee102fa27f134aef8711b9a05`)
    .then(response => response.json())
    .then((data) => {
      const name = data.city.name;
      const country = data.city.country;
      const all = `the name is ${name} and the country is ${country}`;
      weatherContainer.insertAdjacentHTML('afterbegin', all);
    });
});




// london = 2643743
