"use client";
import React, { useState, useEffect } from "react";
// import RouteDetails from "./components/RouteDetails";

const BASE_URL =
    "https://livebus-backend-rc8readx3-mohit-sangwans-projects.vercel.app/api/live";

export default function LivePage({ routeId }) {
    const [routeData, setRouteData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    if (!routeId) {
        const urlParams = new URLSearchParams(window.location.search);
        routeId = urlParams.get('live');

        if (!routeId) {
            let countdown = 5;
            const intervalId = setInterval(() => {
                countdown--;
                document.getElementById('countdown').innerHTML = `Redirecting to search page in ${countdown}...`;
                if (countdown === 0) {
                    clearInterval(intervalId);
                    window.location.href = '/';
                }
            }, 1000);
            return (
                <div className="text-center text-gray-500 mt-10">
                    <div className="text-center text-gray-500 mt-10">First select a route to check the live status of bus.</div>
                    <div id="countdown">Redirecting to search page in 5...</div>
                </div>
            );
        }
    }
    useEffect(() => {
        // Fetch live route data
        const fetchRouteData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${BASE_URL}/${routeId}`);
                console.log("url: ", `${BASE_URL}/${routeId}`);
                if (!response.ok) {
                    console.log(response);
                    throw new Error("Failed to check Bus Live status. Please try again.");
                }
                const data = await response.json();
                setRouteData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRouteData();
    }, [routeId]);

    if (loading) {
        return <div className="text-center mt-10">Loading route details...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    if (routeData.message === "No live data for the given RouteID") {
        return <div className="text-center text-gray-500 mt-10">No Live data available.</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                Live Route Details
            </h1>
            {/* <RouteDetails stops={routeData.stops} /> */}
        </div>
    );
}
