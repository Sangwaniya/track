"use client";
import React, { useState, useEffect, use } from "react";
import {fetchPlaces} from "../api/fatchData"; // Custom hook to fetch and cache places
import PlaceSuggestions from "./PlaceSuggestions"; // Import the new component
import { useRouter } from "next/navigation";

// const fetchPlaces = async () => {
//   const response = await fetch('http://localhost:8888/api/places');
//   const data = await response.json();
//   return data;
// };
const BusSearch = ({ handleSearch }) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [places, setPlaces] = useState([]);
  const router = useRouter();
  // const data =  fetchPlaces().json();
  // setPlaces(data);

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
    async function fetchPlaces() {
      try {
        const response = await fetch('http://3.82.222.78:8080/api/places');
        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    }
    fetchPlaces(); // Ensure this is called only once when the component mounts
  }, []);

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
        onClick={handleSubmit}
      >
        Search Buses
      </button>
    </form>
  );
};

export default BusSearch;
