import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { offerDeadline } from "@/lib/lead";

function format(n: number) {
  return String(n).padStart(2, "0");
}

export function UrgencyBar() {
  const [left, setLeft] = useState<{ d: number; h: number; m: number } | null>(
    null
  );

  useEffect(() => {
    const tick = () => {
      const diff = offerDeadline().getTime() - Date.now();
      const total = Math.max(0, Math.floor(diff / 1000));
      setLeft({
        d: Math.floor(total / 86400),
        h: Math.floor((total % 86400) / 3600),
        m: Math.floor((total % 3600) / 60),
      });
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-brand-dark px-4 py-2 text-center text-sm text-white">
      <div className="container mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <Clock className="h-4 w-4 text-brand-yellow" />
        <strong className="text-brand-yellow">Instalação grátis</strong>
        <span className="text-white/80">
          somente neste mês • vagas limitadas de agenda técnica
        </span>
        {left ? (
          <span className="rounded-full bg-white/10 px-2 py-0.5 font-semibold tabular-nums">
            termina em {left.d}d {format(left.h)}h {format(left.m)}m
          </span>
        ) : null}
      </div>
    </div>
  );
}
