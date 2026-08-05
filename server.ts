import express from "express";
import path from "path";
import fs from "fs";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

const app = express();
const PORT = 3000;

app.use(express.json());

// Ensure data directory exists
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const INQUIRIES_FILE = path.join(dataDir, "inquiries.json");
const APPLICATIONS_FILE = path.join(dataDir, "job_applications.json");

const SPREADSHEET_ID = "1Cugc_12fOK21ie8RPbfOdj4MQSc2ynH4cMzARSfaMAU";
const TARGET_EMAIL = "mayintegratedservicesllp@gmail.com";

// Helper to save to local JSON file
function appendToFile(filePath: string, record: any) {
  let list: any[] = [];
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      list = JSON.parse(raw);
    }
  } catch (err) {
    list = [];
  }
  list.push(record);
  fs.writeFileSync(filePath, JSON.stringify(list, null, 2), "utf-8");
}

// Helper to send data to Google Sheets via Google Apps Script Web App / Webhook if configured
async function saveToGoogleSheet(tabName: string, rowData: Record<string, any>) {
  const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL;
  if (!scriptUrl) {
    console.log(`[Google Sheets] GOOGLE_SHEETS_SCRIPT_URL not set. Saved to local storage.`);
    return false;
  }
  try {
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        spreadsheetId: SPREADSHEET_ID,
        tab: tabName,
        targetEmail: TARGET_EMAIL,
        data: rowData,
        timestamp: new Date().toISOString()
      })
    });
    return res.ok;
  } catch (err) {
    console.error(`[Google Sheets Error]`, err);
    return false;
  }
}

// API Route for Corporate Inquiries
app.post("/api/inquiry", async (req, res) => {
  try {
    const { name, email, phone, company, inquiryType, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const inquiryRecord = {
      id: `inq_${Date.now()}`,
      timestamp: new Date().toISOString(),
      name,
      email,
      phone: phone || "N/A",
      company: company || "N/A",
      inquiryType: inquiryType || "General Inquiry",
      message,
      targetEmail: TARGET_EMAIL,
      spreadsheetId: SPREADSHEET_ID,
      sheetTab: "Inquiries"
    };

    // Save locally
    appendToFile(INQUIRIES_FILE, inquiryRecord);

    // Save to Google Sheets
    await saveToGoogleSheet("Inquiries", inquiryRecord);

    console.log(`[Corporate Inquiry Saved & Sent] ${name} -> ${TARGET_EMAIL}`);

    return res.json({
      success: true,
      message: "Inquiry successfully recorded and forwarded to mayintegratedservicesllp@gmail.com",
      data: inquiryRecord
    });
  } catch (err: any) {
    console.error("Error processing inquiry:", err);
    return res.status(500).json({ success: false, error: err?.message || "Internal server error" });
  }
});

// API Route for Job Applications
app.post("/api/job-application", async (req, res) => {
  try {
    const { applicantName, applicantEmail, applicantPhone, jobTitle, department, message } = req.body;

    if (!applicantName || !applicantEmail) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const applicationRecord = {
      id: `app_${Date.now()}`,
      timestamp: new Date().toISOString(),
      applicantName,
      applicantEmail,
      applicantPhone: applicantPhone || "N/A",
      jobTitle: jobTitle || "General Application",
      department: department || "General",
      message: message || "N/A",
      targetEmail: TARGET_EMAIL,
      spreadsheetId: SPREADSHEET_ID,
      sheetTab: "Job Applications"
    };

    // Save locally
    appendToFile(APPLICATIONS_FILE, applicationRecord);

    // Save to Google Sheets
    await saveToGoogleSheet("Job Applications", applicationRecord);

    console.log(`[Job Application Saved & Sent] ${applicantName} -> ${TARGET_EMAIL}`);

    return res.json({
      success: true,
      message: "Job application successfully recorded and forwarded to mayintegratedservicesllp@gmail.com",
      data: applicationRecord
    });
  } catch (err: any) {
    console.error("Error processing job application:", err);
    return res.status(500).json({ success: false, error: err?.message || "Internal server error" });
  }
});

// --- Google Sheets Direct API Setup for Credentials ---
let googleSheetDoc: GoogleSpreadsheet | null = null;
const initGoogleSheet = async () => {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    console.warn("[Google Sheets API] Missing Service Account credentials. Credential API routes will fail.");
    return null;
  }
  
  if (googleSheetDoc) return googleSheetDoc;

  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    googleSheetDoc = doc;
    return doc;
  } catch (error) {
    console.error("[Google Sheets API] Failed to initialize GoogleSpreadsheet:", error);
    return null;
  }
};

