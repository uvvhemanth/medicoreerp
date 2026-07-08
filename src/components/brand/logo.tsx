import { cn } from "@/lib/utils";

/** Aether mark — an "Æ" monogram in a rounded teal tile. */
export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-gradient-to-br from-teal to-teal-deep text-white shadow-soft">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 20L11 4L14 11" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 20H20M13.5 13.5H19M14 20L18.5 8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {showText && (
        <span className="font-heading text-[17px] font-extrabold tracking-tight text-heading">
          Aether<span className="text-teal"> Health</span>
        </span>
      )}
    </span>
  );
}
