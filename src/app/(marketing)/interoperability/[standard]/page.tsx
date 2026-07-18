import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { STANDARDS } from "@/lib/content/marketing";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Eyebrow, FeatureRow, Reveal } from "@/components/marketing/blocks";
import {
  Activity,
  ArrowRight,
  Blocks,
  CheckCircle2,
  ClipboardList,
  Code2,
  Database,
  Download,
  FileCheck2,
  FileUp,
  FlaskConical,
  Globe2,
  History,
  KeyRound,
  Landmark,
  LockKeyhole,
  Network,
  ScanLine,
  Server,
  ShieldCheck,
  Stethoscope,
  Webhook,
  Workflow,
} from "lucide-react";

const FHIR_RESOURCES = [
  { icon: ClipboardList, name: "Patient & Practitioner", desc: "Demographics, identifiers, contacts, care teams, specialties, and organization relationships." },
  { icon: Stethoscope, name: "Encounter & Appointment", desc: "OPD, IPD, emergency, teleconsult, location, participant, status, and scheduling context." },
  { icon: Activity, name: "Observation & Condition", desc: "Vitals, diagnoses, allergies, clinical findings, social history, and longitudinal health measurements." },
  { icon: FlaskConical, name: "ServiceRequest & DiagnosticReport", desc: "Laboratory and imaging orders, specimens, results, interpretations, and signed diagnostic reports." },
  { icon: FileCheck2, name: "Medication & CarePlan", desc: "Prescriptions, medication requests, administration, treatment plans, goals, and follow-up activities." },
  { icon: Database, name: "Coverage, Claim & Document", desc: "Insurance context, claims exchange, invoices, clinical documents, attachments, and secure record access." },
];

const FHIR_PLATFORM = [
  {
    icon: Code2,
    title: "RESTful FHIR R4 API",
    desc: "Read, create, update, search, and bundle healthcare resources through versioned JSON endpoints with predictable HTTP behavior.",
  },
  {
    icon: KeyRound,
    title: "SMART on FHIR authorization",
    desc: "Use OAuth 2.0 and scoped access for patient-facing, clinician-facing, and backend applications without sharing broad credentials.",
  },
  {
    icon: Webhook,
    title: "Subscriptions and webhooks",
    desc: "Receive near real-time events for registrations, encounters, orders, results, medications, billing, and discharge workflows.",
  },
  {
    icon: Blocks,
    title: "Profiles and validation",
    desc: "Validate required fields, terminology, references, extensions, and implementation-guide profiles before data reaches production.",
  },
  {
    icon: Database,
    title: "Search, bundles, and bulk data",
    desc: "Support resource search, pagination, transaction bundles, history, and controlled population-level exports for approved use cases.",
  },
  {
    icon: ShieldCheck,
    title: "Audit and consent controls",
    desc: "Apply tenant isolation, role-based permissions, patient consent, minimum-necessary scopes, and a traceable access history.",
  },
];

type StandardDetail = {
  title: string;
  eyebrow: string;
  tagline: string;
  intro: string;
  heroImage: string;
  highlights: string[];
  features: Array<{ icon: LucideIcon; title: string; desc: string }>;
  useCases: Array<{ title: string; desc: string; image: string; bullets: string[] }>;
  assuranceTitle: string;
  assuranceText: string;
};

