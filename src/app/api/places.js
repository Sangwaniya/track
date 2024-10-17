export default async function handler(req, res) {
    try {
      const response = await fetch('http://localhost:8888/api/places');
      const places = await response.json();
      res.status(200).json(places);
    } catch (error) {
      console.error('Error fetching places:', error);
      res.status(500).json({ message: 'Failed to fetch places' });
    }
  }
  