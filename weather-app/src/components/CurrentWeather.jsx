import weatherBackground from "../assets/images/bg-today-large.svg";
import { getWeatherInfo } from "../utils/weatherCodes";

export default function CurrentWeather({ data, location }) {
  const current = data.current;
  const currentUnits = data.current_units;
  const weather = getWeatherInfo(current.weather_code);

  const formattedDate = new Date(current.time).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <section
      className="flex min-h-56 flex-col justify-between rounded-2xl bg-cover bg-center p-6 sm:flex-row sm:items-center"
      style={{ backgroundImage: `url(${weatherBackground})` }}
    >
      <div>
        <h2 className="text-2xl font-bold">{location.name}</h2>
        <p className="mt-2 text-white/80">{formattedDate}</p>
      </div>

      <div className="mt-8 flex items-center gap-4 sm:mt-0">
        <img
          src={weather.icon}
          alt={weather.description}
          className="size-24"
        />

        <p className="text-7xl font-semibold italic">
          {Math.round(current.temperature_2m)}
          {currentUnits.temperature_2m}
        </p>
      </div>
    </section>
  );
}