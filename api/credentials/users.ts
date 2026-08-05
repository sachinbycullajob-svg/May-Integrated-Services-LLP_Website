import { initGoogleSheet } from '../_google-sheets.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const doc = await initGoogleSheet();
      if (!doc) {
        return res.status(500).json({ success: false, error: "Google Sheets integration is not configured." });
      }

      const sheetName = process.env.USERS_WORKSHEET_NAME || 'Users Credential';
      const sheet = doc.sheetsByTitle[sheetName];
      
      if (!sheet) {
        return res.status(404).json({ success: false, error: `Worksheet "${sheetName}" not found.` });
      }

      const rows = await sheet.getRows();
      const data = rows.map((row) => row.toObject());
      
      return res.status(200).json({ success: true, data });
    } catch (error: any) {
      console.error("Error fetching Users Credential:", error);
      return res.status(500).json({ success: false, error: error?.message || "Internal server error" });
    }
  }

  if (req.method === 'POST') {
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
      
      return res.status(200).json({ success: true, message: "Data saved successfully" });
    } catch (error: any) {
      console.error("Error saving Users Credential:", error);
      return res.status(500).json({ success: false, error: error?.message || "Internal server error" });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
