const apiKey = "2590abec6e0538496121fd4717958181";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherContainer = document.querySelector(".weather");
const errorContainer = document.querySelector(".error");

async function checkWeather(city) {
  if (!city || city.trim() === "") {
    throw new Error("Invalid city input");
  }

  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(`Error ${response.status}: ${data.message}`);
    }

    weatherContainer.style.display = "block";
    errorContainer.style.display = "none";

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed} km/hr`;

    const weatherType = data.weather[0].main;
    let icon;

    switch (weatherType) {
      case "Clouds":
        icon = "clouds1.png";
        break;
      case "Clear":
        icon = "clear1.png";
        break;
      case "Rain":
        icon = "rain1.png";
        break;
      case "Drizzle":
        icon = "drizzle1.png";
        break;
      case "Mist":
        icon = "mist1.png";
        break;
      default:
        icon = "default.png";
        break;
    }

    weatherIcon.src = icon;
  } catch (error) {
    weatherContainer.style.display = "none";
    errorContainer.style.display = "block";
    errorContainer.innerHTML = "Error: " + error.message;
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value.trim());
});