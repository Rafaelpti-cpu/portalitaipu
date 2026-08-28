import { useEffect, useState } from "react";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import logoAsset from "@/assets/portal-itaipu-logo.png.asset.json";
import heroPerson from "@/assets/hero-person.png";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Wifi,
  Zap,
  Headphones,
  Clock,
  MapPin,
  ShieldCheck,
  MessageCircle,
  Phone,
  Check,
} from "lucide-react";
import { WhatsAppLink } from "@/components/landing/cta-link";
import { CoverageCheck } from "@/components/landing/coverage-check";
import { Testimonials } from "@/components/landing/testimonials";
import { PlansComparison } from "@/components/landing/plans-comparison";
import { MobileCtaBar } from "@/components/landing/mobile-cta-bar";
import { SeoKeywords } from "@/components/landing/seo-keywords";
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  defaultMessageFor,
  offerDisclaimerFor,
  trackLead,
} from "@/lib/lead";
import {
  clearSavedCity,
  getSavedCitySlug,
  resolveCity,
  resolveCityParam,
  saveCitySlug,
  useCity,
  type CityConfig,
} from "@/lib/cities";
import { CitySelector } from "@/components/landing/city-selector";

const buildTitle = (city: CityConfig) =>
  `Internet Fibra em ${city.nameWithState} | 1ª Mensalidade Grátis | Portal Itaipu`;
const buildDescription = (city: CityConfig) =>
  `1ª mensalidade grátis em ${city.nameWithState}: 550 Mega + WiFi 6 por R$ 109,90/mês, planos com Watch TV Canais Brasil e Max. Instalação grátis, ativação em até 24h e suporte local.`;
const buildKeywords = (city: CityConfig) =>
  [
    `internet em ${city.name}`,
    `internet fibra óptica ${city.name}`,
    `provedor de internet ${city.name} PR`,
    `internet 550 mega ${city.name}`,
    `internet com WiFi 6 ${city.name}`,
    `internet com TV ${city.name}`,
    `internet com Max ${city.name}`,
    `internet residencial ${city.name} Paraná`,
    `contratar internet ${city.name}`,
    `instalação de internet grátis ${city.name}`,
    "Portal Itaipu internet",
  ].join(", ");

const buildFaqs = (city: CityConfig) => [
  {
    question: `Tem disponibilidade no meu bairro em ${city.name}?`,
    answer: `Nossa rede nova está expandindo por ${city.name}. Informe seu bairro na consulta de cobertura ou envie seu endereço pelo WhatsApp e confirmamos a viabilidade técnica em poucos minutos.`,
  },
  {
    question: "Quanto tempo leva para instalar?",
    answer:
      "Trabalhamos para ativar sua internet em até 24 horas após a confirmação do pedido. A instalação é 100% gratuita.",
  },
  {
    question: "O WiFi 6 é incluso no plano de R$ 109,90?",
    answer:
      "Sim! O Plano FOR FAMILY de 550 Mega já inclui roteador com tecnologia WiFi 6, que entrega mais alcance e estabilidade.",
  },
  {
    question: "Preciso pagar alguma taxa de adesão?",
    answer:
      "Não. Nesta oferta, a instalação e ativação são gratuitas. Você paga apenas a mensalidade do plano contratado.",
  },
  {
    question: `Por que escolher a Portal Itaipu em ${city.name}?`,
    answer: `Somos um provedor local com suporte humanizado, 20 anos de experiência no oeste do Paraná e infraestrutura moderna em ${city.name}. Todos os planos incluem Wi-Fi 6, instalação grátis e atendimento próximo, sem robôs.`,
  },
];

