const button = document.getElementById('button');
const results = document.getElementById('results');
const search = document.getElementById('search');
const weatherContainer = document.getElementById('weather-container');
const cardContainer = document.getElementById('card-container');
const chartSwipe = document.getElementById('chart-swipe');
const infoSwipe = document.getElementById('info-swipe');
const testing = document.getElementById('testing');
const map = document.getElementById('map');
const mainContent = document.getElementById('main-content');
const logoAndForm = document.querySelector('.logo-and-form');
const slogan = document.querySelector('.slogan');
const logo = document.querySelector('.logo');


function kelvinToDegrees(kelv) {
  const temperature =(kelv - 273.15);
  return (Math.round(temperature * 100) / 100);
}

function formValidation() {
  if (search.value == "") {
    swal("Please enter a city name");
    exit(); // console says exit is not defined but won't work otherwise??
  }
}

function buildPage() {
  infoSwipe.innerHTML = "";
  map.innerHTML = "";
  logoAndForm.classList.remove('top-margin');
  slogan.classList.add('slogan-remove');
  logo.classList.add('logo-size-change');
}

const hello = (event) => {
formValidation();
  const urls = [`https://api.openweathermap.org/data/2.5/weather?q=${search.value},UK&appid=231e634ee102fa27f134aef8711b9a05`,
  `https://api.openweathermap.org/data/2.5/forecast?q=${search.value},UK&appid=231e634ee102fa27f134aef8711b9a05`];

  fetch(urls[0])
    .then(response => response.json())
    .then((data) => {
      if (data.cod == 404) {
        swal("Please enter valid city");
        return false;
      }
      buildPage();
      const name = data.name;
      const desc = data.weather[0].description;
      const icon = data.weather[0].icon;
      const iconToUse = `http://openweathermap.org/img/w/${icon}.png`;
      const countryLat = data.coord.lat;
      const countryLon = data.coord.lon;
      const latLon = {lat: countryLat, lng: countryLon};
      const currentTemp = kelvinToDegrees(data.main.temp);

      mainContent.classList.remove('hide');

      infoSwipe.insertAdjacentHTML('afterbegin',
        `<div class="card">
          <div class="card-content">
            <div class="card-content-flex">
              <div class="card-title"><b>${name}</b></div>
              <span><div class="card-desc">${desc}&nbsp<img src="${iconToUse}" alt="icon"></div></span>
            </div>
            <div class="card-current-temp">${currentTemp}°C</div>
          </div>
        </div>`);

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: latLon,
        styles: []
      });

      var marker = new google.maps.Marker({
        position: latLon,
        map: map
      });
    });


  fetch(urls[1])
      .then(response => response.json())
      .then((data) => {
        if (data.cod == 404) {
        return false;
      }
        const name = data.city.name;
        const country = data.city.country;
        const firstResult = data.list[0];
        const all = data.list;
        console.log()

        for(var i in all) {
          var dt_txt  = all[i].dt_txt;
          console.log(dt_txt);
        }


        function dayName(date) {
          const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          const day = new Date(date);
          return days[day.getDay()];
        }

        chartSwipe.insertAdjacentHTML('afterbegin',
        `<div class="card">
          <div class="card-content">
            <div>${name}</div>
            <div>${dayName(firstResult.dt_txt)}</div>
          </div>
        </div>`);

        // SWIPER

      var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        keyboardControl: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        loop: false,
        stopOnLast: true
      });
    });
  };

  const enter = (e) => {
    if (e.keyCode === 13) {
      hello();
    }
  };

search.addEventListener("keyup", enter);
button.addEventListener("click", hello);

