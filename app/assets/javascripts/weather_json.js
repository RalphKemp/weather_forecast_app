const button = document.getElementById('button');
const search = document.getElementById('search');
const weatherContainer = document.getElementById('weather-container');
const results = document.getElementById('results');
const cardContainer = document.getElementById('card-container');
const chartSwipe = document.getElementById('chart-swipe');
const infoSwipe = document.getElementById('info-swipe');
const map = document.getElementById('map');



button.addEventListener("click", (event) => {
  infoSwipe.innerHTML = "";
  map.innerHTML = "";
  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${search.value},UK&appid=231e634ee102fa27f134aef8711b9a05`)
    .then(response => response.json())
    .then((data) => {
      const name = data.city.name;
      const country = data.city.country;
      const countryLat = data.city.coord.lat;
      const countryLon = data.city.coord.lon;



      // LOGIC



      // NAME OF DAY
      const firstDay = data.list[0];
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var dayDay = function(date) {
        const tmp = new Date(date);
        return days[tmp.getDay()];
      };


      // FIRST DAY TEMP
      const dayTemp = (firstDay.main.temp - 273.15);
      const temp = (Math.round(dayTemp * 100) / 100);


      // Today's date
      var date = new Date();
      var today = "";
         today += date.getDate() + "/";
         today += (date.getMonth() + 1) + "/";
         today += date.getFullYear();
      console.log(today);








      // INFO SWIPE / MAPS
      infoSwipe.insertAdjacentHTML('afterbegin',
        `<div class="card">
        <div class="card-title">${name}</div>
        <div class="card-main-gmt">${today}</div>
        </div>`);

      const results = {lat: countryLat, lng: countryLon};

        var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: results,
        styles: []
      });

      var marker = new google.maps.Marker({
          position: results,
          map: map
        });





      // FUSIONCHART
      FusionCharts.ready(function () {
        var visitChart = new FusionCharts({
            type: 'line',
            renderAt: 'chart-swipe',
            width: '335',
            height: '220',
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
                        "label": `${(dayDay(firstDay.dt_txt))}`, // to be changed properly once data is managed
                        "value": `${temp}`
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
          stopOnLast: true,
      });
    });
  });
});
