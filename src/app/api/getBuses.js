const BASE_URL = 'http://http://localhost:8888'; 

export const fetchPlaces = async () => {
  const response = await fetch(`${BASE_URL}/api/places`); 
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch buses');
  }
  return response.json();
};

export const fetchRoutes = async (source, destination) => {
  const response = await fetch(`${BASE_URL}/api/search/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch bus data');
  }
  return response.json();
};
