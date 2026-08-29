import { MessageCircle } from "lucide-react";
import { WhatsAppLink } from "@/components/landing/cta-link";
import { defaultMessageFor } from "@/lib/lead";
import { DEFAULT_CITY, useCity } from "@/lib/cities";

/** Mantido para compatibilidade: bairros de Medianeira (cidade padrão). */
export const BAIRROS_MEDIANEIRA = DEFAULT_CITY.bairros;

export function SeoKeywords() {
  const city = useCity();
  const bairros = city.bairros;

  // Cidade sem bairros cadastrados: esconde a seção inteira.
  if (bairros.length === 0) return null;

  return (
    <section id="cobertura-bairros" className="bg-muted/40 px-4 py-12 md:py-16">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl">
          Internet fibra óptica em {city.nameWithState}: cobertura, planos e
          preços
        </h2>
        <p className="mt-4 text-muted-foreground">
          A Portal Itaipu é um provedor de internet local em{" "}
          <strong className="text-foreground">{city.name}, Paraná</strong>, com
          {city.redeNova
            ? " rede de fibra óptica nova,"
            : " rede de fibra óptica própria,"}{" "}
          WiFi 6 incluso e atendimento humanizado. Se
          você está procurando{" "}
          <strong className="text-foreground">
            internet para contratar em {city.name}
          </strong>
          , temos planos de 550 Mega a partir de R$ 109,90/mês, com opções de{" "}
          <strong className="text-foreground">
            internet com TV (Watch TV Canais Brasil)
          </strong>{" "}
          e <strong className="text-foreground">internet com Max</strong>,
          instalação grátis e ativação em até 24 horas.
        </p>

        {bairros.length > 0 ? (
          <>
            <h3 className="mt-10 text-lg font-bold text-foreground">
              Bairros atendidos em {city.name}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Nossa rede de fibra atende os principais bairros da cidade.
              Consulte a viabilidade técnica da sua rua pelo WhatsApp:
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {bairros.map((bairro) => (
                <li
                  key={bairro}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground"
                >
                  Internet fibra em {bairro}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mt-6 text-sm text-muted-foreground">
            Atendemos {city.name} com rede de fibra óptica. Consulte a
            viabilidade técnica da sua rua pelo WhatsApp:
          </p>
        )}

        <div className="mt-10">
          <WhatsAppLink
            location="seo_local_section"
            message={defaultMessageFor(city.name)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-6 py-4 text-base font-bold text-white shadow-lg transition-colors hover:bg-whatsapp-dark sm:w-auto"
          >
            <MessageCircle className="h-5 w-5" />
            Verificar cobertura no meu bairro
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
