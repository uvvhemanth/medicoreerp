# Aether Health OS — Website & Web-App (Frontend) Requirements

> **Document type:** End-to-end build specification for the Next.js frontend.
> **Scope of this document:** BOTH web properties, built **frontend-only with mock data** — (A) the public **Marketing Website** and (B) the authenticated **Web Application** (staff console + patient/partner/developer portals). Every screen renders against a local mock-data layer; **no backend** is built in this phase. All API touchpoints are stubbed behind a swappable data layer so the backend can be wired in later without UI rewrites.
> **Out of scope (later phases):** Real backend/API, database, auth server, mobile apps.
> **Source of truth:** `requirement/Aether_Website_Development_Document.pdf` (Part 2 of 3). Cross-references use the form `§Wnn`.
> **Design language:** Aether Health OS design system (see §2), derived from the provided `MedicalErpTheme` (Flutter) — calm, trustworthy hospital palette: medical teal + clinical blue + slate ink on clean off-white surfaces; Manrope + Inter type.
> **North-star UX:** Ultra-simple, calm, coherent. One component library, one interaction grammar across every screen. "Design for the 10th consult of a 12-hour shift, not the demo."

---

## Table of Contents

- **Part 0 — Foundations**
  - 1. Project Overview, Goals & Scope
  - 2. Design System & Theme
  - 3. Technology Stack & Project Architecture
  - 4. Mock Data Layer & API-Swap Strategy
- **Part 1 — Marketing Website**
  - 5. Marketing IA, Sitemap & Global Chrome
  - 6. Marketing Pages (page-by-page)
  - 7. SEO, Conversion, Content & Analytics
- **Part 2 — Web Application Foundations**
  - 8. App Shell & Global Navigation
  - 9. Screen Archetypes
  - 10. Component Library Catalog
- **Part 3 — Web Application Screens (by module domain)**
  - 11. Patient Access & Front Office
  - 12. Clinical Core (EMR·OPD·IPD·ER·OT·ICU·Nursing·CDSS)
  - 13. Ancillary & Diagnostics
  - 14. Revenue Cycle & Finance
  - 15. Supply Chain & Assets
  - 16. Workforce (HRM)
  - 17. CRM, Quality & Admin / Platform
  - 18. Analytics, NL & Command Center
  - 19. Patient / Partner / Developer Portals
- **Part 4 — Cross-Cutting**
  - 20. Security, Session & Auth (frontend mock)
  - 21. Accessibility (WCAG 2.2 AA)
  - 22. Performance & Core Web Vitals
  - 23. Internationalization & Localization
  - 24. Responsive Design & Layout Modes
  - 25. Motion & Interaction Grammar
- **Part 5 — Delivery**
  - 26. Build Roadmap & Phasing
  - 27. QA & Testing Strategy
  - 28. Deployment, Hosting & CI/CD
  - 29. Definition of Done & Acceptance Criteria
- **Appendices**
  - A. Design Token Reference (Flutter → Web)
  - B. Route Map
  - C. Component Inventory
  - D. Mock Data Schemas
  - E. Status-Chip & Severity Semantics
  - F. Keyboard Shortcut Map

---

# PART 0 — FOUNDATIONS

## 1. Project Overview, Goals & Scope

### 1.1 Purpose
Aether Health OS is an AI-native Hospital Information System / Healthcare ERP. This project delivers the **entire web frontend** in Next.js as a **standalone, backend-free build**: the public marketing site that sells the product, plus a fully clickable web application (staff console + portals) driven by realistic mock data. The build proves the product visually and interactively, and is architected so a real API can be connected later with zero UI rewrites.

### 1.2 Product thesis (for hero/marketing copy)
"Run the entire hospital on one AI-native platform — clinical, operational, and financial — interoperable by default, fast to deploy, honestly priced." Marketing pages express the moat; the app screens demonstrate it.

### 1.3 The two web properties (kept separate)
| Property | Nature | Audience | This build |
|---|---|---|---|
| **Marketing Website** | Public, content-heavy, SEO-critical, edge-cached, multilingual | Economic/clinical/technical buyers, developers, press, job-seekers, patients | Full SSG/ISR site with local content (CMS-ready) |
| **Web Application** | Authenticated, dense, data-heavy, keyboard-first, real-time, role-filtered | Hospital staff + patient/partner/developer portals | Full clickable UI on a mock-data layer |

**Rule:** These are two separate codebases/apps in one monorepo. They share the design system but never merge. `Sign in` / `Launch app` on the marketing site simply route to the web app.

### 1.4 The three surfaces of the web application
1. **Staff Console** (PRIMARY) — the operational HIS/ERP, role-filtered, §11–§18.
2. **Patient / Family Web Portal** (Digital Front Door) — browser twin of the patient app.
3. **Partner & Developer Portals** (Ecosystem) — referring-doctor, corporate/TPA, supplier/vendor, and developer platform.

### 1.5 Scope — IN
- 1.5.1 Complete marketing website, every page in §5–§6.
- 1.5.2 Complete web-app shell, navigation, and all module screens in §11–§19.
- 1.5.3 Full design system / component library mapped to the Aether theme (§2, §10).
- 1.5.4 Six reusable screen archetypes (§9) as design-system templates.
- 1.5.5 Mock data layer, mock auth, mock realtime, mock offline (§4, §20).
- 1.5.6 SEO, accessibility, performance, i18n, responsive, motion (§7, §21–§25).
- 1.5.7 Storybook, tests, CI, deployment config (§27–§28).

### 1.6 Scope — OUT (future phases)
- 1.6.1 Real backend, database, domain services, API gateway.
- 1.6.2 Real authentication / identity provider (mock OIDC flow only).
- 1.6.3 Real payment, e-signature, DICOM PACS server, analyzer/device integration (UI + mock streams only).
- 1.6.4 Native mobile apps (Part 3 of the master set).
- 1.6.5 Real PHI. **No real patient data ever** — synthetic/mock only.

### 1.7 Success criteria for this phase
- 1.7.1 Every route in Appendix B renders a complete, on-brand, accessible screen with realistic mock data and all designed states (loading/empty/error/offline/permission).
- 1.7.2 Marketing pages hit Core Web Vitals budgets (§22) and pass Lighthouse/axe.
- 1.7.3 The full patient journey is demonstrable end-to-end in the app on mock data: register → consult → order → dispense → bill → claim → discharge.
- 1.7.4 The data layer can be swapped from mock → real API by changing adapters only.

### 1.8 Guiding UX doctrine (non-negotiable — applies to every screen)
**The Seven Laws**
1. 1.8.1 **Ruthless defaults** — common path pre-filled, one action away; rare path reachable, not prominent.
2. 1.8.2 **Keyboard-first** — every primary action has a shortcut; `⌘K` command palette; forms fully tab-navigable; no mouse required to chart.
3. 1.8.3 **Minimal clicks-to-complete** — budget clicks for every top-20 task; regressions fail review.
4. 1.8.4 **Forgiving** — undo everywhere, autosave, confirm only destructive/clinical commits, never lose typed work.
5. 1.8.5 **Consistent** — one component library, one grammar; a worklist behaves identically in Pharmacy and HR.
6. 1.8.6 **Context-preserving** — current patient/encounter stays pinned across screens.
7. 1.8.7 **Honest states** — loading, empty, error, partial, offline, permission-denied are designed states, not afterthoughts.

**Clinical-grade constraints**
- 1.8.8 **Safety is visual** — allergy/interaction/critical-value warnings use a reserved, unmistakable treatment; never a subtle toast.
- 1.8.9 **Explain, don't just alert** — every CDSS alert shows "why" + evidence link inline.
- 1.8.10 **Read-heavy density** — tables, flowsheets, timelines over cards where data is dense; comfortable/compact density toggle.
- 1.8.11 **No destructive-by-accident** — sign, discharge, dispense, submit-claim are deliberate, guarded, attributed.
- 1.8.12 **Attribution always** — who/what/when visible in an audit drawer on every record.
- 1.8.13 **Degrade, don't break** — slow/offline shows cached data + sync indicator, never a spinner-of-death.

### 1.9 Interaction grammar (learn once, use everywhere)
| Pattern | Rule |
|---|---|
| **Primary action** | Top-right of screen/panel; one high-emphasis button; `⌘Enter` submits. |
| **Search / find** | Global search top-center; `⌘K` palette for nav & actions; `/` focuses in-context search. |
| **Bulk operations** | Row checkboxes → sticky action bar (count + clear + actions). |
| **Saved views** | Any worklist filterable and saveable as a named, role-shareable view. |
| **Detail drill** | Row click → right-side drawer (peek); deep-link/expand → full detail page. |
| **Audit** | "History/audit" affordance on every record → versioned change trail. |
| **Statuses** | One shared status-chip system with fixed color semantics (Appendix E). |
| **Dangerous actions** | Type-to-confirm or explicit reason capture; never a bare "Are you sure?". |

---

## 2. Design System & Theme

The provided Flutter `MedicalErpTheme` is the canonical source. §2 translates it into web design tokens (CSS variables + Tailwind config). Every color, radius, and type value below is derived from that theme.

### 2.1 Brand palette (core tokens)
| Token | Hex | Role |
|---|---|---|
| `--brand-teal` | `#0E8388` | Primary — trust, care |
| `--brand-teal-dark` | `#0A6B70` | Primary hover/pressed |
| `--brand-teal-deep` | `#083E45` | Deep accents, gradient end |
| `--brand-clinical-blue` | `#1B6EC2` | Secondary — clinical, info |
| `--brand-ink` | `#10303B` | Headings / dark slate |
| `--brand-mist` | `#E6F0F0` | Soft teal tint (backgrounds, chips) |
| `--brand-sage` | `#5BB4A6` | Supporting accent |
| `--brand-forest` | `#1E9E63` | Positive/growth accent |
| Dark-mode primary | `#3FB6B0` | Teal for dark surfaces |
| Dark-mode secondary | `#6FA8DC` | Blue for dark surfaces |
| Dark-mode filled btn | `#1F9E98` | Filled button on dark |

### 2.2 Semantic status tokens (fixed meaning — never reassign)
| Token | Hex | Meaning |
|---|---|---|
| `--status-success` | `#1E9E63` | done / active-ok |
| `--status-warning` | `#E0912F` | pending / caution |
| `--status-danger` | `#D64545` | error / destructive |
| `--status-info` | `#1B6EC2` | informational |
| `--status-critical` | `#C0362C` | critical value / safety |

### 2.3 Neutral surfaces
| Token | Light | Dark |
|---|---|---|
| `--surface` (scaffold) | `#F3F7F7` | `#0C1719` |
| `--card` | `#FFFFFF` | `#14262A` |
| `--border` | `rgba(16,48,56,0.08)` | `rgba(255,255,255,0.12)` |
| `--text-heading` | `#10303B` | `#FFFFFF` |
| `--text-body` | `#3A4A50` | `rgba(255,255,255,0.70)` |
| `--text-muted` | `rgba(16,48,56,0.55)` | `rgba(255,255,255,0.55)` |

