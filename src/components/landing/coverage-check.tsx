import { useState } from "react";
import { MapPin, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trackLead, trackFormConversion } from "@/lib/lead";


const SHEETS_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbzk-3ej9Oz8lOCMTvMP1qIv4usH_HdjdMW0KFLX9LJ-zPvGUK0VsV1zk6pmHTOFcPSFSA/exec";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.replace(/^(\d{0,2})/, "($1");
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function CoverageCheck() {
  const navigate = useNavigate();
  const [endereco, setEndereco] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  const phoneDigits = telefone.replace(/\D/g, "");
  const phoneValid = phoneDigits.length >= 10;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!phoneValid) return;
    trackLead("coverage_form_submit", {
      endereco: endereco || "nao_informado",
    });
    trackFormConversion();

    const nomeLimpo = nome.trim();
    const enderecoLimpo = endereco.trim();

    try {
      fetch(SHEETS_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          nome: nomeLimpo,
          whatsapp: phoneDigits,
          bairro: enderecoLimpo,
          cidade: "Oeste do Paraná",
          origem: "LP Oeste do Paraná",
        }),
      }).catch(() => {
        // Falha no envio não bloqueia o usuário
      });
    } catch {
      // Falha no envio não bloqueia o usuário
    }

    navigate({
      to: "/obrigado",
      search: { nome: nomeLimpo, bairro: enderecoLimpo },
    });
  };

  return (
    <section id="cobertura" className="scroll-mt-24 px-4 py-10 md:py-16">
      <div className="container mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg sm:rounded-3xl">
          <div className="bg-brand-dark p-5 text-white sm:p-6 md:px-10 md:pt-8">
          <div className="flex items-center gap-2 text-brand-magenta">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-bold uppercase tracking-wide">
              Consulta de cobertura
            </span>
          </div>
          <h2 className="mt-3 font-display text-2xl font-extrabold tracking-normal md:text-3xl">
            Tem fibra na sua rua? Descubra em 1 minuto
          </h2>
          <p className="mt-2 text-sm text-white/75 sm:text-base">
            Informe sua rua e cidade e nós confirmamos a viabilidade técnica na
            hora pelo WhatsApp.
          </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6 md:px-10 md:pb-10">
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
              <Label htmlFor="bairro">Sua rua e cidade</Label>
              <Input
                id="bairro"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                placeholder="Ex: Rua das Flores, 123, Itaipulândia"
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
