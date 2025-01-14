"use client";
import React, { useState, useEffect, use } from "react";
import { fetchPlaces } from "../api/fatchData"; // Custom hook to fetch and cache places
import PlaceSuggestions from "./PlaceSuggestions"; // Import the new component
import { useRouter } from "next/navigation";
import DateSelector from './DateSelector';

const BASE_URL = "https://sokibcw8dd.execute-api.us-east-1.amazonaws.com/dev";
const BusSearch = ({ handleSearch }) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const router = useRouter();
  const places = fetchPlaces();
  // const [places, setPlaces] = useState([]);

  // useEffect(() => {
  //   const fetchPlacesData = async () => {
  //     const data = await fetchPlaces("bussearch");
  //     setPlaces(data);
  //   };
  //   fetchPlacesData();
  // }, []);

  useEffect(() => {
    // Filter source suggestions
    if (source) {
      const filtered = places.filter((place) =>
        place.name.toLowerCase().includes(source.toLowerCase())
      );
      setSourceSuggestions(filtered);
    } else {
      setSourceSuggestions([]);
    }
  }, [source, places]);
  // useEffect(() => {
  //   async function fetchPlaces() {
  //     try {
  //       const response = await fetch(`${BASE_URL}/api/places`);
  //       const data = await response.json();
  //       setPlaces(data);
  //     } catch (error) {
  //       console.error('Error fetching places:', error);
  //     }
  //   }
  //   fetchPlaces(); // Ensure this is called only once when the component mounts
  // }, []);

  useEffect(() => {
    // Filter destination suggestions
    if (destination) {
      const filtered = places.filter((place) =>
        place.name.toLowerCase().includes(destination.toLowerCase())
      );
      setDestinationSuggestions(filtered);
    } else {
      setDestinationSuggestions([]);
    }
  }, [destination, places]);

  const handleSourceSelect = (place) => {
    setSource(place.name);  // Set the selected source
    setSourceSuggestions([]);  // Clear the suggestions after selection
  };

  const handleDestinationSelect = (place) => {
    setDestination(place.name);  // Set the selected destination
    setDestinationSuggestions([]);  // Clear the suggestions after selection
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sourceId = places.find((p) => p.name === source)?.id;
    const destinationId = places.find((p) => p.name === destination)?.id;
    if (sourceId && destinationId) {
      router.push(`/search?source=${sourceId}&destination=${destinationId}`);
    }

  };

  return (
    <div>
      <div className="pt-8 pb-6 px-8">
        <h1 className="text-[#201d27] text-4xl font-semibold tracking-tight">Get your Roadways</h1>
      </div>
      <DateSelector />
      <div className="rounded-3xl bg-[#e4e4e4] p-2">
        {/* Title Section */}
        {/* <form onSubmit={handleSubmit} className="min-h-screen bg-[#f0f0f0]"> */}
        <div className="relative">
          {/* <label className="block mb-2">Source:</label> */}
          <input
            type="text"
            className="w-full mt-4 px-8 py-5 bg-white rounded-full text-lg border-0 focus:ring-2 focus:ring-[#201d27] placeholder-gray-400 shadow-sm"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="From"
            minLength={3}
            required
          />
          {/* <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-5 h-5">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div> */}
          <PlaceSuggestions
            suggestions={sourceSuggestions}
            onSelect={handleSourceSelect}
          />
        </div>

        <div className="relative mt-4">
          {/* <label className="block mb-2">Destination:</label> */}
          <input
            type="text"
            className="w-full px-8 py-5 bg-white rounded-full text-lg border-0 focus:ring-2 focus:ring-[#201d27] placeholder-gray-400 shadow-sm"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
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
};

export default BusSearch;