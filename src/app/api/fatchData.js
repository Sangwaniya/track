// import { useState, useEffect } from 'react';
// https://github.com/jagmitswami/roadways
const BASE_URL = 'https://sokibcw8dd.execute-api.us-east-1.amazonaws.com/dev'; 
const LiveAiUrl = 'https://livebus-backend-nocryhag8-mohit-sangwans-projects.vercel.app/api/live';


export const fetchBusRoutes = async (source, destination) => {
  const response = await fetch(`${BASE_URL}/api/routes/search?source=${source}&destination=${destination}`);
  if (!response.ok) {
    throw new Error('Failed to fetch bus data');
  }
  return response.json();
};

export const fetchLiveBusData = async (busId) => {
  const response = await fetch(`${LiveAiUrl}/${busId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch live bus data');
  }
  return response.json();
};