### 2.4 Typography
- 2.4.1 **Heading font:** Manrope (weights 700, 800). **Body/UI font:** Inter (weights 400, 500, 600, 700). Load via `next/font` (self-hosted, subset, no render-blocking).
- 2.4.2 Type scale (from theme):

| Style | Font | Size | Weight | Line-height |
|---|---|---|---|---|
| Display Large | Manrope | 34px | 800 | 1.1 |
| Display Medium | Manrope | 26px | 800 | 1.15 |
| Title Large | Manrope | 18px | 700 | 1.25 |
| Title Medium | Manrope | 15px | 700 | 1.3 |
| Body Large | Inter | 15px | 400 | 1.4 |
| Body Medium | Inter | 13.5px | 400 | 1.4 |
| Label Large | Inter | 13px | 600 | 1.2 (teal) |
| Nav label | Inter | 11.5px | 500/700 | 1.2 |
| App-bar title | Manrope | 19px | 700 | 1.2 |

- 2.4.3 Marketing pages may scale display sizes up responsively (e.g. hero to 48–64px on desktop) while keeping the Manrope 800 weight and tight line-height.

### 2.5 Shape, spacing, elevation, motion
- 2.5.1 **Radius:** buttons/inputs/cards `14px`; chips/pills `30px` (fully rounded); large marketing cards `16–20px`; modals/drawers `16px`.
- 2.5.2 **Spacing scale:** 4-based — 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.
- 2.5.3 **Elevation:** flat by default (elevation 0), subtle `scrolledUnderElevation`-style shadow on sticky headers; cards use 1px border + very soft shadow, not heavy drop shadows.
- 2.5.4 **Button padding:** filled `14px × 18px`; elevated `15px × 18px`; outlined `13px × 18px`. Font: Inter 700, 14px.
- 2.5.5 **Input:** padding `15px × 16px`, radius 14, enabled border `rgba(16,48,56,0.13)`, focus border `--brand-teal` at `1.6px`.
- 2.5.6 **Chips:** pill radius 30, Inter 600 13px, 1px border.
- 2.5.7 **Motion durations:** micro 120ms, standard 200ms, entrance 280ms; easing `cubic-bezier(0.2, 0, 0, 1)`. Respect `prefers-reduced-motion` (§25).

### 2.6 Theming, dark mode & white-label
- 2.6.1 Light and dark themes both fully specified (values in §2.1–§2.3). Theme is user-selectable and honors `prefers-color-scheme`.
- 2.6.2 **Brand override:** per-tenant logo + primary color injected at runtime via CSS variables — no rebuild. Tenant switcher in the app updates tokens live.
- 2.6.3 **Density tokens:** comfortable vs compact — affects row height, padding, and font in tables/flowsheets. User-chosen; persisted.
- 2.6.4 Semantic tokens map to core tokens so themes and white-label are data, not forks.

### 2.7 Tailwind + token wiring
- 2.7.1 Tailwind CSS with a design-token layer: all colors, radius, spacing, fonts exposed as Tailwind theme keys backed by CSS variables.
- 2.7.2 No hardcoded hex in components — everything references tokens.
- 2.7.3 Component primitives built on Radix UI (headless, accessible) and styled with tokens.

### 2.8 Overall visual direction (ultra-simple, calm)
- 2.8.1 Generous whitespace, restrained color — teal used with intent, not everywhere. Off-white/mist surfaces, white cards, ink headings.
- 2.8.2 One accent action per view. Clear hierarchy: display heading → supporting body → single primary CTA.
- 2.8.3 Marketing = airy, confident, editorial-but-clean (still sans, per theme). App = dense but calm; density serves scanning, not clutter.
- 2.8.4 Iconography: single consistent line-icon set (e.g. Lucide), 1.5–2px stroke, teal/ink.

---

## 3. Technology Stack & Project Architecture

### 3.1 Core stack (from §W04)
| Concern | Choice |
|---|---|
| Language | TypeScript (strict) |
| UI library | React 18+ |
| Meta-framework | Next.js (App Router) — SSG/ISR for marketing; SSR/RSC + client islands for app |
| Styling | Tailwind CSS + design tokens (CSS variables) |
| Component primitives | Radix UI (headless) + house components (`@aether/design-system`) |
| Server-state / data | TanStack Query (points at mock adapters now) |
| Client-state | Zustand (UI state: panels, selections, wizard steps) — sparingly |
| Forms & validation | React Hook Form + Zod (shared schemas; drives the no-code FormRenderer) |
| Routing | Next.js file routing; deep-linkable state in URL |
| Realtime | Mock WebSocket/SSE emitter (swappable to real) |
| Charts / viz | Recharts or Visx/ECharts + one house theming layer |
| Tables / data grid | TanStack Table + virtualization (10k+ rows) |
| Editor / rich text | TipTap / ProseMirror (clinical notes, CMS body) |
| Imaging | Cornerstone.js / OHIF (zero-footprint DICOM) — mock studies |
| Offline (web) | Service Worker (Workbox) + IndexedDB (Dexie) |
| i18n | next-intl / i18next + ICU MessageFormat |
| Auth (client) | Mock OIDC (PKCE) flow + silent-refresh simulation |
| Testing | Vitest + Testing Library, Playwright (E2E), axe, Storybook + Chromatic |
| Build/tooling | Turborepo, pnpm, ESLint, Prettier, Turbopack |
| Error / RUM | Sentry + web-vitals (PHI-safe redaction; no real PHI anyway) |

### 3.2 Monorepo shape (Turborepo)
```
apps/
  marketing/     → public site (SSG/ISR, local content)
  web-app/       → staff console (SSR/RSC + client islands)
  portal/        → patient/partner portals
  dev-portal/    → developer platform + marketplace
packages/
  design-system/ → tokens + primitives + components + Storybook
  api-client/    → typed SDK + TanStack hooks (mock adapters now, real later)
  fhir/          → FHIR R4 resource types/helpers (typed)
  i18n/          → locales + shared formatters
  mock-data/     → synthetic datasets + generators + mock realtime
  config/        → eslint/tsconfig/tailwind presets
```
- 3.2.1 Shared code is always a package, never a copy.
- 3.2.2 `design-system` and `web-app` app shell are built FIRST; every module screen is then an assembly, not a rewrite.

### 3.3 Rendering strategy
- 3.3.1 **Marketing:** SSG/ISR — fully static, edge-cacheable, crawlable. ISR revalidation so content edits publish without full rebuild.
- 3.3.2 **Web app:** App-shell + client islands (SPA-style) for dense interactive screens; SSR/RSC for auth/portal pages where useful.
- 3.3.3 Route-based code-splitting and lazy module loading everywhere.

### 3.4 Folder conventions (per app)
- 3.4.1 `app/` (routes), `components/`, `features/<module>/`, `lib/`, `hooks/`, `stores/`, `content/` (marketing MDX/JSON), `mocks/`.
- 3.4.2 Each module screen is a `feature` composed from design-system archetypes + components.

---

## 4. Mock Data Layer & API-Swap Strategy

The single most important architectural rule: **all data flows through a swappable adapter interface.** UI never calls `fetch` directly.

### 4.1 Adapter contract
- 4.1.1 `@aether/api-client` exposes typed resource hooks (TanStack Query): e.g. `usePatients()`, `useBedBoard()`, `useDenialQueue()`.
- 4.1.2 Each hook is backed by an **adapter**. Two implementations: `mockAdapter` (this phase) and `httpAdapter` (future). Selected by env flag `NEXT_PUBLIC_DATA_SOURCE=mock|http`.
- 4.1.3 Types are shared (generated later from OpenAPI/FHIR); for now hand-authored in `@aether/fhir` and `@aether/api-client`.

### 4.2 Mock datasets (`@aether/mock-data`)
- 4.2.1 Realistic synthetic data for every domain: patients, encounters, orders, results, meds, bills, claims, inventory, staff, rosters, leads, tickets, analytics series. Enough volume to exercise virtualization (10k+ rows where relevant).
- 4.2.2 Deterministic seed so screenshots/tests are stable; a generator for large lists.
- 4.2.3 Referential integrity across domains so the end-to-end patient journey is coherent (a patient registered in §11 appears in §12 chart, §14 billing, etc.).
- 4.2.4 **No real PHI** — clearly synthetic names/IDs.

### 4.3 Mock behaviors
- 4.3.1 **Latency & errors:** adapters simulate network latency, occasional 5xx, 429, and offline to exercise loading/error/retry/offline states.
- 4.3.2 **Mutations:** optimistic updates with rollback; writes persist to in-memory + IndexedDB so the session feels real; `Idempotency-Key` generated per action.
- 4.3.3 **Realtime:** a mock emitter pushes updates on channels (queue boards, bed board, command center, notifications, presence) at configurable intervals; UI shows live/reconnecting/stale.
- 4.3.4 **Offline:** Service Worker caches shell + read models (Dexie); a write queue captures mutations offline and replays on "reconnect"; SyncStatus shows pending count.

### 4.4 Mock auth & session
- 4.4.1 Simulated OIDC + PKCE flow: login screen → mock IdP → mock MFA → in-memory access token + simulated refresh cookie.
- 4.4.2 Role/edition selector at login (or dev switcher) drives permission-aware rendering and role-filtered navigation.
- 4.4.3 Idle auto-lock, "open elsewhere" simulation, break-glass flow, sign-out clears caches — all mocked but behaviorally correct.

### 4.5 Swap-readiness checklist
- 4.5.1 No component imports `fetch`/`axios` directly.
- 4.5.2 All query keys scoped by `tenant + branch + entity`.
- 4.5.3 Error envelope shape `{code, message, requestId, field}` honored by mock adapter so field-level form errors and toasts already work.
- 4.5.4 FHIR-shaped resources where clinical (Patient/Encounter/Observation) so `/fhir/r4` can back them later.

---

# PART 1 — MARKETING WEBSITE

## 5. Marketing IA, Sitemap & Global Chrome

### 5.1 Global navigation (top nav + mega-menus)
| Nav item | Mega-menu children | Intent |
|---|---|---|
| **Product** | Patient Access · Clinical (EMR/OPD/IPD/ER/OT/ICU) · Ancillary (Pharmacy/Lab/Radiology) · Revenue Cycle · Supply Chain · HRM · Analytics · Platform & Admin | Feature depth for evaluators |
| **Solutions** | Clinics · Hospitals · Diagnostics/Labs · Pharmacy Chains · Enterprise Networks · Government/Payer | "Is this for me?" routing |
| **AI** | Ambient Scribe · Clinical Co-pilot · Autonomous RCM · Predictive Ops · NL Analytics | The generational hook |
| **Interoperability** | FHIR · HL7 · DICOM · ABDM/TEFCA/EHDS · Migration & data-freedom | Win the CIO |
| **Security** | Trust Center · Compliance (HIPAA/GDPR/ABDM/SOC 2/ISO) · Sub-processors · Status | De-risk the deal |
| **Pricing** | Editions & per-bed/seat · ROI calculator · What's included | Transparency as a weapon |
| **Customers** | Case studies · Logos · Testimonials · Outcomes | Social proof |
| **Resources** | Blog · Guides · Webinars · Comparisons · Docs · Changelog · Glossary | SEO + nurture |
| **Developers** | API docs · FHIR reference · SMART apps · Marketplace · Sandbox · SDKs | Ecosystem inbound |
| **Company** | About · Careers · Press · Contact · Partners | Trust & hiring |
| **Book a Demo (CTA)** | Persistent primary CTA; secondary "Sign in" → web app | Primary conversion |

