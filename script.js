const apikey = "27f06e24130c406fd60a7448820cc519";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const weatherSection = document.querySelector('.weather');
const errorSection = document.querySelector('.error');

searchButton.addEventListener("click", () => {
    if(searchBox.value.trim() !== ""){
        checkWeather(searchBox.value);
    }
});

searchBox.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        checkWeather(searchBox.value);
    }
});

async function checkWeather(city) {
    try{
        const response = await fetch(apiURL + city + `&appid=${apikey}`);

        if(response.status === 404){
            errorSection.style.display = "block";
            weatherSection.classList.remove("show");
            return;
        }

        const data = await response.json();
        console.log(data);

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed + " km/hr";

        /* 🌤 Weather Icon Change */
        const condition = data.weather[0].main;

        if (condition === "Clouds") {
            weatherIcon.src = "clouds.png";
        } 
        else if (condition === "Clear") {
            weatherIcon.src = "clear.png";
        } 
        else if (condition === "Rain") {
            weatherIcon.src = "rain.png";
        } 
        else if (condition === "Drizzle") {
            weatherIcon.src = "drizzle.png";
        } 
        else if (condition === "Mist") {
            weatherIcon.src = "mist.png";
        }

        /* 🌅 Auto Day/Night Background */
        const hour = new Date().getHours();
        if(hour >= 6 && hour < 18){
            document.body.classList.add("day");
        } else {
            document.body.classList.remove("day");
        }

        if(condition === "Rain"){
            document.body.style.background = "linear-gradient(to top, #4e73df, #1e3c72)";
        }
        else if(condition === "Clear"){
            document.body.style.background = "linear-gradient(to top, #fceabb, #f8b500)";
        }
        else if(condition === "Clouds"){
            document.body.style.background = "linear-gradient(to top, #bdc3c7, #2c3e50)";
        }

        /* ✨ Show weather smoothly */
        weatherSection.style.display = "block";
        weatherSection.classList.add("show");
        errorSection.style.display = "none";

    } 
    catch(error){
        console.error("Error fetching weather:", error);
        errorSection.style.display = "block";
        weatherSection.classList.remove("show");
    }
}
