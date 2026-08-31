export function getDayName(dateString, format = "short") {
  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));

  return new Intl.DateTimeFormat("en-US", {
    weekday: format,
    timeZone: "UTC",
  }).format(date);
}

export function formatHour(dateTimeString) {
  const time = dateTimeString.split("T")[1];
  const hour = Number(time.split(":")[0]);

  const date = new Date(Date.UTC(2000, 0, 1, hour));

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: true,
    timeZone: "UTC",
  }).format(date);
}
