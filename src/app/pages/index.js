"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import BusSearch from '../components/BusSearch';

export default function HomePage() {
  handleSubmit = (e) => {
    e.preventDefault();
    if (source && destination) {
      const sourceId = places.find((p) => p.name === source)?.id;
      const destinationId = places.find((p) => p.name === destination)?.id;
      if (sourceId && destinationId) {
        const routes = useSearch(sourceId, destinationId);
        return routes;
      }
    }
  }



  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-4">Welcome to Bus Tracker</h1>
      <p className="text-center mb-8">Find the best routes and track buses in real-time!</p>
      {/* Bus search component */}
      <BusSearch onSubmit={handleSearch} />
    </div>
  );
}
