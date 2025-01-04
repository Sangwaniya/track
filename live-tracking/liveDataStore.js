const inMemoryData = {};

/**
 * Updates live data and checks for stop conditions.
 * @param {string} BusID
 * @param {string} TimeStamp
 * @param {string} Latitude
 * @param {string} Longitude
 * @returns {Object|null} Stop data if a stop is detected, null otherwise.
 */
// function updateLiveData(BusID, TimeStamp, Latitude, Longitude) {
//   const currentTimestamp = new Date(TimeStamp);
//   const busData = inMemoryData[BusID] || { lastLocation: null, stops: [] };

//   // Check if the bus is stopping
//   if (
//     busData.lastLocation &&
//     getDistance(busData.lastLocation, { Latitude, Longitude }) < 3
//   ) {
//     const stopDuration = (currentTimestamp - busData.lastLocation.timestamp) / 1000;

//     if (stopDuration >= 10) {
//       const stopData = {
//         BusID,
//         JourneyDate: new Date().toISOString().split("T")[0],
//         StopName: "Place Name", // Use external service like Nominatim to fetch stop name
//         Latitude,
//         Longitude,
//         ArrivalTime: busData.lastLocation.timestamp.toISOString(),
//         DepartureTime: currentTimestamp.toISOString(),
//       };

//       busData.stops.push(stopData);
//       inMemoryData[BusID] = busData;

//       return stopData;
//     }
//   }

//   // Update live data
//   busData.lastLocation = {
//     Latitude,
//     Longitude,
//     timestamp: currentTimestamp,
//   };

//   inMemoryData[BusID] = busData;
//   return null;
// }

export function updateLiveData(BusID, TimeStamp, Latitude, Longitude) {
  inMemoryData[BusID] = {
    BusID,
    TimeStamp,
    Latitude,
    Longitude,
  }
  return null;
}

/**
 * Saves stop data to Google Sheets.
 * @param {Object} sheets Google Sheets instance
 * @param {string} sheetId Google Sheet ID
 * @param {string} range Google Sheet range
 * @param {Array} data Stop data to append
 */
export async function saveStopDataToSheet(sheets, sheetId, range, data) {
  const resource = {
    values: [data],
  };

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    resource,
  });
}

/**
 * Calculates distance between two locations (in meters).
 * @param {Object} loc1 { Latitude, Longitude }
 * @param {Object} loc2 { Latitude, Longitude }
 * @returns {number} Distance in meters
 */
// function getDistance(loc1, loc2) {
//   const toRad = (value) => (value * Math.PI) / 180;

//   const R = 6371e3; // Earth's radius in meters
//   const φ1 = toRad(loc1.Latitude);
//   const φ2 = toRad(loc2.Latitude);
//   const Δφ = toRad(loc2.Latitude - loc1.Latitude);
//   const Δλ = toRad(loc2.Longitude - loc1.Longitude);

//   const a =
//     Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//     Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   return R * c;
// }

// Retrieve live data by BusID
// ...

// ...

export function getLiveData(BusID) {
  return inMemoryData[BusID] || null;
}

// export default { updateLiveData, saveStopDataToSheet };