import { useState, useEffect } from 'react';
// https://github.com/jagmitswami/roadways
const BASE_URL = 'https://sokibcw8dd.execute-api.us-east-1.amazonaws.com/dev'; 

export const fetchPlaces = (source) => {
  const [places, setPlaces] = useState([]);
  console.log(source);
    useEffect(() => {
      const fetchPlaces = async () => {
        const cached = localStorage.getItem('places');
        if (cached) {
          setPlaces(JSON.parse(cached));
        } else {
          const response = await fetch(`${BASE_URL}/api/places`);
          const data = await response.json();
          setPlaces(data);
          localStorage.setItem('places', JSON.stringify(data));
        }
      };
      fetchPlaces();
    }, []);
  
    return places;
};

export const fetchBusRoutes = async (source, destination) => {
  const response = await fetch(`${BASE_URL}/api/routes/search?source=${source}&destination=${destination}`);
  if (!response.ok) {
    throw new Error('Failed to fetch bus data');
  }
  return response.json();
};
