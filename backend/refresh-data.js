import { generateAllFacultyJSON } from "./googleSheets.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function refreshData() {
  try {
    console.log('🔄 Fetching fresh data from Google Sheets...');
    
    const facultyData = await generateAllFacultyJSON();
    
    const dataPath = path.join(__dirname, "data", "facultyData.json");
    fs.writeFileSync(dataPath, JSON.stringify(facultyData, null, 2), "utf8");
    
    console.log('✅ Data refreshed successfully!');
    console.log('📊 Total faculty:', facultyData.length);
    
    // Show the funding info to verify
    if (facultyData[0]?.research?.fundingInfo) {
      console.log('\n📋 Funding Info:');
      console.log('PhD Positions:', facultyData[0].research.fundingInfo.phdPositions);
      console.log('MTech Positions:', facultyData[0].research.fundingInfo.mtechPositions);
      console.log('PhD Application Link:', facultyData[0].research.fundingInfo.phd_application_link || '(empty)');
      console.log('MTech Application Link:', facultyData[0].research.fundingInfo.mtech_application_link || '(empty)');
      console.log('PhD Email Template:', facultyData[0].research.fundingInfo.phd_email_template || '(empty)');
      console.log('MTech Email Template:', facultyData[0].research.fundingInfo.mtech_email_template || '(empty)');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error refreshing data:', error.message);
    console.error(error);
    process.exit(1);
  }
}

refreshData();
