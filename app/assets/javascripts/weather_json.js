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
      const all = `<div id="card"><h3>${name}</h3> ${id} </div>`;

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
                        "label": "Mon",
                        "value": "15123"
                    },
                    {
                        "label": "Tue",
                        "value": "14233"
                    },
                    {
                        "label": "Wed",
                        "value": "23507"
                    },
                    {
                        "label": "Thu",
                        "value": "9110"
                    },
                    {
                        "label": "Fri",
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
