# 📋 Kanban Task-Übersicht: Websites für Jobcoaches

**Projekt:** Jobcoach-Websites – Automatisierte Coach-Profil-Generator  
**Stand:** 05. Juni 2026  
**GitHub Repo:** `hermescti/jobcoach-websites` (noch zu erstellen)  
**Vercel Team:** `michael-s-projects-1111`

---

## 🎯 Epic: Projekt-Setup & Marktrecherche

**Task-ID:** `t_25fbd205`  
**Assignee:** ceo_po  
**Status:** 🟢 Ready  
**Priorität:** 🔴 Hoch

**Beschreibung:**
- Zielgruppe: Jobcoaches, Karriereberater, Bewerbungscoaches in DACH
- Marktgröße: ~25.000 Coaches in DACH, ~8.000 Jobcoaches (fokussiert)
- Wachstum: 17% CAGR (2019-2024)
- Referenz-Analyse: jobcoaching-jetzt.de (Filter, Team-Übersicht, AVGS)
- Produktvision: Ähnlich Musiker-Websites, optimiert für Coach-Profile
- Timeline: 4-6 Wochen MVP

---

## 📊 Task-Graph

### T1-R: Marktrecherche Jobcoaches Deutschland

**Task-ID:** `t_40cf0db1`  
**Assignee:** researcher  
**Status:** ⏳ Ready  
**Parent:** t_25fbd205  
**Priorität:** 🔴 Hoch

**Ziele:**
1. Marktgröße validieren (Anzahl Jobcoaches in DACH)
2. Zahlungsbereitschaft ermitteln (Website-Budget)
3. Wettbewerb analysieren (wer bietet Coach-Websites?)
4. Pain Points identifizieren

**Deliverables:**
- Marktgröße (TAM/SAM/SOM)
- 3-5 Coach-Personas mit Budget-Rahmen
- Competitive Landscape (10 Anbieter)
- Validierte Pain Points

---

### T1-D: Design-Spezifikation für NotebookLM

**Task-ID:** `t_07e9893c`  
**Assignee:** researcher  
**Status:** ⏳ Ready  
**Parent:** t_25fbd205  
**Priorität:** 🔴 Hoch

**Inhalt:**
1. **Visual Core für Jobcoaches:**
   - Professionell & vertrauenswürdig
   - Klarer Fokus auf Kompetenz & Ergebnis
   - DSGVO-konforme Elemente

2. **Template-Varianten (3-5):**
   - **Corporate:** Seriös, blau/grau, für Business-Coaches
   - **Modern:** Bento Grid, Glassmorphism, für Digital-Coaches
   - **Minimal:** Clean, schwarz/weiß, für Karriere-Coaches
   - **Warm:** Erdtöne, für Life-Coaches
   - **Premium:** Gold/Dunkel, für Executive-Coaches

3. **Datenfelder pro Coach-Profil:**
   - Name, Titel, Zertifizierungen
   - Kompetenzen (40+ Optionen)
   - Standorte, Sprachen, AVGS-Zulassung
   - Kontakt, Social Links

---

### T2: Infrastruktur Setup (GitHub + Vercel)

**Task-ID:** `t_4f1dfdd8`  
**Assignee:** coder_devops  
**Status:** ⏳ Ready  
**Parent:** t_25fbd205  
**Priorität:** 🔴 Hoch

**Tasks:**
1. GitHub Repo erstellen: `hermescti/jobcoach-websites`
2. Vercel Projekt anlegen (Team: michael-s-projects-1111)
3. Astro-Grundgerüst initialisieren
4. Environment Variables konfigurieren
5. CI/CD Pipeline einrichten

**Technische Anforderungen:**
- Astro 5.x (wie Musiker-Websites)
- Subdomain-Routing (`[coach].jobcoaches.agentur.de`)
- Template-System (5 Varianten)
- Daten-Import Script

---

### T3: Daten-Import & Coach-Profilerstellung

**Task-ID:** `t_e3079590`  
**Assignee:** coder_devops  
**Status:** ⏳ Ready  
**Parent:** t_25fbd205  
**Priorität:** 🟡 Mittel

**Import-Quellen:**
- **Option A:** Manual JSON (empfohlen für MVP)
- **Option B:** Website-Scrape (Playwright/Puppeteer)
- **Option C:** LinkedIn Profile (API oder Scrape)
- **Option D:** CSV-Upload (für Bulk-Import)

**Datenstruktur (JSON Schema):**
```json
{
  "name": "Dr. Max Mustermann",
  "title": "Karriere- & Bewerbungscoach",
  "certifications": ["ICF ACC", "AVGS-zugelassen"],
  "competencies": ["Bewerbungsgespräche", "Karriereplanung"],
  "locations": ["Berlin", "Online"],
  "languages": ["Deutsch", "Englisch"],
  "avg_approved": true,
  "contact": {"email": "...", "phone": "...", "calendly": "..."},
  "social": {"linkedin": "...", "xing": "..."}
}
```

---

### T4: Template-System Implementierung (5 Varianten)

**Task-ID:** `t_9a6ba136`  
**Assignee:** coder_devops  
**Status:** ⏳ Ready  
**Parent:** t_25fbd205  
**Priorität:** 🟡 Mittel

**5 Template-Varianten:**

