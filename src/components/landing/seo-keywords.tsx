import { MessageCircle } from "lucide-react";
import { WhatsAppLink } from "@/components/landing/cta-link";
import { DEFAULT_MESSAGE } from "@/lib/lead";

export const BAIRROS_MEDIANEIRA = [
  "Centro",
  "São Cristóvão",
  "Belo Horizonte",
  "Condá",
  "Cidade Alta",
  "Frimesa",
  "Nazaré",
  "Ipê",
  "Jardim Irene",
  "Independência",
  "Itaipu",
  "Panorâmico",
];

const searchTerms = [
  "internet em Medianeira",
  "internet fibra óptica Medianeira PR",
  "melhor provedor de internet em Medianeira",
  "internet 550 mega Medianeira",
  "internet barata em Medianeira",
  "internet com WiFi 6 Medianeira",
  "internet com TV em Medianeira",
  "internet com Max Medianeira",
  "internet para jogos em Medianeira",
  "internet residencial Medianeira Paraná",
  "instalação de internet grátis Medianeira",
  "plano de internet 109,90 Medianeira",
];

export function SeoKeywords() {
  return (
    <section id="cobertura-bairros" className="bg-muted/40 px-4 py-16">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Internet fibra óptica em Medianeira/PR: cobertura, planos e preços
        </h2>
        <p className="mt-4 text-muted-foreground">
          A Portal Itaipu é um provedor de internet local em{" "}
          <strong className="text-foreground">Medianeira, Paraná</strong>, com
          rede de fibra óptica nova, WiFi 6 incluso e atendimento humanizado.
          Se você está procurando{" "}
          <strong className="text-foreground">internet para contratar em Medianeira</strong>
          , temos planos de 550 Mega a partir de R$ 109,90/mês, com opções de{" "}
          <strong className="text-foreground">internet com TV (Watch TV Canais Brasil)</strong>{" "}
          e <strong className="text-foreground">internet com Max</strong>,
          instalação grátis e ativação em até 24 horas.
        </p>

        <h3 className="mt-10 text-lg font-bold text-foreground">
          Bairros atendidos em Medianeira
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Nossa rede de fibra atende os principais bairros da cidade. Consulte a
          viabilidade técnica da sua rua pelo WhatsApp:
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {BAIRROS_MEDIANEIRA.map((bairro) => (
            <li
              key={bairro}
              className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground"
            >
              Internet fibra em {bairro}
            </li>
          ))}
        </ul>


        <div className="mt-10">
          <WhatsAppLink
            location="seo_local_section"
            message={DEFAULT_MESSAGE}
            className="inline-flex items-center gap-2 rounded-xl bg-whatsapp px-6 py-4 text-base font-bold text-white shadow-lg transition-colors hover:bg-whatsapp-dark"
          >
            <MessageCircle className="h-5 w-5" />
            Verificar cobertura no meu bairro
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
