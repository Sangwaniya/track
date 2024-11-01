"use client";
import { useRouter } from 'next/navigation';
import BusSearch from './components/BusSearch';

export default function HomePage() {
  const router = useRouter();
  const handleSearch = (selectedPlace) => {
    const { source, destination } = selectedPlace;
    if (source && destination) {
      router.push({
        pathname: `/search?source=${source}&destination=${destination}`,
        query: { source: routeData.source, destination: routeData.destination },
      });
    }
  }
  

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-4">Welcome to Bus Tracker</h1>
      <p className="text-center mb-8">Find the best routes and track buses in real-time!</p>
      {/* Bus search component */}
      <BusSearch onSubmit={handleSearch}  />
    </div>
  );
}