- 5.1.1 Header behavior: sticky, condenses on scroll, transparent-over-hero on Home then solid. Mega-menus open on hover (desktop) and tap (mobile drawer). Keyboard-accessible with focus trap and arrow navigation.
- 5.1.2 "Sign in" and "Launch app" route to the web app (`/app` or `app.aether.health`); marketing never authenticates.

### 5.2 URL structure / sitemap
```
/                                  Home
/product                           Product hub
/product/{domain}                  clinical, revenue-cycle, pharmacy, lab, radiology, hrm, analytics, patient-access, supply-chain, platform
/solutions/{edition}               clinics, hospitals, diagnostics, pharmacy, enterprise, government
/ai                                AI hub
/ai/{capability}                   ambient-scribe, clinical-copilot, autonomous-rcm, predictive-ops, nl-analytics
/interoperability                  hub
/interoperability/{standard}       fhir, hl7, dicom, abdm, tefca, ehds, migration
/security                          Trust Center
/security/compliance               compliance detail
/security/status                   status/uptime
/trust                             alias → /security
/pricing                           pricing
/pricing/roi-calculator            interactive calculator
/customers                         case-study index
/customers/{case-study-slug}       case study
/compare/{competitor}              vs-epic, vs-cerner, vs-athenahealth, vs-local-his
/resources                         hub
/resources/blog, /blog/{slug}
/resources/guides, /guides/{slug}
/resources/webinars, /webinars/{slug}
/resources/glossary, /glossary/{term}
/resources/changelog
/developers                        developer hub
/developers/docs                   API/FHIR overview + quickstart
/developers/fhir                   FHIR reference
/developers/marketplace            storefront
/developers/sandbox                sandbox signup (stub)
/company/about
/company/careers, /careers/{job}
/company/press
/company/partners
/contact
/demo                              conversion form
/legal/{privacy|terms|dpa|baa|cookies}
/{locale}/…                        locale-prefixed variants (en, hi, ar-RTL, fr, es, …)
404, 500, offline                  error/offline pages
```
- 5.2.1 The `/compare/*`, `/product/*`, `/solutions/*`, `/resources/*` trees are the organic-search surface — statically generated, each targeting a specific buyer query.

### 5.3 Footer architecture
- 5.3.1 Full sitemap columns (Product, Solutions, AI, Developers, Resources, Company, Legal).
- 5.3.2 Locale switcher, social links, compliance badge row, status-page link, newsletter opt-in (stub), copyright.
- 5.3.3 Region/residency note; "No PHI on this site" trust microcopy.

### 5.4 Persistent CTAs & shared elements
- 5.4.1 Every page: shared header (nav + CTA), footer, and a sticky/exit-intent **Book a Demo** CTA band.
- 5.4.2 Cookie consent banner (consent mode; no non-essential tracking pre-consent).
- 5.4.3 Optional sales chat/concierge widget (stub) with scheduling embed placeholder.
- 5.4.4 Skip-to-content link, breadcrumb trail on deep pages.

### 5.5 Reusable marketing section blocks (build once, compose everywhere)
- 5.5.1 Hero (headline + subhead + dual CTA + product visual).
- 5.5.2 Logo wall / trust bar.
- 5.5.3 Feature block (text + screenshot/GIF), left/right alternating.
- 5.5.4 MOAT callout badge block.
- 5.5.5 Outcome stats row (animated counters, reduced-motion aware).
- 5.5.6 Persona router ("I'm a… CEO/CMO/CFO/CIO").
- 5.5.7 "How it works" flow diagram.
- 5.5.8 Testimonial / quote card + case-study card.
- 5.5.9 Comparison table.
- 5.5.10 Pricing table + add-ons.
- 5.5.11 FAQ accordion.
- 5.5.12 Final CTA band.
- 5.5.13 Capability grid.
- 5.5.14 Compliance badge grid.

---

## 6. Marketing Pages (page-by-page)

Each page below lists **Purpose → Sections/blocks → Conversion role → States**. All pages inherit §5.4 shared chrome. All copy is content-managed (§7.4).

### 6.1 Home `/`
- 6.1.1 **Purpose:** State the thesis, prove trust, route personas, convert a demo.
- 6.1.2 **Sections:** Hero (one-line thesis + product visual + dual CTA "Book demo" / "See it live") → Logo/trust bar → The moat in 3–5 blocks (AI-native, interoperable, mobile-first, fast-to-deploy, honestly priced) → Persona router → Product tour teaser (interactive/looping) → Outcome stats (docs time ↓, denials ↓, collections ↑) → Testimonial + case-study cards → Final CTA band.
- 6.1.3 **Conversion:** Primary = Book a Demo; secondary = See it live (routes to a guided app demo on mock data).

### 6.2 Product hub `/product`
- 6.2.1 **Purpose:** Overview of all domains; route to domain pages.
- 6.2.2 **Sections:** Hero → domain grid (each links to `/product/{domain}`) → platform coherence message → integration list → CTA.

### 6.3 Product domain page `/product/{domain}`
- 6.3.1 **Purpose:** Feature depth per domain for evaluators.
- 6.3.2 **Sections:** Domain hero + problem statement → feature blocks with real app screenshots/GIFs → MOAT badge callouts → "How it works" flow diagram (mirrors the module workflow) → related module cross-links + integration list → mini case study → CTA.
- 6.3.3 Domains: patient-access, clinical, revenue-cycle, pharmacy, lab, radiology, hrm, analytics, supply-chain, platform.

### 6.4 Solutions page `/solutions/{edition}`
- 6.4.1 **Purpose:** "Is this for me?" per buyer edition.
- 6.4.2 **Sections:** Edition-tuned hero (Clinic/Hospital/Lab/Pharmacy/Enterprise/Government) → pain points for that buyer → module bundle for that edition → time-to-go-live + pricing entry point → relevant proof + region/compliance fit → CTA.

### 6.5 AI hub `/ai` and `/ai/{capability}`
- 6.5.1 **Purpose:** The generational hook; deep pages per capability.
- 6.5.2 **Hub sections:** Ambient-scribe demo (before/after note) → guardrails/safety (human-in-the-loop, explainability) → capability grid → "How your data stays safe" (de-identification, VPC models) → CTA.
- 6.5.3 **Capability pages:** ambient-scribe, clinical-copilot, autonomous-rcm, predictive-ops, nl-analytics — each with problem, how it works, safety, proof, CTA.

### 6.6 Interoperability `/interoperability` + `/interoperability/{standard}`
- 6.6.1 **Purpose:** Win the CIO.
- 6.6.2 **Sections:** Standards hero (FHIR/HL7/DICOM/ABDM/TEFCA/EHDS) → migration & data-freedom angle → per-standard detail pages → developer cross-link → CTA.

### 6.7 Security / Trust Center `/security`, `/security/compliance`, `/security/status`
- 6.7.1 **Purpose:** De-risk the deal.
- 6.7.2 **Sections:** Compliance badges (HIPAA/GDPR/ABDM/SOC 2/ISO 27001) → security posture (encryption, RBAC/ABAC, audit, residency) → sub-processor list + DPA/BAA download (stub files) + responsible-disclosure → live status page link + uptime history.
- 6.7.3 **Status page `/security/status`:** component status grid, incident history, uptime chart (mock feed).

### 6.8 Pricing `/pricing` + ROI calculator `/pricing/roi-calculator`
- 6.8.1 **Purpose:** Transparency as a weapon.
- 6.8.2 **Pricing sections:** Transparent per-bed/per-seat table by edition → add-ons → usage → "what's included" → implementation tiers → FAQ → CTA.
- 6.8.3 **ROI calculator:** interactive inputs (beds, denial rate, doc time) → estimated payback (computed client-side) → capture lead (stub form). Real-time recompute, shareable result URL, reduced-motion aware.

### 6.9 Customers `/customers` + case study `/customers/{slug}`
- 6.9.1 **Index:** logo wall, filterable case-study cards, outcomes highlights.
- 6.9.2 **Case study:** Challenge → solution → hard metrics → quote; edition/region context; module list used; CTA.

### 6.10 Comparison `/compare/{competitor}` (SEO)
- 6.10.1 **Purpose:** Capture "Epic alternative"-type queries; build trust with candor.
- 6.10.2 **Sections:** Honest, sourced feature table → "where we win / where they're strong" → migration & data-freedom angle → CTA to demo.
- 6.10.3 Slugs: vs-epic, vs-cerner, vs-athenahealth, vs-local-his.

### 6.11 Resources
- 6.11.1 **Hub `/resources`:** featured content, category tiles, search.
- 6.11.2 **Blog `/blog/{slug}`:** article layout, author card, related posts, share, JSON-LD Article, TOC.
- 6.11.3 **Guides `/guides/{slug}`:** long-form, often gated (email → download stub → nurture).
- 6.11.4 **Webinars `/webinars/{slug}`:** registration/replay (stub), speaker cards.
- 6.11.5 **Glossary `/glossary/{term}`:** definition pages (SEO), internal linking.
- 6.11.6 **Changelog `/resources/changelog`:** dated release notes, filter by product area.

### 6.12 Developers
- 6.12.1 **Hub `/developers`:** API/FHIR overview, quickstart, value props.
- 6.12.2 **Docs `/developers/docs`:** interactive reference (mock OpenAPI explorer), quickstart, auth guide.
- 6.12.3 **FHIR `/developers/fhir`:** resource reference, SMART-on-FHIR framework.
- 6.12.4 **Marketplace `/developers/marketplace`:** app storefront cards, categories, detail pages.
- 6.12.5 **Sandbox `/developers/sandbox`:** signup (stub) that would provision a sandbox tenant; SDK downloads; changelog; webhooks docs.

### 6.13 Company
- 6.13.1 **About `/company/about`:** mission, team, timeline, values.
- 6.13.2 **Careers `/company/careers` + `/careers/{job}`:** open roles list (filter by dept/location), job detail + apply (stub form), JSON-LD JobPosting.
- 6.13.3 **Press `/company/press`:** press releases, media kit, coverage.
- 6.13.4 **Partners `/company/partners`:** partner tiers, become-a-partner CTA.
- 6.13.5 **Contact `/contact`:** contact options, office map, general inquiry form (stub).

