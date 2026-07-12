"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";

/** Floating Book a Demo — mirrors Free chat FAB on the opposite side. */
export function DemoFab() {
  return (
    <Link
      href="/demo"
      className="fixed bottom-5 left-5 z-[90] inline-flex h-14 items-center gap-2 rounded-full bg-teal px-5 text-sm font-bold text-white shadow-pop transition hover:bg-teal-dark"
      aria-label="Book a Demo"
    >
      <Calendar className="h-5 w-5" />
      <span>Book a Demo</span>
    </Link>
  );
}
