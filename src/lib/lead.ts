export const WHATSAPP_NUMBER = "554535591665";
export const PHONE_DISPLAY = "(45) 3559-1665";
export const PHONE_TEL = "+554535591665";
export const UTM_PARAMS =
  "utm_source=google&utm_medium=cpc&utm_campaign=medianeira_internet";
export const DEFAULT_MESSAGE =
  "Olá! Vim pela página de Medianeira e quero contratar com a 1ª mensalidade grátis.";
export const OFFER_DISCLAIMER =
  "Promoção válida para novos clientes em Medianeira, na contratação pela página, com fidelidade de 12 meses. Válida até 30/09/2026.";

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}&${UTM_PARAMS}`;
}

type LeadEventParams = Record<string, string | number | undefined>;

/**
 * Envia o evento de conversão para o dataLayer (GTM) e para o gtag (Google Ads /
 * GA4) quando disponíveis. Sem tags instaladas, é um no-op seguro.
 */
export function trackLead(action: string, params: LeadEventParams = {}) {
  if (typeof window === "undefined") return;

  const payload = { event: "generate_lead", lead_action: action, ...params };

  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };

  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(payload);

  if (typeof w.gtag === "function") {
    w.gtag("event", "generate_lead", { lead_action: action, ...params });
  }
}

/** Data limite da oferta: último dia do mês corrente. */
export function offerDeadline(now = new Date()) {
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
}