### 6.14 Demo / Contact conversion `/demo`
- 6.14.1 **Purpose:** Primary conversion surface.
- 6.14.2 **Sections:** Qualification form (role, org size, region, edition, timeline) → calendar embed (stub) → instant-confirmation → routing-to-sales (stub) → optional self-serve trial signup ("provisions a sandbox tenant" — stub).
- 6.14.3 Forms short, progressive, pre-filled from known context (UTM/persona/page). Payload carries UTM + page + persona (logged to console/mock CRM endpoint).

### 6.15 Legal `/legal/{privacy|terms|dpa|baa|cookies}`
- 6.15.1 Long-form legal layout with TOC, last-updated date, print styles; content-managed.

### 6.16 System pages
- 6.16.1 **404:** on-brand, helpful links + search.
- 6.16.2 **500 / error boundary:** friendly recovery.
- 6.16.3 **Offline:** shown when SW detects offline.

---

## 7. SEO, Conversion, Content & Analytics

### 7.1 Rendering & SEO
- 7.1.1 SSG/ISR for all content & landing pages (fast TTFB, crawlable, cheap at edge). ISR revalidation.
- 7.1.2 Server-rendered metadata, Open Graph, Twitter cards per page (Next.js Metadata API).
- 7.1.3 Automatic `sitemap.xml`, `robots.txt`, canonical tags, `hreflang` for locales.
- 7.1.4 Structured data (JSON-LD): Organization, Product, SoftwareApplication, FAQ, Article, BreadcrumbList, JobPosting.
- 7.1.5 Semantic HTML, one `H1` per page, descriptive headings, alt text.
- 7.1.6 Clean URLs, internal linking hubs (product ↔ solution ↔ compare ↔ blog).
- 7.1.7 Core Web Vitals as a ranking + UX gate (§22).

### 7.2 Conversion doctrine
- 7.2.1 Every page ends in a CTA; every CTA is instrumented.
- 7.2.2 Primary conversion = Book a Demo; secondary = Start free trial / sandbox; tertiary = gated content download → email → nurture.
- 7.2.3 Forms short, progressive, pre-filled from context.

### 7.3 Lead capture (frontend, stubbed)
- 7.3.1 Forms → client validation (Zod) → serverless handler stub (Next.js route handler that logs/echoes) → future CRM. Payload includes UTM, page, persona, consent; double-opt-in where required.
- 7.3.2 Persist UTM params to first-party storage on landing; attach to all subsequent form submits.

### 7.4 Content management (CMS-ready, local now)
- 7.4.1 Content authored as local MDX/JSON in `apps/marketing/content`, structured to the CMS models so a headless CMS (Sanity/Contentful/Strapi) can replace the loader later without page changes.
- 7.4.2 Content models: `Page`, `ModulePage`, `SolutionPage`, `ComparisonPage`, `CaseStudy`, `BlogPost`, `Author`, `Testimonial`, `PricingPlan`, `Job`, `LegalDoc`, `GlossaryTerm`, `ChangelogEntry`.
- 7.4.3 Preview-mode plumbing stubbed for future draft rendering.

### 7.5 Experimentation & analytics
- 7.5.1 A/B testing readiness: edge/flag-based experiment hook (mock flag provider); guardrail on Web Vitals.
- 7.5.2 Privacy-respecting analytics (GA4/Plausible adapter, gated by consent). Funnel events: visit → engaged → demo-request → (SQL, future).
- 7.5.3 Consent/cookies: banner + consent mode; no non-essential tracking pre-consent (GDPR).
- 7.5.4 Chat/concierge widget stub routed to a mock SDR handler; scheduling embed placeholder.
- 7.5.5 Performance budget: LCP < 2.0s, CLS < 0.1, INP < 200ms on marketing pages.

### 7.6 Separation of concerns
- 7.6.1 The marketing site never touches PHI and never authenticates staff. "Sign in" / "Launch app" simply route to the web app. Separate app, separate deploy pipeline, separate analytics.

---

# PART 2 — WEB APPLICATION FOUNDATIONS

## 8. App Shell & Global Navigation

The persistent chrome wrapping every staff-console screen. Built once, used by all modules. Role + edition config decide what appears.

### 8.1 Shell anatomy
```
┌───────────────────────────────────────────────────────────────────────┐
│ TOP BAR  Æ │ Tenant▾ Branch▾ │ ⌕ Global search │ ⌘K │ 🔔 │ ? │ 👤     │
├──────────┬──────────────────────────────────────────────┬─────────────┤
│ LEFT NAV │ CONTEXT BAR  Patient: Meera S. · UHID · Enc … │ RIGHT RAIL  │
│ role-    │ breadcrumbs › module › screen                │ AI co-pilot │
│ filtered │                                              │ My tasks    │
│ modules  │ MAIN WORKSPACE (worklist / chart / board /   │ Alerts      │
│ +favs    │                 form / dashboard)            │             │
│ +recent  │                                              │             │
└──────────┴──────────────────────────────────────────────┴─────────────┘
```

### 8.2 Top bar
- 8.2.1 **Tenant/branch switcher** — pivots context; drives every query's scope (mock updates data + brand tokens).
- 8.2.2 **Global search** — patients, encounters, orders, invoices, staff, items; type-ahead; scoped by permission.
- 8.2.3 **Command palette (`⌘K`)** — navigate to any screen, run actions ("Admit patient", "New PO"), jump to a patient.
- 8.2.4 **Notifications** — real-time bell (mock stream: results, approvals, critical alerts) with action buttons.
- 8.2.5 **Help** — contextual docs, keyboard-shortcut sheet, support.
- 8.2.6 **Profile** — role, on-call status, theme, language, density, sign-out, break-glass indicator.

### 8.3 Left navigation
- 8.3.1 Role-filtered module list (a nurse never sees Finance); edition-filtered (Clinic hides IPD/OT).
- 8.3.2 Grouped by domain: Patient Access, Clinical, Ancillary, Revenue, Supply, HRM, CRM/Quality, Analytics, Admin.
- 8.3.3 Collapsible; pin favorites; recent screens; badge counts (pending tasks per module).
- 8.3.4 Deep-linkable; keyboard-navigable; remembers last screen per module.

### 8.4 Context bar (the pin)
- 8.4.1 Sticky current patient/encounter across screens — order labs, then bill, without re-selecting.
- 8.4.2 Shows UHID, age/sex, allergies flag, encounter class, bed, attending, alerts.
- 8.4.3 Breadcrumbs + tabs for the active module.
- 8.4.4 Clear/switch patient explicitly; multi-patient pinning for ward rounds.

### 8.5 Right rail (assist)
- 8.5.1 **AI co-pilot** — chart-aware Q&A, summarize, draft (advisory, cited; mock responses).
- 8.5.2 **My tasks** — assigned to-dos across modules.
- 8.5.3 **Alerts** — CDSS, critical values, approvals awaiting me.
- 8.5.4 Collapsible to reclaim width for dense boards.

### 8.6 Global behaviors
- 8.6.1 **Deep-linkability:** every screen state (filters, selected patient, open tab, drawer) encoded in the URL — shareable, bookmarkable, restorable after refresh.
- 8.6.2 **Session & presence:** idle auto-lock (configurable), "open elsewhere" detection, presence on shared records (mock).
- 8.6.3 **Kiosk/board modes:** same shell renders in locked full-screen variants (check-in kiosk, queue display, ward board) with no nav chrome.
- 8.6.4 **Theming/white-label:** tenant logo, color token overrides, density per user.
- 8.6.5 **Permission-aware rendering:** actions/fields the user can't perform are hidden or disabled with a reason — never fail on submit.

---

## 9. Screen Archetypes

Six reusable archetypes. Every module screen in §11–§19 is an instance of one. Build the archetypes well once → coherence at scale. Each is a design-system template, not a bespoke page.

### 9.1 Worklist / Queue
- 9.1.1 **Anatomy:** filter bar → virtualized table/list → row actions → bulk action bar → saved views → detail drawer.
- 9.1.2 **Components:** DataGrid, FilterChips, SavedViewMenu, BulkBar, StatusChip, Pagination/infinite-scroll.
- 9.1.3 **States:** loading skeleton, empty, filtered-empty, error+retry, offline (cached), permission-scoped.

### 9.2 Record / Chart
- 9.2.1 **Anatomy:** header (identity + key facts) → left summary → tabbed body → timeline → audit drawer.
- 9.2.2 **Components:** EntityHeader, Tabs, Timeline, Flowsheet, SectionCard, AuditDrawer, AlertBanner.
- 9.2.3 **States:** loading, partial (lazy tabs), read-only, amend-mode, conflict, offline-cached.

### 9.3 Form / Wizard
- 9.3.1 **Anatomy:** stepper or single form → validated fields → autosave → review → submit.
- 9.3.2 **Components:** FormRenderer (schema-driven), FieldKit, Stepper, InlineValidation, AutosaveBadge, ReviewSummary.
- 9.3.3 **States:** dirty/clean, validating, error-per-field, autosaving, submitting, success, offline-queued.

### 9.4 Board
- 9.4.1 **Anatomy:** columns/lanes or grid of cards → drag-drop → live updates → quick actions on card.
- 9.4.2 **Components:** KanbanColumn, DraggableCard, BedTile, DropZone, LiveBadge, MiniLegend.
- 9.4.3 **States:** live-connected, reconnecting, drag-in-progress, conflict-on-drop, capacity-full.

### 9.5 Dashboard
- 9.5.1 **Anatomy:** KPI tile row → chart grid → filters/date-range → drill-down → export/schedule.
- 9.5.2 **Components:** KPITile, ChartCard, DateRangePicker, DrillLink, ExportMenu, NLQueryBar.
- 9.5.3 **States:** loading, streaming/live, stale-data indicator, empty-range, drill-error.

### 9.6 Detail + Audit
- 9.6.1 **Anatomy:** read view of one entity → action toolbar → related items → versioned audit trail drawer.
- 9.6.2 **Components:** DetailPane, ActionToolbar, RelatedList, AuditTrail, VersionDiff.
- 9.6.3 **States:** read-only, editable, superseded-version, restore-confirm.

### 9.7 Shared cross-archetype elements
- 9.7.1 Status chips (fixed semantics), severity banners (safety), toasts (non-blocking).
- 9.7.2 Empty states that teach the next action; per-panel error boundaries (one failure never blanks the screen).
- 9.7.3 Optimistic updates with rollback; autosave everywhere text is typed.
- 9.7.4 Right-drawer for peek-without-leaving; command palette for action-without-navigating.
- 9.7.5 Print/export layouts for anything a hospital puts on paper (prescriptions, reports, bills, discharge summaries).

### 9.8 Why archetypes, not pages
- 9.8.1 A biller's Denial Queue and a nurse's Task List are the *same* Worklist archetype with different columns/filters/actions — configured, not re-coded. This is "configurable, not customized" expressed in the frontend.

---

## 10. Component Library Catalog (`@aether/design-system`)

Tokens → primitives → components → patterns → archetypes. Documented in Storybook, visual-regression-tested, themeable via tokens. Build order = foundational first.

