import { createFileRoute } from "@tanstack/react-router";
import logoAsset from "@/assets/portal-itaipu-logo.png.asset.json";
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
import { SeoKeywords, BAIRROS_MEDIANEIRA } from "@/components/landing/seo-keywords";
import {
  DEFAULT_MESSAGE,
  OFFER_DISCLAIMER,
  PHONE_DISPLAY,
  PHONE_TEL,
  trackLead,
} from "@/lib/lead";

const TITLE =
  "Internet Fibra em Medianeira/PR | 1ª Mensalidade Grátis | Portal Itaipu";
const DESCRIPTION =
  "1ª mensalidade grátis em Medianeira/PR: 550 Mega + WiFi 6 por R$ 109,90/mês, planos com Watch TV Canais Brasil e Max. Instalação grátis, ativação em até 24h e suporte local.";
const KEYWORDS = [
  "internet em Medianeira",
  "internet fibra óptica Medianeira",
  "provedor de internet Medianeira PR",
  "internet 550 mega Medianeira",
  "internet com WiFi 6 Medianeira",
  "internet com TV Medianeira",
  "internet com Max Medianeira",
  "internet residencial Medianeira Paraná",
  "contratar internet Medianeira",
  "instalação de internet grátis Medianeira",
  "Portal Itaipu internet",
].join(", ");

