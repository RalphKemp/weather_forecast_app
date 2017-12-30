const button = document.getElementById('button');
const search = document.getElementById('search');

button.addEventListener("click", (event) => {
  fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${search.value}&appid=231e634ee102fa27f134aef8711b9a05`)
    .then(response => response.json())
    .then((data) => {
      const name = data.city.name;
      console.log(name);
    });
});




// 2915013
