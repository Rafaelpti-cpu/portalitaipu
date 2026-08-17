import { useState } from "react";
import { MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildWhatsAppLink, trackLead } from "@/lib/lead";

const BAIRROS = [
  "Centro",
  "Cidade Alta",
  "Ipê",
  "Jardim Irriga",
  "Nazaré",
  "Belo Horizonte",
  "Interlagos",
  "Condá",
  "Parque Independência",
  "Itaipu",
  "Panorâmico",
  "São Cristóvão",
  "Vila Rica",
  "Frron",
  "Zona Industrial",
];

export function CoverageCheck() {
  const [bairro, setBairro] = useState("");
  const [nome, setNome] = useState("");


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    trackLead("coverage_form_submit", { bairro: bairro || "nao_informado" });
    const message = `Olá! Meu nome é ${nome || "(não informado)"} e moro no bairro ${
      bairro || "(não informado)"
    } em Medianeira/PR. Quero saber se tem cobertura na minha rua e contratar o plano de 550 Mega + WiFi 6 por R$ 109,90.`;
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="cobertura" className="px-4 py-16">
      <div className="container mx-auto max-w-3xl">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-lg md:p-10">
          <div className="flex items-center gap-2 text-brand-magenta">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-bold uppercase tracking-wide">
              Consulta de cobertura
            </span>
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Tem fibra no seu bairro? Descubra em 1 minuto
          </h2>
          <p className="mt-2 text-muted-foreground">
            Informe seu bairro e nós confirmamos a viabilidade técnica na hora
            pelo WhatsApp.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nome">Seu nome</Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Maria Silva"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bairro">Seu bairro em Medianeira</Label>
              <Input
                id="bairro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                placeholder="Ex: Centro, Ipê, Jardim Irriga"
                className="h-12"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <Button
                type="submit"
                className="h-14 w-full gap-2 bg-whatsapp text-base font-bold text-white hover:bg-whatsapp-dark"
              >
                <MessageCircle className="h-5 w-5" />
                Consultar cobertura no WhatsApp
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Sem compromisso. Resposta imediata em horário comercial.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
