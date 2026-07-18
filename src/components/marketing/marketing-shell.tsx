import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { ChatBot } from "./chat-bot";
import { DemoFab } from "./demo-fab";
import { WhatsAppFab } from "./whatsapp-fab";

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-teal focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <DemoFab />
      <ChatBot />
      <WhatsAppFab />
    </>
  );
}
