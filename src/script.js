let now = new Date();

let element = document.querySelector("#date");
let date = now.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "Jan.",
  "Feb.",
  "March",
  "Apr.",
  "May",
  "June",
  "July",
  "Aug.",
  "Sept.",
  "Oct.",
  "Nov.",
  "Dec.",
];

let month = months[now.getMonth()];

element.innerHTML = `${day}, ${month} ${date}`;

let time = document.querySelector("#time");
let hours = now.getHours();
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

//Display time
time.innerHTML = `${hours}:${minute}`;


function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

return days[day];
}

function displayForecast(response) {
let forecast = response.data.daily;

let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;
forecast.forEach(function (forecastDay, index) {
  if (index < 5) {
forecastHTML = 
    forecastHTML + 
      `   
             <div class="col-2">
             <ul>
               <li class = "weekDays">
                 ${formatDay(forecastDay.dt)}
               </li>
               <li class = "emojis">
                 <img 
            src = "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
            alt = ""
            width = "42"
            />
               </li>
               <li class = "forecast-temps">
                 <span class = "max-temp">
                    ${Math.round(forecastDay.temp.max)}°
                 </span>
                 <span class = "min-temp">
                   ${Math.round(forecastDay.temp.min)}°
                 </span>
               </li>
             </ul>
             </div>                  
        `;
  }
});
 

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "bc5ca568ee2d7c71357ca430a3ff8705";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;  
  axios.get(apiUrl).then(displayForecast);
}

//Current location button
function showLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(displayPosition);
}

function displayPosition(position) {
  let apiKey = "bc5ca568ee2d7c71357ca430a3ff8705";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  let tempHeader = document.querySelector("#temp1");
  tempHeader.innerHTML = `${temperature}`;
  let city = response.data.name;
  let cityHeader = document.querySelector("#city");
  cityHeader.innerHTML = `${city}`;
  let wind = Math.round(response.data.wind.speed);
  let windHeader = document.querySelector("#wind");
  windHeader.innerHTML = `Wind: ${wind} km/h`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityHeader = document.querySelector("#humidity");
  humidityHeader.innerHTML = `Humidity: ${humidity}%`;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src", 
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
   icon.setAttribute("alt", response.data.weather[0].description);
  let descriptionHeader = document.querySelector("#description");
  descriptionHeader.innerHTML = response.data.weather[0].description;

getForecast(response.data.coord);
}

let currentLocBttn = document.querySelector("#current-loc-bttn");
currentLocBttn.addEventListener("click", showLocation);

//Fahrenheit button
function displayFahrenheit(event) {
  event.preventDefault();
  let temp1 = document.querySelector("#temp1");
  celsiusButton.classList.remove("active");
  fahrenheitButton.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) /5 + 32;
  temp1.innerHTML = Math.round(fahrenheitTemp);
}


// Celsius button
function displayCelsius(event) {
  event.preventDefault();
  celsiusButton.classList.add("active");
  fahrenheitButton.classList.remove("active");
  let temp1 = document.querySelector("#temp1");
  temp1.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitButton = document.querySelector("#fahren-Button");
fahrenheitButton.addEventListener("click", displayFahrenheit);

let celsiusButton = document.querySelector("#celsius-Button");
celsiusButton.addEventListener("click", displayCelsius);

function searchCity(city) {
  let apiKey = "bc5ca568ee2d7c71357ca430a3ff8705";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  searchCity(searchInput.value);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);


//Toronto link
function torontoDisplay(response) {
  let city = "toronto";
  searchCity(city);
}
let torontoLink = document.querySelector("#toronto");
torontoLink.addEventListener("click", torontoDisplay);

//New York link
function newYorkDisplay(response) {
  let city = "new york";
  searchCity(city);
}
let newYorkLink = document.querySelector("#newYork");
newYorkLink.addEventListener("click", newYorkDisplay);

//London link
function londonDisplay(response) {
  let city = "london";
  searchCity(city);
}
let londonLink = document.querySelector("#london");
londonLink.addEventListener("click", londonDisplay);

//Paris link
function parisDisplay(response) {
  let city = "paris";
  searchCity(city);
}
let parisLink = document.querySelector("#paris");
parisLink.addEventListener("click", parisDisplay);

//Milan link
function milanDisplay(response) {
  let city = "milan";
  searchCity(city);
}
let milanLink = document.querySelector("#milan");
milanLink.addEventListener("click", milanDisplay);

//Moscow link
function moscowDisplay(response) {
  let city = "moscow";
  searchCity(city);
}
let moscowLink = document.querySelector("#moscow");
moscowLink.addEventListener("click", moscowDisplay);

searchCity("toronto");