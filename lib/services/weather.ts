// lib/services/weather.ts

export async function fetchWeatherForecast(
  destination: string,
  startDate: string
): Promise<string> {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return `Expect typical seasonal weather for ${destination}. Check local forecasts before traveling.`;
  }

  try {
    // Get coordinates first
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(destination)}&limit=1&appid=${apiKey}`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.length) {
      return `Check weather forecasts for ${destination} before your trip.`;
    }

    const { lat, lon } = geoData[0];

    // Get 5-day forecast
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&cnt=5`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    if (weatherData.cod !== "200") {
      return `Seasonal weather expected in ${destination}.`;
    }

    const forecasts = weatherData.list.slice(0, 5).map((item: any) => {
      const temp = Math.round(item.main.temp);
      const desc = item.weather[0].description;
      const date = new Date(item.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      return `${date}: ${temp}°C, ${desc}`;
    });

    return `Weather forecast:\n${forecasts.join("\n")}`;
  } catch (error) {
    console.error("Weather API error:", error);
    return `Pack for varied weather conditions in ${destination}.`;
  }
}
