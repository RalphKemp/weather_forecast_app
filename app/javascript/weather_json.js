const button = document.getElementById('button');
const results = document.getElementById('results');
const search = document.getElementById('search');
const weatherContainer = document.getElementById('weather-container');
const cardContainer = document.getElementById('card-container');
const chartSwipe = document.getElementById('chart-swipe');
const infoSwipe = document.getElementById('info-swipe');
const map = document.getElementById('map');
const logoAndForm = document.querySelector('.logo-and-form');
const slogan = document.querySelector('.slogan');
const main = document.getElementsByTagName("body")[0];


function kelvinToDegrees(kelv) {
  const temperature =(kelv - 273.15);
  return (Math.round(temperature * 100) / 100);
}

function formValidation() {
  if (search.value == "") {
    swal("Please enter a city name");
    return false;
  }
}

// function changeColor() {
//   main.classList.add("new-color");
// }

function buildPage() {
  infoSwipe.innerHTML = "";
  map.innerHTML = "";
  logoAndForm.classList.remove('top-margin');
  slogan.classList.add('slogan-remove');
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

      // changeColor();

      infoSwipe.insertAdjacentHTML('afterbegin',
        `<div class="card">
          <div class="card-content">
            <div class="card-title"><b>${name}</b></div>
            <span><div class="card-desc">${desc}&nbsp<img src="${iconToUse}" alt="icon"></div></span>
            <div class="card-current-temp">${currentTemp}°C</div>
          </div>
        </div>`);

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
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

        // FUSIONCHART
        FusionCharts.ready(function () {
          var visitChart = new FusionCharts({
              type: 'line',
              renderAt: 'chart-swipe',
              width: '335',
              height: '200',
              dataFormat: 'json',
              dataSource: {
                  "chart": {
                      "caption": `${name}`,
                      "subCaption": `${country}`,
                      "xAxisName": "Day",
                      "yAxisName": "Temp (°C)",

                      //Cosmetics
                      "lineThickness" : "4",
                      "paletteColors" : "#0075c2",
                      "baseFontColor" : "#333333",
                      "baseFont" : "Helvetica Neue,Arial",
                      "captionFontSize" : "14",
                      "subcaptionFontSize" : "14",
                      "subcaptionFontBold" : "0",
                      "showBorder" : "0",
                      "bgColor" : "#ffffff",
                      "showShadow" : "0",
                      "canvasBgColor" : "#ffffff",
                      "canvasBorderAlpha" : "0",
                      "divlineAlpha" : "100",
                      "divlineColor" : "#999999",
                      "divlineThickness" : "1",
                      "divLineIsDashed" : "1",
                      "divLineDashLen" : "1",
                      "divLineGapLen" : "1",
                      "showXAxisLine" : "1",
                      "xAxisLineThickness" : "1",
                      "xAxisLineColor" : "#999999",
                      "showAlternateHGridColor" : "0",

                  },
                  "data": [
                      {
                          "label": "`${(dayDay(firstDay.dt_txt))}`", // to be changed properly once data is managed
                          "value": "`${temp}`"
                      },
                      {
                          "label": "`${dayTwo}`",
                          "value": "14"
                      },
                      {
                          "label": "`${dayThree}`",
                          "value": "22",
                      },
                      {
                          "label": "`${dayFour}`",
                          "value": "33"
                      },
                      {
                          "label": "`${dayFive}`",
                          "value": "15"
                      },
                      {
                          "label": "`${daysix}`",
                          "value": "15"
                      }
                  ],
                  "trendlines": [
                      {
                          "line": [
                              {
                                  "startvalue": "10",
                                  "color": "#1aaf5d",
                                  "displayvalue": "",
                                  "valueOnRight" : "1",
                                  "thickness" : "2"
                              }
                          ]
                      }
                  ]
              }
          });
          visitChart.render();
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

button.addEventListener("click", hello);
