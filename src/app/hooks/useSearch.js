import { useState, useEffect } from 'react';

const useSearch = (sourceId, destinationId) => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/search?source=${sourceId}&destination=${destinationId}`);
        const data = await response.json();
        setRoutes(data);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    if (sourceId && destinationId) {
      fetchRoutes();
    }
  }, [sourceId, destinationId]);

  return routes;
};

export default useSearch;
