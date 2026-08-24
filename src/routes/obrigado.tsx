import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { trackLead, trackWhatsAppClick } from "@/lib/lead";
import logoAsset from "@/assets/portal-itaipu-logo.png.asset.json";

const WHATSAPP_OBRIGADO_URL =
  "https://wa.me/554535591665?text=Ol%C3%A1!%20Acabei%20de%20preencher%20o%20formul%C3%A1rio%20e%20quero%20o%201%C2%BA%20m%C3%AAs%20gr%C3%A1tis";

export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [
      { title: "Recebemos seu contato | Portal Itaipu" },
      {
        name: "description",
        content:
          "Recebemos seu contato. Nosso time vai te chamar no WhatsApp em até 10 minutos.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Recebemos seu contato | Portal Itaipu" },
      {
        property: "og:description",
        content:
          "Nosso time vai te chamar no WhatsApp em até 10 minutos.",
      },
    ],
  }),
  component: ObrigadoPage,
});

function ObrigadoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex h-20 max-w-5xl items-center justify-center px-4">
          <Link to="/" aria-label="Portal Itaipu - Página inicial">
            <img
              src={logoAsset.url}
              alt="Portal Itaipu Internet Fibra"
              className="h-12 w-auto object-contain"
            />
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl rounded-3xl border border-border bg-card p-8 text-center shadow-lg md:p-12">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-whatsapp/10">
            <CheckCircle2 className="h-9 w-9 text-whatsapp" />
          </span>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Recebemos seu contato! ✅
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Nosso time vai te chamar no WhatsApp em até 10 minutos. Se preferir
            falar agora, é só clicar no botão abaixo.
          </p>
          <a
            href={WHATSAPP_OBRIGADO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackLead("whatsapp_click", { location: "obrigado" });
              trackWhatsAppClick();
            }}
            className="mt-8 flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-whatsapp text-lg font-bold text-white shadow-lg shadow-whatsapp/25 transition-colors hover:bg-whatsapp-dark"
          >
            <MessageCircle className="h-6 w-6" />
            Falar agora no WhatsApp
          </a>
          <p className="mt-6 text-sm text-muted-foreground">
            Atendimento em horário comercial.
          </p>
        </div>
      </main>
    </div>
  );
}
