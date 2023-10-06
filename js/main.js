// https://www.weatherapi.com/
// auto location detection?

let baseUrl = "https://api.weatherapi.com/v1/";
let apiMethod = "current.json";
let key = "bfde22645c6c43d3a3e224519220804";
let myLocation = "sw184fy";
let aqi = "no";
console.log(baseUrl + apiMethod + "?key=" + key + "&q=" + myLocation + "&aqi=" + aqi);

let url = () => {
    let myNewLocation = document.querySelector("#new-location-name").value;
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

async function fetch_data() {
    try {
        await fetch(url())
            .then(response => response.json())
            .then(response => {
                let lastUpdateTime = response.current.last_updated;
                lastUpdateTime = lastUpdateTime.slice(
                    lastUpdateTime.length - 5,
                    lastUpdateTime.length
                );
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
                if (regionName.length === 0) {
                    document.querySelector("#region-name").innerHTML = '';
                } else {
                    document.querySelector("#region-name").innerHTML = regionName + ',';
                }

                let countryName = response.location.country;
                if (["Hongrie", "Ungarn", "Hungría"].includes(countryName)) {
                    countryName = "Hungary";
                } else if (countryName === "UK") {
                    countryName = "United Kingdom";
                }
                document.querySelector("#country-name").innerHTML = countryName;


                document.querySelector("#location-name").addEventListener("click", () => {
                    document.querySelector("#new-location-name").style.display = "block";
                    document.querySelector("#new-location-name").focus();
                });
            });
    } catch (err) {
        console.log(err);
        alert('City not found!');
    } finally {
        console.log('Fetch finished.');
    }
}

fetch_data();

const newLocationName = document.querySelector("#new-location-name");

newLocationName.addEventListener("keyup", (event) => {
    if (newLocationName !== "" && event.keyCode === 13) {
        fetch_data();
        event.target.style.display = "none";
    }
});

newLocationName.addEventListener("focusout", (event) => {
    event.target.style.display = "none";
});

