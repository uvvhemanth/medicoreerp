import { ImageResponse } from "next/og";

export const alt = "MedicoreERP — Hospital Management System Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded share image used for every page that does not set its own. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0b1f2a 0%, #0f4c5c 55%, #0d9488 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#ffffff",
              color: "#0d9488",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            M
          </div>
          <div style={{ fontSize: 40, fontWeight: 800 }}>MedicoreERP</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.08, maxWidth: 980 }}>
            Hospital Management System Software
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.82)", maxWidth: 960 }}>
            EMR · OPD & IPD · Billing · Pharmacy · Laboratory · Radiology · ABDM-ready
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "rgba(255,255,255,0.85)" }}>
          <div>medicoreerp.com</div>
          <div>Book a free demo →</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
