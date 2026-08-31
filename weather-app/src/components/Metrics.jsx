export default function Metrics({ data }) {
  const current = data.current;
  const units = data.current_units;

  const metrics = [
    {
      label: "Feels Like",
      value: `${Math.round(current.apparent_temperature)}${
        units.apparent_temperature
      }`,
    },
    {
      label: "Humidity",
      value: `${current.relative_humidity_2m}${
        units.relative_humidity_2m
      }`,
    },
    {
      label: "Wind",
      value: `${Math.round(current.wind_speed_10m)} ${
        units.wind_speed_10m
      }`,
    },
    {
      label: "Precipitation",
      value: `${current.precipitation} ${units.precipitation}`,
    },
  ];

  return (
    <section
      className="grid grid-cols-2 gap-3 md:grid-cols-4"
      aria-label="Weather measurements"
    >
      {metrics.map((metric) => (
        <article
          key={metric.label}
          className="rounded-xl bg-[#262540] p-4"
        >
          <p className="text-sm text-[#c8c6d9]">{metric.label}</p>
          <p className="mt-4 text-2xl font-light">{metric.value}</p>
        </article>
      ))}
    </section>
  );
}