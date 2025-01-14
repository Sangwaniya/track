import React, { useState } from 'react';

export default function DateSelector() {
  const [selectedOption, setSelectedOption] = useState('now');
  const [customDateTime, setCustomDateTime] = useState('');

  const options = [
    { id: 'now', label: 'Now' },
    { id: 'hour', label: 'After an hour' },
    { id: 'custom', label: 'Custom' }
  ];

  return (
    <div className="py-8 px-6">
      {/* <div className="rounded-3xl bg-[#e4e4e4] p-6"> */}
        <div className="flex gap-3 overflow-x-auto">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedOption === option.id
                  ? 'bg-[#e7ff3d] text-[#201d27]'
                  : 'bg-white text-[#201d27] hover:bg-gray-50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        
        {selectedOption === 'custom' && (
          <div className="mt-4">
            <input
              type="datetime-local"
              value={customDateTime || new Date().toISOString().slice(0, 16)}
              onChange={(e) => setCustomDateTime(e.target.value)}
              className="w-full px-6 py-3 bg-white rounded-full text-sm border-0 focus:ring-2 focus:ring-[#201d27] placeholder-gray-400"
            />
          </div>
        )}
      {/* </div> */}
    </div>
  );
}