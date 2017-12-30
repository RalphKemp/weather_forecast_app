const button = document.getElementById('button');
const search = document.getElementById('search');
const weatherContainer = document.getElementById('weather-container');
const results = document.getElementById('results');



button.addEventListener("click", (event) => {
  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${search.value},UK&appid=231e634ee102fa27f134aef8711b9a05`)
    .then(response => response.json())
    .then((data) => {
      const id = data.city.id;
      const country = data.city.country;
      const all = `<h3> the city ID is ${id} and the country is ${country} </h3>`;

      weatherContainer.insertAdjacentHTML('afterbegin', all);
    });
});
