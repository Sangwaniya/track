"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { fetchBusRoutes } from '../api/fatchData';
import RouteCard from '../components/RouteCard';

export default function SearchPage() {
  const router = useRouter();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (fetchedRef.current) return; // Exit if we've already fetched

      const urlParams = new URLSearchParams(window.location.search);
      const sourceId = urlParams.get('source');
      const destinationId = urlParams.get('destination');

      if (!sourceId || !destinationId) {
        router.push('/');
        return;
      }

      try {
        setLoading(true);
        fetchedRef.current = true; // Mark as fetched before the API call
        const data = await fetchBusRoutes(sourceId, destinationId);
        setRoutes(data);
      } catch (err) {
        setError('Failed to fetch bus routes');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div><p className="text-[#201d27] text-4xl font-semibold tracking-tight text-center">Loading routes...</p></div>;
  }

  if (error) {
    if (error === "Failed to fetch bus routes") {
      return <div className="bg-gray-100 rounded-3xl shadow-xl text-[#201d27] text-4xl font-semibold tracking-tight">
        <p >No Internet!!</p>
        <p>Check your Connection.</p>
      </div>
    }
    return <div className='bg-gray-100 rounded-3xl shadow-xl text-[#201d27] text-4xl font-semibold tracking-tight'>
      <p>Try Again Later!!!</p>
      <p className='p-4 text-center text-red-500 text-md'>Error: {error}</p>
    </div>;
  }

  if (routes.message === "Routes Not found") {

    return <div className="flex justify-center items-center flex-col bg-gray-100 rounded-3xl shadow-xl p-4 text-[#201d27] text-4xl font-semibold tracking-tight">
      <p className='text-center mt-8'>You got us!!</p>
      <p className='pt-4'>No data available for this route, we keep on adding thousands of new routes.</p>
      <p className='p-4 text-center'>See you later ♡.</p>
      <div className=''>
        <button className='mt-4 p-4 font-light rounded-full bg-[#201d27] text-white text-lg tracking-normal' onClick={() => router.push('/')}>Search Different Route</button>
      </div>
    </div>
  }


  return (
    <div className='bg-gray-100 rounded-3xl shadow-sm'>
      <h1 className="p-4 pl-6 text-[#201d27] text-4xl font-semibold tracking-tight">Available Buses</h1>
      <div className="grid rounded-3xl bg-[#e4e4e4]">
        {routes.map((route) => (
          <RouteCard key={route.id} route={route} />
        ))}
      </div>
      <div className="p-4 px-6 text-[#201d27] text-xl font-light tracking-tight">Total {routes.length} {routes.length === 1 ? "bus" : "buses"} available for this route.</div>
    </div>
  );
}
