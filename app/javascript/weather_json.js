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
const fweg = document.getElementById('fweg');



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

function median(array) {
  let sum = array.reduce((previous, current) => current += previous);
  let avg = sum / array.length;
  return avg;
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
        const temps = new Array;

        for(const i in all) {
          const meh = all[i].main.temp;
          temps.push(meh);
        }

        let one = temps.splice(0,8);
        let two = temps.splice(0,8);
        let three = temps.splice(0,8);
        let four = temps.splice(0,8);
        let five = temps.splice(0,8);

        function dayName(date) {
          const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          const day = new Date(date);
          return days[day.getDay()];
        }

        var myChart = new Chart(chartjs, {
          type: 'line',
          data: {
              labels: ["•", "•", "•", "•", "•"],
              datasets: [{
                  label: '5 day average forecast (°C)',
                  data: [kelvinToDegrees(median(one)), kelvinToDegrees(median(two)),kelvinToDegrees(median(three)),
                  kelvinToDegrees(median(four)), kelvinToDegrees(median(five))],
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255,99,132,1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 3
              }]
          },
            options: {
              responsive: true,
              maintainAspectRatio: false,

                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });

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

