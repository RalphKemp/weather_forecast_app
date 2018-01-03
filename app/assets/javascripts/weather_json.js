const button = document.getElementById('button');
const search = document.getElementById('search');
const weatherContainer = document.getElementById('weather-container');
const results = document.getElementById('results');
const cardContainer = document.getElementById('card-container');


button.addEventListener("click", (event) => {
  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${search.value},UK&appid=231e634ee102fa27f134aef8711b9a05`)
    .then(response => response.json())
    .then((data) => {
      const name = data.city.name;
      const country = data.city.country;

      cardContainer.insertAdjacentHTML('afterbegin', `<div class="card">${name}</div>`);




        // TODAY'S DATE
        const today = new Date();
        const gmt = today.toUTCString();

        // NAME OF DAY
        const firstDay = data.list[0];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dayDay = function(date) {
          const tmp = new Date(date);
          return days[tmp.getDay()];
        };

        // GMT
        const hello = firstDay.dt_txt;

        // FIRST DAY TEMP
        const dayTemp = (firstDay.main.temp - 273.15);
        const temp = (Math.round(dayTemp * 100) / 100);


      FusionCharts.ready(function () {
        var visitChart = new FusionCharts({
            type: 'line',
            renderAt: 'chart-container',
            width: '375',
            height: '250',
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
    });
  });
});
