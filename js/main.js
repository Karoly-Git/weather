// https://www.weatherapi.com/
// auto location detection

let baseUrl = "https://api.weatherapi.com/v1/";
let apiMethod = "current.json";
let key = "bfde22645c6c43d3a3e224519220804";
let myLocation = "sw181eg";
let aqi = "no";
console.log(baseUrl + apiMethod + "?key=" + key + "&q=" + myLocation + "&aqi=" + aqi);

let url = () => {
    let myNewLocation = document.querySelector(".new-location").value;
    if (myNewLocation === "") {
        return (
            baseUrl + apiMethod + "?key=" + key + "&q=" + myLocation + "&aqi=" + aqi
        );
    } else {
        return (
            baseUrl + apiMethod + "?key=" + key + "&q=" + myNewLocation + "&aqi=" + aqi
        );
    }
};

function fetch_data() {
    fetch(url())
        .then(response => response.json())
        .then(response => {
            const lastUpdate = response.current.last_updated;
            const updateTime = lastUpdate.slice(
                lastUpdate.length - 5,
                lastUpdate.length
            );

            const iconPath = "https:" + response.current.condition.icon;
            document.querySelector('#favicon').setAttribute('href', iconPath);

            const temperature = response.current.temp_c;

            const windSpeed = response.current.wind_kph;

            const condition = response.current.condition.text;

            const place = response.location.name;
            document.querySelector('title').innerText = place;

            const region = response.location.region;

            const feelsLike = response.current.feelslike_c;

            let country = response.location.country;
            if (["Hongrie", "Ungarn", "Hungría"].includes(country)) {
                country = "Hungary";
            } else if (country === "UK") {
                country = "United Kingdom";
            }

            const windDegree = response.current.wind_degree;

            const weather = `
    <div class="time-box">
    <span class="update-time">Update: ${updateTime}</span>
    </div>
    <div class="temperature-box">
    <img class="weather-icon" src="${iconPath}" alt="weather icon" />
    <img class="thermometer" src="./img/thermometer.png" alt="thermometer icon" />
    <span class="temperature">${temperature}°c</span>
    </div>
    
    <div class="wind-box">
    <img class="windsock" src="./img/windsock.png" alt="windsock"></img>
    <span class="speed">${windSpeed} km/h</span>
    <img class="arrow" src="./img/arrow.png" alt="arrow icon"></img>
    </div>
    
    <div class="condition-box">
    <span class="condition">${condition}</span>
      </div>
      
      <div class="location-box">
      <img class="location-icon" src="./img/location.png" alt="location icon" />
      <span class="city">
      ${place}
      <span class="feels-like">Feels like ${feelsLike}°c</span>
      </span>
      </div>
      
      <div class="country-box">
      <span class="region">${region} </span>
      <span class="country">${country}</span>
      </div>
      `;

            const container = document.querySelector(".container");
            container.innerHTML = weather;

            const windDirection = document.querySelector(".arrow");
            windDirection.style.transform = `rotate(${windDegree}deg)`;

            const city = document.querySelector(".city");
            const myNewLocation = document.querySelector(".new-location");

            city.addEventListener("click", () => {
                myNewLocation.style.display = "block";
                myNewLocation.focus();
            });
        });
}

fetch_data();

const myNewLocation = document.querySelector(".new-location");
myNewLocation.addEventListener("keyup", (event) => {
    if (myNewLocation !== "" && event.keyCode === 13) {
        fetch_data();
        event.target.style.display = "none";
    }
});

myNewLocation.addEventListener("focusout", (event) => {
    event.target.style.display = "none";
});

/*
const refresh_btn = document.querySelector(".refresh");
refresh_btn.addEventListener("click", () => {
    if (myNewLocation !== "") {
        fetch_data();
    }
});
*/
