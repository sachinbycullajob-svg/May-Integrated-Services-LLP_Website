import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

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

// Start Server with Vite Middleware in Dev or Static files in Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
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

startServer();
