export default async function handler(req, res) {
    const { source, destination } = req.query;
  
    // Example: Replace with a real API call to fetch bus data
    const busData = [
      { id: 1, seats: 15, liveLocation: { lat: 40.712776, lng: -74.005974 } },
      { id: 2, seats: 12, liveLocation: { lat: 40.73061, lng: -73.935242 } },
    ];
  
    res.status(200).json(busData);
  }
  