export default async function handler(req, res) {
    const { source, destination } = req.query;
  
    try {
      const response = await fetch(`http://localhost:3000/search?source=${source}&destination=${destination}`);
      const routes = await response.json();
      res.status(200).json(routes);
    } catch (error) {
      console.error('Error fetching bus routes:', error);
      res.status(500).json({ message: 'Failed to fetch routes' });
    }
  }
  