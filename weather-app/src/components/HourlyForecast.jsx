import WeatherIcon from "./WeatherIcon";
import { formatHour, getDayName } from "../utils/formatters";

export default function HourlyForecast({ data, selectedDay, onDayChange }) {
  const selectedDate = data.daily.time[selectedDay];

  const selectedHours = data.hourly.time
    .map((time, index) => ({
      time,
      temperature: data.hourly.temperature_2m[index],
      weatherCode: data.hourly.weather_code[index],
    }))
    .filter((hour) => hour.time.startsWith(selectedDate));

  const visibleHours =
    selectedDay === 0
      ? selectedHours
          .filter((hour) => hour.time >= data.current.time)
          .slice(0, 8)
      : selectedHours.slice(0, 8);

  return (
    <aside className="rounded-xl bg-[#262540] p-4 lg:sticky lg:top-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-semibold">Hourly forecast</h2>

        <label>
          <span className="sr-only">Select forecast day</span>

          <select
            value={selectedDay}
            onChange={(event) => onDayChange(Number(event.target.value))}
            className="rounded-lg bg-[#34334d] px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[#8a7dff]"
          >
            {data.daily.time.map((date, index) => (
              <option key={date} value={index}>
                {getDayName(date, "long")}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="space-y-3">
        {visibleHours.map((hour) => (
          <article
            key={hour.time}
            className="flex items-center rounded-lg bg-[#34334d] p-3"
          >
            <WeatherIcon code={hour.weatherCode} size="small" />

            <p className="ml-3 font-medium">{formatHour(hour.time)}</p>

            <p className="ml-auto">{Math.round(hour.temperature)}°</p>
          </article>
        ))}
      </div>
    </aside>
  );
}
