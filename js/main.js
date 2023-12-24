// https://www.weatherapi.com/
// auto location detection?

const baseUrl = "https://api.weatherapi.com/v1/";
const apiMethod = "current.json";
const key = "bfde22645c6c43d3a3e224519220804";
const myLocation = "sw184fy";
const aqi = "no";

// Cloned on 24/12/2023

function updateWeatherElements(response) {
    const lastUpdateTime = response.current.last_updated.slice(-5);
    document.querySelector('#last-update-time').innerHTML = lastUpdateTime;

    const iconPath = "https:" + response.current.condition.icon;
    document.querySelector('#favicon').setAttribute('href', iconPath);

    const locationName = response.location.name;
    document.querySelector('title').innerHTML = locationName;

    const temperature = response.current.temp_c;
    document.querySelector('#temperature').innerHTML = temperature + '°';

    const windSpeed = response.current.wind_kph;
    document.querySelector('#wind-speed').innerHTML = windSpeed + 'km/h';

    document.querySelector('#weather-icon').setAttribute('src', iconPath);

    const windDegree = response.current.wind_degree;
    document.querySelector("#wind-degree").style.transform = `rotate(${windDegree}deg)`;

    const weatherCondition = response.current.condition.text;
    document.querySelector('#weather-condition').innerHTML = weatherCondition;

    document.querySelector("#location-name").innerHTML = locationName;

    const feelsLike = response.current.feelslike_c;
    document.querySelector("#feels-like").innerHTML = 'Feels ' + feelsLike + '°';

    const regionName = response.location.region;
    document.querySelector("#region-name").innerHTML = regionName ? regionName + ',' : '';

    let countryName = response.location.country;
    if (["Hongrie", "Ungarn", "Hungría"].includes(countryName)) {
        countryName = "Hungary";
    } else if (countryName === "UK") {
        countryName = "United Kingdom";
    }
    document.querySelector("#country-name").innerHTML = countryName;
}

function fetchData() {
    const myNewLocation = document.querySelector("#new-location-name").value;
    const location = myNewLocation || myLocation;
    const url = `${baseUrl}${apiMethod}?key=${key}&q=${location}&aqi=${aqi}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            updateWeatherElements(data);
        })
        .catch(err => {
            console.log(err);
            alert('City not found!');
        })
        .finally(() => {
            console.log('Fetch finished.');
        });
}

document.querySelector("#location-name").addEventListener("click", () => {
    document.querySelector("#new-location-name").style.display = "block";
    document.querySelector("#new-location-name").focus();
});

let clickCount = 0;
document.querySelector("#refresh").addEventListener("click", (event) => {
    fetchData();
    clickCount++;
    event.target.style.transform = `rotate(${-180 * clickCount}deg)`
});

document.querySelector("#new-location-name").addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        fetchData();
        event.target.style.display = "none";
    }
});

document.querySelector("#new-location-name").addEventListener("focusout", (event) => {
    event.target.style.display = "none";
});

// Initial fetch
fetchData();
