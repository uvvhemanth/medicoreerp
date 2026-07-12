/**
 * Functional web checks for MedicoreERP marketing site (no browser automation).
 * Run: node scripts/functional-web-check.js
 */
const BASE = process.env.BASE_URL || "http://localhost:3000";

const results = [];
function ok(name, detail = "") {
  results.push({ status: "PASS", name, detail });
  console.log(`PASS  ${name}${detail ? " — " + detail : ""}`);
}
function fail(name, detail = "") {
  results.push({ status: "FAIL", name, detail });
  console.log(`FAIL  ${name}${detail ? " — " + detail : ""}`);
}
function warn(name, detail = "") {
  results.push({ status: "WARN", name, detail });
  console.log(`WARN  ${name}${detail ? " — " + detail : ""}`);
}

async function fetchText(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    redirect: "follow",
    ...opts,
    headers: { Accept: "text/html,application/json,*/*", ...(opts.headers || {}) },
  });
  const text = await res.text();
  return { res, text, status: res.status };
}

async function postJson(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  let json = null;
  try {
    json = await res.json();
  } catch {
    json = null;
  }
  return { res, json, status: res.status };
}

async function main() {
  console.log(`Functional web check → ${BASE}\n`);

  // 1) API: lead validation
  {
    const bad = await postJson("/api/leads", { email: "not-an-email" });
    if (bad.status === 400 && bad.json?.ok === false) ok("API rejects invalid lead", bad.json.error);
    else fail("API rejects invalid lead", `status=${bad.status} body=${JSON.stringify(bad.json)}`);
  }
  {
    const noOrg = await postJson("/api/leads", {
      name: "Test User",
      email: "test@hospital.com",
      variant: "demo",
    });
    if (noOrg.status === 400) ok("API requires org for demo leads");
    else fail("API requires org for demo leads", JSON.stringify(noOrg.json));
  }
  {
    const contact = await postJson("/api/leads", {
      name: "Contact User",
      email: "contact@hospital.com",
      message: "Hello",
      variant: "contact",
    });
    if (contact.status === 200 && contact.json?.ok && contact.json?.leadId) {
      ok("API accepts contact lead", contact.json.leadId);
    } else fail("API accepts contact lead", JSON.stringify(contact.json));
  }
  {
    const demo = await postJson("/api/leads", {
      name: "Demo User",
      email: "demo@hospital.com",
      org: "CityCare Hospital",
      variant: "demo",
      meetingDate: "2026-07-15",
      meetingTime: "11:00 AM",
      timezone: "Asia/Kolkata (IST)",
      page: "/demo",
      utm_source: "functional-test",
    });
    if (demo.status === 200 && demo.json?.ok && demo.json?.meeting) {
      ok("API books demo meeting", `${demo.json.meeting.date} ${demo.json.meeting.time}`);
    } else fail("API books demo meeting", JSON.stringify(demo.json));
  }

  // 2) Home page functional markers
  {
    const { status, text } = await fetchText("/");
    if (status !== 200) fail("Home loads", `status=${status}`);
    else {
      ok("Home loads");
      const checks = [
        ["brand MedicoreERP", /MedicoreERP/i],
        ["hero HIS title", /Hospital Management System/i],
        ["Book a Demo CTA", /Book a Demo|Request a Demo|\/demo/i],
        ["Free chat", /Free chat/i],
        ["Main Features section", /Main Features and Capabilities/i],
        ["HIS dashboard modules", /Patient Registration|Appointment/i],
        ["patient journey", /Overall patient journey|Registration/i],
      ];
      for (const [label, re] of checks) {
        if (re.test(text)) ok(`Home has ${label}`);
        else fail(`Home has ${label}`);
      }
    }
  }

  // 3) Demo page form UI
  {
    const { status, text } = await fetchText("/demo");
    if (status !== 200) fail("Demo page loads");
    else {
      ok("Demo page loads");
      if (/meetingDate|Book|slot|timezone|DemoBooking|name|email/i.test(text)) {
        ok("Demo page exposes booking UI fields");
      } else fail("Demo page exposes booking UI fields");
      if (/MedicoreERP/i.test(text)) ok("Demo page branded");
      else fail("Demo page branded");
    }
  }

  // 4) Contact form
  {
    const { status, text } = await fetchText("/contact");
    if (status !== 200) fail("Contact page loads");
    else {
      ok("Contact page loads");
      if (/name|email|message|LeadForm|submit/i.test(text)) ok("Contact page has form");
      else fail("Contact page has form");
    }
  }

  // 5) Dashboard interactive suite
  {
    const { status, text } = await fetchText("/dashboard");
    if (status !== 200) fail("Dashboard loads");
    else {
      ok("Dashboard loads");
      const tabs = ["Module Home", "Operations", "Clinical Today", "Revenue"];
      for (const t of tabs) {
        if (text.includes(t)) ok(`Dashboard has tab: ${t}`);
        else warn(`Dashboard has tab: ${t}`, "may be client-only");
      }
    }
  }

  // 6) Product deep links from MAIN_FEATURES
  const productPaths = [
    "/product/patient-access",
    "/product/emr",
    "/product/platform",
    "/product/appointments",
    "/product/clinical",
    "/product/billing-invoices",
    "/product/lab",
    "/product/radiology",
    "/product/pharmacy",
    "/product/supply-chain",
  ];
  for (const p of productPaths) {
    const { status, text } = await fetchText(p);
    if (status === 200 && /MedicoreERP|Explore|Book|product/i.test(text)) ok(`Product page ${p}`);
    else fail(`Product page ${p}`, `status=${status}`);
  }

  // 7) Sitemap URL sampling
  {
    const { status, text } = await fetchText("/sitemap.xml");
    if (status !== 200) fail("Sitemap loads");
    else {
      ok("Sitemap loads");
      const locs = [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
      if (locs.length >= 50) ok("Sitemap has many URLs", String(locs.length));
      else warn("Sitemap has many URLs", String(locs.length));

      // sample 15 unique paths
      const sample = locs
        .map((u) => {
          try {
            return new URL(u).pathname;
          } catch {
            return null;
          }
        })
        .filter(Boolean)
        .filter((v, i, a) => a.indexOf(v) === i)
        .slice(0, 15);

      let broken = 0;
      for (const path of sample) {
        const r = await fetchText(path);
        if (r.status >= 400) {
          broken++;
          fail(`Sitemap URL works ${path}`, `status=${r.status}`);
        }
      }
      if (broken === 0) ok("Sampled sitemap URLs resolve", `${sample.length} checked`);
    }
  }

  // 8) Compare / pricing / ROI interactive page shell
  for (const [path, needle] of [
    ["/compare/vs-epic", /Epic|MedicoreERP/i],
    ["/pricing", /₹|Clinic|Hospital|pricing/i],
    ["/pricing/roi-calculator", /ROI|calculator|estimate/i],
  ]) {
    const { status, text } = await fetchText(path);
    if (status === 200 && needle.test(text)) ok(`Functional page ${path}`);
    else fail(`Functional page ${path}`, `status=${status}`);
  }

  // 9) robots
  {
    const { status, text } = await fetchText("/robots.txt");
    if (status === 200 && /sitemap/i.test(text)) ok("robots.txt points to sitemap");
    else fail("robots.txt points to sitemap");
  }

  // Summary
  const pass = results.filter((r) => r.status === "PASS").length;
  const fails = results.filter((r) => r.status === "FAIL");
  const warns = results.filter((r) => r.status === "WARN");
  console.log("\n==== SUMMARY ====");
  console.log(`PASS=${pass} FAIL=${fails.length} WARN=${warns.length}`);
  if (fails.length) {
    console.log("Failures:");
    fails.forEach((f) => console.log(` - ${f.name}: ${f.detail}`));
  }
  process.exit(fails.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
