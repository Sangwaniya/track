import { useState, useEffect } from 'react';

const usePlaces = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const cached = localStorage.getItem('places');
      if (cached) {
        setPlaces(JSON.parse(cached));
      } else {
        const response = await fetch('https://sokibcw8dd.execute-api.us-east-1.amazonaws.com/dev/api/places');
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
