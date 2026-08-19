import { useState } from "react";
import { MapPin, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildWhatsAppLink, trackLead } from "@/lib/lead";

const BAIRROS = [
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

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.replace(/^(\d{0,2})/, "($1");
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function CoverageCheck() {
  const [bairro, setBairro] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  const phoneDigits = telefone.replace(/\D/g, "");
  const phoneValid = phoneDigits.length >= 10;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!phoneValid) return;
    trackLead("coverage_form_submit", { bairro: bairro || "nao_informado" });
    const message = `Olá! Vim pela página de Medianeira e quero contratar com a 1ª mensalidade grátis. Meu nome é ${
      nome || "(não informado)"
    }, meu WhatsApp é ${telefone} e moro no bairro ${
      bairro || "(não informado)"
    } em Medianeira/PR.`;
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
              <Label htmlFor="telefone">Seu WhatsApp</Label>
              <Input
                id="telefone"
                type="tel"
                inputMode="numeric"
                value={telefone}
                onChange={(e) => setTelefone(formatPhone(e.target.value))}
                placeholder="(45) 99999-9999"
                className="h-12"
                maxLength={16}
                required
              />
              {telefone && !phoneValid ? (
                <p className="text-xs text-destructive">
                  Informe o número com DDD, ex: (45) 99999-9999.
                </p>
              ) : null}
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="bairro">Seu bairro em Medianeira</Label>
              <Input
                id="bairro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                placeholder="Ex: Centro, Ipê, Nazaré"
                className="h-12"
                list="bairros-medianeira"
                required
              />
              <datalist id="bairros-medianeira">
                {BAIRROS.map((b) => (
                  <option key={b} value={b} />
                ))}
              </datalist>
            </div>
            <div className="sm:col-span-2">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Bairros atendidos em Medianeira (referência)
              </p>
              <div className="mb-5 flex flex-wrap gap-2">
                {BAIRROS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBairro(b)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      bairro === b
                        ? "border-brand-magenta bg-brand-magenta text-white"
                        : "border-border bg-background text-foreground hover:border-brand-magenta hover:text-brand-magenta"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
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
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Ao enviar, você concorda com nossa{" "}
                <Link
                  to="/privacidade"
                  className="underline hover:text-foreground"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
