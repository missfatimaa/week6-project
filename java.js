let $ = document
let searchBtn = $.querySelector('#button-addon1')
let cityName = $.querySelector('#city')
let date = $.querySelector("#date");
let temp = $.querySelector("#temperature")
let humidity = $.querySelector("#humidity")
let windSpeed = $.querySelector("#wind")
let desc = $.querySelector("#description")
let currentBtn = $.querySelector("#button")
let dateData = $.querySelector("#dateData")

function showWeather(response) {
    cityName.innerHTML = response.data.name
    temp.innerHTML = Math.round(response.data.main.temp)
    humidity.innerHTML = response.data.main.humidity
    windSpeed.innerHTML = Math.round(response.data.wind.speed)
    desc.innerHTML = response.data.weather[0].description;
}
function searched(cityName) {
    let apiKey = "7059cb165caa3316bff682d263a01b1e"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather)
}
function currentLocation(position) {
    console.log(position);
    let apiKey = "7059cb165caa3316bff682d263a01b1e"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather)
}
searchBtn.addEventListener("click", function (event) {
    event.preventDefault()
    let searchBar = $.querySelector('#city-input').value
    searched(searchBar)
})
currentBtn.addEventListener("click", function (event) {
    event.preventDefault()
    navigator.geolocation.getCurrentPosition(currentLocation)
})

function dateHandler(date) {
    let index = date.getDay();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days[index];
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
}
function dateDataHandler(date) {
    if (date.getMonth() < 10 && date.getDate() < 10) {
        dateData.innerHTML = `0${date.getMonth() + 1}/0${date.getDate()}/${date.getFullYear()}`
    }
    else {
        dateData.innerHTML = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    }
}
dateDataHandler(new Date())
date.innerHTML = dateHandler(new Date());
searched("Iran")