const STANDARD_DETAILS: Record<string, StandardDetail> = {
  hl7: {
    title: "HL7 v2 Integration",
    eyebrow: "Hospital interface engine",
    tagline: "Connect established hospital systems without replacing them all at once.",
    intro:
      "MedicoreERP exchanges dependable HL7 v2 messages with laboratories, analyzers, radiology, ADT systems, billing platforms, and legacy hospital applications through monitored, bidirectional interfaces.",
    heroImage:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1400&q=80",
    highlights: ["ADT", "ORM", "ORU", "SIU", "MDM", "ACK/NACK tracking"],
    features: [
      { icon: Stethoscope, title: "ADT patient movement", desc: "Synchronize registration, admission, transfer, discharge, merge, and demographic updates across connected systems." },
      { icon: FlaskConical, title: "Laboratory orders and results", desc: "Send ORM orders to LIS and analyzers, then receive ORU results, flags, comments, and corrected reports." },
      { icon: ScanLine, title: "Radiology workflows", desc: "Exchange imaging orders, scheduling status, accession numbers, reports, and links between HIS, RIS, and PACS." },
      { icon: Workflow, title: "Message mapping and routing", desc: "Transform segments, codes, identifiers, and facility-specific conventions before routing messages to the correct destination." },
      { icon: History, title: "Retries and reconciliation", desc: "Track acknowledgements, queue failed messages, safely retry delivery, and reconcile missing or duplicate events." },
      { icon: ShieldCheck, title: "Audited interface operations", desc: "Monitor every inbound and outbound message with access controls, timestamps, status, payload lineage, and operational alerts." },
    ],
    useCases: [
      {
        title: "A connected laboratory workflow",
        desc: "Create an order once in the clinical chart, send it to the LIS, and return verified results to the same encounter.",
        image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
        bullets: ["Order and specimen identifiers", "Analyzer result ingestion", "Critical-value and correction handling"],
      },
      {
        title: "Real-time admission and bed updates",
        desc: "Keep registration, nursing, billing, pharmacy, dietary, and departmental systems aligned as a patient moves through the hospital.",
        image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80",
        bullets: ["Admission, transfer, and discharge events", "Patient merge and identifier updates", "Reliable ACK/NACK processing"],
      },
      {
        title: "Safe legacy-system modernization",
        desc: "Introduce MedicoreERP in phases while legacy applications continue exchanging the messages they already understand.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        bullets: ["Phased departmental cutover", "Canonical mapping layer", "Interface monitoring dashboard"],
      },
    ],
    assuranceTitle: "Reliable interfaces for clinical operations",
    assuranceText:
      "HL7 messages are validated, mapped, acknowledged, queued, retried, and audited. Monitoring highlights malformed payloads, code mismatches, unavailable destinations, duplicates, and delayed results before they become patient-care problems.",
  },
  dicom: {
    title: "DICOM Imaging Integration",
    eyebrow: "RIS and PACS interoperability",
    tagline: "Bring imaging orders, studies, reports, and viewers into the patient journey.",
    intro:
      "MedicoreERP connects radiology departments, modalities, RIS, PACS, and browser viewers using DICOM workflows so imaging data follows the correct patient, encounter, and order.",
    heroImage:
      "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=1400&q=80",
    highlights: ["DICOM MWL", "C-STORE", "Query/Retrieve", "RIS/PACS", "Web viewer", "Audit trail"],
    features: [
      { icon: ClipboardList, title: "Modality worklist", desc: "Send scheduled patient, procedure, and accession information to modalities to reduce manual entry and identity errors." },
      { icon: ScanLine, title: "Study storage and retrieval", desc: "Route studies to PACS, query prior imaging, retrieve series, and keep study identifiers linked to the clinical order." },
      { icon: FileCheck2, title: "Radiology reporting", desc: "Manage transcription, structured reports, review, sign-off, addenda, critical findings, and report delivery back to the EMR." },
      { icon: Globe2, title: "Zero-footprint viewer", desc: "Open authorized studies in a browser alongside clinical context without requiring workstation software on every device." },
      { icon: Network, title: "Multi-site image routing", desc: "Route studies across branches, reading centers, teleradiology partners, archives, and disaster-recovery destinations." },
      { icon: LockKeyhole, title: "Imaging security", desc: "Protect studies with role checks, encrypted transport, tenant boundaries, access logs, retention rules, and controlled sharing." },
    ],
    useCases: [
      {
        title: "Order-to-image workflow",
        desc: "Schedule imaging from the patient chart and populate modality worklists with consistent demographics and procedure details.",
        image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=1200&q=80",
        bullets: ["Fewer patient-selection errors", "Accession and order matching", "Live procedure status"],
      },
      {
        title: "Images beside the clinical record",
        desc: "Give authorized clinicians access to images and signed reports from the same encounter timeline used for notes and results.",
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=80",
        bullets: ["Browser-based viewing", "Prior-study comparison", "Linked reports and findings"],
      },
      {
        title: "Distributed reporting and teleradiology",
        desc: "Route studies to qualified readers across locations while tracking assignment, turnaround time, status, and critical communication.",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
        bullets: ["Reading worklists", "Priority and SLA tracking", "Critical-result escalation"],
      },
    ],
    assuranceTitle: "Correct patient, correct study, controlled access",
    assuranceText:
      "Patient and accession matching, modality worklists, validation rules, role-based access, encryption, and audit logs reduce imaging identity errors and unauthorized access while preserving diagnostic quality.",
  },
  abdm: {
    title: "ABDM, TEFCA & EHDS Interoperability",
    eyebrow: "Regional health data exchange",
    tagline: "Support consent-based exchange across national and cross-border health networks.",
    intro:
      "MedicoreERP supports the identity, consent, discovery, document, and FHIR-based exchange patterns required to participate in modern health information networks across India, the United States, and Europe.",
    heroImage:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1400&q=80",
    highlights: ["ABHA workflows", "Consent management", "HIP/HIU exchange", "TEFCA readiness", "EHDS alignment", "Auditability"],
    features: [
      { icon: Landmark, title: "ABDM and ABHA", desc: "Support ABHA creation and linking, facility and professional registries, HIP/HIU roles, care contexts, consent, and health-record exchange." },
      { icon: Network, title: "TEFCA exchange readiness", desc: "Prepare standardized identity, purpose-of-use, query, response, provenance, and audit workflows for trusted US health information exchange." },
      { icon: Globe2, title: "EHDS-aligned data exchange", desc: "Structure data for patient access, continuity of care, cross-border exchange, and approved secondary-use governance in Europe." },
      { icon: KeyRound, title: "Consent and authorization", desc: "Capture purpose, scope, data categories, duration, requester, patient approval, revocation, and fulfillment status." },
      { icon: FileCheck2, title: "Clinical document exchange", desc: "Package prescriptions, diagnostic reports, discharge summaries, immunizations, and health records with identifiers and provenance." },
      { icon: ShieldCheck, title: "Governance and traceability", desc: "Record who requested, approved, accessed, transmitted, or revoked information with policy-aware audit trails." },
    ],
    useCases: [
      {
        title: "ABHA-linked patient journeys",
        desc: "Link the correct patient and care context, request consent, and exchange approved health information through ABDM-compatible workflows.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
        bullets: ["Identity and demographic matching", "Consent artefact lifecycle", "HIP and HIU exchange"],
      },
      {
        title: "Trusted network exchange",
        desc: "Prepare clinical records for standardized discovery and exchange between authorized healthcare organizations and networks.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        bullets: ["Purpose-of-use controls", "Record discovery and response", "Provenance and audit events"],
      },
      {
        title: "Patient access and continuity of care",
        desc: "Give patients and receiving clinicians usable, structured information when care moves between facilities or regions.",
        image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1200&q=80",
        bullets: ["Portable clinical summaries", "Medication and allergy continuity", "Consent-aware patient access"],
      },
    ],
    assuranceTitle: "Consent and governance come before exchange",
    assuranceText:
      "Regional frameworks are not interchangeable. MedicoreERP applies jurisdiction-specific identity, consent, purpose, retention, residency, terminology, and audit requirements instead of treating every exchange as a generic API call.",
  },
  migration: {
    title: "Migration & Data Freedom",
    eyebrow: "No-lock-in medical ERP",
    tagline: "Move historical data safely—and retain the ability to take it with you.",
    intro:
      "MedicoreERP provides a controlled migration path for patient masters, encounters, clinical records, appointments, billing, inventory, documents, and operational history with validation, reconciliation, and exportability.",
    heroImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
    highlights: ["Source assessment", "Mapping & cleansing", "Trial migrations", "Reconciliation", "Cutover planning", "Open exports"],
    features: [
      { icon: Database, title: "Source-system discovery", desc: "Inventory databases, files, APIs, documents, custom fields, code sets, ownership, retention, and data-quality risks." },
      { icon: Workflow, title: "Mapping and normalization", desc: "Map patient identities, departments, clinicians, diagnoses, services, medications, units, taxes, and statuses into a governed target model." },
      { icon: FileUp, title: "Clinical and document migration", desc: "Move structured records and approved attachments while preserving encounter context, authorship, dates, status, and provenance." },
      { icon: CheckCircle2, title: "Validation and reconciliation", desc: "Compare counts, totals, balances, samples, relationships, and exceptions with signed acceptance criteria for each domain." },
      { icon: Server, title: "Phased or big-bang cutover", desc: "Choose department, branch, date-range, or full-facility migration with rehearsals, freeze windows, fallback, and hypercare." },
      { icon: Download, title: "Guaranteed data freedom", desc: "Export your data in documented, usable formats through APIs and controlled bulk exports without proprietary lock-in." },
    ],
    useCases: [
      {
        title: "Clean patient and clinical history",
        desc: "Resolve duplicates and identifiers while preserving encounters, diagnoses, allergies, medications, orders, results, and clinical documents.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        bullets: ["Patient matching and merge rules", "Clinical relationship validation", "Source-to-target provenance"],
      },
      {
        title: "Financial and inventory reconciliation",
        desc: "Validate opening balances, deposits, receivables, claims, tax values, stock quantities, batches, and expiry dates before cutover.",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
        bullets: ["Ledger and receivable checks", "Stock and batch balancing", "Signed exception handling"],
      },
      {
        title: "Rehearsed go-live and rollback",
        desc: "Run multiple trial migrations, measure downtime, train users, resolve exceptions, and approve a documented production cutover plan.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
        bullets: ["Repeatable migration scripts", "Cutover command center", "Fallback and hypercare plan"],
      },
    ],
    assuranceTitle: "A migration is complete only when the data is trusted",
    assuranceText:
      "Every domain receives defined source counts, target counts, business totals, sample validation, exception ownership, and formal acceptance. Original extracts and transformation logs remain controlled for audit and rollback needs.",
  },
};

