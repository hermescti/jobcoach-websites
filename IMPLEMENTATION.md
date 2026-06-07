# Jobcoach Websites - Bestellformular Implementation

## Zusammenfassung

Bestellformular für Jobcoach-Kunden implementiert, analog zum Musiker-Websites-Formular.

## Deliverables

### Frontend (Order Form)
- **`src/pages/order.astro`** - 5-Schritte-Formular:
  1. **Basis-Info:** Name, Titel, Zertifizierungen, Spezialisierung, Berufserfahrung
  2. **Kompetenzen:** Multi-select aus 40+ Optionen (Karriereberatung, Bewerbungscoaching, etc.)
  3. **Standorte & Sprachen:** Online/Onsite/Hybrid, physische Locations, Sprachen
  4. **Kontakt & Social:** Email, Telefon, LinkedIn, XING, Calendly
  5. **Template & Paket:** Template-Auswahl (Executive/Modern/Minimal/Warm), Paket (Starter/Pro/Premium)

### Backend (API)
- **`src/pages/api/order.ts`** - API Endpoint:
  - Validiert alle Pflichtfelder (Email, Telefon, Erfahrung)
  - Speichert in Google Sheets
  - Sendet Bestätigungsmail (Resend/SendGrid)
  - Generiert Order-ID

### Integrationen
- **`src/lib/sheets.ts`** - Google Sheets Client:
  - Service Account Authentication
  - Retry-Logic mit Exponential Backoff
  - 30 Felder-Mapping für Jobcoach-spezifische Daten

- **`src/lib/email.ts`** - Email Service:
  - Unterstützt Resend und SendGrid
  - HTML-Confirmation-Email mit Order-Details
  - Graceful Degradation wenn kein Provider konfiguriert

### Pages
- **`src/pages/order/thanks.astro`** - Success-Page nach Bestellung
- **`src/layouts/Base.astro`** - Base-Layout für alle Pages

## Konfiguration

### Environment Variables
```bash
# Google Sheets
GOOGLE_SERVICE_ACCOUNT_KEY='<json>'
GOOGLE_SHEET_ID='<spreadsheet_id>'

# Email (optional, einer von beiden)
RESEND_API_KEY='re_xxx'
# ODER
SENDGRID_API_KEY='SG.xxx'
```

### Build & Deploy
```bash
npm install
npm run build
# Output: .vercel/output/ (ready for Vercel deployment)
```

## Architektur-Entscheidungen

1. **Server-Side Rendering:** Astro mit `output: 'server'` für API-Endpoints
2. **Vercel Adapter:** @astrojs/vercel für serverless Deployment
3. **Google Sheets:** Als einfache Order-Verwaltung (wie Musiker-Websites)
4. **Email-Provider:** Abstrahiert über Interface, unterstützt Resend/SendGrid

## Testing

Build erfolgreich verifiziert:
```
21:18:10 [build] Complete!
```

Output-Struktur:
- `.vercel/output/functions/` - Serverless Functions
- `.vercel/output/static/` - Static Assets
- `.vercel/output/config.json` - Vercel Config

## Next Steps (Optional)

1. **Stripe Integration:** Payment-Flow für Paket-Auswahl
2. **Dashboard:** Admin-Interface zur Order-Verwaltung
3. **Onboarding-Flow:** Nachzahlung und Asset-Upload
4. **Analytics:** Tracking der Conversion-Rate

## Files Created

```
jobcoach-websites/
├── src/
│   ├── pages/
│   │   ├── order.astro (38KB)
│   │   ├── order/thanks.astro
│   │   └── api/order.ts
│   ├── lib/
│   │   ├── sheets.ts
│   │   └── email.ts
│   └── layouts/
│       └── Base.astro
├── astro.config.mjs
├── package.json
└── .vercel/output/ (build artifact)
```
