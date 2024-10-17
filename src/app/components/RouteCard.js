import React from 'react';

const RouteCard = ({ route }) => {
  const source = route.stops[0];
  const destination = route.stops[route.stops.length - 1];

  return (
    <div className="border p-4 rounded shadow-lg">
      <h3 className="text-lg font-bold">{source.place.name} to {destination.place.name}</h3>
      <p>Departure: {new Date(source.expectedAt).toLocaleTimeString()}</p>
      <p>Arrival: {new Date(destination.expectedAt).toLocaleTimeString()}</p>
    </div>
  );
};

export default RouteCard;