export function generateStaticParams() {
  return STANDARDS.map((s) => ({ standard: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ standard: string }> }): Promise<Metadata> {
  const { standard } = await params;
  const s = STANDARDS.find((x) => x.slug === standard);
  return s ? { title: `${s.name} — Interoperability`, description: s.desc } : {};
}

function DetailedStandardPage({ detail }: { detail: StandardDetail }) {
  return (
    <>
      <section className="relative overflow-hidden border-b bg-aurora">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative grid items-center gap-10 py-16 lg:grid-cols-2">
          <div>
            <Eyebrow>{detail.eyebrow}</Eyebrow>
            <h1 className="mt-5 font-heading text-4xl font-extrabold leading-tight tracking-tight text-heading sm:text-5xl">
              {detail.title}
            </h1>
            <p className="mt-4 text-xl font-semibold text-teal">{detail.tagline}</p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{detail.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/demo">Request a demo <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Discuss your requirements</Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {detail.highlights.map((highlight) => (
                <span key={highlight} className="inline-flex items-center gap-1.5 rounded-pill border bg-card px-3 py-1.5 text-sm font-semibold text-body">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" /> {highlight}
                </span>
              ))}
            </div>
          </div>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-card border bg-card shadow-pop">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={detail.heroImage} alt={detail.title} className="aspect-[4/3] w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <SectionHeading
          center
          eyebrow="Capabilities"
          title={`What ${detail.title} includes`}
          subtitle="Built for dependable healthcare exchange, operational visibility, and controlled access."
          className="mb-14"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {detail.features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.05}>
              <div className="h-full rounded-card border bg-card p-6 shadow-soft">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-teal/10 text-teal">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h2 className="font-heading text-xl font-bold text-heading">{feature.title}</h2>
                <p className="mt-2 leading-relaxed text-muted">{feature.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading
          center
          eyebrow="Real workflows"
          title="How hospitals use this capability"
          className="mb-14"
        />
        <div className="space-y-16">
          {detail.useCases.map((useCase, index) => (
            <FeatureRow
              key={useCase.title}
              index={index}
              title={useCase.title}
              desc={useCase.desc}
              image={useCase.image}
              bullets={useCase.bullets}
            />
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl rounded-[24px] border bg-ink p-8 text-white shadow-pop sm:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10 text-sage">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <h2 className="font-heading text-2xl font-extrabold text-white">{detail.assuranceTitle}</h2>
              <p className="mt-3 leading-relaxed text-white/75">{detail.assuranceText}</p>
            </div>
          </div>
        </div>
      </Section>

      <CTABand
        title={`See ${detail.title} in MedicoreERP`}
        subtitle="Review your systems, workflows, data, and implementation requirements with our interoperability team."
      />
    </>
  );
}

function FhirPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b bg-aurora">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative grid items-center gap-10 py-16 lg:grid-cols-2">
          <div>
            <Eyebrow>FHIR-native medical ERP</Eyebrow>
            <h1 className="mt-5 font-heading text-4xl font-extrabold leading-tight tracking-tight text-heading sm:text-5xl">
              FHIR R4 interoperability
            </h1>
            <p className="mt-4 text-xl font-semibold text-teal">
              Exchange structured healthcare data without locking it inside one system.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              MedicoreERP models clinical and administrative workflows as FHIR R4 resources, giving approved apps,
              hospitals, labs, payers, and health networks a secure standard API for exchanging patient information.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/developers/fhir">Open FHIR reference <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/developers/sandbox">Request a sandbox</Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {["FHIR R4 JSON", "SMART on FHIR", "OAuth 2.0", "REST API", "Subscriptions"].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5 rounded-pill border bg-card px-3 py-1.5 text-sm font-semibold text-body">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" /> {item}
                </span>
              ))}
            </div>
          </div>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-card border bg-card shadow-pop">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80"
                alt="Clinician using an interoperable electronic health record"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <SectionHeading
          center
          eyebrow="Resource model"
          title="The patient journey represented as standard resources"
          subtitle="Use discrete, linked resources instead of opaque documents and vendor-specific database tables."
          className="mb-14"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FHIR_RESOURCES.map((resource, index) => (
            <Reveal key={resource.name} delay={index * 0.05}>
              <div className="h-full rounded-card border bg-card p-6 shadow-soft">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-clinical/10 text-clinical">
                  <resource.icon className="h-5 w-5" />
                </div>
                <h2 className="font-heading text-xl font-bold text-heading">{resource.name}</h2>
                <p className="mt-2 leading-relaxed text-muted">{resource.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading
          center
          eyebrow="Developer capabilities"
          title="Everything needed for dependable FHIR integrations"
          subtitle="Build patient apps, clinician tools, analytics, partner connections, and data-exchange workflows on controlled APIs."
          className="mb-14"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FHIR_PLATFORM.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.05}>
              <div className="h-full rounded-card border bg-card p-6 shadow-soft">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-teal/10 text-teal">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h2 className="font-heading text-xl font-bold text-heading">{feature.title}</h2>
                <p className="mt-2 leading-relaxed text-muted">{feature.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          center
          eyebrow="Healthcare workflows"
          title="FHIR data that remains useful at the point of care"
          className="mb-14"
        />
        <div className="space-y-16">
          <FeatureRow
            index={0}
            title="A longitudinal patient record"
            desc="Bring demographics, encounters, conditions, allergies, medications, vitals, results, and clinical documents into a connected record that authorized systems can understand."
            image="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80"
            bullets={["Stable patient and encounter identifiers", "Linked references across clinical resources", "Version history and provenance"]}
          />
          <FeatureRow
            index={1}
            title="Orders and results without duplicate entry"
            desc="Send laboratory or imaging orders as ServiceRequest resources and receive Observations and DiagnosticReports back into the clinician workflow."
            image="https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=1200&q=80"
            bullets={["Structured codes and result values", "Order-to-result status tracking", "Signed reports and attachments"]}
          />
          <FeatureRow
            index={2}
            title="An ecosystem of approved healthcare apps"
            desc="Launch SMART on FHIR applications with patient and encounter context while enforcing scopes, user identity, tenant boundaries, and consent requirements."
            image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
            bullets={["Clinician and patient launch contexts", "Granular OAuth scopes", "Audited app access and revocation"]}
          />
        </div>
      </Section>

      <Section muted>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <Eyebrow>Example request</Eyebrow>
            <h2 className="mt-4 font-heading text-3xl font-extrabold text-heading">FHIR that developers can start using quickly</h2>
            <p className="mt-3 leading-relaxed text-muted">
              Search by standard parameters, request only the fields you need, and paginate predictable bundles.
              Production access remains scoped, monitored, and fully audited.
            </p>
          </div>
          <div className="overflow-x-auto rounded-card border border-white/10 bg-ink p-6 font-mono text-sm text-white shadow-pop">
            <pre><code>{`GET /fhir/r4/Observation
  ?patient=Patient/UH240188
  &category=vital-signs
  &_sort=-date

Authorization: Bearer <token>
Accept: application/fhir+json

200 OK
resourceType: Bundle`}</code></pre>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl rounded-[24px] border bg-ink p-8 text-white shadow-pop sm:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10 text-sage">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <h2 className="font-heading text-2xl font-extrabold text-white">Security around every FHIR request</h2>
              <p className="mt-3 leading-relaxed text-white/75">
                Access is protected with encrypted transport, OAuth scopes, role and tenant checks, consent rules,
                rate controls, audit events, and minimum-necessary data exposure. Integrations can be revoked without
                disrupting the clinical record.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <CTABand
        title="Build your FHIR connection with MedicoreERP"
        subtitle="Discuss resources, profiles, scopes, mappings, and testing requirements with our integration team."
      />
    </>
  );
}

export default async function StandardPage({ params }: { params: Promise<{ standard: string }> }) {
  const { standard } = await params;
  const s = STANDARDS.find((x) => x.slug === standard);
  if (!s) notFound();
  if (s.slug === "fhir") return <FhirPage />;
  const detail = STANDARD_DETAILS[s.slug];
  if (detail) return <DetailedStandardPage detail={detail} />;

  return (
    <>
      <section className="border-b">
        <div className="container-page py-16">
          <Eyebrow>Interoperability</Eyebrow>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl font-extrabold leading-tight text-heading sm:text-5xl">{s.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{s.desc}</p>
        </div>
      </section>
      <Section>
        <div className="grid gap-4 sm:grid-cols-2">
          {["Standards-compliant by default", "Public, documented, versioned API", "Sandbox environment for testing", "Guaranteed data-freedom exports", "SMART-on-FHIR app support", "Webhooks for real-time events"].map((f) => (
            <div key={f} className="flex items-center gap-3 rounded-card border bg-card p-5 shadow-soft">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
              <span className="text-body">{f}</span>
            </div>
          ))}
        </div>
      </Section>
      <CTABand />
    </>
  );
}