### 10.1 Token layers
| Layer | Contents |
|---|---|
| Core tokens | Color scales, spacing, radius, elevation, type scale, z-index, motion durations (§2) |
| Semantic tokens | `--color-surface`, `--color-text`, `--color-danger`, `--status-critical` — map to core; drive light/dark & white-label |
| Density tokens | Comfortable vs compact — row height, padding, font |
| Brand override | Per-tenant logo + primary color injected at runtime (CSS vars), no rebuild |

### 10.2 Primitives
Button, IconButton, Input, Select, Combobox, DatePicker, Checkbox, Radio, Switch, Textarea, Tag/Chip, Tooltip, Badge, Avatar, Spinner, Skeleton, Icon set.

### 10.3 Layout & Nav
AppShell, TopBar, SideNav, ContextBar, RightRail, Tabs, Breadcrumbs, CommandPalette, Drawer, Modal, Popover, SplitPane, Stepper.

### 10.4 Data display
DataGrid (virtualized), Table, Timeline, Flowsheet, KPITile, ChartCard (line/bar/area/donut/gauge), StatDelta, DescriptionList, EmptyState, StatusChip, SeverityBanner.

### 10.5 Forms
FormRenderer (JSON-schema-driven), FieldKit, ValidationMessage, AutosaveBadge, FileUpload, SignaturePad, BarcodeScannerField, DosageInput, CodeSearch (ICD/SNOMED/LOINC/Rx typeahead).

### 10.6 Clinical specials
AllergyBanner, InteractionAlert, VitalsChart, BedTile, MedAdminRow (5-rights), OrderSetPicker, DicomViewer embed, NoteEditor (SOAP templates), TriageBadge.

### 10.7 Feedback & system
Toast, InlineAlert, ConfirmDialog (type-to-confirm), AuditTrail, PresenceIndicator, OfflineBanner, SyncStatus, PermissionGate, ErrorBoundary.

### 10.8 Highest-leverage components (invest disproportionately)
- 10.8.1 **FormRenderer** — turns JSON (emitted by the no-code Form Builder, §17) into a live, validated, offline-capable form. No per-form code.
- 10.8.2 **DataGrid** — worklist columns/filters are config, not code. Most of the 50 modules are assembled from these two + archetypes.

### 10.9 Governance
- 10.9.1 Every component ships with Storybook stories (all states), axe a11y tests, and visual-regression snapshots (Chromatic).
- 10.9.2 Versioned package; changelog; deprecation policy; no app forks a component — contributes upstream.
- 10.9.3 Accessibility baked in at the primitive level (focus rings, ARIA, keyboard) so apps inherit it.
- 10.9.4 Design ↔ code parity: Figma library mirrors tokens/components.

---

# PART 3 — WEB APPLICATION SCREENS (BY MODULE DOMAIN)

> Format for every module: **Page → Archetype → Key Components · Actions · States**. All render on mock data with every designed state. MOAT-marked screens are the flagship experiences.

## 11. Patient Access & Front Office

Speed and dedupe are everything — screens measured in seconds and clicks.

### 11.1 Registration & Master Patient Index (UHID)
| Page | Archetype | Key components · actions · states |
|---|---|---|
| Patient Search / Dedupe | Worklist | Fuzzy search (name+DOB+phone+ID), result grid with match-confidence, "possible duplicate" flag. Actions: open, register-new, merge. States: no-match→register, multi-match→disambiguate. |
| Quick Register | Form | Minimal fields + OCR ID capture (mock) + camera photo (mock) + OTP verify (mock). Actions: assign UHID, print card/QR, invite portal. States: unverified vs verified. |
| Full Register | Form/Wizard | Demographics, contacts, tokenized national ID, allergies, chronic flags, language, consents, insurance, family links. Autosave; validation. |
| Patient Merge | Detail+Audit | Side-by-side field diff, choose surviving record, preview impact, confirm (type-to-confirm), full audit. State: irreversible-warning. |
| Special flows | Form | Minor/newborn/unconscious/John-Doe variants (reduced-field, guardian-linked). |
- 11.1.1 **MOAT:** OCR ID + auto-ABHA + fuzzy dedupe → <30-second registration; dedupe grid renders instantly as the receptionist types (keyboard-driven, not a slow form).

### 11.2 Appointments & Queue
| Page | Archetype | Key components · actions · states |
|---|---|---|
| Slot Calendar / Booking | Board + Form | Specialty/doctor finder, availability grid (day/week), multi-resource slot (doctor+room+equipment), price/deposit, confirm. Actions: book, reschedule (drag), cancel. States: overbooking-allowed, buffer-block, waitlist. |
| Appointment Worklist | Worklist | Today's/upcoming, filters (doctor/status/channel), no-show flag, reminders sent. Bulk reminder, reassign. |
| Check-in Kiosk | Kiosk form | Self check-in (QR/phone), consent/intake forms, payment; issues token. Locked full-screen mode. |
| Live Queue / Token Board | Board (display) | Real-time token queue per doctor/room; call-next, hold, wait-time; wall-display variant. Live (mock WebSocket). |
| Recurring Series | Form/Wizard | Dialysis/chemo/physio series scheduling with rules. |
- 11.2.1 **MOAT:** ML no-show score chip per appointment; board suggests smart overbooking; reminders + one-tap reschedule links generated here.

### 11.3 Patient / Family Web Portal & Digital Front Door
(Portal surface — see also §19.1)
| Page | Archetype | Key components · actions · states |
|---|---|---|
| Portal Home | Dashboard | Upcoming visits, pending bills, results ready, care-plan tasks, family switcher. Mobile-first. |
| Symptom Checker → Book | Form/Wizard | Guided triage → suggested specialty → slot → pre-filled intake. |
| Records & Reports | Record | Timeline of encounters, lab/radiology reports, prescriptions; plain-language AI explanations; download/share. |
| Bills & Pay | Worklist+Form | Itemized bills, estimates, pay (gateway stub), claims status, tax/insurance docs. |
| Teleconsult | Form+Video | Waiting room, video/audio (mock), in-call chat, e-prescription receipt, follow-up booking. |
| Consent Ledger (MOAT) | Detail+Audit | See/grant/revoke each data use & share; cryptographic audit view. Patient operates their own privacy. |
| Family Accounts | Detail | Manage dependents, delegated access, per-member records. |

### 11.4 Teleconsultation (clinician side)
- 11.4.1 Waiting-room queue (Worklist) → live encounter (split: video + chart + order/e-prescribe) → consent-to-record, e-signature Rx (mock), live wearable/RPM vitals streaming into the encounter (mock), fallback-to-phone. Reuses the OPD consult workspace (§12.2) with a video pane.

---

## 12. Clinical Core

The heart of the product. Ordered by the encounter journey: EMR → OPD → IPD → ER → OT → ICU → Nursing → CDSS.

### 12.1 EMR / EHR — the longitudinal chart
| Page | Archetype | Key components · actions · states |
|---|---|---|
| Patient Chart | Record/Chart | Identity header (allergies banner, alerts), tabs: Timeline · Problems · Allergies · Meds · Results · Notes · Documents · Images · Immunizations · Growth charts · Care plans. Version history; amend-not-overwrite. |
| Problem List | Worklist | Coded conditions (ICD-10/SNOMED via CodeSearch), status, onset, sort by acuity. Add/resolve. |
| Results & Flowsheets | Record | Trended labs/vitals (VitalsChart, Flowsheet), delta/critical highlighting, LOINC-coded, compare-over-time. |
| Note Editor (SOAP) | Form | Specialty templates, NoteEditor, autosave, version diff, co-sign. Ambient-scribe review pane. |
- 12.1.1 **MOAT · Ambient Scribe surface:** review pane — mic capture → streaming live transcript → AI-structured SOAP + coded problems + draft orders + draft Rx → clinician reviews a diff and one-tap signs. Frontend: WebAudio capture (mock stream), streaming partial results, accept/edit/reject-per-section UX, "nothing commits without signature."

### 12.2 OPD — outpatient consult
- 12.2.1 Consult Workspace (Record + inline forms): history/exam/diagnosis, order entry (OrderSetPicker by complaint, favorites), e-prescribe (interaction-checked), quick-bill, referral-out, follow-up. Co-pilot suggests differentials/orders from the note; gaps-in-care banner. States: draft encounter, signed, addended.

### 12.3 IPD — inpatient
| Page | Archetype | Key components · actions · states |
|---|---|---|
| Admission | Form/Wizard | Admit request → bed selection → deposit → orders. Consent capture; MLC flag. |
| Bed Board | Board | Ward/floor grid of BedTiles: occupied/vacant/cleaning/reserved/blocked; drag-drop transfer; housekeeping/turnaround; live. States: capacity-full, isolation, conflict-on-drop. |
| Doctor Rounds | Record | Round list (multi-patient pin), progress notes, order management, results review. AI-drafted daily note. |
| Discharge Workbench | Form/Wizard | Readiness checklist (pending orders/bills block discharge), AI-drafted discharge summary, medication reconciliation, follow-up, patient-instructions print. States: blocked, ready, discharged. |
- 12.3.1 **MOAT:** AI discharge-summary draft; predicted length-of-stay + discharge-barrier alerts on bed board and workbench.

### 12.4 Emergency (ER)
- 12.4.1 Triage screen (Form: ESI/Manchester → TriageBadge) → ER Board (Board: patients by acuity, time-to-doctor timers, disposition lanes admit/ICU/OT/discharge/refer) → rapid registration, stabilization orders, MLC handling, mass-casualty mode (simplified high-throughput layout), unknown-patient flow. Deterioration early-warning + surge-prediction banners.

### 12.5 Operation Theatre (OT)
- 12.5.1 OT Scheduler (Board: conflict-free booking of OT+surgeon+anesthetist+equipment) → Pre-op checklist + WHO surgical safety checklist (Form, gated: consent + fitness verification) → Intra-op record (notes, consumable/implant capture with traceability) → PACU/recovery + post-op orders → OT utilization dashboard (turnaround analytics; auto-captured billable consumables).

### 12.6 ICU / Critical Care
- 12.6.1 ICU Flowsheet (Record/Flowsheet: device-integrated vitals auto-charted from monitors/ventilators — mock streams, fluid balance, infusion charting), scoring (APACHE/SOFA calculators), daily goals, protocolized order sets, step-down/transfer. Tele-ICU command view (Board across beds/units); sepsis & deterioration ML alerts as severity banners.

### 12.7 Nursing & eMAR
- 12.7.1 Nursing Worklist (assigned patients, due tasks, overdue escalations) → eMAR (MedAdminRow with barcode 5-rights verification — wrong-med block), vitals capture, intake/output, care-plan tasks, SBAR shift handover (AI-summarized). Offline-tolerant; closed-loop Rx→dispense→administration status.

