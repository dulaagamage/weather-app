import { useEffect, useRef, useState } from "react";

import logo from "../assets/images/logo.svg";
import unitsIcon from "../assets/images/icon-units.svg";
import dropdownIcon from "../assets/images/icon-dropdown.svg";
import checkmarkIcon from "../assets/images/icon-checkmark.svg";

export default function Header({ units, onUnitsChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function selectUnits(selectedUnits) {
    onUnitsChange(selectedUnits);
    setIsOpen(false);
  }

  return (
    <header className="flex items-center justify-between">
      <img src={logo} alt="Weather Now" className="w-36 sm:w-44" />

      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className="flex items-center gap-2 rounded-lg bg-[#262540] px-3 py-2 text-sm font-medium transition hover:bg-[#34334d]"
        >
          <img src={unitsIcon} alt="" className="size-4" />

          <span>Units</span>

          <img
            src={dropdownIcon}
            alt=""
            className={`size-3 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div
            role="menu"
            className="absolute top-full right-0 z-30 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#262540] p-2 shadow-2xl"
          >
            <p className="px-3 py-2 text-xs font-semibold tracking-wide text-[#aba9c0] uppercase">
              Measurement system
            </p>

            <button
              type="button"
              role="menuitem"
              onClick={() => selectUnits("metric")}
              className="flex w-full items-center rounded-lg px-3 py-3 text-left transition hover:bg-[#34334d]"
            >
              <span>
                <span className="block font-medium">Metric</span>

                <span className="block text-xs text-[#aba9c0]">
                  °C, km/h and mm
                </span>
              </span>

              {units === "metric" && (
                <img
                  src={checkmarkIcon}
                  alt="Selected"
                  className="ml-auto size-4"
                />
              )}
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => selectUnits("imperial")}
              className="flex w-full items-center rounded-lg px-3 py-3 text-left transition hover:bg-[#34334d]"
            >
              <span>
                <span className="block font-medium">Imperial</span>

                <span className="block text-xs text-[#aba9c0]">
                  °F, mph and inches
                </span>
              </span>

              {units === "imperial" && (
                <img
                  src={checkmarkIcon}
                  alt="Selected"
                  className="ml-auto size-4"
                />
              )}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
