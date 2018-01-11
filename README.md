
# WeatherNow

## Build Process

Hi! I hope you like the app. Here are some thoughts I had on the build process with some examples of how I worked around certain bugs and problems.

![alt text](images/hi.jpg "Description goes here")

When starting the project, I decided the two most important aspects of the development process were having a solid design in mind to follow, and practising continuous deployment (to Heroku) to make sure the app was fully functional before submitting. Normally before writing any code I enjoy drawing out basic designs by hand, all-be-it rather crudely. Once happy with a basic layout I feel more comfortable continuing with the actual build. <!-- ONE + TWO --> On one HTML page I would have the weather information fetched and inserted with javascript into a mobile swiper. Funnyly enough i had previously built a weather app using React and Redux, so I had some experience with the Openweathermap api. However I wanted to create something different for the challenge, and just using basic javascript, no libaries.<!--  THREE -->


I decided to build the app within Rails as it’s a framework I’m comfortable using, and the template I used has a lot of useful preset configurations and addons like webpacker for compiling JS etc. I decided that the most important thing to do first was to fetch and display basic data from the openweathermap forecast api. The main problem I came across when first using the api was understanding how to create a global, not region based, weather app. The problem is openweathermap recommends that you use city ids to reference a city - however the list of IDs seems to only be available as a local file, (which is over 20mb), prompting me to make my app UK only for site stability. This was as simple as stating ${search.value},UK in the fetch request. In picture <!-- FOUR --> is the first basic information recieved, and in picture <!-- FIVE  -->the data has been put into a swiper, along with matching google maps icon, which I later placed below the swiper. At this point I was using fusioncharts, but without any real data. <!-- SIX --> The picture below is an example of why I tried to deploy my code often - i hadn't included an 's' in my fetches, and had forgotten to get an API key. <!-- SEVEN -->


The code in the picture below contains three examples of solutions to tasks I wanted to complete. First of all, I decided it would be neater to just have one result per search instead of a list of searches (like the react app) so I included a build page function which cleared the inner html of the page before displaying the results again. Second, I realised that I hadn't included any sort of form validation for either blank or incorrect searches. The first formValidation() function is fairly self-explaniatory, if the value of search is nil (after the click) then throw up an alert. Thinking of how to check for incorrect cities, I realised that the api throws back a 404 when it can't find the city name, so I placed an if statement after the fetch which would check for a valid entry. Also, I wanted to be able to hit enter to run the function too, so I stored the function in a variable (hello) and then called it on an event listener at the bottom of the page. Below shows the method I used for including enter.  And third, I decided that I wanted to also display the current weather for the city location, and not just a 5 day forecast. Therefore in order to use both apis form openweathermap, I put them into an array and referenced each one seperately in two different fetches. Like before the data from both fetches was inserted into two swiper cards. <!-- EIGHT -->


In terms of actually displaying the weather forecast data in a chart, I had quite a few options. However in the end i decided to push all 40 temperatures of one response into an array, then splice that data into five new arrays which could be stored in arrays and placed as data in the chart. To get an average of the 8 temperatures in an array I created a simple median function to return the result. However the results were obviosuly still coming back as kelvin, so I wrapped the median function in a KelvinToDegrees function I wrote, which did the trick. After this each result displayed nicely on the chart, however as in most final stages of building any app there are always a few stage bugs, one with chartjs shown below. In the end the solution was just to include a max-width: 100% on the chart itself. <!-- NINE -->


## Final thoughts / Areas for improvement:

In terms of responsive design I would have separate containers for both the apis, instead of having a mobile like swiper. It would be an improvement in terms of both design and functionality - it is not immediately evident in the desktop view that you can see additional weather information straight away. The main thing I am looking into currently is search on smaller iOS devices, as once anything has been typed into the search bar, the search button stops working, rendering the app useless. This is confusing as the problem does not seem to be happening on android devices, some with even smaller resolution screens. Currently fixing as we speak.













