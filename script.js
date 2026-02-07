const apikey = "27f06e24130c406fd60a7448820cc519";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

async function checkWeather(city) 
{
    const response = await fetch(apiURL + city + `&appid=${apikey}`);

    if(response.status === 404){
        document.querySelector('.error').style.display = "block";
        document.querySelector('.weather').style.display = "none";
    } 
    else{
        let data = await response.json();  // converted to JSON for easy use of data fetched from Api 
        console.log(data);

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed + " km/hr";

        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "clouds.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "clear.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "mist.png";
        }

        document.querySelector('.weather').style.display = "block";
        document.querySelector('.error').style.display = "none";
    }
}

