import { useEffect, useState } from "react";

import Header from "./components/Header";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather";
import Metrics from "./components/Metrics";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import LoadingState from "./components/LoadingState";
import { fetchWeatherData, searchLocations } from "./services/openMeteo";

const DEFAULT_LOCATION = {
  name: "Berlin, Germany",
  latitude: 52.52,
  longitude: 13.405,
};

export default function App() {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [weatherData, setWeatherData] = useState(null);
  const [units, setUnits] = useState("metric");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDay, setSelectedDay] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

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

    return () => {
      controller.abort();
    };
  }, [location, units]);

  async function handleSearch(searchTerm) {
    setSearchLoading(true);

    try {
      const results = await searchLocations(searchTerm);

      setSearchResults(results);
      setShowSearchResults(true);
    } catch (searchError) {
      console.error(searchError);

      setSearchResults([]);
      setShowSearchResults(true);
    } finally {
      setSearchLoading(false);
    }
  }

  function handleLocationSelect(locationData) {
    const locationName = [
      locationData.name,
      locationData.admin1,
      locationData.country,
    ]
      .filter(Boolean)
      .join(", ");

    setLocation({
      name: locationName,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    });

    setSelectedDay(0);
    setShowSearchResults(false);
  }

  if (loading && !weatherData) {
    return <LoadingState />;
  }

  if (error && !weatherData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#02012c] p-6 text-center text-white">
        <div>
          <h1 className="text-3xl font-bold">Something went wrong</h1>
          <p className="mt-3 text-[#aba9c0]">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#02012c] text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Header units={units} onUnitsChange={setUnits} />

        <main>
          <h1 className="mt-14 mb-12 text-center text-4xl font-bold md:text-5xl">
            How’s the sky looking today?
          </h1>

          <Search
            onSearch={handleSearch}
            searchResults={searchResults}
            showSearchResults={showSearchResults}
            searchLoading={searchLoading}
            onLocationSelect={handleLocationSelect}
            onCloseResults={() => setShowSearchResults(false)}
          />

          {weatherData && (
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <CurrentWeather data={weatherData} location={location} />

                <Metrics data={weatherData} />

                <DailyForecast
                  data={weatherData}
                  selectedDay={selectedDay}
                  onDaySelect={setSelectedDay}
                />
              </div>

              <HourlyForecast
                data={weatherData}
                selectedDay={selectedDay}
                onDayChange={setSelectedDay}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
