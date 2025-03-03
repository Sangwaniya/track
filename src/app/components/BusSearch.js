"use client";
import React, { useState, useEffect, useCallback } from "react";
import PlaceSuggestions from "./PlaceSuggestions";
import { useRouter } from "next/navigation";
import DateSelector from "./DateSelector";
import debounce from "lodash.debounce";

const BASE_URL = "https://sokibcw8dd.execute-api.us-east-1.amazonaws.com/dev";

export default function BusSearch() {
  // console.log("Rendering BusSearch...");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [places, setPlaces] = useState([]);
  const router = useRouter();

  // Fetch places on initial render
  useEffect(() => {
    const fetchPlaces = async () => {
      // console.log("Fetching places...");
      const cached = localStorage.getItem("places");
      if (cached) {
        setPlaces(JSON.parse(cached));
      } else {
        try {
          const response = await fetch(`${BASE_URL}/api/places`);
          const data = await response.json();
          setPlaces(data);
          localStorage.setItem("places", JSON.stringify(data));
        } catch (error) {
          console.error("Error fetching places:", error);
        }
      }
    };
  
    if (places.length === 0) {
      fetchPlaces();
    }
  }, [places]);
  

  // Filter suggestions for source and destination
  const debouncedFilterSuggestions = useCallback(
    debounce((query, setSuggestions) => {
      // console.log("Filtering suggestions...");
      if (query) {
        const filtered = places.filter((place) =>
          place.location.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filtered);
      } else {
        setSuggestions([]);
      }
    }, 300),
    [places]
  );
  

  // Handle source input change
  const handleSourceChange = (e) => {
    // console.log("Handling source change...");
    const value = e.target.value;
    setSource(value);
    debouncedFilterSuggestions(value, setSourceSuggestions);
  };

  // Handle destination input change
  const handleDestinationChange = (e) => {
    // console.log("Handling destination change...");
    const value = e.target.value;
    setDestination(value);
    debouncedFilterSuggestions(value, setDestinationSuggestions);
  };

  // Handle source selection
  const handleSourceSelect = (place) => {
    // console.log("Handling source select...");
    setSource(place);
    setSourceSuggestions([]);
  };

  // Handle destination selection
  const handleDestinationSelect = (place) => {
    // console.log("Handling destination select...");
    setDestination(place);
    setDestinationSuggestions([]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    // console.log("Handling form submit...");
    e.preventDefault();
    if (source.id && destination.id) {
      router.push(`/search?source=${source.id}&destination=${destination.id}`);
    } else {
      showToast('Select stops from list.');
    }
  };

  return (
    <div>
      <div className="pt-8 pb-6 px-6">
        <h1 className="text-[#201d27] text-4xl font-semibold tracking-tight">
          Search Roadways
        </h1>
      </div>
      <DateSelector />
      <div className="rounded-3xl bg-[#e4e4e4] p-2">
        <div className="relative">
          <input
            type="text"
            className="w-full mt-4 px-8 py-5 bg-white rounded-full text-lg border-0 focus:ring-2 focus:ring-[#201d27] placeholder-gray-400 shadow-sm"
            value={source.location}
            onChange={handleSourceChange}
            placeholder="From"
            minLength={3}
            required
          />
          <PlaceSuggestions
            suggestions={sourceSuggestions}
            onSelect={handleSourceSelect}
          />
        </div>

        <div className="relative mt-4">
          <input
            type="text"
            className="w-full px-8 py-5 bg-white rounded-full text-lg border-0 focus:ring-2 focus:ring-[#201d27] placeholder-gray-400 shadow-sm"
            value={destination.location}
            onChange={handleDestinationChange}
            placeholder="To..."
            minLength={3}
            required
          />
          <PlaceSuggestions
            suggestions={destinationSuggestions}
            onSelect={handleDestinationSelect}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#201d27] mb-4 text-white py-4 rounded-full text-lg font-medium hover:bg-opacity-90 transition-colors mt-6 shadow-sm"
          onClick={handleSubmit}
        >
          Search Buses
        </button>
      </div>
    </div>
  );
}

export function showToast(message, bgColor) {
  const toast = document.createElement('div');
  toast.className = 'fixed top-0 left-1/2 transform -translate-x-1/2 p-4 m-2 text-white rounded-3xl animate-toast-in';
  toast.textContent = message;
  toast.style.backgroundColor = bgColor ? bgColor : '#201d27';
  document.body.appendChild(toast);
  setTimeout(() => {
    document.body.removeChild(toast);
  }, 2500);
}

