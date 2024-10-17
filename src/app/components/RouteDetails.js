import React from 'react';

const RouteDetails = ({ stops }) => {
  return (
    <div className="space-y-4">
      {stops.map((stop, index) => (
        <div key={stop.id} className="border p-4 rounded shadow-sm">
          <h4 className="text-lg font-bold">{stop.place.name}</h4>
          <p>{stop.place.location}</p>
          <p>Expected Time: {new Date(stop.expectedAt).toLocaleTimeString()}</p>
          {index !== stops.length - 1 && (
            <p className="text-sm text-gray-500">Next stop in: {new Date(stops[index + 1].expectedAt).getTime() - new Date(stop.expectedAt).getTime()} minutes</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default RouteDetails;
