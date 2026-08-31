const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";

export async function fetchWeatherData(
  latitude,
  longitude,
  units = "metric",
  signal,
) {
  const parameters = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),

    current: [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
      "is_day",
    ].join(","),

    hourly: [
      "temperature_2m",
      "weather_code",
      "precipitation_probability",
    ].join(","),

    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_sum",
    ].join(","),

    timezone: "auto",
    forecast_days: "7",

    temperature_unit: units === "imperial" ? "fahrenheit" : "celsius",

    wind_speed_unit: units === "imperial" ? "mph" : "kmh",

    precipitation_unit: units === "imperial" ? "inch" : "mm",
  });

  const response = await fetch(`${FORECAST_URL}?${parameters}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch weather data.");
  }

  return response.json();
}

export async function searchLocations(searchTerm, signal) {
  const parameters = new URLSearchParams({
    name: searchTerm,
    count: "5",
    language: "en",
    format: "json",
  });

  const response = await fetch(`${GEOCODING_URL}?${parameters}`, { signal });

  if (!response.ok) {
    throw new Error("Failed to search for locations.");
  }

  const data = await response.json();

  return data.results ?? [];
}