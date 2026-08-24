import { useEffect, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import {
  DEFAULT_MESSAGE,
  WHATSAPP_NUMBER,
  trackLead,
  trackWhatsAppClick,
} from "@/lib/lead";
import logoAsset from "@/assets/portal-itaipu-logo.png.asset.json";

function buildWhatsAppMessage(nome: string, bairro: string) {
  if (nome && bairro) {
    return `Olá! Sou ${nome}, do bairro ${bairro} em Medianeira. Acabei de consultar a cobertura e quero contratar com o 1º mês grátis.`;
  }
  return DEFAULT_MESSAGE;
}

export const Route = createFileRoute("/obrigado")({
  validateSearch: (search: Record<string, unknown>) => ({
    nome: typeof search.nome === "string" ? search.nome : "",
    bairro: typeof search.bairro === "string" ? search.bairro : "",
  }),
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
        content: "Nosso time vai te chamar no WhatsApp em até 10 minutos.",
      },
    ],
  }),
  component: ObrigadoPage,
});

function ObrigadoPage() {
  const { nome, bairro } = Route.useSearch();

  const whatsappUrl = useMemo(() => {
    const message = buildWhatsAppMessage(nome.trim(), bairro.trim());
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [nome, bairro]);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }, 2000);
    return () => clearTimeout(timer);
  }, [whatsappUrl]);

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
            Nosso time vai te chamar no WhatsApp em até 10 minutos. O WhatsApp
            vai abrir automaticamente em instantes — se não abrir, é só clicar
            no botão abaixo.
          </p>
          <a
            href={whatsappUrl}
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
