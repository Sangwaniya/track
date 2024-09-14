import { useEffect } from 'react';

export default function Map({ busData }) {
  useEffect(() => {
    // Initialize map here (Google Maps, Mapbox, etc.)
    // Example: Update with bus locations on the map
  }, [busData]);

  return <div id="map" className="h-64 w-full bg-gray-300"></div>;
}
