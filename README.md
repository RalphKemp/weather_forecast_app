
# WeatherNow

## Build Process

Hi! I hope you like the app. Here are some thoughts I had on the build process with some examples of how I worked around certain bugs and problems.


When starting the project, I decided the two most important aspects of the initial development process were having a solid and simple design to follow, and practising continuous deployment (to Heroku) to make sure the app was fully functional before submitting. On one HTML page I would have the weather information fetched and inserted with javascript into a mobile swiper. I have some experience with the OpenWeatherMap API, as I have actually previously built a weather app using React and Redux.


I decided to build the app within Rails as it’s a framework I’m comfortable using, and the template I used has a lot of useful preset configurations and addons like webpacker for compiling JS. I decided that the most important thing to do first was to fetch and display basic data from the openweathermap forecast API. The main problem I came across when first using the API was understanding how to create a global, not region based, weather app. The problem is openweathermap recommends that you use city ids to reference a city - however the list of IDs seems to only be available as a local file, (which is over 20mb), prompting me to make my app UK only for site stability. This was as simple as stating ${search.value},UK in the fetch request. On my first deployment of the code I was welcomed with 5 error messages - the https request had failed as I had missed out an 's' in my fetches, and had also forgotten to add an API key for my Google Maps API - these being easy fixes thanks to testing deployed code.


Throughout the build of the main javascript file, I had many instances where I had to think what I could additionally add to improve the UX. First, I decided it would be neater to just have one result per search instead of a list of searches (like my react app) so I included a build page function which cleared the inner html of the page/containers before displaying the results again. Second, I realised that I hadn't included any sort of form validation for either blank or incorrect searches. The first formValidation() function is fairly self-explaniatory, if the value of search is nil (after the click) then throw up an alert. Thinking of how to check for incorrect cities, I realised that the API throws back a 404 when it can't find the city name, so I placed an if statement after the fetch which would check for a valid entry. I also decided that I wanted to display the current weather for the city location, and not just a 5 day forecast. Therefore in order to use both APIs from OpenWeatherMap, I put them into an array and referenced each one seperately in two different fetches. The data from both fetches was then inserted into two swiper cards. <!-- EIGHT -->


In terms of actually displaying the weather forecast data in a chart, I had quite a few options. However in the end I decided to push all 40 temperatures of one response into an array, then splice that data into five new arrays which could be stored as variables and placed as data in the chart. To get an average of the 8 temperatures in an array I created a simple median function to return the result. However the results were obviosuly still coming back in Kelvin, so I wrapped the median function in a KelvinToDegrees function I wrote, which did the trick.


## Final thoughts / Areas for improvement:

Overall I'm happy with the design and ease of use of the app. In terms of responsive design, for desktop views I would have separate containers for both the APIs data, instead of having a mobile-like swiper. It would be an improvement in terms of both design and functionality - it is not immediately evident in the desktop view that you can see additional weather information. The main thing I am looking into currently is the search functionality on smaller iOS devices. Once anything has been typed into the search bar, the search button stops working, rendering the app useless. This is confusing as the problem does not seem to be happening on android devices, even with smaller resolution screens. Currently fixing as we speak.













