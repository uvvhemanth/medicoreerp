# MedicoreERP — Medical ERP Marketing Website

Public marketing site for an AI-native hospital / medical ERP platform. Built for **SEO**, **sitemap coverage**, and **lead generation** (demo, contact, gated guides, sandbox).

Frontend-only Next.js demo — stub lead API, no real PHI, CMS-ready local content.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

Node 18.18+ recommended.

---

## SEO & lead generation

| Surface | URL |
|---|---|
| Sitemap | `/sitemap.xml` |
| Robots | `/robots.txt` |
| Primary CTA | `/demo` |
| Lead API (stub) | `POST /api/leads` |
| Gated guides | `/resources/guides/*` |
| Compare (organic) | `/compare/vs-epic` etc. |
| Glossary (organic) | `/resources/glossary/*` |

Per-page metadata, Open Graph, Twitter cards, canonicals, and JSON-LD (`Organization`, `SoftwareApplication`, `Article`, `FAQPage`, `JobPosting`, `DefinedTerm`, `BreadcrumbList`).

Lead forms capture UTM + page, persist first-touch UTMs in `localStorage`, and POST to `/api/leads` (console stub for CRM).

---

## Site map (modules)

- **Home** `/`
- **Product** `/product` + 10 domains (`patient-access`, `clinical`, `pharmacy`, `lab`, `radiology`, `revenue-cycle`, `supply-chain`, `hrm`, `analytics`, `platform`)
- **Solutions** `/solutions` + clinics, hospitals, diagnostics, pharmacy, enterprise, government
- **AI** `/ai` + ambient-scribe, clinical-copilot, autonomous-rcm, predictive-ops, nl-analytics
- **Interoperability** `/interoperability` + fhir, hl7, dicom, abdm, migration
- **Security** `/security`, `/security/compliance`, `/security/status`
- **Pricing** `/pricing`, `/pricing/roi-calculator`
- **Customers** `/customers` + case studies
- **Compare** `/compare/{competitor}`
- **Resources** blog, guides, webinars, glossary, changelog
- **Developers** docs, FHIR, marketplace, sandbox
- **Company** about, careers, press, partners
- **Contact / Demo / Legal**

---

## Architecture

```
src/
  app/
    (marketing)/     public SSG pages + shared layout
    api/leads/       stub lead-capture route handler
    sitemap.ts       full URL inventory for Google
    robots.ts
  components/
    ui/              design-system primitives
    marketing/       header, footer, blocks, ROI, lead form, JSON-LD
  lib/
    content/         marketing + company content (CMS-ready)
    seo.ts           structured-data helpers
```

Design tokens: teal `#0E8388`, clinical blue, ink — from `globals.css` / Tailwind. Dark mode + cookie banner included.

---

## Notes

- Demo build only — no real CRM, payments, or PHI.
- Tech: Next.js 15 App Router · React 19 · TypeScript · Tailwind · Framer Motion · Lucide.
- Spec reference: `docs/doc.md` §5–§7 (IA, sitemap, SEO, conversion).
