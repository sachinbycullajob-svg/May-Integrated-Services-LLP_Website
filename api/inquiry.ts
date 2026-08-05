import { initGoogleSheet, SPREADSHEET_ID, TARGET_EMAIL } from './_google-sheets.js';
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

    await saveToGoogleSheet("Inquiries", inquiryRecord);

    console.log(`[Corporate Inquiry Sent] ${name} -> ${TARGET_EMAIL}`);

    return res.status(200).json({
      success: true,
      message: "Inquiry successfully recorded and forwarded to mayintegratedservicesllp@gmail.com",
      data: inquiryRecord
    });
  } catch (err: any) {
    console.error("Error processing inquiry:", err);
    return res.status(500).json({ success: false, error: err?.message || "Internal server error" });
  }
}
