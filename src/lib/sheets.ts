// Google Sheets API Integration
// Location: src/lib/sheets.ts
// Handles order data persistence to Google Sheets for Jobcoach Websites

import { google } from 'googleapis';

export interface OrderData {
  timestamp: string;
  orderId: string;
  fullName: string;
  title: string;
  certifications: string;
  specialization: string;
  experience: string;
  competencies: string;
  otherCompetencies: string;
  coachingModes: string;
  locations: string;
  languages: string;
  otherLanguages: string;
  email: string;
  phone: string;
  linkedin: string;
  xing: string;
  calendly: string;
  website: string;
  template: string;
  package: string;
  domain: string;
  requests: string;
}

let sheetsClient: ReturnType<typeof google.sheets> | null = null;

/**
 * Initialize Google Sheets client with Service Account credentials
 */
function getSheetsClient() {
  if (!sheetsClient) {
    const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    
    if (!credentials) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set');
    }

    let keyObject: any;
    try {
      keyObject = typeof credentials === 'string' ? JSON.parse(credentials) : credentials;
    } catch (error) {
      throw new Error('Invalid JSON in GOOGLE_SERVICE_ACCOUNT_KEY');
    }

    const auth = new google.auth.GoogleAuth({
      credentials: keyObject,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    sheetsClient = google.sheets({ version: 'v4', auth });
  }

  return sheetsClient;
}

/**
 * Append order data to Google Sheet
 */
export async function appendOrderToSheet(orderData: OrderData): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  
  if (!sheetId) {
    throw new Error('GOOGLE_SHEET_ID environment variable is not set');
  }

  const sheets = getSheetsClient();

  // Prepare row data in correct column order (30 columns for jobcoach fields)
  const rowData = [
    orderData.timestamp,
    orderData.orderId,
    orderData.fullName,
    orderData.title,
    orderData.certifications,
    orderData.specialization,
    orderData.experience,
    orderData.competencies,
    orderData.otherCompetencies,
    orderData.coachingModes,
    orderData.locations,
    orderData.languages,
    orderData.otherLanguages,
    orderData.email,
    orderData.phone,
    orderData.linkedin,
    orderData.xing,
    orderData.calendly,
    orderData.website,
    orderData.template,
    orderData.package,
    orderData.domain,
    orderData.requests,
    '', // Reserved for future use
    '', // Reserved for future use
    '', // Reserved for future use
    '', // Reserved for future use
    '', // Reserved for future use
    '', // Reserved for future use
    '', // Reserved for future use
  ];

  // Retry logic for transient errors
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: 'Sheet1!A:AD', // Columns A-AD for 30 fields
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [rowData],
        },
      });

      console.log(`✅ Order ${orderData.orderId} appended to Google Sheet (attempt ${attempt})`);
      return; // Success, exit retry loop
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      console.warn(`⚠️ Sheet append attempt ${attempt} failed: ${lastError.message}`);
      
      // Wait before retry (exponential backoff)
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }

  // All retries failed
  throw new Error(`Failed to append to sheet after ${maxRetries} attempts: ${lastError?.message}`);
}

/**
 * Create order data object from form submission
 */
export function createOrderData(body: any, orderId: string): OrderData {
  return {
    timestamp: new Date().toISOString(),
    orderId,
    fullName: body.fullName || '',
    title: body.title || '',
    certifications: body.certifications || '',
    specialization: body.specialization || '',
    experience: body.experience || '',
    competencies: Array.isArray(body.competencies) ? body.competencies.join(', ') : '',
    otherCompetencies: body.otherCompetencies || '',
    coachingModes: Array.isArray(body.coachingModes) ? body.coachingModes.join(', ') : '',
    locations: body.locationCities?.map((city: string, i: number) => {
      const country = body.locationCountries?.[i] || '';
      return country ? `${city}, ${country}` : city;
    }).join('; ') || '',
    languages: Array.isArray(body.languages) ? body.languages.join(', ') : '',
    otherLanguages: body.otherLanguages || '',
    email: body.email || '',
    phone: body.phone || '',
    linkedin: body.linkedin || '',
    xing: body.xing || '',
    calendly: body.calendly || '',
    website: body.website || '',
    template: body.template || '',
    package: body.package || '',
    domain: body.domain || '',
    requests: body.requests || '',
  };
}
