# Weather App

A responsive weather application built as a solution to the [Frontend Mentor Weather App challenge](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49).

The application uses live data from Open-Meteo to display current conditions, weather measurements, a seven-day forecast, and hourly forecasts for searched locations.

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Links](#links)
- [Built with](#built-with)
- [What I learned](#what-i-learned)
- [Continued development](#continued-development)
- [Running locally](#running-locally)
- [AI collaboration](#ai-collaboration)
- [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

This project recreates the supplied Frontend Mentor desktop and mobile designs using React and Tailwind CSS.

Weather data is requested from the Open-Meteo Forecast API. The Open-Meteo Geocoding API converts location searches into the coordinates required for forecast requests.

## Features

Users can:

- Search for weather information by location
- Select the correct place from matching search results
- View the current temperature, weather condition, date, and location
- View the feels-like temperature, humidity, wind speed, and precipitation
- Browse a seven-day weather forecast
- View daily maximum and minimum temperatures
- View hourly weather conditions for a selected day
- Switch between days using the hourly forecast selector
- Switch between Metric and Imperial measurement systems
- View weather icons based on WMO weather codes
- View loading, no-results, and API error states
- Navigate interactive controls using a keyboard
- Use the application across mobile and desktop screen sizes
- See hover and focus states for interactive elements

## Screenshots

### Desktop view

![Desktop view of the Weather App](./weather-app/src/assets/images/desktop-view.png)

### Mobile view

![Mobile view of the Weather App](./weather-app/src/assets/images/mobile-view.png)

## Links

- GitHub repository: [github.com/dulaagamage/weather-app](https://github.com/dulaagamage/weather-app)
- Live site: Not deployed yet
- Frontend Mentor solution: Not submitted yet

## Built with

- Semantic HTML5 markup
- React 19
- JavaScript modules
- Vite 8
- Tailwind CSS 4
- ESLint
- CSS Grid
- Flexbox
- Mobile-first responsive design
- Open-Meteo Forecast API
- Open-Meteo Geocoding API
- Fetch API
- Local variable fonts
- Git and GitHub

## What I learned

This project helped me improve my understanding of React state management, effects, reusable components, external API integration, and responsive interface development.

### Loading external data

I learned how to request new weather data whenever the selected location or measurement system changes:

```jsx
useEffect(() => {
  const controller = new AbortController();

  async function loadWeatherData() {
    setLoading(true);
    setError("");

    try {
      const data = await fetchWeatherData(
        location.latitude,
        location.longitude,
        units,
        controller.signal,
      );

      setWeatherData(data);
    } catch (requestError) {
      if (requestError.name !== "AbortError") {
        setError("Unable to load the weather forecast.");
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }

  loadWeatherData();

  return () => controller.abort();
}, [location, units]);
```

Using `AbortController` prevents an outdated request from replacing newer weather information.

### Transforming API data

Open-Meteo returns forecast information as parallel arrays. I transformed those arrays into objects that were easier to render:

```js
const forecast = data.daily.time.map((date, index) => ({
  date,
  weatherCode: data.daily.weather_code[index],
  maximum: data.daily.temperature_2m_max[index],
  minimum: data.daily.temperature_2m_min[index],
}));
```

### Reusable weather icons

I created a weather-code utility that maps WMO weather codes to readable descriptions and local weather icons. The same mapping is reused for current, daily, and hourly conditions.

### Shared application state

I practiced sharing location, unit, weather, and selected-day state between components while keeping API and formatting logic in separate modules.

## Continued development

Future improvements may include:

- Adding a retry button to the API error state
- Saving the selected measurement system between visits
- Saving recently searched locations
- Adding favourite locations
- Using the browser’s current location
- Improving keyboard navigation within custom menus
- Adding automated component and API-service tests
- Performing screen-reader and accessibility testing
- Displaying sunrise and sunset information
- Adding light and dark themes
- Caching previous weather requests

## Running locally

Clone the repository:

```bash
git clone https://github.com/dulaagamage/weather-app.git
```

Enter the React project directory:

```bash
cd weather-app/weather-app
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local address displayed by Vite, usually:

```text
http://localhost:5173/
```

Run ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## AI collaboration

ChatGPT was used as a learning and debugging assistant during this project.

AI assistance helped with:
- Debugging
- Understanding React concepts and best practices
- Providing solutions to complex problems

AI assistance was used primarily for debugging and improving error handling. It helped identify implementation issues, interpret error messages, and review how the application responds to failed API requests and unexpected states. Suggestions were reviewed and tested before being incorporated into the project.

## Useful resources

- [Frontend Mentor challenge](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49)
- [React documentation](https://react.dev/learn)
- [Vite documentation](https://vite.dev/)
- [Tailwind CSS documentation](https://tailwindcss.com/docs)
- [Open-Meteo Forecast API](https://open-meteo.com/en/docs)
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## Author

- Frontend Mentor: [@dulaagamage](https://www.frontendmentor.io/profile/dulaagamage)
- GitHub: [@dulaagamage](https://github.com/dulaagamage)
- LinkedIn: [Dulanjalee Gamage](https://www.linkedin.com/in/dulanjalee-gamage-01a7aa207/)

## Acknowledgments

Thanks to [Frontend Mentor](https://www.frontendmentor.io/) for providing the challenge, design files, and project requirements.

Weather forecasts and location-search data are provided by [Open-Meteo](https://open-meteo.com/).

Implementation guidance was also gained from the [Frontend Mentor Weather App walkthrough](https://www.youtube.com/watch?v=lY-ChNK3lB4).