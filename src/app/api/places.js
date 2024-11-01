import { useState, useEffect } from 'react';

const usePlaces = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const cached = localStorage.getItem('places');
      if (cached) {
        setPlaces(JSON.parse(cached));
      } else {
        const response = await fetch('http://3.82.222.78:8080/api/places');
        const data = await response.json();
        setPlaces(data);
        localStorage.setItem('places', JSON.stringify(data));
      }
    };
    fetchPlaces();
  }, []);

  return places;
};

export default usePlaces;
