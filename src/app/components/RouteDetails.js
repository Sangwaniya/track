// src/app/components/RouteDetails.js
export default function RouteDetails({ stops }) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Route Details</h3>
      <ul className="mt-2">
        {stops.map((stop) => (
          <li key={stop.id} className="border-b py-2">
            <div>
              <span className="font-bold">{stop.place.name}</span> -{' '}
              <span className="text-sm text-gray-600">{stop.place.location}</span>
            </div>
            <div>
              Expected at: {new Date(stop.expectedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
