"use client";

export const WHATSAPP_URL =
  "https://wa.me/919966411913?text=Hello%20MedicoreERP%2C%20I%20would%20like%20to%20know%20more%20about%20your%20medical%20ERP.";

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M12.04 2a9.84 9.84 0 0 0-8.42 14.93L2.05 22l5.2-1.52A9.96 9.96 0 1 0 12.04 2Zm0 17.82a7.84 7.84 0 0 1-4-1.1l-.29-.17-3.08.9.92-3-.19-.3a7.82 7.82 0 1 1 6.64 3.67Zm4.3-5.86c-.24-.12-1.4-.69-1.61-.77-.22-.08-.38-.12-.54.12-.16.24-.61.77-.75.93-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.18a7.12 7.12 0 0 1-1.32-1.64c-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.73-1.78-.2-.46-.4-.4-.54-.41h-.46a.88.88 0 0 0-.63.3c-.22.24-.83.81-.83 1.98 0 1.16.85 2.29.97 2.45.12.16 1.67 2.55 4.05 3.58.56.24 1 .39 1.35.5.57.18 1.08.15 1.49.09.45-.07 1.4-.57 1.59-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.45-.28Z" />
    </svg>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-5 z-[90] inline-flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-bold text-white shadow-pop transition hover:bg-[#1fb858]"
      aria-label="Chat with MedicoreERP on WhatsApp"
    >
      <WhatsAppIcon />
      <span>WhatsApp</span>
    </a>
  );
}
