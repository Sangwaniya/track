

const sheets = google.sheets({ version: "v4", auth });
const SHEET_ID = "1FwVNe6j4xN_ToGtCY3ju26BPCOfZ5RtNu2f4q0dhay4"; // Replace with your Google Sheet ID
const RANGE = "Sheet1!A1:H1"; // Adjust the range as per your sheet

export default async function getLive(routeID, res) {
    
    res.status(200).json({ message: 'Hello from the live API route!' });
}