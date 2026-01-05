import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateAllFacultyJSON } from "./googleSheets.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const dataPath = path.join(__dirname, "data", "facultyData.json");

// Secret key for database refresh (store in .env in production)
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY || "iitdh_faculty_secret_2024";

// Main API endpoint - Always uses facultyData.json
app.get("/api/faculty", async (req, res) => {
  const { facultyId } = req.query; // Get facultyID from query parameters
  
  try {
    // Always read from JSON file
    const facultyData = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    
    // If facultyId is provided, find that specific faculty
    if (facultyId) {
      const faculty = facultyData.find(
        f => f.facultyID === facultyId || f.faculty_id === facultyId
      );
      
      if (!faculty) {
        return res.status(404).json({ 
          message: `Faculty with ID "${facultyId}" not found`,
          availableIds: facultyData.map(f => f.facultyID || f.faculty_id)
        });
      }
      
      return res.json(faculty); // Return single faculty object
    }
    
    // If no facultyId, return all faculty data (array)
    res.json(facultyData);
    
  } catch (err) {
    console.error("❌ Error reading facultyData.json:", err.message);
    return res.status(500).json({ 
      message: "Error reading faculty data from database" 
    });
  }
});

// New endpoint to manually refresh data from Google Sheets with secret key in URL
app.get("/api/fetchLatest/:secretKey", async (req, res) => {
  const { secretKey } = req.params;
  
  // Validate secret key
  if (!secretKey || secretKey !== REFRESH_SECRET_KEY) {
    return res.status(401).json({ 
      message: "Unauthorized - Invalid secret key",
      success: false 
    });
  }
  
  try {
    
    // Fetch fresh data from Google Sheets
    const facultyData = await generateAllFacultyJSON();
    
    // Update facultyData.json with fresh data
    fs.writeFileSync(dataPath, JSON.stringify(facultyData, null, 2), "utf8");
    

    
    return res.json({ 
      message: "Database updated successfully from Google Sheets",
      success: true,
      totalFaculty: facultyData.length,
      facultyIds: facultyData.map(f => f.facultyID || f.faculty_id),
      timestamp: new Date().toISOString()
    });
    
  } catch (err) {
    console.error("❌ Error fetching from Google Sheets:", err.message);
    console.error(err);
    
    return res.status(500).json({ 
      message: "Error fetching data from Google Sheets: " + err.message,
      success: false 
    });
  }
});

// app.post("/api/faculty", (req, res) => {
//   fs.writeFile(dataPath, JSON.stringify(req.body, null, 2), (err) => {
//     if (err) return res.status(500).json({ message: "Error saving data" });
//     res.json({ message: "Data updated successfully" });
//   });
// });

app.get("/health", (req, res) => {
  res.json({ status: "Backend running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
