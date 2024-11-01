const BASE_URL = 'http://3.82.222.78:8080'; 

export const fetchPlaces = async () => {
  const response = await fetch(`${BASE_URL}/api/places`); 
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch buses');
  }
  return response.json();
};

export const fetchBusRoutes = async (source, destination) => {
  const response = await fetch(`${BASE_URL}/api/routes/search?source=${source}&destination=${destination}`);
  if (!response.ok) {
    throw new Error('Failed to fetch bus data');
  }
  return response.json();
};
