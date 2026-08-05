import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

export const SPREADSHEET_ID = "1Cugc_12fOK21ie8RPbfOdj4MQSc2ynH4cMzARSfaMAU";
export const TARGET_EMAIL = "mayintegratedservicesllp@gmail.com";

let googleSheetDoc: GoogleSpreadsheet | null = null;

export const initGoogleSheet = async () => {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    console.warn("[Google Sheets API] Missing Service Account credentials.");
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
