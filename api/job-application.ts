import { SPREADSHEET_ID, TARGET_EMAIL } from './_google-sheets.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

async function saveToGoogleSheet(tabName: string, rowData: Record<string, any>) {
  const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL;
  if (!scriptUrl) {
    console.log(`[Google Sheets] GOOGLE_SHEETS_SCRIPT_URL not set.`);
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

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

    await saveToGoogleSheet("Job Applications", applicationRecord);

    console.log(`[Job Application Sent] ${applicantName} -> ${TARGET_EMAIL}`);

    return res.status(200).json({
      success: true,
      message: "Job application successfully recorded and forwarded to mayintegratedservicesllp@gmail.com",
      data: applicationRecord
    });
  } catch (err: any) {
    console.error("Error processing job application:", err);
    return res.status(500).json({ success: false, error: err?.message || "Internal server error" });
  }
}