### 12.8 CDSS & Care Pathways
- 12.8.1 **MOAT · the safety layer, everywhere:** CDSS is not a screen — it is a set of components woven through every clinical write surface: InteractionAlert (drug–drug/allergy/dose/duplicate) at order/prescribe/dispense, renal/hepatic dose-adjustment prompts, evidence-linked OrderSetPicker, risk scores (NEWS2/sepsis/VTE/falls) on charts.
- 12.8.2 Every alert renders "why" + evidence link inline and supports acknowledge-with-reason (anti-alert-fatigue UX).
- 12.8.3 A dedicated Care Pathway board tracks a patient along a protocol with variance flags.

---

## 13. Ancillary & Diagnostics

Order-driven engines; worklist-heavy with device/analyzer integration surfaced (mock).

### 13.1 Pharmacy
| Page | Archetype | Key components · actions · states |
|---|---|---|
| Rx Queue | Worklist | Incoming e-prescriptions, priority, clinical verification, interaction/formulary check. Actions: verify, substitute, dispense, hold. |
| Dispensing | Form | Batch/expiry FEFO pick (barcode), label print, quantity, counseling notes. Controlled-substance register. States: partial-fill, out-of-stock→substitute. |
| OTC Sale / Returns | Form | POS-style sale, returns, refunds. |
| Ward Stock & Near-Expiry | Worklist | Ward inventory, near-expiry alerts, auto-reorder triggers. |
- 13.1.1 **MOAT:** closed-loop with eMAR; multi-location (retail + hospital + ward) on one stock ledger surfaced in the same UI.

### 13.2 Laboratory (LIS)
| Page | Archetype | Key components · actions · states |
|---|---|---|
| Order Entry | Form | Test catalog, panels, reflex rules, ask-at-order questions, priority. |
| Phlebotomy / Collection | Worklist | Pending draws, label/barcode print, collection confirmation. |
| Sample Tracking / Accession | Worklist | Specimen status timeline (collected→received→in-process), rejection reasons. |
| Analyzer Worklist & Result Validation | Worklist | Bidirectional analyzer results (ASTM/HL7 — mock), auto-verification of normals, delta checks, critical-value alert + acknowledgment, manual validation, digital sign-off. |
| Report Designer & QC | Form/Dashboard | Report layout, LOINC coding, Levey-Jennings QC charts. Patient-friendly AI explanation attached. |

### 13.3 Radiology (RIS + PACS)
- 13.3.1 Radiology Worklist (modality worklist / DICOM MWL, scheduling, dose tracking) → Zero-footprint DICOM Viewer (Cornerstone/OHIF embedded in the record: window/level, measure, prior-study compare — mock studies) → Structured Reporting (voice reporting, templates) → publish. Critical-finding notification workflow; AI pre-read triage flags (critical CT/CXR) as priority chips; contrast-allergy check.

### 13.4 Blood Bank
- 13.4.1 Donor Registration & Screening (Form), Inventory (Worklist by component/group, expiry + IoT cold-chain temperature monitoring — mock), Cross-match & Issue (Form: group/cross-match verification gates, vein-to-vein traceability), Transfusion & Adverse-Reaction reporting. **MOAT:** network-wide inventory prediction dashboard.

### 13.5 Ambulance / EMS
- 13.5.1 Dispatch Board (Board: requests, nearest-available crew/vehicle, GPS map — mock), ePCR (pre-hospital care record form), Pre-arrival Alert pushing live ETA + vitals to the ER board. Web = dispatch + command (field/home-care is mobile).

### 13.6 Biomedical
- 13.6.1 Asset register (Worklist), preventive-maintenance schedule (Board/calendar), breakdown tickets, calibration, AMC/warranty. IoT uptime + predictive-maintenance dashboard.

### 13.7 Diet & Kitchen
- 13.7.1 Per-patient diet orders (Form: therapeutic rules, allergy/NPO safety), kitchen production worklist, tray-tracking board.

### 13.8 CSSD & Mortuary
- 13.8.1 CSSD sterile-cycle traceability worklist (wash→pack→sterilize→issue, set barcodes); mortuary intake/release + death-record forms.

---

## 14. Revenue Cycle & Finance

Dense, high-throughput worklists with AI assist. The CFO's reason to buy.

### 14.1 Billing & Charge Capture
| Page | Archetype | Key components · actions · states |
|---|---|---|
| Billing Desk | Worklist | Open bills by patient/encounter, auto-captured ChargeItems (zero missed charges), pending approvals. Filters, bulk finalize. |
| Bill / Invoice Builder | Form | Itemized charges, package vs FFS, discounts (approval-gated), tax rules, credit limit, deposit/advance, split billing (patient vs insurer), payment (multi-mode), receipt, refund. States: draft, provisional, finalized, refunded. |
| Real-Time Estimate (MOAT) | Form | Price-transparency estimate for patients before service. |
| Cashier / Collections | Worklist | Day-book, shift reconciliation, mode-wise collection, deposits. |

### 14.2 Insurance / TPA / Claims — Autonomous RCM
| Page | Archetype | Key components · actions · states |
|---|---|---|
| Eligibility & Benefits | Form | Real-time eligibility check, coverage details, co-pay estimate. |
| Pre-Auth Workbench | Worklist+Form | Pre-auth requests, status tracking, document attach, payer responses. |
| Coding Review (MOAT) | Worklist | AI-suggested ICD-10/CPT/SNOMED from the note; coder confirms low-confidence items; confidence chips. |
| Claim Builder & Scrubbing | Form | Assemble claim, pre-submission scrub (error highlights → clean-claim rate ↑), submit (X12/portal — mock). States: draft, scrubbed-clean, error, submitted. |
| Denial Queue (MOAT) | Worklist | Denied/at-risk claims, denial-prediction flags, auto-drafted appeal letters, resubmit. Human approves submission/appeal. |
| Remittance / Settlement | Worklist | 835 posting, reconciliation, short-pay handling. |
- 14.2.1 **MOAT:** Denial Queue + Coding Review + Claim Scrubbing trio — AI-assisted worklists where the human accepts/overrides. Frontend must make "AI proposed vs human decided" unambiguous and fully audited.

### 14.3 Finance & Accounts
- 14.3.1 General Ledger (Worklist), Journal Entry (Form, maker-checker), AR/AP aging (Dashboard+Worklist), Cash & Bank reconciliation, Cost Centers, Tax filing, Fixed Assets, Financial Statements (P&L/Balance Sheet/Cash Flow dashboards), Budgeting. **MOAT:** clinical→financial auto-posting; real-time revenue/margin by dept/doctor/service.

### 14.4 Pricing, Packages & Contracts
- 14.4.1 Price-list manager (Worklist/Form), surgical/health-check package builder, corporate/payer contract config, dynamic discount rules, estimate generation. **MOAT dashboard:** package profitability + leakage detection.

---

## 15. Supply Chain & Assets

Approval-chain and worklist heavy, with ML forecasting surfaced as recommendations.

### 15.1 Inventory
| Page | Archetype | Key components · actions · states |
|---|---|---|
| Stock Dashboard | Dashboard | Stock value, low-stock, near-expiry, dead-stock, consumption trends, multi-store view. |
| Item & Batch Ledger | Worklist | Item master, batch/expiry (FEFO), stock ledger per store (central/ward/pharmacy/OT), barcode/RFID. |
| Indent / Stock Transfer | Form | Raise indent, inter-store transfer, approval, receipt. States: requested, approved, in-transit, received. |
| Cycle Count / Audit | Form/Worklist | Physical count, variance reconciliation. |
- 15.1.1 **MOAT:** ML demand-forecast → auto-reorder suggestions; near-expiry & dead-stock alerts; consumption tied to patient/procedure for costing.

### 15.2 Procurement & Purchase
- 15.2.1 Requisition (Form) → RFQ & Quotation Comparison (Worklist, side-by-side) → Approval Chain (workflow-driven, multi-level, budget check) → Purchase Order (Form) → GRN & 3-way match (Form) → Invoice & Payment. **MOAT:** supplier scoring + spend analytics dashboard; auto-PO from reorder triggers.

### 15.3 Suppliers & Vendor Portal
- 15.3.1 Internal: vendor master, contracts, performance scorecards (quality/on-time/price), payment tracking, compliance docs (Worklist+Detail).
- 15.3.2 External vendor web portal (separate surface, §19.3): submit quotes, view POs, upload invoices.

### 15.4 Asset & Equipment Lifecycle
- 15.4.1 Capital asset register, depreciation schedule, warranty/AMC, maintenance calendar (Board), retirement (Worklist+Detail). Links to Biomedical (§13.6). TCO + uptime dashboards.

---

## 16. Workforce (HRM)

Clinical-aware HR; grid- and approval-heavy, plus an employee self-service portal.

| Module | Archetype | Key screens · components · actions |
|---|---|---|
| Recruitment & Onboarding | Worklist/Board | Requisition, job posts, applicant-tracking Kanban (stages), interview scheduling, offer, onboarding checklist. Auto-provision access & role on join. |
| Employee Master | Record | Profile, documents, qualifications, dependents, history, exit. Single source feeding payroll/roster/credentialing. |
| Credentialing & Licensing | Worklist | Licenses/certs/privileges with expiry tracking; expiry alerts block scheduling if lapsed. Compliance-critical. |
| Attendance | Worklist | Biometric/GPS/face punches (mock), shift validation, overtime, exceptions review/approve. |
| Shift & Roster | Board (grid) | Rule-based rostering grid across wards/departments, swap requests, coverage-gap highlighting. AI roster optimization vs demand forecast + skill mix. |
| Leave | Worklist/Form | Policy-driven accrual, approval chains, balances, holiday calendars; coverage-aware approval (blocks understaffing). |
| Payroll | Form/Worklist | Attendance import → earnings/deductions → statutory (PF/ESI/tax) → payslip → bank file. Multi-country statutory engine; payroll-run review + lock. |
| Performance | Form/Dashboard | Goals, appraisal cycles, 360 feedback, clinical competencies; links quality metrics to clinician scorecards. |
| Employee Self-Service (ESS) | Dashboard | Attendance, leave, payslips, documents, requests, approvals. Mirrors the HR mobile app. |

---

## 17. CRM, Quality & Admin / Platform

Engagement, governance, and the configuration surfaces ("configurable, not customized"). Workflow Studio + Form Builder are the flagship web builds.

### 17.1 CRM & Patient Engagement
- 17.1.1 Leads/Enquiries (Board: capture→qualify→nurture→convert→retain→win-back), Campaigns (health camps/screenings), Referral Management (doctor & corporate; referral ROI dashboard), Feedback/NPS (Worklist+Dashboard), Complaints/Grievance (Worklist with SLA/escalation), Loyalty. **MOAT:** recall campaigns from clinical data (overdue follow-ups, chronic care), churn prediction.

### 17.2 Quality, Accreditation & Risk
- 17.2.1 NABH/JCI/ISO checklist workbenches (Form + evidence attach), Clinical Quality Indicators (Dashboard: infection/mortality/readmission), Incident Reporting & RCA (Form/Worklist), Patient-Safety Events, Audits & CAPA (Worklist). **MOAT:** accreditation data auto-collected from live operations — real-time quality dashboards.

