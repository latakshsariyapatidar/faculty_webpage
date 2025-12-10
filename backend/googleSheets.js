import { google } from "googleapis";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || "1NJUIvdLLjdzpGRuMrH-d-MHhbZh6ishMWehDnJzLB5U";

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
  bookChapters: "Book_Chapters",
  studentInstructions: "Student_Instructions",
  currentStudents: "Current_Students",
  graduatedStudents: "Graduated_Students",
  personalInfo: "Personal_Info",
  about: "About",
  researchPositions: "Research_Positions",
  news: "News",
  image: "Image",
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

  const bookChaptersRows = await fetchSheet(SHEETS.bookChapters);
  const bookChapters = rowsToObjects(bookChaptersRows);

  const instrRows = await fetchSheet(SHEETS.studentInstructions);
  const instructions = rowsToObjects(instrRows);

  const currentRows = await fetchSheet(SHEETS.currentStudents);
  const currentStudents = rowsToObjects(currentRows);

  const graduatedRows = await fetchSheet(SHEETS.graduatedStudents);
  const graduatedStudents = rowsToObjects(graduatedRows);

  const newsRows = await fetchSheet(SHEETS.news);
  const news = rowsToObjects(newsRows);

  const imageRows = await fetchSheet(SHEETS.image);
  const images = rowsToObjects(imageRows);

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
        researchPositions: research.filter(r => r.faculty_id === id).map(r => ({
          position: r.Position || r.position || r.field,
          application_link: r.application_link || r.applicationLink || '',
          email_template: r.email_template || r.emailTemplate || ''
        })),
        links: links.filter(l => l.faculty_id === id),
      },
      biography: {
        experience: experience.filter(e => e.faculty_id === id),
        education: education.filter(e => e.faculty_id === id),
      },
      courses: courses.filter(c => c.faculty_id === id).map(c => ({
        ...c,
        status: c.status || 'current' // 'current' or 'past'
      })),
      research: {
        interests: interests.filter(i => i.faculty_id === id).map(i => ({
          title: i.title || i.Title || i.Interest || i.interest,
          description: i.description || i.Description || '',
          image: i.image || i.Image || ''
        })),
        fundingInfo: (() => {
          // Get all funding info rows for this faculty
          const fundingRows = funding.filter(f => f.faculty_id === id);
          const fundingObj = {};
          
          // Convert vertical format (field, value) to horizontal object
          fundingRows.forEach(row => {
            const field = row.field;
            const value = row.value;
            if (field && value) {
              fundingObj[field] = value;
            }
            
            // Also capture direct column values for application links/templates
            if (row.phd_application_link) fundingObj.phd_application_link = row.phd_application_link;
            if (row.phd_email_template) fundingObj.phd_email_template = row.phd_email_template;
            if (row.mtech_application_link) fundingObj.mtech_application_link = row.mtech_application_link;
            if (row.mtech_email_template) fundingObj.mtech_email_template = row.mtech_email_template;
          });
          
          return {
            phdPositions: fundingObj.phdPositions || '',
            mtechPositions: fundingObj.mtechPositions || '',
            note: fundingObj.note || '',
            phd_application_link: fundingObj.phd_application_link || '',
            phd_email_template: fundingObj.phd_email_template || '',
            mtech_application_link: fundingObj.mtech_application_link || '',
            mtech_email_template: fundingObj.mtech_email_template || '',
            requirements: requirements.filter(r => r.faculty_id === id).map(r => ({
              position_id: r.position_id || r.positionId || '',
              requirement: r.requirement || r.Requirement || r.field || r.value
            }))
          };
        })()
      },
      publications: {
        patents: patents.filter(p => p.faculty_id === id).map(p => ({
          ...p,
          pdf_link: p.pdf_link || p.pdfLink || '',
          external_link: p.external_link || p.externalLink || ''
        })),
        journals: journals.filter(j => j.faculty_id === id).map(j => ({
          ...j,
          pdf_link: j.pdf_link || j.pdfLink || '',
          external_link: j.external_link || j.externalLink || ''
        })),
        conferences: conferences.filter(c => c.faculty_id === id).map(c => ({
          ...c,
          pdf_link: c.pdf_link || c.pdfLink || '',
          external_link: c.external_link || c.externalLink || ''
        })),
        bookChapters: bookChapters.filter(b => b.faculty_id === id).map(b => ({
          ...b,
          pdf_link: b.pdf_link || b.pdfLink || '',
          external_link: b.external_link || b.externalLink || ''
        }))
      },
      students: {
        instructions: instructions.filter(i => i.faculty_id === id).map(i => i.instruction || i.Instruction || i.field),
        current: currentStudents.filter(s => s.faculty_id === id).map(s => ({
          ...s,
          degree_type: s.degree_type || s.degreeType || s.program || 'PhD',
          photo: s.photo || s.Photo || '',
          thesis_title: s.thesis_title || s.thesisTitle || s.topic || '',
          start_date: s.start_date || s.startDate || '',
          end_date: s.end_date || s.endDate || ''
        })),
        graduated: graduatedStudents.filter(s => s.faculty_id === id).map(s => ({
          ...s,
          degree_type: s.degree_type || s.degreeType || s.program || 'PhD',
          photo: s.photo || s.Photo || '',
          thesis_title: s.thesis_title || s.thesisTitle || s.thesis || '',
          start_date: s.start_date || s.startDate || '',
          end_date: s.end_date || s.endDate || s.year || ''
        })),
      },
      news: news.filter(n => n.faculty_id === id).map(n => ({
        title: n.title || n.Title || '',
        description: n.description || n.Description || n.content || n.Content || 
                    n.news || n.News || n.text || n.Text || '',
        image: n.image || n.Image || n.photo || n.Photo || '',
        date: n.date || n.Date || n.published_date || n.publishedDate || 
              n.published || n.Published || ''
      })).filter(item => item.title || item.description), // Keep items with at least title or description
      gallery: images.filter(img => img.faculty_id === id).map(img => ({
        url: img.gallery_images || img.gallery_image,
        alt: img.image_alternate_text || img.alt_text || '',
        caption: img.caption || img.Caption || '',
        caption_position: img.caption_position || img.captionPosition || 'after' // 'before' or 'after'
      }))
    };
  });

  return allFaculty;
}
