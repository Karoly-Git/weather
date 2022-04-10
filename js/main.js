// https://www.weatherapi.com/

let baseUrl = "https://api.weatherapi.com/v1/";
let apiMethod = "current.json";
let key = "bfde22645c6c43d3a3e224519220804";
let location = "sw181eg";
let aqi = "no";

let url = () => {
    let newlocation = document.querySelector(".new-location").value;
    if (newlocation === "") {
        return (
            baseUrl + apiMethod + "?key=" + key + "&q=" + location + "&aqi=" + aqi
        );
    } else {
        return (
            baseUrl + apiMethod + "?key=" + key + "&q=" + newlocation + "&aqi=" + aqi
        );
    }
};

function fetch_data() {
    fetch(url())
        .then((response) => response.json())
        .then((response) => {
            const lastUpdate = response.current.last_updated;
            const updateTime = lastUpdate.slice(
                lastUpdate.length - 5,
                lastUpdate.length
            );

            const iconPath = "https:" + response.current.condition.icon;

            const temperature = response.current.temp_c;

            const windSpeed = response.current.wind_kph;

            const condition = response.current.condition.text;

            const place = response.location.name;

            const feelsLike = response.current.feelslike_c;

            let country = response.location.country;
            if (["Hongrie", "Ungarn"].includes(country)) {
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
      <span class="country">${country}</span>
      </div>
      `;

            const container = document.querySelector(".container");
            container.innerHTML = weather;

            const windDirection = document.querySelector(".arrow");
            windDirection.style.transform = `rotate(${windDegree}deg)`;
        });
}

fetch_data();

const refresh_btn = document.querySelector(".refresh");

refresh_btn.addEventListener("click", () => {
    fetch_data();
});
