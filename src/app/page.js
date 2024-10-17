"use client";
import BusSearch from './components/BusSearch';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-4">Welcome to Bus Tracker</h1>
      <p className="text-center mb-8">Find the best routes and track buses in real-time!</p>
      {/* Bus search component */}
      <BusSearch  />
    </div>
  );
}
