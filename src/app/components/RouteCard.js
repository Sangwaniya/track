// src/app/components/RouteCard.js
import { useState } from 'react';
import RouteDetails from './RouteDetails';

export default function RouteCard({ route }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const firstStop = route.stops[0];
  const lastStop = route.stops[route.stops.length - 1];
  const travelTime = new Date(lastStop.expectedAt) - new Date(firstStop.expectedAt);

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m`;
  };

  return (
    <div className="border p-4 rounded-md shadow-md">
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold">{firstStop.place.name} - {lastStop.place.name}</h2>
          <p>{formatTime(firstStop.expectedAt)} - {formatTime(lastStop.expectedAt)}</p>
        </div>
        <div>
          <p>Duration: {formatDuration(travelTime)}</p>
        </div>
      </div>
      <button
        className="mt-4 text-blue-500 underline"
        onClick={toggleDetails}
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && <RouteDetails stops={route.stops} />}
    </div>
  );
}