### 17.3 Admin & Platform — configuration surfaces
| Screen | Archetype | Key components · actions |
|---|---|---|
| Masters Management | Worklist/Form | Hospital/branches/departments/designations/services/wards/beds/tax/holidays/shifts/payment-modes/insurance-plans/item-masters. CRUD with audit. |
| Users, Roles & Permissions | Worklist/Matrix | RBAC+ABAC role matrix editor, permission sets, delegation, break-glass config & review. |
| Workflow Studio (MOAT) | Canvas | Visual drag-drop builder for approval chains & care pathways: node palette, connectors, conditions, live preview, versioning, publish. Serious canvas/DnD build. |
| Form Builder (MOAT) | Canvas | No-code clinical/admin form designer: drag fields, validation rules, conditional logic, layout; emits JSON consumed by FormRenderer (§10.8). Live preview + versioning. |
| Notification Engine | Worklist/Form | Template editor (SMS/email/WhatsApp/push/in-app), channel routing, escalation rules, delivery logs. |
| Scheduler | Worklist | Jobs, reminders, report runs — schedule & monitor. |
| Audit & Consent Ledger | Worklist/Detail | Immutable audit search (login/view/change/export/print/API), consent records & revocations, DSR handling. |
| Settings / White-label | Form | Tenant/edition config, feature flags, branding tokens, localization. |
- 17.3.1 **MOAT · the no-code canvases:** Workflow Studio and Form Builder are the most technically demanding frontend work (drag-drop graph editor, schema emitter, live preview, version control) — deserve a dedicated squad. Form Builder output must feed the live FormRenderer.

---

## 18. Analytics, NL & Command Center

The densest dashboards + natural-language "ask your data." Web-only by nature.

### 18.1 Reports & Analytics
| Screen | Archetype | Key components · actions |
|---|---|---|
| Dashboard Gallery | Dashboard | Pre-built dashboards by category: Clinical (quality/outcomes/registers), Financial (revenue/AR-aging/denials/margin), Operational (occupancy/TAT/throughput/wait), Inventory, HR, Executive KPIs. Real-time (streaming mock), not overnight batch. |
| Self-Serve Builder | Canvas/Form | Drag metrics/dimensions → chart; save, share per role, schedule, export. |
| NL Analytics Bar (MOAT) | Form→Dashboard | "Ask your hospital data" plain-language query → generated chart/table, with row-level security enforced. Shows the SQL/interpretation for trust (mock). |
| Drill-down & Export | Dashboard | Click any KPI to underlying rows; scheduled email/exports; embed. |

### 18.2 Command-Center Digital Twin (MOAT)
- 18.2.1 **The wall-display board:** network-wide live operational twin — bed/ICU/ER capacity across branches, patient flow, transfers, staffing, stock-outs, ambulance ETAs — one high-density board for both a control-room wall and an executive desktop.
- 18.2.2 Real-time via mock WebSocket streams; drill from network → branch → ward → patient. The single most demanding real-time rendering surface — virtualize, batch updates, design for 24/7 always-on.
- 18.2.3 **States:** live-connected, reconnecting (show last-updated + stale badge), degraded (partial branch feeds), alert-storm (prioritize/cluster). Executive "Management/Approvals" lite view mirrors this in the right rail.

---

## 19. Patient / Partner / Developer Portals

Separate authenticated surfaces sharing the design system.

### 19.1 Patient / Family Web Portal
- 19.1.1 Full portal (mobile-first responsive) per §11.3: Home, Symptom Checker → Book, Records & Reports (plain-language AI explanations), Bills & Pay, Teleconsult, Consent Ledger (MOAT), Family Accounts. White-labelled per tenant.

### 19.2 Referring-Doctor & Corporate/TPA Portals
- 19.2.1 Referring-doctor portal: refer a patient, track referral status, view shared reports, referral ROI.
- 19.2.2 Corporate/TPA portal: employee/member roster, pre-auth submission, claim status, invoices, utilization dashboards.

### 19.3 Supplier / Vendor Portal
- 19.3.1 Submit quotes, view POs, upload invoices, track payments, compliance docs (mirrors §15.3).

### 19.4 Developer Platform & Marketplace
- 19.4.1 API keys management (stub), interactive OpenAPI/FHIR docs, SMART-on-FHIR app registration, webhooks config, sandbox tenant provisioning (stub), app marketplace storefront + submission.

---

# PART 4 — CROSS-CUTTING

## 20. Security, Session & Auth (frontend mock)

The browser is an attack surface handling PHI (mock here). Security is a rendered feature — permission-aware UI, session hygiene, hardened headers.

### 20.1 Session & auth hardening (behaviorally correct, mocked)
- 20.1.1 Mock OIDC + PKCE; access token in memory only (never localStorage); refresh in HttpOnly Secure SameSite cookie (simulated).
- 20.1.2 MFA enforced (mock); SSO placeholder; step-up auth for sensitive actions (break-glass, bulk export).
- 20.1.3 Idle auto-lock (short on shared terminals), absolute session lifetime, "open elsewhere" detection.
- 20.1.4 Break-glass emergency access: explicit reason capture, time-boxed, banner shown, logged & reviewed (mock log).
- 20.1.5 Sign-out and tenant-switch fully clear caches (IndexedDB, SW, query cache) — no PHI residue.

### 20.2 Front-end app security (enforced now)
- 20.2.1 Strict CSP (nonce-based, no inline eval), Trusted Types, SRI on third-party assets.
- 20.2.2 Security headers: HSTS, X-Frame-Options/frame-ancestors, Referrer-Policy, X-Content-Type-Options, Permissions-Policy.
- 20.2.3 XSS defense: framework escaping + sanitize rich-text (notes/CMS) with an allowlist.
- 20.2.4 CSRF: SameSite cookies + anti-CSRF token for cookie-authed calls.
- 20.2.5 No PHI in URLs, logs, analytics, or error payloads (redaction in Sentry/RUM). (No real PHI exists in this phase regardless.)
- 20.2.6 Dependency + supply-chain scanning (Snyk/Trivy) in CI; minimal third parties.

### 20.3 Permission-aware rendering
- 20.3.1 RBAC+ABAC (role, department, branch, care-relationship) resolved client-side for UX (mock). `PermissionGate` hides/disables actions/fields with a reason — never a bare failure on submit.
- 20.3.2 Minimum-necessary: worklists/search only return patients in the user's care context (mock scoping).
- 20.3.3 Client checks are UX only, never the security boundary — the real server (later) is authoritative.

### 20.4 Shared-terminal reality
- 20.4.1 Assume the worst: aggressive auto-lock, fast user-switching, no persistent PHI on device, tap-to-badge login where integrated (mock), clear "who is logged in" at all times. Kiosk/board modes run in locked profiles with no navigation escape.

---

## 21. Accessibility (WCAG 2.2 AA)

Hard requirement and a clinical-safety issue (tired staff, low light, gloves, assistive tech). Built into the design system so apps inherit it.

### 21.1 Perceivable & readable
- 21.1.1 Color contrast ≥ 4.5:1 text / 3:1 UI; never color-only meaning (status = icon + text + color).
- 21.1.2 Respect user font-scaling to 200% without breakage; density option.
- 21.1.3 Alt text on meaningful images; chart/DICOM alternatives where feasible.
- 21.1.4 Reduced-motion honored; no purely animated critical info.

### 21.2 Operable & robust
- 21.2.1 Full keyboard operability — every action reachable, visible focus rings, logical tab order.
- 21.2.2 Screen-reader support: semantic HTML, ARIA on custom widgets (grid, combobox, dialog, tabs), live regions for alerts/toasts.
- 21.2.3 Focus management in modals/drawers/wizards; focus trap + restore.
- 21.2.4 Target sizes (24×24 min), no timing traps, accessible error identification.
- 21.2.5 Forms: labels, descriptions, error association, required indication.

### 21.3 Testing
- 21.3.1 axe automated checks in CI on every component and page; keyboard-only and screen-reader (NVDA/JAWS/VoiceOver) manual passes on critical flows; contrast tokens validated. a11y bugs are release-blocking on clinical screens.

---

## 22. Performance & Core Web Vitals

Performance is UX and (for marketing) SEO. Budgets enforced in CI.

| Surface | Targets & techniques |
|---|---|
| Marketing site | LCP < 2.0s, CLS < 0.1, INP < 200ms. SSG/ISR at edge, image optimization (AVIF/WebP, responsive), font subsetting, no render-blocking third parties, minimal JS. |
| Web app shell | Route-based code-splitting, lazy module loading, prefetch on nav hover, service-worker shell cache — sub-second subsequent loads. |
| Worklists / grids | Virtualized rows (10k+), server-side pagination/filter (mock), memoized cells, optimistic updates — 60fps scroll. |
| Charts / dashboards | Stream + incremental render, batch realtime updates, web workers for heavy transforms, canvas for dense viz. |
| Data transfer | Sparse fieldsets, aggregation, HTTP caching, compression, avoid over-fetching. |
- 22.1 Performance budgets (bundle size, LCP, INP) checked in CI; regressions block merge.
- 22.2 Real-user monitoring (web-vitals + RUM) segmented by tenant/region/device.
- 22.3 Skeleton loaders + optimistic UI so perceived performance beats raw numbers.
- 22.4 Envelope: dashboards < 1.5s render on mock data.

---

## 23. Internationalization & Localization

Multi-region: India + MENA + SEA primary, US/EU-ready. Never hardcode a string.

### 23.1 Language & content
- 23.1.1 All UI strings externalized (ICU MessageFormat) — pluralization, gender, interpolation.
- 23.1.2 Per-tenant + per-user locale; language switcher; fallback chains.
- 23.1.3 RTL support (Arabic/Urdu) — logical CSS properties, mirrored layouts, bidi-safe components.
- 23.1.4 Marketing: locale-prefixed URLs + hreflang; localized content variants.
- 23.1.5 Patient-facing AI explanations multilingual (mock).

### 23.2 Formats & regional rules
- 23.2.1 Locale-aware date/time, numbers, and currency (minor-units + code, never floats).
- 23.2.2 UCUM units; metric/imperial per locale where clinically relevant.
- 23.2.3 Address/phone/name formats per region; national ID field variants (ABHA vs others).
- 23.2.4 Tax (GST/VAT), statutory payroll, insurance formats vary by region — config-driven, surfaced in UI.
- 23.2.5 Timezone-correct rendering for multi-branch networks.

### 23.3 Discipline
- 23.3.1 No string/date/number/currency ever hardcoded or client-formatted ad hoc — everything flows through the i18n layer and shared formatters in `@aether/i18n`. Pseudo-localization runs in CI to catch untranslated strings and layout breakage.

---

## 24. Responsive Design & Layout Modes

- 24.1 **Staff console:** desktop-first (1280–1920px primary; wall displays for boards/command center), gracefully usable to tablet (nursing stations). Phone use-cases hand off to the mobile suite (later).
- 24.2 **Patient/partner portals:** mobile-first responsive.
- 24.3 **Kiosk / queue-board modes:** dedicated full-screen layouts with no nav chrome.
- 24.4 Breakpoints: `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536 · wall ≥1920`.
- 24.5 Fluid grids, container queries where useful, no horizontal body scroll; dense tables scroll within their own container.

