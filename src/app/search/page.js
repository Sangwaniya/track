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
      setLoading(true);
      const data = await fetchBusRoutes(sourceId, destinationId);
      setRoutes(data);
    } catch (err) {
      setError('Failed to fetch bus routes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect called');
    fetchData();

  }, []);

  if (loading) {
    return <div><p className="text-[#201d27] text-4xl font-semibold tracking-tight">Loading routes...</p></div>;
  }

  if (error) {
    // if(error === 'Failed to fetch bus routes') {
    //   return <div className="text-[#201d27] text-4xl font-semibold tracking-tight">
    //     <p >No Internet!!</p>
    //     <p>Check your Connection.</p>
    //     </div>
    // }
    return <div className="text-[#201d27] text-4xl font-semibold tracking-tight">
      <p className='text-center mt-10'>You got us!!</p>
      <p className='p-4 text-centre'>No data available for this route, we keep on adding thousands of routes.</p>
      <p className='p-4 text-center'>See you later ♡</p>
    </div>
  }

  return (
    <div className='bg-gray-100 rounded-3xl shadow-sm'>
      <h1 className="p-4 pl-6 text-[#201d27] text-4xl font-semibold tracking-tight">Available Buses</h1>
      <div className="grid gap-4 rounded-3xl bg-[#e4e4e4]">
        {routes.map((route) => (
          <RouteCard key={route.id} route={route} />
        ))}
      </div>
      <div className="p-4 px-6 text-[#201d27] text-xl font-light tracking-tight">Total {routes.length} {routes.length === 1 ? "bus" : "buses"} available for this route.</div>
    </div>
  );
}
