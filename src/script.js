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

//Display am and pm
if (hours < 12) {
  time.innerHTML = `${hours}:${minute} am`;
} else {
  time.innerHTML = `${hours}:${minute} pm`;
}

// Search for city and save city
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let city = document.querySelector("#city");
  city.innerHTML = `${searchInput.value}`;
  findCity(searchInput.value);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

//Locate the city
function findCity(city) {
  let apiKey = "bc5ca568ee2d7c71357ca430a3ff8705";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
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


//Toronto link
function torontoDisplay(response) {
  let city = "toronto";
  findCity(city);
}
let torontoLink = document.querySelector("#toronto");
torontoLink.addEventListener("click", torontoDisplay);

//New York link
function newYorkDisplay(response) {
  let city = "new york";
  findCity(city);
}
let newYorkLink = document.querySelector("#newYork");
newYorkLink.addEventListener("click", newYorkDisplay);

//London link
function londonDisplay(response) {
  let city = "london";
  findCity(city);
}
let londonLink = document.querySelector("#london");
londonLink.addEventListener("click", londonDisplay);

//Paris link
function parisDisplay(response) {
  let city = "paris";
  findCity(city);
}
let parisLink = document.querySelector("#paris");
parisLink.addEventListener("click", parisDisplay);

//Milan link
function milanDisplay(response) {
  let city = "milan";
  findCity(city);
}
let milanLink = document.querySelector("#milan");
milanLink.addEventListener("click", milanDisplay);

//Moscow link
function moscowDisplay(response) {
  let city = "moscow";
  findCity(city);
}
let moscowLink = document.querySelector("#moscow");
moscowLink.addEventListener("click", moscowDisplay);
