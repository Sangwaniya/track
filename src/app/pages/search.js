import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Map from '../components/Map';

export default function SearchResults() {
  const router = useRouter();
  const { source, destination } = router.query;
  const [busData, setBusData] = useState([]);

  useEffect(() => {
    if (source && destination) {
      // Fetch bus data from a live API
      fetch(`/api/getBuses?source=${source}&destination=${destination}`)
        .then((res) => res.json())
        .then((data) => setBusData(data));
    }
  }, [source, destination]);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-xl font-semibold text-center mb-4">
        Buses from {source} to {destination}
      </h2>
      <Map busData={busData} />
      <div className="mt-4">
        {busData.length ? (
          busData.map((bus, index) => (
            <div key={index} className="p-4 bg-white shadow-md mb-2">
              <h3>Bus #{bus.id}</h3>
              <p>Available Seats: {bus.seats}</p>
            </div>
          ))
        ) : (
          <p>No buses found</p>
        )}
      </div>
    </div>
  );
}
