import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { Home, LifeBuoy } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-6 text-center">
      <Logo />
      <p className="mt-10 font-heading text-[80px] font-extrabold leading-none text-gradient-teal">404</p>
      <h1 className="mt-2 font-heading text-2xl font-bold text-heading">This page took a wrong turn</h1>
      <p className="mt-2 max-w-sm text-muted">The page you're looking for doesn't exist or was moved. Let's get you back on track.</p>
      <div className="mt-8 flex gap-3">
        <Button asChild><Link href="/"><Home className="h-4 w-4" /> Back home</Link></Button>
        <Button asChild variant="outline"><Link href="/contact"><LifeBuoy className="h-4 w-4" /> Contact support</Link></Button>
      </div>
    </div>
  );
}
