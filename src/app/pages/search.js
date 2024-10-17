import { useRouter } from 'next/router';
import { useState } from 'react';
import useSearch from '../hooks/useSearch';
import RouteCard from '../components/RouteCard';
import RouteDetails from '../components/RouteDetails';

const SearchPage = () => {
  const router = useRouter();
  const { source, destination } = router.query; // Get source and destination from query params
  const [selectedRoute, setSelectedRoute] = useState(null); // To show detailed stops when a route is clicked
  const routes = useSearch(source, destination); // Fetch routes based on source and destination

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>

      {!selectedRoute ? (
        <div className="space-y-4">
          {routes.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              onSelect={() => setSelectedRoute(route)} // On clicking a route, show its details
            />
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedRoute(null)}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Back to Routes
          </button>
          <RouteDetails stops={selectedRoute.stops} />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
