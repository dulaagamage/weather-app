import WeatherIcon from "./WeatherIcon";
import { getDayName } from "../utils/formatters";

export default function DailyForecast({
  data,
  selectedDay,
  onDaySelect,
}) {
  const daily = data.daily;
  const units = data.daily_units;

  const forecast = daily.time.map((date, index) => ({
    date,
    weatherCode: daily.weather_code[index],
    maximum: daily.temperature_2m_max[index],
    minimum: daily.temperature_2m_min[index],
  }));

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">
        Daily forecast
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {forecast.map((day, index) => (
          <button
            type="button"
            key={day.date}
            onClick={() => onDaySelect(index)}
            aria-pressed={selectedDay === index}
            className={`rounded-xl p-3 text-center transition ${
              selectedDay === index
                ? "bg-[#4658d9]"
                : "bg-[#262540] hover:bg-[#34334d]"
            }`}
          >
            <p className="font-medium">
              {getDayName(day.date)}
            </p>

            <div className="my-3 flex justify-center">
              <WeatherIcon
                code={day.weatherCode}
                size="medium"
              />
            </div>

            <div className="flex justify-between text-sm">
              <span>
                {Math.round(day.maximum)}
                {units.temperature_2m_max}
              </span>

              <span className="text-[#c8c6d9]">
                {Math.round(day.minimum)}
                {units.temperature_2m_min}
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}