import sunnyIcon from "../assets/images/icon-sunny.webp";
import partlyCloudyIcon from "../assets/images/icon-partly-cloudy.webp";
import overcastIcon from "../assets/images/icon-overcast.webp";
import fogIcon from "../assets/images/icon-fog.webp";
import drizzleIcon from "../assets/images/icon-drizzle.webp";
import rainIcon from "../assets/images/icon-rain.webp";
import snowIcon from "../assets/images/icon-snow.webp";
import stormIcon from "../assets/images/icon-storm.webp";

export function getWeatherInfo(code) {
  if (code === 0) {
    return {
      description: "Clear sky",
      icon: sunnyIcon,
    };
  }

  if ([1, 2].includes(code)) {
    return {
      description: "Partly cloudy",
      icon: partlyCloudyIcon,
    };
  }

  if (code === 3) {
    return {
      description: "Overcast",
      icon: overcastIcon,
    };
  }

  if ([45, 48].includes(code)) {
    return {
      description: "Fog",
      icon: fogIcon,
    };
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return {
      description: "Drizzle",
      icon: drizzleIcon,
    };
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return {
      description: "Rain",
      icon: rainIcon,
    };
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return {
      description: "Snow",
      icon: snowIcon,
    };
  }

  if ([95, 96, 99].includes(code)) {
    return {
      description: "Thunderstorm",
      icon: stormIcon,
    };
  }

  return {
    description: "Unknown weather",
    icon: overcastIcon,
  };
}
