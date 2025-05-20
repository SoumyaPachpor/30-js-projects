const cityInput = document.getElementById("cityInput");

cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getWeather();
  }
});

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherText = document.getElementById("weatherText");
  const weatherIcon = document.getElementById("weatherIcon");

  if (!city) {
    weatherText.innerText = "Please enter a city name.";
    weatherIcon.style.display = "none";
    return;
  }

  const apiKey = "c6578eeb6b93ca13f6a5d0fa05c6332a";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  weatherText.innerText = "Fetching weather...";
  weatherIcon.style.display = "none";

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      weatherText.innerText = `Error: ${data.message}`;
      return;
    }

    const { name, main, weather } = data;
    const temp = main.temp;
    const desc = weather[0].main.toLowerCase();

    const imageMap = {
      clear: "clear.png",
      clouds: "clouds.png",
      drizzle: "drizzle.png",
      humidity: "humidity.png",
      mist: "mist.png",
      rain: "rain.png",
      snow: "snow.png",
      wind: "wind.png",
    };

    const iconFile = imageMap[desc] || "search.png";
    weatherIcon.src = `images/${iconFile}`;
    weatherIcon.style.display = "block";

    weatherText.innerHTML = `
      <strong>${name}</strong><br/>
      Temperature: ${temp}°C<br/>
      Condition: ${weather[0].description}
    `;
  } catch (err) {
    weatherText.innerText = "Error fetching data.";
  }
}

