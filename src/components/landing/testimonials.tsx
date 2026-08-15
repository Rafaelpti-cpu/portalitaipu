import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Juliane M.",
    place: "Bairro Centro • Medianeira",
    text: "Instalaram no dia seguinte e o WiFi pega em toda a casa, até na área. Suporte responde no WhatsApp em minutos.",
  },
  {
    name: "Rodrigo P.",
    place: "Bairro Ipê • Medianeira",
    text: "Trabalho em home office com videochamada o dia todo e não caiu nenhuma vez. A velocidade entrega o que promete.",
  },
  {
    name: "Sandra T.",
    place: "Jardim Irriga • Medianeira",
    text: "Troquei de provedor por causa das quedas. Aqui é outro nível, e o atendimento é de gente da cidade mesmo.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-muted/50 px-4 py-16">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-brand-yellow text-brand-yellow"
              />
            ))}
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Quem já é cliente em Medianeira
          </h2>
          <p className="mt-3 text-muted-foreground">
            Avaliações reais de moradores atendidos pela nossa rede nova.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
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
                <p className="text-xs text-muted-foreground">{item.place}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
