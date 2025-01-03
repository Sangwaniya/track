const express = require('express');
const { Pool } = require('pg');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

// Database connection pool
const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bus_tracking',
    password: 'password',
    port: 5432,
});

// In-memory storage for tracking stop states
const liveBusData = new Map(); // { busId: { latitude, longitude, stopState: { placeName, arrivalTime } } }

// Utility: Reverse geocode latitude and longitude
async function getPlaceName(latitude, longitude) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const data = await response.json();
        return data.display_name || 'Unknown Location';
    } catch (err) {
        console.error('Error fetching place name:', err);
        return 'Unknown Location';
    }
}

// POST / to track live GPS data
module.exports = async (req, res) => {
    const { busId, latitude, longitude } = req.body;

    if (!busId || !latitude || !longitude) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newEntry = { latitude, longitude, timestamp: Date.now() };

    // Check if bus exists in liveBusData
    if (liveBusData.has(busId)) {
        const prevEntry = liveBusData.get(busId);
        const distance = Math.sqrt(
            Math.pow(prevEntry.latitude - latitude, 2) +
            Math.pow(prevEntry.longitude - longitude, 2)
        ) * 111139; // Approx meters

        // If within 3 meters
        if (distance <= 3) {
            if (!prevEntry.stopState || !prevEntry.stopState.arrivalTime) {
                // Mark arrival time
                const placeName = await getPlaceName(latitude, longitude);
                liveBusData.set(busId, {
                    ...newEntry,
                    stopState: {
                        placeName,
                        arrivalTime: new Date(),
                    },
                });
            }
        } else if (prevEntry.stopState && prevEntry.stopState.arrivalTime) {
            // Mark departure time
            const departureTime = new Date();

            // Save to DB
            const { placeName, arrivalTime } = prevEntry.stopState;
            await db.query(
                `INSERT INTO bus_stop_logs (bus_id, latitude, longitude, place_name, arrival_time, departure_time)
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [busId, latitude, longitude, placeName, arrivalTime, departureTime]
            );

            // Clear stop state
            liveBusData.set(busId, { ...newEntry, stopState: null });
        }
    } else {
        // Add new bus entry
        liveBusData.set(busId, newEntry);
    }

    res.status(200).json({ message: 'GPS data processed successfully' });
}

// Start server
// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });


// 2. Provide live GPS data for a specific bus
// router.get("/:busId", (req, res) => {
//   const { busId } = req.params;
//   const liveData = liveBusData[busId];

//   if (!liveData) {
//     return res.status(404).json({ error: "No live data found for the specified bus." });
//   }

//   res.json({ busId, ...liveData });
// });

// module.exports = router;

// app.get('/:busId', (req, res) => {
//     const { busId } = req.params;

//     if (!liveBusData.has(busId)) {
//         return res.status(404).json({ error: 'No live data found for this bus' });
//     }

//     return res.status(200).json(liveBusData.get(busId));
// });

