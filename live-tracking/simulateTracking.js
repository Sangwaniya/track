const buses = require("./data/buses.json");

function simulateTracking(busId) {
  const bus = buses.find((b) => b.id === parseInt(busId));
  if (!bus) return { error: "Bus not found" };

  // Simulate live updates
  const updatedStops = bus.stops.map((stop, index) => ({
    ...stop,
    liveLocation: {
      latitude: stop.place.latitude + Math.random() * 0.01,
      longitude: stop.place.longitude + Math.random() * 0.01
    }
  }));

  return { id: busId, stops: updatedStops };
}

module.exports = simulateTracking;
