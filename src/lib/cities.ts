import { useSearch } from "@tanstack/react-router";

export type CityConfig = {
  /** slug usado no parâmetro ?cidade= */
  slug: string;
  /** nome exibido nos textos, ex: "Medianeira" */
  name: string;
  /** nome com estado, ex: "Medianeira/PR" */
  nameWithState: string;
  /** nome usado no chip "Mostrando ofertas para", ex: "Medianeira, PR" */
  nameComma: string;
  /** bairros / localidades atendidas (vazio = ainda não preenchido) */
  bairros: string[];
};

export const DEFAULT_CITY_SLUG = "medianeira";

export const CITIES: Record<string, CityConfig> = {
  medianeira: {
    slug: "medianeira",
    name: "Medianeira",
    nameWithState: "Medianeira/PR",
    nameComma: "Medianeira, PR",
    bairros: [
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
    ],
  },
  "santa-helena": {
    slug: "santa-helena",
    name: "Santa Helena",
    nameWithState: "Santa Helena/PR",
    nameComma: "Santa Helena, PR",
    bairros: [],
  },
  "sao-miguel": {
    slug: "sao-miguel",
    name: "São Miguel do Iguaçu",
    nameWithState: "São Miguel do Iguaçu/PR",
    nameComma: "São Miguel do Iguaçu, PR",
    bairros: [],
  },
  itaipulandia: {
    slug: "itaipulandia",
    name: "Itaipulândia",
    nameWithState: "Itaipulândia/PR",
    nameComma: "Itaipulândia, PR",
    bairros: [],
  },
  missal: {
    slug: "missal",
    name: "Missal",
    nameWithState: "Missal/PR",
    nameComma: "Missal, PR",
    bairros: [],
  },
  serranopolis: {
    slug: "serranopolis",
    name: "Serranópolis do Iguaçu",
    nameWithState: "Serranópolis do Iguaçu/PR",
    nameComma: "Serranópolis do Iguaçu, PR",
    bairros: [],
  },
  diamante: {
    slug: "diamante",
    name: "Diamante D'Oeste",
    nameWithState: "Diamante D'Oeste/PR",
    nameComma: "Diamante D'Oeste, PR",
    bairros: [],
  },
  ramilandia: {
    slug: "ramilandia",
    name: "Ramilândia (zona rural)",
    nameWithState: "Ramilândia (zona rural)/PR",
    nameComma: "Ramilândia (zona rural), PR",
    bairros: [],
  },
};

export const DEFAULT_CITY = CITIES[DEFAULT_CITY_SLUG] as CityConfig;

/** Resolve o slug recebido na URL. Slug inválido/ausente → Medianeira. */
export function resolveCity(slug?: unknown): CityConfig {
  if (typeof slug !== "string") return DEFAULT_CITY;
  const key = slug.trim().toLowerCase();
  return CITIES[key] ?? DEFAULT_CITY;
}

/**
 * Lê o parâmetro ?cidade= da URL em qualquer rota.
 * Sem parâmetro (ou inválido), devolve a configuração de Medianeira.
 */
export function useCity(): CityConfig {
  const search = useSearch({ strict: false }) as { cidade?: unknown };
  return resolveCity(search?.cidade);
}
