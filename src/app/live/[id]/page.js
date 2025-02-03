"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams, useParams } from 'next/navigation';

const BASE_URL = "https://livebus-backend-rc8readx3-mohit-sangwans-projects.vercel.app/api/live";

export default function LivePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams();
    const previousPath = searchParams.get('previousPath');
    const routeId = params.id;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [locationDetails, setLocationDetails] = useState(null);
    const [liveRoute, setLiveRoute] = useState(null);
    
    const routeRef = useRef(null);
    const hasFetchedData = useRef(false);  // Use a ref to track fetch state

    useEffect(() => {
        // Only fetch if data hasn't been fetched yet
        if (hasFetchedData.current) return;
        hasFetchedData.current = true;

        fetchRouteData(routeId);
    }, [routeId]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (liveRoute) {
                fetchLiveRouteData();
            }
        }, 60000); // Update every minute

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [liveRoute]);

    const fetchRouteData = async (routeId) => {
        try {
            setLoading(true);
            const [routeResponse, liveResponse] = await Promise.all([
                fetch(`https://sokibcw8dd.execute-api.us-east-1.amazonaws.com/dev/api/routes/${routeId}`),
                fetch(`${BASE_URL}/${routeId}`)
            ]);

            if (!routeResponse.ok || !liveResponse.ok) {
                throw new Error("Failed to fetch data. Please try again.");
            }

            const routeData = await routeResponse.json();
            const liveData = await liveResponse.json();

            routeRef.current = routeData;
            setLiveRoute(liveData);

            if (liveData?.data?.Latitude && liveData?.data?.Longitude) {
                fetchAddress(liveData.data.Latitude, liveData.data.Longitude);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchLiveRouteData = async () => {
        try {
            const liveResponse = await fetch(`${BASE_URL}/${routeId}`);
            if (!liveResponse.ok) {
                throw new Error("Failed to fetch live route data.");
            }

            const liveData = await liveResponse.json();
            setLiveRoute(liveData);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchAddress = async (lat, lon) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            if (data.address) {
                setLocationDetails(data.display_name);
            }
        } catch (error) {
            console.error("Error fetching address:", error);
        }
    };

    const handleBack = () => {
        router.push(previousPath || '/');
    };

    const formatDateTime= (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
        });
      }

    if (loading) {
        return <div className="text-center mt-10">Loading route details...</div>;
    }

    const route = routeRef.current;

    return (
        <div className="bg-gray-100 rounded-3xl shadow-xl text-[#201d27]  tracking-tight flex items-center justify-center">
            <div className="p-6 w-full">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                    Live Route Details
                </h1>

                {/* Live Route Info */}
                {liveRoute.message === "Live data retrieved successfully" && (
                    <div className="mb-6">
                        <div className="font-medium text-[#201d27]">{liveRoute.message}</div>
                        {locationDetails && (
                            <div className="mt-2">
                                <span className="font-medium">Location : </span>
                                <p>{locationDetails}</p>
                            </div>
                        )}
                        <div className="mt-2">
                            <p className="font-medium">Time : {formatDateTime(liveRoute.data.TimeStamp)}</p>
                            <p className="text-sm font-light">Data will automatically update every minute.</p>
                        </div>
                    </div>
                )}
                {/* Manual Refresh Button */}
                {liveRoute.message === "No live data for the given RouteID" && (<div className="mt-6 flex justify-center items-center flex-col gap-4">
                    <p>No live data for this route. May be bus not started or no live data.</p>
                    <button onClick={fetchLiveRouteData} className="m-4 text-white bg-[#201d27] hover:bg-[#201d27]/90 focus:ring-4 focus:outline-none focus:ring-[#201d27]/50 font-medium rounded-3xl text-sm px-5 py-2.5 text-center">
                        Try again
                    </button>
                </div>)}

                {/* Route Stops */}
                {route && (
                    <div className="rounded-3xl bg-[#e4e4e4] p-4">
                        <h2 className="font-semibold text-lg">Scheduled Stops</h2>
                        <ul className="space-y-4 mt-4">
                            {route.stops.map((stop, index) => (
                                <li
                                    key={stop.id}
                                    className={`relative pl-8 ${index !== route.stops.length - 1 ? 'pb-4' : ''}`}
                                >
                                    {index !== route.stops.length - 1 && (
                                        <div className="absolute left-3 top-5 w-0.5 h-full bg-gray-200" />
                                    )}
                                    <div className="absolute left-2 top-2 w-2 h-2 rounded-full bg-[#201d27]" />
                                    <div>
                                        <span className="font-medium">{stop.place.name}</span>
                                        <p className="text-sm text-gray-600">{stop.place.location}</p>
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        Expected at:{" "}
                                        {new Date(stop.expectedAt * 1000).toLocaleTimeString('en-IN', {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: false,
                                            timeZone: 'Asia/Kolkata'
                                        })}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Back Button */}
                <div className="mt-6 flex justify-center">
                    <button onClick={handleBack} className="text-white bg-[#201d27] hover:bg-[#201d27]/90 focus:ring-4 focus:outline-none focus:ring-[#201d27]/50 font-medium rounded-3xl text-sm px-5 py-2.5 text-center">
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}
