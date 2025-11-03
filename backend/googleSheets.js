import { google } from "googleapis";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || "1OAw8qiyztwOderMABXYoyrUja_dsQYqhMzLclrEGs0o";

// Initialize Google Auth with environment variable or file
function getGoogleAuth() {
  try {
    let credentials;

    // Check if credentials are in environment variable (for production/Vercel)
    if (process.env.GOOGLE_SERVICE_ACCOUNT_BASE64) {
      console.log('📱 Using Google credentials from environment variable');
      const base64Credentials = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;
      const credentialsString = Buffer.from(base64Credentials, 'base64').toString('utf-8');
      credentials = JSON.parse(credentialsString);
      
      return new google.auth.GoogleAuth({
        credentials: credentials,
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
      });
    } 
    // Fallback to file (for local development)
    else {
      console.log('📁 Using Google credentials from file');
      const keyFilePath = process.env.GOOGLE_CREDENTIALS_FILE || './facultywebpage-e21344a1bd2a.json';
      
      if (!fs.existsSync(path.join(__dirname, keyFilePath))) {
        throw new Error(`Google credentials file not found: ${keyFilePath}. Please add credentials file or set GOOGLE_SERVICE_ACCOUNT_BASE64 environment variable.`);
      }
      
      return new google.auth.GoogleAuth({
        keyFile: keyFilePath,
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
      });
    }
  } catch (error) {
    console.error('❌ Error initializing Google Auth:', error.message);
    throw error;
  }
}

// Sheet names
const SHEETS = {
  links: "Links",
  experience: "Experience",
  education: "Education",
  courses: "Courses",
  researchInterests: "Research_Interests",
  fundingInfo: "Funding_Info",
  fundingRequirements: "Funding_Requirements",
  patents: "Patents",
  journals: "Journals",
  conferences: "Conferences",
  talks: "Talks",
  studentInstructions: "Student_Instructions",
  currentStudents: "Current_Students",
  graduatedStudents: "Graduated_Students",
  personalInfo: "Personal_Info",
  about: "About",
  researchPositions: "Research_Positions",
};

// Fetch sheet data
async function fetchSheet(sheetName, range = "A1:Z100") {
  const auth = getGoogleAuth();
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!${range}`,
  });

  return res.data.values || [];
}

// Convert rows to objects
function rowsToObjects(rows) {
  const headers = rows[0];
  return rows.slice(1).map((row) =>
    headers.reduce((obj, header, i) => {
      obj[header] = row[i] || "";
      return obj;
    }, {})
  );
}

// Group objects by faculty_id
function groupByFaculty(data) {
  const result = {};
  data.forEach((item) => {
    const id = item.faculty_id;
    if (!result[id]) result[id] = [];
    result[id].push(item);
  });
  return result;
}

// Generate JSON for all faculty
export async function generateAllFacultyJSON() {
  // Fetch all sheets
  const personalRows = await fetchSheet(SHEETS.personalInfo);
  const personal = rowsToObjects(personalRows);

  const aboutRows = await fetchSheet(SHEETS.about);
  const about = rowsToObjects(aboutRows);

  const researchRows = await fetchSheet(SHEETS.researchPositions);
  const research = rowsToObjects(researchRows);

  const linksRows = await fetchSheet(SHEETS.links);
  const links = rowsToObjects(linksRows);

  const experienceRows = await fetchSheet(SHEETS.experience);
  const experience = rowsToObjects(experienceRows);

  const educationRows = await fetchSheet(SHEETS.education);
  const education = rowsToObjects(educationRows);

  const coursesRows = await fetchSheet(SHEETS.courses);
  const courses = rowsToObjects(coursesRows).map((c) => ({ ...c, credits: Number(c.credits) }));

  const interestsRows = await fetchSheet(SHEETS.researchInterests);
  const interests = rowsToObjects(interestsRows);

  const fundingRows = await fetchSheet(SHEETS.fundingInfo);
  const funding = rowsToObjects(fundingRows);

  const reqRows = await fetchSheet(SHEETS.fundingRequirements);
  const requirements = rowsToObjects(reqRows);

  const patentsRows = await fetchSheet(SHEETS.patents);
  const patents = rowsToObjects(patentsRows);

  const journalsRows = await fetchSheet(SHEETS.journals);
  const journals = rowsToObjects(journalsRows);

  const confRows = await fetchSheet(SHEETS.conferences);
  const conferences = rowsToObjects(confRows);

  const talksRows = await fetchSheet(SHEETS.talks);
  const talks = rowsToObjects(talksRows);

  const instrRows = await fetchSheet(SHEETS.studentInstructions);
  const instructions = rowsToObjects(instrRows);

  const currentRows = await fetchSheet(SHEETS.currentStudents);
  const currentStudents = rowsToObjects(currentRows);

  const graduatedRows = await fetchSheet(SHEETS.graduatedStudents);
  const graduatedStudents = rowsToObjects(graduatedRows);

  // Get unique faculty IDs from personalInfo
  const facultyIds = [...new Set(personal.map(p => p.faculty_id))];

  // Build JSON per faculty
  const allFaculty = facultyIds.map((id) => {
    return {
      faculty_id: id,
      facultyID: id, // Add both for compatibility
      personalInfo: personal.find(p => p.faculty_id === id) || {},
      about: {
        ...about.find(a => a.faculty_id === id),
        researchPositions: research.filter(r => r.faculty_id === id).map(r => r.Position || r.position || r.field),
        links: links.filter(l => l.faculty_id === id),
      },
      biography: {
        experience: experience.filter(e => e.faculty_id === id),
        education: education.filter(e => e.faculty_id === id),
      },
      courses: courses.filter(c => c.faculty_id === id),
      research: {
        interests: interests.filter(i => i.faculty_id === id).map(i => i.Interest || i.interest),
        fundingInfo: {
          ...funding.find(f => f.faculty_id === id),
          requirements: requirements.filter(r => r.faculty_id === id).map(r => r.requirement || r.Requirement || r.field || r.value)
        }
      },
      publications: {
        patents: patents.filter(p => p.faculty_id === id),
        journals: journals.filter(j => j.faculty_id === id),
        conferences: conferences.filter(c => c.faculty_id === id),
      },
      talks: talks.filter(t => t.faculty_id === id),
      students: {
        instructions: instructions.filter(i => i.faculty_id === id).map(i => i.instruction || i.Instruction || i.field),
        current: currentStudents.filter(s => s.faculty_id === id),
        graduated: graduatedStudents.filter(s => s.faculty_id === id),
      }
    };
  });

  return allFaculty;
}
