import { createFileRoute } from "@tanstack/react-router";
import logoAsset from "@/assets/portal-itaipu-logo.png.asset.json";
import heroBackground from "@/assets/hero-technician-background.jpg";
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
  Star,
} from "lucide-react";
import { WhatsAppLink } from "@/components/landing/cta-link";
import { CoverageCheck } from "@/components/landing/coverage-check";
import { Testimonials } from "@/components/landing/testimonials";
import { PlansComparison } from "@/components/landing/plans-comparison";
import { MobileCtaBar } from "@/components/landing/mobile-cta-bar";
import {
  DEFAULT_MESSAGE,
  OFFER_DISCLAIMER,
  PHONE_DISPLAY,
  PHONE_TEL,
  trackLead,
} from "@/lib/lead";

const TITLE =
  "Internet Fibra no Oeste do Paraná | 1ª Mensalidade Grátis | Portal Itaipu";
const DESCRIPTION =
  "Internet fibra no oeste do Paraná: 550 Mega + WiFi 6 por R$ 109,90/mês e 1ª mensalidade grátis. Instalação grátis e ativação em até 24h.";
const KEYWORDS = [
  "internet no oeste do Paraná",
  "internet fibra óptica oeste do Paraná",
  "provedor de internet Paraná",
  "internet 550 mega",
  "internet com WiFi 6",
  "internet com TV",
  "internet com Max",
  "contratar internet fibra",
  "Portal Itaipu internet",
].join(", ");

const faqs = [
  {
    question: "Tem disponibilidade na minha rua?",
    answer:
      "Nossa rede de fibra óptica atende o oeste do Paraná. Informe sua rua e cidade na consulta de cobertura ou envie seu endereço pelo WhatsApp e confirmamos a viabilidade técnica em poucos minutos.",
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
    question: "Por que escolher a Portal Itaipu?",
    answer:
      "Somos um provedor local com suporte humanizado, 20 anos de experiência no oeste do Paraná e infraestrutura moderna. Todos os planos incluem Wi-Fi 6, instalação grátis e atendimento próximo, sem robôs.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
        { title: TITLE },
        { name: "description", content: DESCRIPTION },
        { name: "keywords", content: KEYWORDS },
        { name: "geo.region", content: "BR-PR" },
        { name: "geo.placename", content: "Oeste do Paraná" },
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
            description: "Provedor de internet fibra óptica no oeste do Paraná.",
            url: "https://portalitaipu.com.br/",
            telephone: PHONE_TEL,
            image: "https://portalitaipu.com.br/",
            keywords: KEYWORDS,
            address: {
              "@type": "PostalAddress",
              addressRegion: "PR",
              addressCountry: "BR",
            },
            areaServed: {
              "@type": "AdministrativeArea",
              name: "Oeste do Paraná",
            },
            priceRange: "R$ 109,90 - R$ 129,90",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              bestRating: "5",
              ratingCount: "113",
            },
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
  }),
  component: Index,
});


function Index() {
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
              alt="Portal Itaipu — internet fibra óptica no oeste do Paraná"
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
              message={DEFAULT_MESSAGE}
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
  const heroChecks = [
    "Instalação grátis",
    "WiFi 6 de alta performance",
    "Ativação em até 24h",
    "Rede 100% fibra óptica",
    "Suporte local humanizado",
  ];

  return (
    <section className="relative isolate overflow-hidden bg-brand-dark text-white">
      <img
        src={heroBackground}
        alt="Técnico da Portal Itaipu instalando internet fibra óptica"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[68%_center]"
        width={1600}
        height={1000}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-dark via-brand-dark/95 to-brand-dark/25" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-dark/70 via-transparent to-brand-dark/20 lg:hidden" />
      <div className="container relative mx-auto grid min-h-[680px] max-w-6xl px-4 py-10 sm:py-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:py-14">
        <div className="max-w-2xl space-y-5 sm:space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm font-medium text-white">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-yellow opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-yellow"></span>
            </span>
            Fibra óptica no oeste do Paraná
          </div>
          <div className="w-fit rounded-2xl border border-brand-magenta/70 bg-brand-dark/75 px-4 py-3 shadow-xl backdrop-blur-md sm:px-5 sm:py-4">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs font-bold uppercase text-white/70">
                  Avaliação no Google
                </p>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <strong className="text-4xl font-black leading-none sm:text-5xl">
                    4,9
                  </strong>
                  <span className="text-lg font-bold text-white/75">/5</span>
                </div>
              </div>
              <div className="border-l border-white/20 pl-4">
                <div className="flex gap-0.5" aria-label="5 estrelas">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4 fill-brand-yellow text-brand-yellow sm:h-5 sm:w-5"
                    />
                  ))}
                </div>
                <p className="mt-1.5 text-sm font-semibold text-white">
                  113 avaliações
                </p>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Internet fibra com a{" "}
            <span className="text-brand-yellow">1ª mensalidade grátis</span>
          </h1>
          <p className="max-w-xl text-base text-white/85 sm:text-lg">
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
              1ª MENSALIDADE GRÁTIS
            </span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-14 gap-2 rounded-full bg-white px-8 text-base font-bold text-brand-magenta shadow-xl hover:bg-white/90"
            >
              <WhatsAppLink location="hero" message={DEFAULT_MESSAGE}>
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
            {OFFER_DISCLAIMER}
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
        <ul className="mt-8 grid gap-3 self-end rounded-2xl border border-white/15 bg-brand-dark/65 p-4 shadow-xl backdrop-blur-md sm:grid-cols-2 lg:mb-4 lg:ml-auto lg:mt-0 lg:w-72 lg:grid-cols-1">
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
            A escolha certa para quem quer internet de qualidade no oeste do
            Paraná.
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
  const items = [
    {
      icon: ShieldCheck,
      title: "20 anos de experiência",
      description: "Referência no oeste do Paraná em telecomunicações.",
    },
    {
      icon: MapPin,
      title: "Fibra própria",
      description: "Infraestrutura de alta capacidade para a região.",
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
              20 anos levando fibra óptica ao oeste do Paraná.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 w-full gap-2 bg-white px-6 font-bold text-brand-dark hover:bg-white/90 sm:w-auto"
              >
                <WhatsAppLink
                  location="trust"
                  message="LP Olá! Vim pela página e quero saber se tem fibra na minha rua."
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
              mensalidade grátis, com instalação grátis e ativação em até 24h.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-xs text-white/70">
              {OFFER_DISCLAIMER}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-14 w-full gap-2 bg-white px-8 text-base font-bold text-brand-magenta shadow-xl hover:bg-white/90 sm:w-auto"
              >
                <WhatsAppLink
                  location="final_cta"
                  message={DEFAULT_MESSAGE}
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
            <p className="mt-1">Atendimento de segunda a sábado, 8h às 18h.</p>
            <p className="mt-1">
              © 2026 Portal Itaipu. Todos os direitos reservados.
            </p>
            <p className="mt-1">Oeste do Paraná • Internet Fibra Óptica de qualidade</p>
            <p className="mt-2 max-w-2xl text-xs leading-relaxed">
              PTI SERVICOS SVA LTDA · CNPJ 48.637.529/0001-47 · Av. Tiradentes,
              2170 - Centro, Itaipulândia - PR, 85880-000
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsAppButton() {
  return (
    <WhatsAppLink
      location="floating_button"
      message={DEFAULT_MESSAGE}
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
