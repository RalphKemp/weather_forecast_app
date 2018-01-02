const button = document.getElementById('button');
const search = document.getElementById('search');
const weatherContainer = document.getElementById('weather-container');
const results = document.getElementById('results');




button.addEventListener("click", (event) => {
  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${search.value},UK&appid=231e634ee102fa27f134aef8711b9a05`)
    .then(response => response.json())
    .then((data) => {
      const name = data.city.name;
      const country = data.city.country;
      const id = data.list[12].main.temp;

      const jsonDate = new Date(data.list[0].dt_txt);
      const weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";
      const dayOne = weekday[jsonDate.getDay()];
      const dayTwo = weekday[jsonDate.getDay()+1];
      const dayThree = weekday[jsonDate.getDay()+2];
      const dayFour = weekday[jsonDate.getDay()+3];
      const dayFive = weekday[jsonDate.getDay()+4];


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
                    "yAxisName": "Temp (K)",

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
                        "label": `${dayOne}`,
                        "value": "15123"
                    },
                    {
                        "label": `${dayTwo}`,
                        "value": "14233"
                    },
                    {
                        "label": `${dayThree}`,
                        "value": "23507"
                    },
                    {
                        "label": `${dayFour}`,
                        "value": "9110"
                    },
                    {
                        "label": `${dayFive}`,
                        "value": "15529"
                    }
                ],
                "trendlines": [
                    {
                        "line": [
                            {
                                "startvalue": "18500",
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
