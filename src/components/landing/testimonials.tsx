import { Star } from "lucide-react";
import { useCity } from "@/lib/cities";

export function Testimonials() {
  const city = useCity();
  const depoimentos = city.depoimentos;

  // Cidade sem depoimentos cadastrados: esconde a seção inteira.
  if (depoimentos.length === 0) return null;

  return (
    <section className="bg-muted/50 px-4 py-12 md:py-16">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 text-center md:mb-10">
          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-brand-yellow text-brand-yellow"
              />
            ))}
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Quem já é cliente em {city.name}
          </h2>
          <p className="mt-3 text-muted-foreground">
            Avaliações reais de moradores atendidos pela nossa rede.
          </p>
        </div>
        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {depoimentos.map((item) => (
            <figure
              key={item.name}
              className="flex h-full w-[85%] shrink-0 snap-center flex-col rounded-2xl border border-border bg-card p-6 shadow-sm md:w-auto md:shrink"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-brand-yellow text-brand-yellow"
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                “{item.text}”
              </blockquote>
              <figcaption className="mt-4 border-t border-border pt-4">
                <p className="font-bold text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  Avaliação no Google • {city.name}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
