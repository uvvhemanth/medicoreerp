# Aether Health OS — Web Frontend

The AI-native Hospital Operating System — **frontend-only, mock-data build** in Next.js.
Two web properties in one app: the public **Marketing Website** and the authenticated **Web Application** (staff console + patient portal). No backend — everything runs on a swappable mock-data layer, ready to wire to a real API later.

Built to the spec in [`WEBSITE_REQUIREMENTS.md`](./WEBSITE_REQUIREMENTS.md).

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

Node 18.18+ recommended.

---

## Demo logins

Go to **/login** and click any **Quick demo login** (Doctor, Nurse, Front Office, Biller, Admin, Executive) — or type any email + password (4+ chars) and any 6-digit MFA code. The role you pick changes which modules appear in the nav (role-filtered).

- Staff console: **/app**
- Patient portal: **/portal**

Sign-out and route protection are enforced via a mock session cookie + middleware. No real credentials, no real PHI — all data is synthetic.

---

## What's inside

### Marketing website (`/`)
Home · Product hub + 10 domain pages · Solutions + 6 editions · AI hub + 5 capability pages · Interoperability + standards · Security / Trust Center / Compliance / Status · **Pricing + interactive ROI calculator** · Customers + case studies · Compare (vs Epic/Cerner/athena/local HIS) · Resources / Blog · Developers + docs + sandbox · Company (About/Careers/Press/Partners) · Contact · Demo · Legal · 404.

SEO: per-page metadata, Open Graph, `sitemap.xml`, `robots.txt`. Dark mode, cookie consent, lead forms with UTM capture (stubbed handler).

### Web application (`/app`) — role-filtered
Dashboard · Command Center (live digital twin) · Patients (worklist) · Patient Chart (record + vitals + CDSS + audit) · Appointments · Register Patient (wizard w/ autosave) · OPD Consult (ambient scribe) · Bed Board (drag-ready board) · Nursing / eMAR (barcode 5-rights) · Pharmacy · Lab · Radiology (DICOM viewer placeholder) · Billing · Denial Queue (AI vs human) · Inventory · Workforce (HRM) · Analytics (charts + NL query) · Admin & Settings (Workflow Studio + Form Builder + white-label).

### Patient portal (`/portal`) — mobile-first
Home · Symptom checker → book · Records (plain-language AI) · Bills & pay · Teleconsult · Consent ledger.

Every screen implements the **six archetypes** (Worklist, Record, Form/Wizard, Board, Dashboard, Detail+Audit) and all designed states: **loading, empty, filtered-empty, error+retry, offline, permission-scoped**.

---

## Architecture

```
src/
  app/
    (marketing)/        public site (SSG) + shared layout
    (auth)/             login, register, forgot-password
    app/                staff console (protected)
    portal/             patient portal (protected)
    layout.tsx          root: fonts + Theme/Auth/Toast providers
    middleware.ts       route protection (/app, /portal)
    sitemap.ts, robots.ts, error.tsx, not-found.tsx
  components/
    ui/                 design-system primitives (Button, Card, Input, Dialog, Toast, …)
    marketing/          header, footer, blocks, ROI calc, lead form
    app/                app shell (TopBar, SideNav, ContextBar, RightRail, CommandPalette), archetypes
    providers/          theme, auth
    brand/              logo
  lib/
    data/adapter.ts     ← swappable data layer (mock today, HTTP later)
    mock/               synthetic datasets + domain types
    content/            marketing + company content (CMS-ready)
    auth.ts             mock OIDC token/cookie helpers
    app/nav.ts          role-filtered navigation
  hooks/use-query.ts    TanStack-shaped query hook (loading/error/refetch)
```

### Design system → theme
All colors, type (Manrope + Inter), radius, and motion come from CSS variables in
`src/app/globals.css` and `tailwind.config.ts`, derived from the provided Flutter
`MedicalErpTheme` (teal `#0E8388`, clinical blue `#1B6EC2`, ink `#10303B`, …).
Light/dark and density are runtime-switchable; brand color is a token (white-label ready).

### Swapping in a real backend
UI never calls `fetch` directly. Every read goes through `src/lib/data/adapter.ts`.
Implement an `httpAdapter` with the same shape and switch via `NEXT_PUBLIC_DATA_SOURCE=http`.
Types are already FHIR-flavoured where clinical. Auth (`src/lib/auth.ts`) mimics OIDC +
PKCE + cookie session — replace with a real IdP without touching screens.

---

## Notes
- **Demo build:** no real backend, payments, DICOM server, or PHI. All data is synthetic and generated deterministically.
- **Tech:** Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS · Recharts · Framer Motion · Lucide.
- **Accessibility:** semantic HTML, focus-visible rings, keyboard-operable palette (`⌘K`), reduced-motion honored, contrast-aware tokens.
- **Performance:** SSG for marketing, route code-splitting, virtualization-ready tables, skeletons + optimistic UI.
