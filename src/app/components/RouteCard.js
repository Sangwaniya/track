"use client";
import { useState, useEffect } from 'react';
import RouteDetails from './RouteDetails';

const LockIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const ArrowIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="white" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

export default function RouteCard({ route }) {
  const [sliderValue, setSliderValue] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  useEffect(() => {
    if (sliderValue === 100) {
      setShowDetails(true);
      setSliderValue(0);
    }
  }, [sliderValue]);

  const firstStop = route.stops[0];
  const lastStop = route.stops[route.stops.length - 1];
  const travelTime = new Date(lastStop.expectedAt) - new Date(firstStop.expectedAt);

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDuration = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex  justify-center p-4">
      <div className="bg-[#e4e4e4] rounded-3xl p-6 w-full max-w-sm shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">
              {firstStop.place.name} - {lastStop.place.name}
            </h1>
            <div className="space-y-1">
              <p className="text-gray-600">Departure - Arrival</p>
              <p className="text-xl">
                {formatTime(firstStop.expectedAt)} - {formatTime(lastStop.expectedAt)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-600">Total Journey Time</p>
              <p className="text-xl">{formatDuration(travelTime)}</p>
            </div>
          </div>
          <button className="bg-black rounded-full p-2" onClick={toggleDetails}>
            <ArrowIcon className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Slider Section */}
        <div className="mt-8 relative">
          <div
            className="relative h-16 rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
          >
            {/* Slider Track */}
            <div
              className="absolute inset-0 bg-white/30"
              style={{
                width: `${sliderValue}%`,
                transition: 'width 0.3s ease-out'
              }}
            />

            {/* Content */}
            <div className="relative h-full flex items-center justify-between px-4">
              <div className="flex items-center gap-3" >
                <div className="bg-white p-3 rounded-3xl shadow-md" style={{ transform: `translateX(${sliderValue*2}px)` }}>
                  <LockIcon className="w-5 h-5" />
                </div>
                <span className="text-gray-400 font-medium">Slide for details</span>
              </div>
            
              <div className="flex items-center gap-0.5">
                {[1, 2, 3].map((_, index) => (
                  <span
                    key={index}
                    className="text-gray-600 transition-all duration-300"
                    style={{
                      opacity: 0.3 + (index * 0.2) + (sliderValue / 200),
                      transform: `scale(${0.8 + (index * 0.1) + (sliderValue / 500)})`,
                      marginLeft: `${index * 2}px`
                    }}
                  >
                    {'>'}
                  </span>
                ))}
              </div>
            </div>

            {/* Invisible Range Input */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(parseInt(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-pointer w-full"
              style={{ touchAction: 'none' }}
            />
          </div>
        </div>
      </div>

      {showDetails && (
        <RouteDetails
          stops={route.stops}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
}
