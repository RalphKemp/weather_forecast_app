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




      // today's GMT
      const today = new Date();
      const gmt = today.toUTCString();


      // THE DAY OF THE FIRST RESULT
      const testing = data.list[0];
      const jsonDate = new Date(testing.dt_txt);
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

      console.log(testing.main.temp);


      // GMT of the first result
      // const jsonDate = new Date(data.list[0].dt_txt);
      // const dayOfResult = jsonDate.toUTCString();


      // temperature of the first result in the JSON hash
      const testTemp = (data.list[0].main.temp - 273.15);
      const temp = (Math.round(testTemp * 100) / 100);





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
                        "label": `${dayOne}`,
                        "value": `${temp}`
                    },
                    {
                        "label": `${dayTwo}`,
                        "value": "14"
                    },
                    {
                        "label": `${dayThree}`,
                        "value": "54",
                    },
                    {
                        "label": `${dayFour}`,
                        "value": "91"
                    },
                    {
                        "label": `${dayFive}`,
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