1. **Corporate (Business-Coach):** Navy-Blau, Grau, Weiß – Klassisch, strukturiert
2. **Modern (Digital-Coach):** Gradient, Glassmorphism, Bento Grid
3. **Minimal (Karriere-Coach):** Schwarz/Weiß, typografie-fokussiert
4. **Warm (Life-Coach):** Erdtöne, Beige, Grün – Weich, abgerundet
5. **Premium (Executive-Coach):** Dunkel, Gold, Luxus-Feel

**Alle Templates:**
- Mobile-first, responsive
- DSGVO-konform (Impressum, Datenschutz)
- Lighthouse Score >90
- SEO-optimiert (Local SEO)

---

### T5: Bestellformular & Onboarding-Flow

**Task-ID:** `t_fe16a608`  
**Assignee:** coder_devops  
**Status:** ⏳ Ready  
**Parent:** t_25fbd205  
**Priorität:** 🟡 Mittel

**Formular-Schritte (5):**
1. Basis-Info: Name, Titel, Zertifizierungen
2. Kompetenzen: Multi-select aus 40+ Optionen
3. Standorte & Sprachen: Online + physische Locations
4. Kontakt & Social: Email, Telefon, LinkedIn, XING, Calendly
5. Template & Paket: Template-Auswahl, Paket-Wahl

**Integrationen:**
- Google Sheets (Bestellverwaltung)
- Email (Resend oder SendGrid)
- Optional: Stripe (Payment)

---

### T6: Business-Plan & Vertriebsstrategie

**Task-ID:** `t_2253ee4c`  
**Assignee:** ceo_po  
**Status:** ⏳ Ready  
**Parent:** t_25fbd205  
**Priorität:** 🔴 Hoch

**Ziel:** 10-seitiges Dokument mit kompletter Planung

**Inhalt:**
1. Executive Summary (zuletzt schreiben)
2. Marktanalyse (TAM/SAM/SOM, Wachstum, Zielgruppen)
3. Competitive Wedge (Einzigartigkeit, AVGS-Vorteil)
4. Pricing-Strategie (€49/€99/€199)
5. Bottom-up Math (Year 1: 100 Coaches, €7.500 MRR)
6. Go-to-Market (LinkedIn, Verbände, Content, Ads)
7. Risiken & Mitigation

**Deadline:** Heute, 08:00 Uhr (nächster Tag)

---

### T7: QA, DSGVO-Check & Launch-Vorbereitung

**Task-ID:** `t_e3a390b0`  
**Assignee:** quality_guardian  
**Status:** ⏳ Ready  
**Parent:** t_25fbd205  
**Priorität:** 🟢 Niedrig

**Checkliste:**
1. **Funktionale Tests:** Alle Templates, Formular, Sheets, Routing
2. **DSGVO-Compliance:** Cookie-Consent, Impressum, Datenschutz
3. **Performance:** Lighthouse >90, Ladezeit <2 Sek
4. **SEO:** Meta-Tags, Open Graph, Sitemap, Local SEO
5. **Launch:** Landing Page, Demo-Profile, Support-Doku

---

## 📊 Projekt-Status Übersicht

| Phase | Tasks | Status | Nächste Aktion |
|-------|-------|--------|----------------|
| **Research** | T1-R, T1-D | ⏳ Ready | Researcher starten |
| **Infrastruktur** | T2 | ⏳ Ready | CoderDevOps starten |
| **Entwicklung** | T3, T4, T5 | ⏳ Ready | Nach T1 + T2 |
| **Business** | T6 | ⏳ Ready | CEO_PO (Deadline: 08:00) |
| **QA** | T7 | ⏳ Ready | Nach T5 + T6 |

---

## 🎯 Erkenntnisse aus Musiker-Websites

### ✅ Bewährte Praktiken (übertragen)

1. **Astro 5.x** – Bewährter Stack, schnell, SEO-freundlich
2. **Vercel Hosting** – Automatische Deployments, Subdomain-Support
3. **Google Sheets Integration** – Einfache Bestellverwaltung
4. **5 Template-Varianten** – Ausreichend Auswahl ohne Overload
5. **Glassmorphism + Bento Grid** – Modernes, professionelles Design
6. **Bestellformular (5 Schritte)** – Bewährter Onboarding-Flow
7. **Kanban-Orchestrierung** – Multi-Agent-Workflow (Researcher → Coder → QA)

### ⚠️ lessons learned (verbessern)

1. **DSGVO früher integrieren** – Cookie-Consent von Anfang an
2. **Impressum-Pflichtfelder** – Für Coaches in Deutschland kritisch
3. **AVGS-Hinweis** – Spezifisch für Jobcoaches (Fördermittel)
4. **Multi-Location Support** – Coaches haben oft mehrere Standorte
5. **Zertifizierungs-Badges** – Wichtiger Trust-Faktor (ICF, DBVC, AVGS)

---

## 🚀 Nächste Schritte

1. **T1-R starten** – Researcher vertieft Marktanalyse
2. **T2 starten** – CoderDevOps erstellt GitHub Repo + Vercel
3. **T6 priorisieren** – CEO_PO erstellt Business-Plan (Deadline: 08:00)
4. **T1-D parallel** – Design-Spezifikation für NotebookLM

---

**Letztes Update:** 05. Juni 2026  
**Nächster Check:** Nach T1-R + T2 Abschluss
