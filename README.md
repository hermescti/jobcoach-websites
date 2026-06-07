# Websites für Jobcoaches

Automatierte Website-Generierung für Jobcoaches, Karriereberater und Bewerbungscoaches in DACH.

## 🧭 Produktvision

Ein Tool, das in **15 Minuten** aus einer URL/Bio/CVs eine professionelle Coach-Website generiert – mit DSGVO-konformen Elementen (Cookie-Consent, Impressum-Pflichtfelder, AZWV-Zertifizierungshinweise).

## 🎯 Zielgruppe

- **Einzelkämpfer** (60%): Solo-Coaches, 1-5 Kunden/Monat, Budget €50-80/Monat
- **Boutiquen** (30%): 2-10 Coaches, spezialisiert, Budget €100-200/Monat
- **Institute** (10%): 10+ Coaches, AZWV-zertifiziert, Budget €150-250/Monat

## 📊 Marktgröße

- ~25.000 Coaches in DACH
- ~8.000 Jobcoaches (fokussiert)
- **Kein spezialisierter Anbieter** identifiziert

## 🛠 Tech Stack

- **Framework:** Astro 5.x (SSR + API Routes)
- **Hosting:** Vercel
- **Daten:** Airtable (Bestellverwaltung)
- **Design:** Glassmorphism + Bento Grid

## 📁 Projektstruktur

```
src/
├── pages/
│   ├── order.astro        # Bestellformular (5-Step)
│   ├── order/thanks.astro # Bestätigungsseite
│   └── api/order.ts        # API Endpoint
├── layouts/
│   └── Base.astro          # Basis-Layout
├── components/             # Wiederverwendbare Komponenten
├── lib/                    # Hilfsfunktionen (Airtable, Email)
└── types/                  # TypeScript-Typen
```

## 🚀 Deployment

```bash
# Build & Deploy
npm run build
npx vercel --prod --yes --token=$VERCEL_TOKEN
```

## 📋 Tasks

| Task | Status | Beschreibung |
|------|--------|--------------|
| T1-R | ✅ Done | Marktrecherche |
| T1-D | ✅ Done | Design-Spezifikation |
| T2 | 🔄 In Progress | Infrastruktur Setup (GitHub + Vercel) |
| T3 | ⏳ Ready | Daten-Import Pipeline |
| T4 | ⏳ Ready | Template-System (5 Varianten) |
| T5 | ⏳ Ready | Bestellformular & Onboarding |
| T6 | ✅ Done | Business-Plan |
| T7 | ⏳ Ready | QA & DSGVO-Check |

---

Erstellt von Hermes Agent für Michael Budde, Change-to-Impact