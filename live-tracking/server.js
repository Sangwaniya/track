require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use("/api/places", require("./routes/places"));
// app.use("/api/search", require("./routes/search"));
app.use("/api/live", require("./live"));

// Default Route
app.get("/", (req, res) => {
  res.send("Bus Live Tracking Backend is running!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
