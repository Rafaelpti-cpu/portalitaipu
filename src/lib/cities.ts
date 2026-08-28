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
  /** true = comunicação de "rede nova"; false = "fibra própria" */
  redeNova: boolean;
  /** depoimentos reais da cidade (vazio = esconder a seção) */
  depoimentos: { name: string; text: string }[];
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
    redeNova: true,
    depoimentos: [
      {
        name: "Tayná Carolina",
        text: "Muito boa a minha experiência com a portal, sempre muito prestativos e resolver rapidamente quando acontece algum problema",
      },
      {
        name: "Janice Bellon",
        text: "Foi excelente, fiquei satisfeita com o atendimento",
      },
      {
        name: "Thiago",
        text: "Melhor internet da região",
      },
    ],
  },
  "santa-helena": {
    slug: "santa-helena",
    name: "Santa Helena",
    nameWithState: "Santa Helena/PR",
    nameComma: "Santa Helena, PR",
    bairros: [],
    redeNova: false,
    depoimentos: [],
  },
  "sao-miguel": {
    slug: "sao-miguel",
    name: "São Miguel do Iguaçu",
    nameWithState: "São Miguel do Iguaçu/PR",
    nameComma: "São Miguel do Iguaçu, PR",
    bairros: [],
    redeNova: false,
    depoimentos: [],
  },
  itaipulandia: {
    slug: "itaipulandia",
    name: "Itaipulândia",
    nameWithState: "Itaipulândia/PR",
    nameComma: "Itaipulândia, PR",
    bairros: [],
    redeNova: false,
    depoimentos: [],
  },
  missal: {
    slug: "missal",
    name: "Missal",
    nameWithState: "Missal/PR",
    nameComma: "Missal, PR",
    bairros: [],
    redeNova: false,
    depoimentos: [],
  },
  serranopolis: {
    slug: "serranopolis",
    name: "Serranópolis do Iguaçu",
    nameWithState: "Serranópolis do Iguaçu/PR",
    nameComma: "Serranópolis do Iguaçu, PR",
    bairros: [],
    redeNova: false,
    depoimentos: [],
  },
  diamante: {
    slug: "diamante",
    name: "Diamante D'Oeste",
    nameWithState: "Diamante D'Oeste/PR",
    nameComma: "Diamante D'Oeste, PR",
    bairros: [],
    redeNova: false,
    depoimentos: [],
  },
  ramilandia: {
    slug: "ramilandia",
    name: "Ramilândia (zona rural)",
    nameWithState: "Ramilândia (zona rural)/PR",
    nameComma: "Ramilândia (zona rural), PR",
    bairros: [],
    redeNova: false,
    depoimentos: [],
  },
};

export const DEFAULT_CITY = CITIES[DEFAULT_CITY_SLUG] as CityConfig;

/** Lista ordenada das cidades para o seletor. */
export const CITY_LIST: CityConfig[] = Object.values(CITIES);

/** Resolve o slug recebido na URL. Slug inválido/ausente → null (sem fallback). */
export function resolveCityParam(slug?: unknown): CityConfig | null {
  if (typeof slug !== "string") return null;
  const key = slug.trim().toLowerCase();
  return CITIES[key] ?? null;
}

/** Resolve o slug recebido na URL. Slug inválido/ausente → Medianeira. */
export function resolveCity(slug?: unknown): CityConfig {
  return resolveCityParam(slug) ?? DEFAULT_CITY;
}

const SAVED_CITY_KEY = "portalitaipu-cidade";

/** Slug salvo no navegador (apenas client-side). */
export function getSavedCitySlug(): string | null {
  try {
    const value = window.localStorage.getItem(SAVED_CITY_KEY);
    return value && CITIES[value] ? value : null;
  } catch {
    return null;
  }
}

export function saveCitySlug(slug: string): void {
  try {
    if (CITIES[slug]) window.localStorage.setItem(SAVED_CITY_KEY, slug);
  } catch {
    /* ignora */
  }
}

export function clearSavedCity(): void {
  try {
    window.localStorage.removeItem(SAVED_CITY_KEY);
  } catch {
    /* ignora */
  }
}

/**
 * Lê o parâmetro ?cidade= da URL em qualquer rota.
 * Sem parâmetro (ou inválido), devolve a configuração de Medianeira.
 */
export function useCity(): CityConfig {
  const search = useSearch({ strict: false }) as { cidade?: unknown };
  return resolveCity(search?.cidade);
}