export const Route = createFileRoute("/")({
  head: (ctx) => {
    const city = resolveCity(
      (ctx.match.search as { cidade?: string } | undefined)?.cidade,
    );

    const TITLE = buildTitle(city);
    const DESCRIPTION = buildDescription(city);
    const KEYWORDS = buildKeywords(city);
    const faqs = buildFaqs(city);

    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESCRIPTION },
        { name: "keywords", content: KEYWORDS },
        { name: "geo.region", content: "BR-PR" },
        { name: "geo.placename", content: `${city.name}, Paraná` },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESCRIPTION },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: TITLE },
        { name: "twitter:description", content: DESCRIPTION },
      ],
      links: [
        { rel: "canonical", href: "/" },
        { rel: "preload", as: "image", href: logoAsset.url },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Portal Itaipu",
            description: `Provedor de internet fibra óptica em ${city.name}, Paraná.`,
            url: "https://portalitaipu.com.br/",
            telephone: PHONE_TEL,
            image: "https://portalitaipu.com.br/",
            keywords: KEYWORDS,
            address: {
              "@type": "PostalAddress",
              addressLocality: city.name,
              addressRegion: "PR",
              addressCountry: "BR",
            },
            areaServed: [
              {
                "@type": "City",
                name: city.name,
                containedInPlace: { "@type": "State", name: "Paraná" },
              },
              ...city.bairros.map((bairro) => ({
                "@type": "Place",
                name: `${bairro}, ${city.name} - PR`,
              })),
            ],
            priceRange: "R$ 109,90 - R$ 129,90",
            makesOffer: [
              {
                "@type": "Offer",
                name: "Plano FOR FAMILY 550 Mega + WiFi 6",
                price: "109.90",
                priceCurrency: "BRL",
              },
              {
                "@type": "Offer",
                name: "Plano 550 Mega + WiFi 6 + Watch TV Canais Brasil",
                price: "119.90",
                priceCurrency: "BRL",
              },
              {
                "@type": "Offer",
                name: "Plano 550 Mega + WiFi 6 + Watch TV + Max",
                price: "129.90",
                priceCurrency: "BRL",
              },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        },
      ],
    };
  },
  component: Index,
});


function Index() {
  const search = useSearch({ strict: false }) as { cidade?: unknown };
  const paramCity = resolveCityParam(search?.cidade);
  const navigate = useNavigate();
  // null = ainda verificando o localStorage; true = mostrar seletor
  const [showSelector, setShowSelector] = useState<boolean | null>(null);

  useEffect(() => {
    if (paramCity) {
      // Tráfego de anúncio (parâmetro válido): conteúdo direto, sem seletor.
      saveCitySlug(paramCity.slug);
      setShowSelector(false);
      return;
    }
    const saved = getSavedCitySlug();
    if (saved) {
      navigate({ to: "/", search: { cidade: saved }, replace: true });
    } else {
      setShowSelector(true);
    }
  }, [paramCity, navigate]);

  if (!paramCity) {
    if (showSelector) return <CitySelector />;
    // Verificando cidade salva: tela neutra para evitar flash de conteúdo.
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-screen bg-background pb-20 font-sans md:pb-0">
      <Header />
      <main>
        <HeroSection />
        <BenefitsSection />
        <CoverageCheck />
        <PlansComparison />
        <Testimonials />
        <TrustSection />
        <SeoKeywords />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
      <MobileCtaBar />
    </div>
  );
}

