import { Check, MessageCircle, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/landing/cta-link";
import { OFFER_DISCLAIMER } from "@/lib/lead";
import watchTvLogo from "@/assets/watch-tv.png.asset.json";
import hboMaxLogo from "@/assets/hbo-max.svg.asset.json";

type Plan = {
  name: string;
  speed: string;
  price: string;
  highlight: boolean;
  features: string[];
  logos: { src: string; alt: string; className: string }[];
};

const plans: Plan[] = [
  {
    name: "FOR FAMILY",
    speed: "550",
    price: "109,90",
    highlight: false,
    features: [
      "WiFi 6 de alta performance",
      "Latência baixa para jogos online e home office",
      "Instalação 100% grátis",
      "Ativação em até 24h",
      "Suporte técnico local",
      "Sem taxa de adesão",
    ],
    logos: [],
  },
  {
    name: "FOR FAMILY + TV",
    speed: "550",
    price: "119,90",
    highlight: true,
    features: [
      "Watch TV Canais Brasil incluso",
      "WiFi 6 de alta performance",
      "Instalação 100% grátis",
      "Ativação em até 24h",
      "Suporte técnico local",
    ],
    logos: [
      { src: watchTvLogo.url, alt: "Watch TV Canais Brasil", className: "h-7" },
    ],
  },
  {
    name: "FOR FAMILY + TV E MAX",
    speed: "550",
    price: "129,90",
    highlight: false,
    features: [
      "Watch TV Canais Brasil incluso",
      "Max incluso",
      "WiFi 6 de alta performance",
      "Instalação 100% grátis",
      "Suporte técnico local",
    ],
    logos: [
      { src: watchTvLogo.url, alt: "Watch TV Canais Brasil", className: "h-7" },
      { src: hboMaxLogo.url, alt: "Max", className: "h-7" },
    ],
  },
];

export function PlansComparison() {
  return (
    <section id="planos" className="px-4 py-16">
      <div className="container mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Compare os planos para Medianeira
          </h2>
          <p className="mt-3 text-muted-foreground">
            Todos com 550 Mega de fibra óptica, WiFi 6, instalação grátis e a{" "}
            <strong className="text-foreground">1ª mensalidade grátis</strong>.
            Escolha se quer TV e streaming inclusos.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.price}
              className={`relative flex flex-col overflow-hidden rounded-3xl border bg-card p-7 ${
                plan.highlight
                  ? "border-2 border-brand-magenta shadow-2xl lg:-mt-3 lg:pb-10"
                  : "border-border shadow-sm"
              }`}
            >
              <div className="absolute right-5 top-5 flex flex-col items-end gap-2">
                <span className="rounded-full bg-brand-yellow px-3 py-1 text-xs font-bold text-brand-dark">
                  1º MÊS GRÁTIS
                </span>
                {plan.highlight ? (
                  <span className="rounded-full bg-brand-magenta px-3 py-1 text-xs font-bold text-white">
                    MAIS VENDIDO
                  </span>
                ) : null}
              </div>
              <Wifi
                className={`h-7 w-7 ${
                  plan.highlight ? "text-brand-magenta" : "text-brand-blue"
                }`}
              />
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Plano {plan.name}
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-5xl font-black text-foreground">
                  {plan.speed}
                </span>
                <span className="text-lg font-semibold text-muted-foreground">
                  Mega
                </span>
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-base text-muted-foreground">R$</span>
                <span className="text-4xl font-black text-foreground">
                  {plan.price}
                </span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              {plan.logos.length > 0 ? (
                <div className="mt-5 flex flex-wrap items-center gap-4 rounded-2xl bg-muted/60 px-4 py-3">
                  {plan.logos.map((logo) => (
                    <img
                      key={logo.alt}
                      src={logo.src}
                      alt={logo.alt}
                      loading="lazy"
                      className={`${logo.className} w-auto object-contain`}
                    />
                  ))}
                </div>
              ) : null}
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-foreground"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-magenta/10">
                      <Check className="h-3 w-3 text-brand-magenta" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={`mt-7 w-full gap-2 py-6 text-base font-bold ${
                  plan.highlight
                    ? "bg-brand-magenta text-white hover:bg-brand-magenta/90"
                    : "bg-brand-dark text-white hover:bg-brand-dark/90"
                }`}
              >
                <WhatsAppLink
                  location={`plano_${plan.price}`}
                  message={`Olá! Vim pela página de Medianeira e quero contratar o plano ${plan.name} de ${plan.speed} Mega por R$ ${plan.price}/mês com a 1ª mensalidade grátis.`}
                >
                  <MessageCircle className="h-5 w-5" />
                  Contratar R$ {plan.price}
                </WhatsAppLink>
              </Button>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          {OFFER_DISCLAIMER} Ofertas sujeitas a viabilidade técnica. Watch TV
          Canais Brasil e Max sujeitos aos termos de cada serviço.
        </p>
      </div>
    </section>
  );
}
