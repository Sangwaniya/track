// import { useState, useEffect } from 'react';
// https://github.com/jagmitswami/roadways
const BASE_URL = 'https://sokibcw8dd.execute-api.us-east-1.amazonaws.com/dev'; 
const LiveAiUrl = 'https://livebus-backend-nocryhag8-mohit-sangwans-projects.vercel.app/api/live';


export const fetchBusRoutes = async (source, destination) => {
  const response = await fetch(`${BASE_URL}/api/routes/search?source=${source}&destination=${destination}`);
  if (!response.ok) {
    throw new Error('Failed to fetch bus data');
  }
  return response.json();
};


export const fetchLiveBusData = async (busId) => {
  const response = await fetch(`${LiveAiUrl}/${busId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch live bus data');
  }
  return response.json();
};

// fetchLiveBusData response
// [
//   {
//       "id": 1,
//       "stops": [
//           {
//               "id": 1,
//               "expectedAt": [
//                   2025,
//                   10,
//                   1,
//                   8,
//                   0
//               ],
//               "place": {
//                   "id": 1,
//                   "location": "Loharu",
//                   "block": "Loharu",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.90982",
//                   "longitude": "75.66294"
//               }
//           },
//           {
//               "id": 2,
//               "expectedAt": [
//                   2025,
//                   10,
//                   1,
//                   8,
//                   15
//               ],
//               "place": {
//                   "id": 2,
//                   "location": "Gignow",
//                   "block": "Loharu",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.96736",
//                   "longitude": "75.71345"
//               }
//           },
//           {
//               "id": 3,
//               "expectedAt": [
//                   2025,
//                   10,
//                   1,
//                   8,
//                   30
//               ],
//               "place": {
//                   "id": 3,
//                   "location": "Singhani",
//                   "block": "Loharu",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.89211",
//                   "longitude": "75.74079"
//               }
//           },
//           {
//               "id": 4,
//               "expectedAt": [
//                   2025,
//                   10,
//                   1,
//                   8,
//                   45
//               ],
//               "place": {
//                   "id": 4,
//                   "location": "Dhigawa Jatan",
//                   "block": "Loharu",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.91615",
//                   "longitude": "75.71977"
//               }
//           },
//           {
//               "id": 5,
//               "expectedAt": [
//                   2025,
//                   10,
//                   1,
//                   9,
//                   0
//               ],
//               "place": {
//                   "id": 5,
//                   "location": "Bass Kural",
//                   "block": "Loharu",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.97446",
//                   "longitude": "75.77934"
//               }
//           },
//           {
//               "id": 6,
//               "expectedAt": [
//                   2025,
//                   10,
//                   1,
//                   9,
//                   15
//               ],
//               "place": {
//                   "id": 6,
//                   "location": "Kurdal",
//                   "block": "Loharu",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.94855",
//                   "longitude": "75.72717"
//               }
//           },
//           {
//               "id": 7,
//               "expectedAt": [
//                   2025,
//                   10,
//                   1,
//                   9,
//                   30
//               ],
//               "place": {
//                   "id": 7,
//                   "location": "Pohkarwas",
//                   "block": "Kairu",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.97458",
//                   "longitude": "75.68299"
//               }
//           },
//           {
//               "id": 8,
//               "expectedAt": [
//                   2025,
//                   10,
//                   1,
//                   9,
//                   45
//               ],
//               "place": {
//                   "id": 8,
//                   "location": "Jui Khurd",
//                   "block": "Kairu",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.90247",
//                   "longitude": "75.71747"
//               }
//           },
//           {
//               "id": 9,
//               "expectedAt": [
//                   2025,
//                   10,
//                   1,
//                   10,
//                   0
//               ],
//               "place": {
//                   "id": 9,
//                   "location": "Golagarh",
//                   "block": "Kairu",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.93751",
//                   "longitude": "75.67788"
//               }
//           },
//           {
//               "id": 10,
//               "expectedAt": [
//                   2025,
//                   10,
//                   1,
//                   10,
//                   15
//               ],
//               "place": {
//                   "id": 10,
//                   "location": "Dhani Shankar",
//                   "block": "Kairu",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.91894",
//                   "longitude": "75.73083"
//               }
//           },
//           {
//               "id": 11,
//               "expectedAt": [
//                   2025,
//                   10,
//                   2,
//                   10,
//                   30
//               ],
//               "place": {
//                   "id": 11,
//                   "location": "Lalhana",
//                   "block": "Kairu",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.97647",
//                   "longitude": "75.65843"
//               }
//           },
//           {
//               "id": 12,
//               "expectedAt": [
//                   2025,
//                   10,
//                   2,
//                   10,
//                   45
//               ],
//               "place": {
//                   "id": 12,
//                   "location": "Lohani",
//                   "block": "Kairu",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.92743",
//                   "longitude": "75.73712"
//               }
//           },
//           {
//               "id": 13,
//               "expectedAt": [
//                   2025,
//                   10,
//                   2,
//                   11,
//                   0
//               ],
//               "place": {
//                   "id": 13,
//                   "location": "Devsar Mod",
//                   "block": "Bhiwani",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.97665",
//                   "longitude": "75.75267"
//               }
//           },
//           {
//               "id": 14,
//               "expectedAt": [
//                   2025,
//                   10,
//                   2,
//                   11,
//                   15
//               ],
//               "place": {
//                   "id": 14,
//                   "location": "Bhiwani",
//                   "block": "Bhiwani",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.99363",
//                   "longitude": "75.75306"
//               }
//           }
//       ]
//   },
//   {
//       "id": 4,
//       "stops": [
//           {
//               "id": 29,
//               "expectedAt": [
//                   2025,
//                   10,
//                   1,
//                   8,
//                   0
//               ],
//               "place": {
//                   "id": 1,
//                   "location": "Loharu",
//                   "block": "Loharu",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.90982",
//                   "longitude": "75.66294"
//               }
//           },
//           {
//               "id": 30,
//               "expectedAt": [
//                   2025,
//                   10,
//                   1,
//                   8,
//                   15
//               ],
//               "place": {
//                   "id": 2,
//                   "location": "Gignow",
//                   "block": "Loharu",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.96736",
//                   "longitude": "75.71345"
//               }
//           },
//           {
//               "id": 31,
//               "expectedAt": [
//                   2025,
//                   10,
//                   1,
//                   8,
//                   30
//               ],
//               "place": {
//                   "id": 3,
//                   "location": "Singhani",
//                   "block": "Loharu",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.89211",
//                   "longitude": "75.74079"
//               }
//           },
//           {
//               "id": 32,
//               "expectedAt": [
//                   2025,
//                   10,
//                   1,
//                   8,
//                   45
//               ],
//               "place": {
//                   "id": 4,
//                   "location": "Dhigawa Jatan",
//                   "block": "Loharu",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.91615",
//                   "longitude": "75.71977"
//               }
//           },
//           {
//               "id": 33,
//               "expectedAt": [
//                   2025,
//                   10,
//                   1,
//                   9,
//                   0
//               ],
//               "place": {
//                   "id": 5,
//                   "location": "Bass Kural",
//                   "block": "Loharu",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.97446",
//                   "longitude": "75.77934"
//               }
//           },
//           {
//               "id": 34,
//               "expectedAt": [
//                   2025,
//                   10,
//                   1,
//                   9,
//                   15
//               ],
//               "place": {
//                   "id": 6,
//                   "location": "Kurdal",
//                   "block": "Loharu",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.94855",
//                   "longitude": "75.72717"
//               }
//           },
//           {
//               "id": 35,
//               "expectedAt": [
//                   2025,
//                   10,
//                   1,
//                   9,
//                   30
//               ],
//               "place": {
//                   "id": 7,
//                   "location": "Pohkarwas",
//                   "block": "Kairu",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.97458",
//                   "longitude": "75.68299"
//               }
//           },
//           {
//               "id": 36,
//               "expectedAt": [
//                   2025,
//                   10,
//                   1,
//                   9,
//                   45
//               ],
//               "place": {
//                   "id": 8,
//                   "location": "Jui Khurd",
//                   "block": "Kairu",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.90247",
//                   "longitude": "75.71747"
//               }
//           },
//           {
//               "id": 37,
//               "expectedAt": [
//                   2025,
//                   10,
//                   1,
//                   10,
//                   0
//               ],
//               "place": {
//                   "id": 9,
//                   "location": "Golagarh",
//                   "block": "Kairu",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.93751",
//                   "longitude": "75.67788"
//               }
//           },
//           {
//               "id": 38,
//               "expectedAt": [
//                   2025,
//                   10,
//                   1,
//                   10,
//                   15
//               ],
//               "place": {
//                   "id": 10,
//                   "location": "Dhani Shankar",
//                   "block": "Kairu",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.91894",
//                   "longitude": "75.73083"
//               }
//           },
//           {
//               "id": 39,
//               "expectedAt": [
//                   2025,
//                   10,
//                   2,
//                   10,
//                   30
//               ],
//               "place": {
//                   "id": 11,
//                   "location": "Lalhana",
//                   "block": "Kairu",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.97647",
//                   "longitude": "75.65843"
//               }
//           },
//           {
//               "id": 40,
//               "expectedAt": [
//                   2025,
//                   10,
//                   2,
//                   10,
//                   45
//               ],
//               "place": {
//                   "id": 12,
//                   "location": "Lohani",
//                   "block": "Kairu",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.92743",
//                   "longitude": "75.73712"
//               }
//           },
//           {
//               "id": 41,
//               "expectedAt": [
//                   2025,
//                   10,
//                   2,
//                   11,
//                   0
//               ],
//               "place": {
//                   "id": 13,
//                   "location": "Devsar Mod",
//                   "block": "Bhiwani",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.97665",
//                   "longitude": "75.75267"
//               }
//           },
//           {
//               "id": 42,
//               "expectedAt": [
//                   2025,
//                   10,
//                   2,
//                   11,
//                   15
//               ],
//               "place": {
//                   "id": 14,
//                   "location": "Bhiwani",
//                   "block": "Bhiwani",
//                   "district": "Bhiwani",
//                   "state": "Haryana",
//                   "latitude": "28.99363",
//                   "longitude": "75.75306"
//               }
//           }
//       ]
//   }
// ]

