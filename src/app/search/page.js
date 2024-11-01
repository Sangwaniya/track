"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { fetchBusRoutes } from '../api/fatchData';
import RouteCard from '../components/RouteCard';

export default function SearchPage() {
  const router = useRouter();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sourceId = urlParams.get('source');
    const destinationId = urlParams.get('destination');

    if (!sourceId || !destinationId) {
      router.push('/'); // Redirect to the home page if source or destination is not provided in the URL router.
      return;
    }
    try {
      const data = await fetchBusRoutes(sourceId, destinationId);
      setRoutes(data);
    } catch (err) {
      setError('Failed to fetch bus routes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading routes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Bus Routes</h1>
      <div className="grid gap-4">
        {routes.map((route) => (
          <RouteCard key={route.id} route={route} />
        ))}
      </div>
    </div>
  );
}
