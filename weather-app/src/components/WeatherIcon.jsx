import { getWeatherInfo } from "../utils/weatherCodes";

const sizeClasses = {
  small: "size-8",
  medium: "size-12",
  large: "size-24",
};

export default function WeatherIcon({
  code,
  size = "medium",
}) {
  const weather = getWeatherInfo(code);

  return (
    <img
      src={weather.icon}
      alt={weather.description}
      title={weather.description}
      className={`block ${sizeClasses[size] ?? sizeClasses.medium}`}
    />
  );
}