// API Route: Get Accounts Credential
app.get("/api/credentials/accounts/:platform", async (req, res) => {
  try {
    const { platform } = req.params;
    const doc = await initGoogleSheet();
    if (!doc) {
      return res.status(500).json({ success: false, error: "Google Sheets integration is not configured." });
    }

    const sheet = doc.sheetsByTitle[platform];
    if (!sheet) {
      return res.status(404).json({ success: false, error: `Worksheet "${platform}" not found in the spreadsheet.` });
    }

    const rows = await sheet.getRows();
    const data = rows.map((row) => row.toObject());
    
    return res.json({ success: true, data });
  } catch (error: any) {
    console.error(`Error fetching Accounts Credential for ${req.params.platform}:`, error);
    return res.status(500).json({ success: false, error: error?.message || "Internal server error" });
  }
});

// API Route: Save Accounts Credential
app.post("/api/credentials/accounts/:platform", async (req, res) => {
  try {
    const { platform } = req.params;
    const { data } = req.body;
    
    if (!Array.isArray(data)) {
      return res.status(400).json({ success: false, error: "Invalid data format. Expected an array." });
    }

    const doc = await initGoogleSheet();
    if (!doc) {
      return res.status(500).json({ success: false, error: "Google Sheets integration is not configured." });
    }

    const sheet = doc.sheetsByTitle[platform];
    if (!sheet) {
      return res.status(404).json({ success: false, error: `Worksheet "${platform}" not found in the spreadsheet.` });
    }

    // Clear existing rows (if needed) and add new ones
    // Alternatively, update existing rows. For simplicity, we clear and add.
    // Note: Clearing might lose formulas. If we assume it's just data, we can clear.
    await sheet.clearRows();
    if (data.length > 0) {
      await sheet.addRows(data);
    }
    
    return res.json({ success: true, message: "Data saved successfully" });
  } catch (error: any) {
    console.error(`Error saving Accounts Credential for ${req.params.platform}:`, error);
    return res.status(500).json({ success: false, error: error?.message || "Internal server error" });
  }
});

// API Route: Get Users Credential
app.get("/api/credentials/users", async (req, res) => {
  try {
    const doc = await initGoogleSheet();
    if (!doc) {
      return res.status(500).json({ success: false, error: "Google Sheets integration is not configured." });
    }

    // Assuming the tab name is 'Users' or 'Users Credential'
    const sheetName = process.env.USERS_WORKSHEET_NAME || 'Users Credential';
    const sheet = doc.sheetsByTitle[sheetName];
    
    if (!sheet) {
      return res.status(404).json({ success: false, error: `Worksheet "${sheetName}" not found.` });
    }

    const rows = await sheet.getRows();
    const data = rows.map((row) => row.toObject());
    
    return res.json({ success: true, data });
  } catch (error: any) {
    console.error("Error fetching Users Credential:", error);
    return res.status(500).json({ success: false, error: error?.message || "Internal server error" });
  }
});

// API Route: Save Users Credential
app.post("/api/credentials/users", async (req, res) => {
  try {
    const { data } = req.body;
    
    if (!Array.isArray(data)) {
      return res.status(400).json({ success: false, error: "Invalid data format. Expected an array." });
    }

    const doc = await initGoogleSheet();
    if (!doc) {
      return res.status(500).json({ success: false, error: "Google Sheets integration is not configured." });
    }

    const sheetName = process.env.USERS_WORKSHEET_NAME || 'Users Credential';
    const sheet = doc.sheetsByTitle[sheetName];
    
    if (!sheet) {
      return res.status(404).json({ success: false, error: `Worksheet "${sheetName}" not found.` });
    }

    await sheet.clearRows();
    if (data.length > 0) {
      await sheet.addRows(data);
    }
    
    return res.json({ success: true, message: "Data saved successfully" });
  } catch (error: any) {
    console.error("Error saving Users Credential:", error);
    return res.status(500).json({ success: false, error: error?.message || "Internal server error" });
  }
});

// Start Server with Vite Middleware in Dev or Static files in Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`May Integrated Services Server running on port ${PORT}`);
  });
}

// Only start the server if not running on Vercel
if (!process.env.VERCEL) {
  startServer();
}

export default app;