function Header() {
  const city = useCity();
  const navItems = [
    { label: "Planos", href: "#planos" },
    { label: "Benefícios", href: "#beneficios" },
    { label: "Dúvidas", href: "#duvidas" },
  ];
  return (
    <header className="sticky top-0 z-40 w-full bg-brand-dark">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16">
        <a href="/" className="flex items-center gap-2">
          <span className="flex items-center rounded-xl bg-white px-2.5 py-1.5">
            <img
              src={logoAsset.url}
              alt={`Portal Itaipu — internet fibra óptica em ${city.nameWithState}`}
              className="h-6 w-auto sm:h-7"
              width="1733"
              height="593"
            />
          </span>
        </a>
        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-7 md:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={`tel:${PHONE_TEL}`}
            onClick={() => trackLead("phone_click", { location: "header" })}
            className="hidden items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
          <Button
            asChild
            size="sm"
            className="bg-whatsapp text-white hover:bg-whatsapp-dark"
          >
            <WhatsAppLink
              location="header"
              message={`Olá! Vi a campanha do Google e quero contratar internet em ${city.nameWithState}.`}
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </WhatsAppLink>
          </Button>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  const city = useCity();
  const heroChecks = [
    "Instalação grátis",
    "WiFi 6 de alta performance",
    "Ativação em até 24h",
    "Rede 100% fibra óptica",
    "Suporte local humanizado",
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-magenta via-brand-magenta to-brand-purple text-white">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-brand-yellow/20 blur-3xl" />
      <div className="container relative mx-auto grid max-w-6xl gap-8 px-4 pt-10 sm:pt-12 lg:grid-cols-[1.05fr_0.7fr_0.75fr] lg:items-end lg:gap-6 lg:pt-16">
        <div className="space-y-5 sm:space-y-6 lg:pb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm font-medium text-white">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-yellow opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-yellow"></span>
            </span>
            {city.redeNova
              ? `Rede nova em ${city.nameWithState}`
              : `Fibra óptica em ${city.nameWithState}`}
          </div>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Internet fibra em {city.name} com{" "}
            <span className="text-brand-yellow">1ª mensalidade grátis</span>
          </h1>
          <p className="text-base text-white/85 sm:text-lg">
            Contrate o plano de <strong>550 Mega + WiFi 6</strong> por{" "}
            <strong>R$ 109,90/mês</strong> e não pague nada no primeiro mês.
            Instalação grátis, ativação em até 24h.
          </p>
          <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-white/70">
                Plano FOR FAMILY por apenas
              </p>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-xl font-bold sm:text-2xl">R$</span>
                <span className="text-6xl font-black leading-none sm:text-7xl">
                  109
                </span>
                <span className="text-2xl font-black sm:text-3xl">,90</span>
                <span className="pb-0.5 text-sm text-white/80">/mês</span>
              </div>
            </div>
            <span className="mb-1 inline-flex -rotate-2 items-center rounded-lg bg-brand-yellow px-3 py-1.5 text-sm font-black text-brand-dark shadow-lg">
              1º MÊS GRÁTIS
            </span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-14 gap-2 rounded-full bg-white px-8 text-base font-bold text-brand-magenta shadow-xl hover:bg-white/90"
            >
              <WhatsAppLink location="hero" message={defaultMessageFor(city.name)}>
                <MessageCircle className="h-5 w-5" />
                Quero contratar agora
              </WhatsAppLink>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 gap-2 rounded-full border-white/40 bg-transparent px-6 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#cobertura">Consultar cobertura</a>
            </Button>
          </div>
          <p className="text-[11px] leading-relaxed text-white/60">
            {offerDisclaimerFor(city.name)}
          </p>
          <p className="text-sm text-white/80">
            Prefere ligar?{" "}
            <a
              href={`tel:${PHONE_TEL}`}
              onClick={() => trackLead("phone_click", { location: "hero" })}
              className="font-bold text-white underline-offset-4 hover:underline"
            >
              {PHONE_DISPLAY}
            </a>{" "}
            — seg. a sáb., 8h às 18h.
          </p>
        </div>
        <div className="relative order-3 flex items-end justify-center lg:order-none">
          <img
            src={heroPerson}
            alt="Cliente navegando no celular com a internet fibra da Portal Itaipu"
            width={832}
            height={1216}
            className="w-52 max-w-full object-contain drop-shadow-2xl sm:w-64 lg:w-full lg:max-w-xs"
          />
        </div>
        <ul className="order-2 space-y-3 pb-10 sm:space-y-4 lg:order-none lg:pb-14">
          {heroChecks.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 text-sm font-medium sm:text-base"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15">
                <Check className="h-3.5 w-3.5 text-brand-yellow" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const city = useCity();
  const benefits = [
    {
      icon: Zap,
      title: "Velocidade real",
      description:
        "550 Mega de internet fibra óptica para navegar, assistir e jogar sem travamentos.",
      color: "text-brand-yellow",
      bg: "bg-brand-yellow/10",
    },
    {
      icon: Wifi,
      title: "WiFi 6 incluso",
      description:
        "Roteador com tecnologia WiFi 6 para maior alcance e estabilidade em todos os cômodos.",
      color: "text-brand-magenta",
      bg: "bg-brand-magenta/10",
    },
    {
      icon: Clock,
      title: "Ativação em 24h",
      description:
        "Instalação grátis e ativação em até 24 horas para você começar a usar logo.",
      color: "text-brand-blue",
      bg: "bg-brand-blue/10",
    },
    {
      icon: Headphones,
      title: "Atendimento humanizado",
      description:
        "Provedor local com suporte atendido por pessoas de verdade, sem robôs.",
      color: "text-brand-purple",
      bg: "bg-brand-purple/10",
    },
  ];

  return (
    <section id="beneficios" className="scroll-mt-16 bg-muted/50 px-4 py-12 md:py-16">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 text-center md:mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Por que contratar a Portal Itaipu?
          </h2>
          <p className="mt-3 text-muted-foreground">
            A escolha certa para quem quer internet de qualidade em{" "}
            {city.name}.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:p-6"
            >
              <div
                className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl sm:mb-4 sm:h-12 sm:w-12 ${benefit.bg}`}
              >
                <benefit.icon
                  className={`h-5 w-5 sm:h-6 sm:w-6 ${benefit.color}`}
                />
              </div>
              <h3 className="text-base font-bold text-foreground sm:text-lg">
                {benefit.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const city = useCity();
  const items = [
    {
      icon: ShieldCheck,
      title: "20 anos de experiência",
      description: "Referência no oeste do Paraná em telecomunicações.",
    },
    {
      icon: MapPin,
      title: city.redeNova
        ? `Rede nova em ${city.name}`
        : `Fibra própria em ${city.name}`,
      description: city.redeNova
        ? "Infraestrutura moderna e de alta capacidade para a cidade."
        : "Infraestrutura de alta capacidade para a cidade.",
    },
    {
      icon: Phone,
      title: "Atendimento local",
      description: "Fale com quem conhece a região e resolve com agilidade.",
    },
  ];

  return (
    <section className="bg-brand-dark px-4 py-12 text-white md:py-16">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Provedor local, tecnologia de ponta
            </h2>
            <p className="mt-4 text-lg text-white/80">
              {city.redeNova
                ? `A Portal Itaipu chegou em ${city.name} com uma rede totalmente nova, pronta para entregar a velocidade e estabilidade que sua casa precisa.`
                : `A Portal Itaipu atende ${city.name} com rede de fibra óptica própria, entregando a velocidade e estabilidade que sua casa precisa.`}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 w-full gap-2 bg-white px-6 font-bold text-brand-dark hover:bg-white/90 sm:w-auto"
              >
                <WhatsAppLink
                  location="trust"
                  message={`Olá! Moro em ${city.nameWithState} e quero saber se tem disponibilidade na minha rua.`}
                >
                  <MessageCircle className="h-5 w-5" />
                  Ver disponibilidade
                </WhatsAppLink>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 w-full gap-2 border-white/30 bg-transparent px-6 font-bold text-white hover:bg-white/10 hover:text-white sm:w-auto"
              >
                <a
                  href={`tel:${PHONE_TEL}`}
                  onClick={() => trackLead("phone_click", { location: "trust" })}
                >
                  <Phone className="h-5 w-5" />
                  Ligar {PHONE_DISPLAY}
                </a>
              </Button>
            </div>
          </div>
          <div className="grid gap-4">
            {items.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur sm:p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-magenta">
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm text-white/80">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const city = useCity();
  const faqs = buildFaqs(city);
  return (
    <section id="duvidas" className="scroll-mt-16 bg-muted/30 px-4 py-12 md:py-16">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-8 text-center md:mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Dúvidas frequentes
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tudo o que você precisa saber antes de contratar.
          </p>
        </div>
        <Accordion type="single" collapsible className="rounded-2xl bg-card p-2">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="px-4 text-left text-sm font-semibold hover:no-underline sm:text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  const city = useCity();
  return (
    <section className="px-4 py-12 md:py-16">
      <div className="container mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-magenta via-brand-magenta to-brand-purple p-6 text-center text-white shadow-2xl sm:p-8 md:p-12">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-brand-yellow/20 blur-3xl" />
          <div className="relative">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Não fique sem internet de qualidade
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
              Contrate 550 Mega + WiFi 6 por R$ 109,90/mês e ganhe a 1ª
              mensalidade grátis, com instalação grátis e ativação em até 24h em
              {city.nameWithState}.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-xs text-white/70">
              {offerDisclaimerFor(city.name)}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-14 w-full gap-2 bg-white px-8 text-base font-bold text-brand-magenta shadow-xl hover:bg-white/90 sm:w-auto"
              >
                <WhatsAppLink
                  location="final_cta"
                  message={defaultMessageFor(city.name)}
                >
                  <MessageCircle className="h-5 w-5" />
                  Falar no WhatsApp agora
                </WhatsAppLink>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 w-full gap-2 border-white/40 bg-transparent px-8 text-base font-bold text-white hover:bg-white/10 hover:text-white sm:w-auto"
              >
                <a
                  href={`tel:${PHONE_TEL}`}
                  onClick={() =>
                    trackLead("phone_click", { location: "final_cta" })
                  }
                >
                  <Phone className="h-5 w-5" />
                  Ligar agora
                </a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-white/80">
              Atendimento de segunda a sábado, 8h às 18h.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const city = useCity();
  return (
    <footer className="border-t border-border bg-background px-4 py-10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <img
            src={logoAsset.url}
            alt="Portal Itaipu"
            className="h-10 w-auto"
            width="1733"
            height="593"
            loading="lazy"
          />
          <div className="text-center text-sm text-muted-foreground md:text-right">
            <p>
              Telefone:{" "}
              <a
                href={`tel:${PHONE_TEL}`}
                className="font-semibold text-foreground"
              >
                {PHONE_DISPLAY}
              </a>
            </p>
            <p className="mt-1">
              © 2026 Portal Itaipu. Todos os direitos reservados.
            </p>
            <p className="mt-1">
              {city.nameWithState} • Internet Fibra Óptica de qualidade
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsAppButton() {
  const city = useCity();
  return (
    <WhatsAppLink
      location="floating_button"
      message={defaultMessageFor(city.name)}
      aria-label="Conversar no WhatsApp"
      className="group fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/25 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:bottom-6 md:right-6"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 animate-ping rounded-full bg-whatsapp opacity-30 [animation-duration:2s]"
      />
      <MessageCircle className="relative h-7 w-7" />
    </WhatsAppLink>
  );
}
