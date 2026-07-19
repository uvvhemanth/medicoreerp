import Image from "next/image";
import { cn } from "@/lib/utils";

/** MedicoreERP medical monogram and wordmark. */
export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <Image
        src="/icon.png"
        alt=""
        width={36}
        height={36}
        priority
        aria-hidden="true"
        className="h-8 w-8 shrink-0 object-contain"
      />
      {showText && (
        <span className="font-heading text-[17px] font-extrabold tracking-tight text-heading">
          Medicore<span className="text-teal">ERP</span>
        </span>
      )}
    </span>
  );
}
