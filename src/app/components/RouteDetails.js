'use client';
import router from "next/router";
import { fetchLiveBusData } from "../api/fatchData";
export default function RouteDetails({ route, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 "
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-6 w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()} // Prevent click on modal from closing it
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Route Details</h3>
          <button
            className="p-2  rounded-full bg-[#201d27] "
            onClick={onClose}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <ul className="space-y-4">
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
                {new Date(stop.expectedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </li>
          ))}
        </ul>
      <button
        className="block mt-4 px-4 py-2 bg-[#201d27] text-white text-xl rounded-3xl hover:bg-[#e7ff3d] hover:text-[#201d27] transition-colors"
        onClick={() => {
          fetch('https://livebus-backend-3gj7nf4q9-mohit-sangwans-projects.vercel.app/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error('Error:', error));
        }}
      >
        Check Live Status
      </button>
      </div>
    </div>
  );
}

function handleliveStatus(id){
  console.log(id);
  try{
    const data = fetchLiveBusData(id);
    console.log(data);
  }catch(err){
    console.log(err);
  }
}