const faqs = [
  {
    question: "Tem disponibilidade no meu bairro em Medianeira?",
    answer:
      "Nossa rede nova está expandindo por Medianeira. Informe seu bairro na consulta de cobertura ou envie seu endereço pelo WhatsApp e confirmamos a viabilidade técnica em poucos minutos.",
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
    question: "Por que escolher a Portal Itaipu em Medianeira?",
    answer:
      "Somos um provedor local com suporte humanizado, 20 anos de experiência no oeste do Paraná e infraestrutura moderna em Medianeira. Todos os planos incluem Wi-Fi 6, instalação grátis e atendimento próximo, sem robôs.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: KEYWORDS },
      { name: "geo.region", content: "BR-PR" },
      { name: "geo.placename", content: "Medianeira, Paraná" },
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
          description:
            "Provedor de internet fibra óptica em Medianeira, Paraná.",
          url: "https://portalitaipu.com.br/",
          telephone: PHONE_TEL,
          image: "https://portalitaipu.com.br/",
          keywords: KEYWORDS,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Medianeira",
            addressRegion: "PR",
            addressCountry: "BR",
          },
          areaServed: [
            {
              "@type": "City",
              name: "Medianeira",
              containedInPlace: { "@type": "State", name: "Paraná" },
            },
            ...BAIRROS_MEDIANEIRA.map((bairro) => ({
              "@type": "Place",
              name: `${bairro}, Medianeira - PR`,
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
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2">
          <img
            src={logoAsset.url}
            alt="Portal Itaipu — internet fibra óptica em Medianeira/PR"
            className="h-9 w-auto"
            width="1733"
            height="593"
          />
        </a>
        <div className="flex items-center gap-2">
          <a
            href={`tel:${PHONE_TEL}`}
            onClick={() => trackLead("phone_click", { location: "header" })}
            className="hidden items-center gap-2 rounded-md border border-input px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground sm:inline-flex"
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
              message="Olá! Vi a campanha do Google e quero contratar internet em Medianeira/PR."
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
  return (
    <section className="relative overflow-hidden bg-background px-4 pb-16 pt-12 md:pt-20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-magenta/20 bg-brand-magenta/10 px-3 py-1 text-sm font-medium text-brand-magenta">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-magenta opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-magenta"></span>
              </span>
              Rede nova em Medianeira/PR
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Internet fibra em{" "}
              <span className="text-brand-magenta">Medianeira</span> com 1ª
              mensalidade grátis
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Contrate o plano de <strong>550 Mega + WiFi 6</strong> por{" "}
              <strong className="text-foreground">R$ 109,90/mês</strong> e não
              pague nada no primeiro mês. Instalação grátis, ativação em até 24h.
            </p>
            <p className="text-xs text-muted-foreground">{OFFER_DISCLAIMER}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-14 gap-2 bg-brand-magenta px-8 text-base font-bold text-white shadow-lg shadow-brand-magenta/25 hover:bg-brand-magenta/90"
              >
                <WhatsAppLink location="hero" message={DEFAULT_MESSAGE}>
                  <MessageCircle className="h-5 w-5" />
                  Quero contratar pelo WhatsApp
                </WhatsAppLink>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 gap-2 px-6 text-base font-semibold"
              >
                <a href="#cobertura">Consultar cobertura</a>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-brand-magenta" />
                Sem burocracia
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-brand-magenta" />
                Atendimento local
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-brand-magenta" />
                WiFi 6 incluso
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Prefere ligar?{" "}
              <a
                href={`tel:${PHONE_TEL}`}
                onClick={() => trackLead("phone_click", { location: "hero" })}
                className="font-bold text-brand-magenta underline-offset-4 hover:underline"
              >
                {PHONE_DISPLAY}
              </a>{" "}
              — seg. a sáb., 8h às 18h.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-magenta/20 via-brand-blue/20 to-brand-yellow/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-brand-magenta/10 px-3 py-1 text-sm font-semibold text-brand-magenta">
                      MAIS VENDIDO
                    </span>
                    <span className="rounded-full bg-brand-yellow px-3 py-1 text-sm font-bold text-brand-dark">
                      1º MÊS GRÁTIS
                    </span>
                  </div>
                  <Wifi className="h-8 w-8 text-brand-magenta" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Plano FOR FAMILY
                  </p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-6xl font-black text-foreground">
                      550
                    </span>
                    <span className="text-xl font-semibold text-muted-foreground">
                      Mega
                    </span>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "WiFi 6 de alta performance",
                    "Instalação grátis",
                    "Ativação em até 24h",
                    "Suporte humanizado",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-foreground"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-magenta/10">
                        <Check className="h-3 w-3 text-brand-magenta" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground">A partir de</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg text-muted-foreground">R$</span>
                    <span className="text-5xl font-black text-foreground">
                      109,90
                    </span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                </div>
                <Button
                  asChild
                  className="w-full gap-2 bg-brand-magenta py-6 text-base font-bold text-white hover:bg-brand-magenta/90"
                >
                  <WhatsAppLink location="hero_card" message={DEFAULT_MESSAGE}>
                    <MessageCircle className="h-5 w-5" />
                    Contratar agora
                  </WhatsAppLink>
                </Button>
              </div>
            </div>
          </div>
        </div>
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
    <section className="bg-muted/50 px-4 py-16">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Por que contratar a Portal Itaipu?
          </h2>
          <p className="mt-3 text-muted-foreground">
            A escolha certa para quem quer internet de qualidade em Medianeira.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${benefit.bg}`}
              >
                <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
      title: "Rede nova em Medianeira",
      description: "Infraestrutura moderna e de alta capacidade para a cidade.",
    },
    {
      icon: Phone,
      title: "Atendimento local",
      description: "Fale com quem conhece a região e resolve com agilidade.",
    },
  ];

  return (
    <section className="bg-brand-dark px-4 py-16 text-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Provedor local, tecnologia de ponta
            </h2>
            <p className="mt-4 text-lg text-white/80">
              A Portal Itaipu chegou em Medianeira com uma rede totalmente nova,
              pronta para entregar a velocidade e estabilidade que sua casa
              precisa.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 gap-2 bg-white px-6 font-bold text-brand-dark hover:bg-white/90"
              >
                <WhatsAppLink
                  location="trust"
                  message="Olá! Moro em Medianeira/PR e quero saber se tem disponibilidade na minha rua."
                >
                  <MessageCircle className="h-5 w-5" />
                  Ver disponibilidade
                </WhatsAppLink>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 gap-2 border-white/30 bg-transparent px-6 font-bold text-white hover:bg-white/10 hover:text-white"
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
                className="flex gap-4 rounded-2xl bg-white/10 p-5 backdrop-blur"
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
    <section className="bg-muted/30 px-4 py-16">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Dúvidas frequentes
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tudo o que você precisa saber antes de contratar.
          </p>
        </div>
        <Accordion type="single" collapsible className="rounded-2xl bg-card p-2">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="px-4 text-left text-base font-semibold hover:no-underline">
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
    <section className="px-4 py-16">
      <div className="container mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-magenta via-brand-magenta to-brand-purple p-8 text-center text-white shadow-2xl md:p-12">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-brand-yellow/20 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Não fique sem internet de qualidade
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
              Contrate 550 Mega + WiFi 6 por R$ 109,90/mês e ganhe a 1ª
              mensalidade grátis, com instalação grátis e ativação em até 24h em
              Medianeira/PR.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-xs text-white/70">
              {OFFER_DISCLAIMER}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-14 gap-2 bg-white px-8 text-base font-bold text-brand-magenta shadow-xl hover:bg-white/90"
              >
                <WhatsAppLink location="final_cta" message={DEFAULT_MESSAGE}>
                  <MessageCircle className="h-5 w-5" />
                  Falar no WhatsApp agora
                </WhatsAppLink>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 gap-2 border-white/40 bg-transparent px-8 text-base font-bold text-white hover:bg-white/10 hover:text-white"
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
            <p className="mt-1">
              © 2026 Portal Itaipu. Todos os direitos reservados.
            </p>
            <p className="mt-1">
              Medianeira/PR • Internet Fibra Óptica de qualidade
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
      className="fixed bottom-6 right-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/20 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:flex"
    >
      <MessageCircle className="h-7 w-7" />
    </WhatsAppLink>
  );
}
