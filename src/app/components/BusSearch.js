"use client";  // Mark this component as a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation in the app directory

export default function BusSearch() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to search page with source and destination as query params
    router.push(`/search?source=${source}&destination=${destination}`);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
      <div className="mb-4">
        <label className="block mb-2">Source:</label>
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Destination:</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-800">
        Search Buses
      </button>
    </form>
  );
}
