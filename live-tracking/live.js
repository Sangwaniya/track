import express from 'express';
import { google } from 'googleapis';
import {updateLiveData, saveStopDataToSheet, getLiveData}  from "./liveDataStore.js"; 

const router = express.Router();

// Load Google Sheets API credentials
const auth = new google.auth.GoogleAuth({
    keyFile: "./cred/key.json", // Replace with your JSON key file
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });
const SHEET_ID = "1FwVNe6j4xN_ToGtCY3ju26BPCOfZ5RtNu2f4q0dhay4"; // Replace with your Google Sheet ID
const RANGE = "Sheet1!A1:H1"; // Adjust the range as per your sheet

/**
 * POST /live
 * Handles live GPS updates.
 * Body Parameters: { BusID, TimeStamp, Latitude, Longitude, UserID (optional) }
 */
router.post("/", async (req, res) => {
    const { BusID, TimeStamp, Latitude, Longitude, UserID } = req.body;
    console.log(req.body);

    if (!BusID || !TimeStamp || !Latitude || !Longitude) {
        return res.status(400).json({ error: "Missing required parameters..." });
    }

    try {
        // Update in-memory data
        const stopData = updateLiveData(BusID, TimeStamp, Latitude, Longitude);

        res.status(200).json({ message: "Live data processed successfully" });
    } catch (error) {
        console.error("Error processing live data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put("/", async (req, res) => {
    const { BusID, JourneyDate, ArrivalTime, DepartureTime, StopName, Latitude, Longitude, UserID } = req.body;
    console.log(req.body);

    if (!BusID || !JourneyDate || !ArrivalTime || !DepartureTime || !StopName || !Latitude || !Longitude) {
        return res.status(400).json({ error: "Missing required parameters..." });
    }

    try {
        // updating in sheet
        const stopDetails = [
            BusID,
            JourneyDate,
            StopName,
            Latitude,
            Longitude,
            ArrivalTime,
            DepartureTime,
            UserID || req.ip, // Use provided UserID or fallback to IP
        ];

        await saveStopDataToSheet(sheets, SHEET_ID, RANGE, stopDetails);

        res.status(200).json({ message: "Stop data processed successfully" });
    } catch (error) {    
        console.error("Error processing stop data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET: Retrieve last live status of a bus by BusID
router.get('/:BusID', (req, res) => {
    console.log(process.env.SHEET_ID);
    const { BusID } = req.params;
    console.log(req.params);

    if (!BusID) {
        return res.status(400).json({ error: 'BusID is required' });
    }

    const liveData = getLiveData(BusID);

    if (!liveData) {
        return res.status(404).json({ error: 'No live data found for the given BusID' });
    }

    res.json({ message: 'Live data retrieved successfully', data: liveData });
});

export default router;
