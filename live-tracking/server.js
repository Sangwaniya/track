import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import liveRoutes from './live.js';
// const placesRoutes = require("./routes/places");
// const searchRoutes = require("./routes/search");


const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
// app.use("/api/places", placesRoutes);
// app.use("/api/search", searchRoutes);
app.use("/api/live", liveRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Bus Live Tracking Backend is running!");
});

// Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;