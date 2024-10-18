"use client";
import React, { useState, useEffect, use } from "react";
import usePlaces from "../api/places"; // Custom hook to fetch and cache places
import PlaceSuggestions from "./PlaceSuggestions"; // Import the new component

const BusSearch = ({ onSubmit }) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const places = usePlaces(); // Fetch and cache places data

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
    const selectedPlace = {
      source: places.find((p) => p.name === source)?.id,
      destination: places.find((p) => p.name === destination)?.id,
    };

    onSubmit(selectedPlace);

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <label className="block mb-2">Source:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Enter source"
        />
        <PlaceSuggestions
          suggestions={sourceSuggestions}
          onSelect={handleSourceSelect}
        />
      </div>

      <div className="relative mt-4">
        <label className="block mb-2">Destination:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter destination"
        />
        <PlaceSuggestions
          suggestions={destinationSuggestions}
          onSelect={handleDestinationSelect}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Search Buses
      </button>
    </form>
  );
};

export default BusSearch;
