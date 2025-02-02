"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BASE_URL = "https://livebus-backend-3gj7nf4q9-mohit-sangwans-projects.vercel.app/api/live";
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/reverse";
const ONE_KM = 0.01; // Approximate latitude/longitude difference for 1 km

export default function ContributePage({ routeId: propRouteId, routeDetails: propRouteDetails }) {
  const router = useRouter();
  const [routeId, setRouteId] = useState(propRouteId || null);
  const [routeDetails, setRouteDetails] = useState(propRouteDetails || []);
  const [location, setLocation] = useState(null);
  const [lastUpdateStatus, setLastUpdateStatus] = useState('Sending....');
  const [lastUpdateTime, setLastUpdateTime] = useState("Sending first request...");
  const [placeDetails, setPlaceDetails] = useState(null);
  const [error, setError] = useState(null);
  const [connectivity, setConnectivity] = useState(navigator.onLine);
  const [queue, setQueue] = useState([]);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [nextStop, setNextStop] = useState(null);
  let isFetching = false;

  // Get route ID and details from URL if not provided
  useEffect(() => {
    if (!routeId) {
      const urlParams = new URLSearchParams(window.location.search);
      setRouteId(urlParams.get('routeId'));
    }

    if (!routeDetails.length && routeId) {
      // Fetch route details based on routeId (mock or real API)
      fetch(`/api/routes/${routeId}`)
        .then((res) => res.json())
        .then((data) => setRouteDetails(data))
        .catch((err) => console.error("Failed to fetch route details:", err));
    }
  }, [routeId, routeDetails, router.query]);

  // Track connectivity changes
  useEffect(() => {
    const updateConnectivity = () => setConnectivity(navigator.onLine);
    window.addEventListener("online", updateConnectivity);
    window.addEventListener("offline", updateConnectivity);

    return () => {
      window.removeEventListener("online", updateConnectivity);
      window.removeEventListener("offline", updateConnectivity);
    };
  }, []);

  // Watch GPS location
  const fetchLocation = () => {
    setError(null); // Reset error state before retrying

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPermissionGranted(true);
          setLocation({ latitude, longitude, timestamp: new Date().toISOString() });
        },
        (err) => {
          setPermissionGranted(false);
          setError("Location permission denied. Please enable location services.");
        },
        { enableHighAccuracy: true }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);



  // Reverse Geocode Location
  useEffect(() => {
    const fetchPlaceDetails = async () => {
      if (!location) return;

      if (
        !placeDetails ||
        Math.abs(location.latitude - placeDetails.latitude) > ONE_KM ||
        Math.abs(location.longitude - placeDetails.longitude) > ONE_KM
      ) {
        try {
          const response = await fetch(
            `${NOMINATIM_URL}?lat=${location.latitude}&lon=${location.longitude}&format=json`
          );
          const data = await response.json();
          setPlaceDetails({
            ...data,
            latitude: location.latitude,
            longitude: location.longitude,
          });
        } catch (err) {
          console.error("Error fetching place details:", err);
        }
      }
    };

    fetchPlaceDetails();
  }, [location, placeDetails]);

  // Determine nearest stop and send PUT requests
  useEffect(() => {
    if (!location || !routeDetails.length) return;

    const nearestStop = routeDetails.find(
      (stop) =>
        Math.abs(location.latitude - stop.latitude) < ONE_KM &&
        Math.abs(location.longitude - stop.longitude) < ONE_KM
    );

    if (nearestStop) {
      // Simulate arrival and departure
      const arrivalTime = nearestStop.arrivalTime || new Date().toISOString();
      const departureTime = new Date(Date.now() + 60000).toISOString(); // Mock 1 min stop

      fetch(BASE_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          BusID: routeId,
          JourneyDate: new Date().toISOString().split("T")[0],
          ArrivalTime: arrivalTime,
          DepartureTime: departureTime,
          StopName: nearestStop.name,
          Latitude: nearestStop.latitude,
          Longitude: nearestStop.longitude,
        }),
      })
        .then((res) => {
          if (res.ok) {
            setLastUpdateStatus("success");
            setLastUpdateTime(new Date().toLocaleTimeString());
          } else {
            throw new Error("Failed to send stop data");
          }
        })
        .catch((err) => {
          setLastUpdateStatus("error");
          console.error("Error sending stop data:", err);
        });
    }
  }, [location, routeDetails, routeId]);

  // Post live data every 10 seconds
  // Define sendLiveData outside of useEffect so it can be accessed globally
  const sendLiveData = async () => {
    if (!routeId || !location || isFetching) return;
    isFetching = true;

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          BusID: routeId,
          TimeStamp: location.timestamp,
          Latitude: location.latitude,
          Longitude: location.longitude,
        }),
      });

      if (response.ok) {
        setLastUpdateStatus("success");
        setLastUpdateTime(new Date().toLocaleTimeString());
      } else {
        throw new Error("Failed to send live data");
      }
    } catch (err) {
      console.error("Error sending live data:", err);
      setLastUpdateStatus("error");
      setQueue((prevQueue) => [...prevQueue, location]); // Add to retry queue
    } finally {
      isFetching = false;
    }
  };

  // Now use sendLiveData inside useEffect
  useEffect(() => {
    const interval = setInterval(sendLiveData, 10000);
    return () => clearInterval(interval);
  }, [location, routeId]);


  // Retry queued requests when back online
  useEffect(() => {
    if (connectivity && queue.length > 0) {
      queue.forEach((queuedLocation) => {
        fetch(BASE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(queuedLocation),
        })
          .then((res) => {
            if (res.ok) {
              setQueue((prevQueue) => prevQueue.filter((loc) => loc !== queuedLocation));
            }
          })
          .catch((err) => console.error("Retry failed:", err));
      });
    }
  }, [connectivity, queue]);

  return (
    <div className="bg-gray-100 rounded-3xl shadow-xl text-[#201d27] text-center pb-8">
      <div className="pt-8 pb-6 px-6">
        <h1 className="text-4xl font-semibold tracking-tight">Contribute to Live Data</h1>
      </div>

      {/* Error Handling & Retry Button */}
      {error && (
        <div className="mt-4">
          <p className="text-red-500">{error}</p>
          {!permissionGranted && (
            <button
              onClick={fetchLocation}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Retry Location
            </button>
          )}
        </div>
      )}

      {/* Last Update & Status in a Row */}
      <div className="flex justify-center items-center mt-6 space-x-6">
        <p className="text-lg font-medium">Last update: {lastUpdateTime || "No updates yet."}</p>
        <p
          className={`text-lg font-medium ${lastUpdateStatus === "success" ? "text-green-600" : "text-red-600"
            }`}
        >
          {lastUpdateStatus === "success" ? "Success" : "Failed"}
        </p>
      </div>

      {/* Location Details */}
      {placeDetails && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Your Location</h2>
          <p className="text-gray-700">{placeDetails.display_name}</p>
        </div>
      )}

      {/* Live Data Submission */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Submit Live Data</h2>
        <p className="text-gray-600">Your current position will be shared in real-time.</p>
        <button
          onClick={sendLiveData} // Ensure this function sends the latest live data
          className="mt-3 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Submit Live Data
        </button>
      </div>

      {/* Route Data Submission */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Submit Route Data</h2>
        {routeDetails?.length > 0 ? (
          <>
            <p className="text-gray-600">Next Stop: {nextStop?.name || "Unknown"}</p>
            <p className="text-gray-600">Distance Remaining: {distanceToNextStop} km</p>
            <button
              onClick={sendRouteData} // Ensure this function sends route stop details
              className="mt-3 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Submit Route Data
            </button>
          </>
        ) : (
          <p className="text-red-500">No details available for this route.</p>
        )}
      </div>
    </div>
  );

}
