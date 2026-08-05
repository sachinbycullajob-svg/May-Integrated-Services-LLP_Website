import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL;
  const sheetName = process.env.USERS_WORKSHEET_NAME || 'Users Credential';

  if (!scriptUrl) {
    return res.status(500).json({ success: false, error: "Google Sheets integration is not configured. Missing GOOGLE_SHEETS_SCRIPT_URL." });
  }

  if (req.method === 'GET') {
    try {
      const response = await fetch(`${scriptUrl}?tab=${encodeURIComponent(sheetName)}`);
      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch (err) {
        console.error("Non-JSON response from Google Apps Script:", text.substring(0, 200));
        return res.status(500).json({ success: false, error: "Google Apps Script returned an invalid response. Ensure the script is deployed with 'Who has access: Anyone'." });
      }
      
      if (!result.success) {
        return res.status(500).json({ success: false, error: result.error });
      }
      
      res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=59');
      return res.status(200).json({ success: true, data: result.data });
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

      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tab: sheetName,
          action: 'replace',
          data: data
        })
      });
      
      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch (err) {
        console.error("Non-JSON response from Google Apps Script (POST):", text.substring(0, 200));
        return res.status(500).json({ success: false, error: "Google Apps Script returned an invalid response on Save. Please try again." });
      }
      
      if (!result.success) {
        return res.status(500).json({ success: false, error: result.error });
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
