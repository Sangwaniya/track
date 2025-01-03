// In-memory store for live GPS data
const liveDataStore = {};

// Update live GPS data for a bus
function updateLiveData(busId, latitude, longitude) {
  liveDataStore[busId] = { latitude, longitude, updatedAt: new Date() };
}

// Get live GPS data for a bus
function getLiveData(busId) {
  return liveDataStore[busId] || null;
}

module.exports = { updateLiveData, getLiveData };
