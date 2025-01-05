This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


### **  Folder Structure**
frontend
```
src/
 ├── app/
 │   ├── fonts/
 │   ├── globals.css
 │   ├── layout.js
 │   ├── page.js
 │   ├── api/        // Future API routes for backend
 │   ├── auth/       // Future Authentication components/pages
 │   ├── components/
 │   │    ├── Header.js  // Common Header for the app
 │   │    ├── Map.js     // Component for displaying map with live bus tracking
 │   │    ├── BusSearch.js // Search component (Source, Destination, Submit)
 │   ├── pages/
 │   │    ├── index.js   // Main page for source/destination search
 │   │    ├── search.js  // Page displaying search results, bus details, and live location
 ├── public/
 ├── next.config.js      // Next.js config (with PWA)
 ├── tailwind.config.js  // Tailwind CSS config
 ├── .eslintrc.json      // ESLint configuration
 ├── package.json
```
backend : 

### API Documentation: Live Bus Backend

**Base URL**:  
[https://livebus-backend-nocryhag8-mohit-sangwans-projects.vercel.app/api/live/](https://livebus-backend-nocryhag8-mohit-sangwans-projects.vercel.app/api/live/)

---

#### 1. **GET Request**: Fetch Latest Live Data for a Bus
- **Endpoint**: `/api/live`
- **Method**: `GET`
- **Query Parameters**:
  - `busId` (required): The unique identifier of the bus.
  
- **Example**:
  ```
  GET /api/live?busId=123
  ```
- **Response**:
  - `200 OK`: Returns the latest GPS data for the requested `busId`.
  ```json
  {
    "busId": "123",
    "latitude": "28.4595",
    "longitude": "77.0290",
    "timestamp": "2025-01-04T10:15:00Z"
  }
  ```
  - `404 Not Found`: If no data exists for the given `busId`.

---

#### 2. **POST Request**: Update In-Memory Live Data
- **Endpoint**: `/api/live`
- **Method**: `POST`
- **Body Parameters** (JSON):
  - `busId` (required): The unique identifier of the bus.
  - `timestamp` (required): The timestamp of the data point (ISO 8601 format).
  - `latitude` (required): Latitude of the bus.
  - `longitude` (required): Longitude of the bus.

- **Example**:
  ```json
  {
    "busId": "123",
    "timestamp": "2025-01-04T10:15:00Z",
    "latitude": "28.4595",
    "longitude": "77.0290"
  }
  ```
- **Response**:
  - `200 OK`: Data updated in memory successfully.
  ```json
  {
    "message": "Live data updated successfully"
  }
  ```
  - `400 Bad Request`: If required fields are missing or invalid.

---

#### 3. **PUT Request**: Save Bus Data to Google Sheets
- **Endpoint**: `/api/live`
- **Method**: `PUT`
- **Body Parameters** (JSON):
  - `busId` (required): The unique identifier of the bus.
  - `journeyDate` (required): The date of the journey (YYYY-MM-DD).
  - `stopName` (required): Name of the bus stop.
  - `latitude` (required): Latitude of the stop.
  - `longitude` (required): Longitude of the stop.
  - `arrivalTime` (required): Arrival time at the stop (ISO 8601 format).
  - `departureTime` (required): Departure time from the stop (ISO 8601 format).
  - `userId` or `ipAddress` (optional): Identifier of the user or their IP address.

- **Example**:
  ```json
  {
    "busId": "123",
    "journeyDate": "2025-01-04",
    "stopName": "Gurugram",
    "latitude": "28.4595",
    "longitude": "77.0290",
    "arrivalTime": "2025-01-04T10:15:00Z",
    "departureTime": "2025-01-04T10:20:00Z",
    "userId": "user_456"
  }
  ```
- **Response**:
  - `200 OK`: Data saved to Google Sheets successfully.
  ```json
  {
    "message": "Data saved to Google Sheets successfully"
  }
  ```
  - `400 Bad Request`: If required fields are missing or invalid.

---

**Notes**:
- Replace `busId`, `latitude`, `longitude`, etc., in the examples with actual values.
- Ensure the server is live and accessible for testing.
- Use tools like Postman, Curl, or frontend forms to interact with the API.