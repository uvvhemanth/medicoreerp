import { cn } from "@/lib/utils";

/** MedicoreERP mark — M monogram in a rounded teal tile. */
export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-gradient-to-br from-teal to-teal-deep text-white shadow-soft">
        <span className="font-heading text-sm font-extrabold leading-none tracking-tight">M</span>
      </span>
      {showText && (
        <span className="font-heading text-[17px] font-extrabold tracking-tight text-heading">
          Medicore<span className="text-teal">ERP</span>
        </span>
      )}
    </span>
  );
}
