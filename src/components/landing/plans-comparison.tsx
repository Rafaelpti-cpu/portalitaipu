import { Check, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/landing/cta-link";
import { offerDisclaimerFor } from "@/lib/lead";
import { useCity } from "@/lib/cities";
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
  const city = useCity();
  return (
    <section id="planos" className="scroll-mt-16 bg-muted/40 py-12 md:py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Compare os planos para {city.name}
          </h2>
          <p className="mt-3 text-muted-foreground">
            Todos com 550 Mega de fibra óptica, WiFi 6, instalação grátis e a{" "}
            <strong className="text-foreground">1ª mensalidade grátis</strong>.
            Escolha se quer TV e streaming inclusos.
          </p>
          <div className="mt-6 flex flex-col items-center gap-2">
            <span className="text-sm font-semibold text-brand-magenta">
              Mostrando ofertas para:
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-magenta/30 bg-card px-4 py-1.5 text-sm font-semibold text-foreground shadow-sm">
              <MapPin className="h-4 w-4 text-brand-magenta" />
              {city.nameComma}
            </span>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 max-w-6xl md:mt-10">
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:pb-0">
          {plans.map((plan) => (
            <article
              key={plan.price}
              className={`flex w-[82vw] max-w-sm shrink-0 snap-center flex-col overflow-hidden rounded-3xl bg-card lg:w-auto lg:max-w-none ${
                plan.highlight
                  ? "border-2 border-brand-magenta shadow-2xl"
                  : "border border-border shadow-sm"
              }`}
            >
              <header
                className={`relative p-5 text-white sm:p-6 ${
                  plan.highlight ? "bg-brand-magenta" : "bg-brand-dark"
                }`}
              >
                {plan.highlight ? (
                  <span className="mb-3 inline-block rounded-full bg-brand-yellow px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-brand-dark">
                    Oferta em destaque
                  </span>
                ) : null}
                <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Plano
                </p>
                <h3 className="text-xl font-black leading-tight">
                  {plan.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-4xl font-black">{plan.speed}</span>
                  <span className="text-sm font-semibold text-white/80">
                    Mega
                  </span>
                </div>
              </header>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    R$
                  </span>
                  <span className="text-4xl font-black text-brand-magenta">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">/mês</span>
                </div>
                <p className="mt-1 text-xs font-bold text-brand-magenta">
                  *1ª mensalidade grátis
                </p>
                {plan.logos.length > 0 ? (
                  <div className="mt-4 flex flex-wrap items-center gap-4 rounded-2xl bg-muted/60 px-4 py-3">
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
                <ul className="mt-5 flex-1 space-y-2.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-foreground"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-magenta/10">
                        <Check className="h-3 w-3 text-brand-magenta" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`mt-6 w-full gap-2 rounded-full py-6 text-base font-bold ${
                    plan.highlight
                      ? "bg-brand-magenta text-white hover:bg-brand-magenta/90"
                      : "bg-brand-dark text-white hover:bg-brand-dark/90"
                  }`}
                >
                  <WhatsAppLink
                    location={`plano_${plan.price}`}
                    message={`Olá! Vim pela página de ${city.name} e quero contratar o plano ${plan.name} de ${plan.speed} Mega por R$ ${plan.price}/mês com a 1ª mensalidade grátis.`}
                  >
                    <MessageCircle className="h-5 w-5" />
                    Contratar R$ {plan.price}
                  </WhatsAppLink>
                </Button>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 px-4 text-center text-xs text-muted-foreground">
          {offerDisclaimerFor(city.name)} Ofertas sujeitas a viabilidade técnica. Watch TV
          Canais Brasil e Max sujeitos aos termos de cada serviço.
        </p>
      </div>
    </section>
  );
}
