import { useState } from "react";
import searchIcon from "../assets/images/icon-search.svg";
import loadingIcon from "../assets/images/icon-loading.svg";

export default function Search({
  onSearch,
  searchResults,
  showSearchResults,
  searchLoading,
  onLocationSelect,
  onCloseResults,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedSearch = searchTerm.trim();

    if (!trimmedSearch) {
      onCloseResults();
      return;
    }

    await onSearch(trimmedSearch);
  }

  function handleInputChange(event) {
    const newValue = event.target.value;

    setSearchTerm(newValue);

    if (!newValue.trim()) {
      onCloseResults();
    }
  }

  function handleLocationClick(location) {
    setSearchTerm(`${location.name}, ${location.country}`);
    onLocationSelect(location);
  }

  return (
    <div className="relative mx-auto max-w-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search for a location</span>

          <img
            src={searchIcon}
            alt=""
            className="absolute top-1/2 left-4 size-5 -translate-y-1/2"
          />

          <input
            type="search"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for a place..."
            autoComplete="off"
            className="w-full rounded-lg bg-[#262540] py-3 pr-4 pl-12 text-white outline-none placeholder:text-[#aba9c0] focus:ring-2 focus:ring-[#8a7dff]"
          />
        </label>

        <button
          type="submit"
          disabled={searchLoading}
          className="flex min-w-28 items-center justify-center gap-2 rounded-lg bg-[#4658d9] px-7 py-3 font-semibold transition hover:bg-[#5b6bea] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {searchLoading && (
            <img src={loadingIcon} alt="" className="size-5 animate-spin" />
          )}

          {searchLoading ? "Searching" : "Search"}
        </button>
      </form>

      {showSearchResults && (
        <div className="absolute top-full right-0 left-0 z-20 mt-2 overflow-hidden rounded-lg border border-white/10 bg-[#262540] shadow-xl">
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((location) => (
                <li key={location.id}>
                  <button
                    type="button"
                    onClick={() => handleLocationClick(location)}
                    className="w-full px-4 py-3 text-left transition hover:bg-[#34334d] focus:bg-[#34334d] focus:outline-none"
                  >
                    <span className="block font-medium">{location.name}</span>

                    <span className="block text-sm text-[#aba9c0]">
                      {[location.admin1, location.country]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-5 text-center text-[#aba9c0]">
              No locations found. Try another search.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
