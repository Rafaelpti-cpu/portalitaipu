import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import logoAsset from "@/assets/portal-itaipu-logo.png.asset.json";
import { CITY_LIST, saveCitySlug } from "@/lib/cities";

/**
 * Tela de escolha de cidade exibida quando a página é aberta
 * sem um parâmetro ?cidade= válido (e sem cidade salva no navegador).
 */
export function CitySelector() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-brand-magenta via-brand-magenta to-brand-purple font-sans">
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg">
          <div className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex justify-center">
              <img
                src={logoAsset.url}
                alt="Portal Itaipu — internet fibra óptica"
                className="h-10 w-auto sm:h-12"
                width="1733"
                height="593"
              />
            </div>
            <h1 className="mt-6 text-center text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Em qual cidade você quer internet fibra?
            </h1>
            <p className="mt-2 text-center text-sm text-muted-foreground sm:text-base">
              Escolha sua cidade para ver os planos e a cobertura.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {CITY_LIST.map((city) => (
                <Link
                  key={city.slug}
                  to="/"
                  search={{ cidade: city.slug }}
                  onClick={() => saveCitySlug(city.slug)}
                  className="flex items-center gap-3 rounded-2xl border-2 border-brand-magenta/25 bg-background px-4 py-4 text-left text-sm font-bold text-foreground transition-colors hover:border-brand-magenta hover:bg-brand-magenta hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-base"
                >
                  <MapPin className="h-5 w-5 shrink-0 text-brand-magenta" />
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-white/70">
            Portal Itaipu • Internet Fibra Óptica no oeste do Paraná
          </p>
        </div>
      </main>
    </div>
  );
}