---

## 25. Motion & Interaction Grammar

- 25.1 Motion is subtle and purposeful: micro (120ms) for hover/press, standard (200ms) for enter/exit, entrance (280ms) for drawers/modals. Easing `cubic-bezier(0.2,0,0,1)`.
- 25.2 `prefers-reduced-motion` disables non-essential animation; critical info never animation-only.
- 25.3 Drawers slide from right; modals fade+scale; toasts slide up; skeletons shimmer subtly.
- 25.4 Drag-drop (boards, canvases) with clear drop targets and live feedback.
- 25.5 Optimistic UI transitions with rollback animation on failure.

---

# PART 5 — DELIVERY

## 26. Build Roadmap & Phasing

Foundations first, then module screens phase-by-phase (mirrors §W24 but frontend-mock).

| Phase | Deliverables |
|---|---|
| **P0 · Foundations** | Monorepo, `@aether/design-system` (tokens + primitives + archetypes + Storybook), mock-data layer + adapters, mock auth flow, app shell (§8), i18n + a11y baseline. Marketing site v1 (home/product/pricing/security/demo). |
| **P1 · MVP (Clinic)** | Registration/UHID, Appointments/Queue, OPD chart + ambient-scribe review pane, e-prescribe, Billing, Pharmacy-lite, Patient web portal. Full clickable clinic flow. |
| **P2 · Hospital core** | IPD (bed board, rounds, discharge), ER (triage/board), Nursing/eMAR, LIS, RIS/PACS viewer, full Billing + Insurance/Claims (RCM worklists), Inventory. Remaining marketing pages. |
| **P3 · Enterprise & config** | OT, ICU, HRM/payroll grids, Finance, CDSS surfaces, Analytics dashboards, Workflow Studio & Form Builder canvases, Blood Bank, Ambulance dispatch, partner portals. |
| **P4 · Intelligence & ecosystem** | Autonomous-RCM full UI, predictive-ops, command-center digital twin, NL-analytics bar, telehealth/RPM, developer portal & marketplace storefront. |
- 26.1 Build the design system + app shell before any module. Every module screen is then an assembly, not a rewrite.
- 26.2 Ship the moat surfaces first where they demo strongest — ambient scribe, patient portal, no-code studios, command center.

## 27. QA & Testing Strategy

| Layer | Coverage & tooling |
|---|---|
| Unit | Vitest — hooks, formatters, validators, billing/dosing calculations. |
| Component | Testing Library + Storybook — every component's states (loading/empty/error/offline); interaction tests. |
| Visual regression | Chromatic/Playwright screenshots on Storybook + key pages — catch UI drift. |
| Accessibility | axe in CI on components + pages; manual keyboard + screen-reader passes; contrast validation. Release-blocking on clinical screens. |
| E2E | Playwright — full patient journey on mock data (register → consult → order → dispense → bill → claim → discharge); cross-browser (Chromium/Firefox/WebKit). |
| Clinical-safety UI | Highest rigor: allergy/interaction/dose alerts render & block; 5-rights eMAR barcode flow; sign-required gates. |
| Contract | Types shaped to OpenAPI/FHIR; when the real API arrives, consumer-driven contract tests catch drift. |
| Performance | Lighthouse CI + bundle-size budgets on marketing & app; Web Vitals gates. |
| Offline sync | Simulated offline: cache read, write-queue, reconnect replay, conflict-surfacing, no-duplicate. |
| UAT | Clickthrough review of each module against this spec before sign-off. |

## 28. Deployment, Hosting & CI/CD

### 28.1 Hosting & delivery
| Property | Hosting & delivery |
|---|---|
| Marketing site | SSG/ISR on edge platform (Vercel/Netlify/CloudFront+Lambda@Edge or self-hosted Next on K8s); global CDN, edge caching, image CDN. No PHI, separate account/domain. |
| Web app (staff console) | Next.js (SSR/RSC + client islands); static assets on CDN. (Region-pinned inside compliance boundary once backend exists.) |
| Patient/partner portals | SSR for SEO/auth pages; white-label per tenant via runtime tokens. |
| Dev portal / marketplace | Static docs + authenticated console; sandbox provisioning (stub). |

### 28.2 CI/CD
- 28.2.1 Turborepo affected-only builds; PR previews (ephemeral deploy per PR).
- 28.2.2 CI gates: typecheck, lint, unit/component tests, axe a11y, visual-regression, Lighthouse/bundle budget, dependency + SAST scan.
- 28.2.3 Design-system published as a versioned package; consumers pin versions.
- 28.2.4 CD: canary/blue-green, feature flags, automated rollback.
- 28.2.5 CSP/security headers enforced at the edge; SRI on assets.
- 28.2.6 RUM (web-vitals) + Sentry with PHI-safe redaction.
- 28.2.7 Feature flags per edition/tenant drive progressive rollout of new module screens.
- 28.2.8 Forced-refresh/version-bump so no client runs a stale critical build.

## 29. Definition of Done & Acceptance Criteria

A screen is **done** when:
- 29.1 It matches this spec's archetype, components, actions, and states.
- 29.2 All designed states render on mock data: loading, empty, filtered-empty, error+retry, offline, permission-scoped (as applicable to its archetype).
- 29.3 It uses only design-system components and tokens — no hardcoded colors/spacing/hex.
- 29.4 It is fully keyboard-operable with a documented shortcut for its primary action; `⌘K` reaches it.
- 29.5 It passes axe with zero criticals; meets contrast; supports 200% zoom and reduced-motion.
- 29.6 It is deep-linkable — filters/selection/tab/drawer encoded in the URL and restorable.
- 29.7 It is responsive per §24 (or a dedicated kiosk/board/wall layout where applicable).
- 29.8 It is localized — no hardcoded strings; RTL-safe.
- 29.9 Storybook stories exist for every state; component/interaction tests pass; visual snapshot recorded.
- 29.10 Data flows only through the swappable adapter (`mockAdapter`), with query keys scoped by tenant+branch+entity.
- 29.11 Dangerous/clinical actions are guarded (type-to-confirm / reason capture) and attributed in an audit drawer.
- 29.12 CDSS safety surfaces (allergy/interaction/dose/critical-value) render with reserved treatment + "why" + evidence link where the screen is a clinical write surface.

---

# APPENDICES

## Appendix A — Design Token Reference (Flutter `MedicalErpTheme` → Web)

### A.1 Colors (CSS variables)
```css
:root {
  /* Brand */
  --brand-teal:        #0E8388;
  --brand-teal-dark:   #0A6B70;
  --brand-teal-deep:   #083E45;
  --brand-clinical-blue:#1B6EC2;
  --brand-ink:         #10303B;
  --brand-mist:        #E6F0F0;
  --brand-sage:        #5BB4A6;
  --brand-forest:      #1E9E63;

  /* Semantic status */
  --status-success:  #1E9E63;
  --status-warning:  #E0912F;
  --status-danger:   #D64545;
  --status-info:     #1B6EC2;
  --status-critical: #C0362C;

  /* Surfaces — light */
  --surface:      #F3F7F7;
  --card:         #FFFFFF;
  --border:       rgba(16,48,56,0.08);
  --text-heading: #10303B;
  --text-body:    #3A4A50;
  --text-muted:   rgba(16,48,56,0.55);

  /* Shape & motion */
  --radius-control: 14px;
  --radius-pill:    30px;
  --radius-card:    16px;
  --dur-micro:      120ms;
  --dur-standard:   200ms;
  --dur-entrance:   280ms;
  --ease-standard:  cubic-bezier(0.2,0,0,1);
}

:root[data-theme="dark"] {
  --brand-teal:        #3FB6B0;   /* primary on dark */
  --brand-clinical-blue:#6FA8DC;
  --surface:      #0C1719;
  --card:         #14262A;
  --border:       rgba(255,255,255,0.12);
  --text-heading: #FFFFFF;
  --text-body:    rgba(255,255,255,0.70);
  --text-muted:   rgba(255,255,255,0.55);
  --btn-filled:   #1F9E98;
}
```

### A.2 Typography
- Heading font: **Manrope** (700/800). Body/UI font: **Inter** (400/500/600/700).
- Scale per §2.4.2. Filled/elevated/outlined buttons: Inter 700, 14px. App-bar title: Manrope 19/700. Nav label: Inter 11.5.

### A.3 Component shape rules
- Buttons/inputs/cards radius 14; chips pill 30; modals/drawers 16.
- Input focus border: `--brand-teal` 1.6px; enabled border `rgba(16,48,56,0.13)`.
- Divider: `--border`, 1px.
- Snackbar/toast: ink background (light), floating, radius 12.

## Appendix B — Route Map
See §5.2 (marketing) and the module sections §11–§19 for app routes. App routes are prefixed under the app domain, e.g. `/app/patients`, `/app/opd`, `/app/ipd/bed-board`, `/app/pharmacy/rx-queue`, `/app/rcm/denials`, `/app/analytics/command-center`, `/portal/*`, `/dev-portal/*`. Every screen state is URL-encoded (filters, selected entity, open tab, drawer).

## Appendix C — Component Inventory
Full catalog in §10.2–§10.7. Build order: tokens → primitives → layout/nav → data display → forms → clinical specials → feedback/system → archetypes → module assemblies. FormRenderer + DataGrid are highest-leverage (§10.8).

## Appendix D — Mock Data Schemas
`@aether/mock-data` provides FHIR-shaped clinical resources (Patient, Encounter, Observation, Condition, MedicationRequest, DiagnosticReport, etc.) and product resources (Appointment, Bill, Claim, InventoryItem, PurchaseOrder, Employee, Roster, Lead, Ticket, Dashboard series). Deterministic seed; referential integrity across domains; generator for large virtualized lists; simulated latency/errors/offline; mock realtime emitter per channel. No real PHI.

## Appendix E — Status-Chip & Severity Semantics
One shared status system, fixed colors:
- `draft` → muted/ink · `active` → teal · `pending` → warning · `done`/`success` → success · `error` → danger · `cancelled` → muted-strike.
- Severity banners: `info` (clinical-blue), `warning`, `danger`, `critical` (reserved, unmistakable — safety). Status always icon + text + color (never color-only).

## Appendix F — Keyboard Shortcut Map
- `⌘K` command palette · `⌘Enter` submit primary action · `/` focus in-context search · `⌘\` toggle left nav · `⌘.` toggle right rail · `Esc` close drawer/modal · `⌘S` (autosaves; explicit save where relevant) · row `Space` select · `⌘A` select-all in worklist · arrow keys navigate grids/menus. Every primary action documents its shortcut; the Help sheet lists all.

---

*End of Website & Web-App Frontend Requirements · Aether Health OS · derived from Development Document Part 2 of 3 · frontend-only, mock-data build.*
