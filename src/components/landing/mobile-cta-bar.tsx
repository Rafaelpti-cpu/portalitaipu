import { MessageCircle, Phone } from "lucide-react";
import { WhatsAppLink } from "@/components/landing/cta-link";
import { DEFAULT_MESSAGE, PHONE_TEL, trackLead } from "@/lib/lead";

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.12)] backdrop-blur md:hidden">
      <div className="flex items-center gap-2">
        <a
          href={`tel:${PHONE_TEL}`}
          onClick={() => trackLead("phone_click", { location: "mobile_bar" })}
          className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-brand-magenta"
          aria-label="Ligar para a Portal Itaipu"
        >
          <Phone className="h-5 w-5" />
        </a>
        <WhatsAppLink
          location="mobile_sticky_bar"
          message={DEFAULT_MESSAGE}
          className="flex h-13 flex-1 items-center justify-center gap-2 rounded-xl bg-brand-magenta text-base font-bold text-white shadow-lg shadow-brand-magenta/25"
        >
          <MessageCircle className="h-5 w-5" />
          Contratar agora
        </WhatsAppLink>
      </div>
    </div>
  );
}
