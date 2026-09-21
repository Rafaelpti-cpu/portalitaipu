import type { MouseEvent } from "react";

export const WHATSAPP_NUMBER = "554535591665";

/** IDs de conversão do Google Ads (tag base AW-11254985388 já instalada). */
const FORM_CONVERSION_ID = "AW-11254985388/aKp5CLjAj84cEKzl5fYp";
const WHATSAPP_CONVERSION_ID = "AW-11254985388/8FjCCKy4yewcEKzl5fYp";
export const PHONE_DISPLAY = "(45) 3559-1665";
export const PHONE_TEL = "+554535591665";
/** Parâmetros UTM preservados em todos os links de WhatsApp. */
export const WHATSAPP_UTM_PARAMS =
  "utm_source=google&utm_medium=cpc&utm_campaign=medianeira_internet";
export const DEFAULT_MESSAGE =
  "LP Olá! Vim pela página e quero contratar o plano de 550 Mega com a 1ª mensalidade grátis.";
export const OFFER_DISCLAIMER =
  "Promoção válida para novos clientes, na contratação pela página, com fidelidade de 12 meses. Válida até 31/10/2026. Sujeita a viabilidade técnica.";


export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}&${WHATSAPP_UTM_PARAMS}`;
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

/** Dispara um evento padrão do Meta Pixel, se disponível. */
function trackMetaEvent(event: string) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { fbq?: (...args: unknown[]) => void };
  if (typeof w.fbq === "function") {
    w.fbq("track", event);
  }
}

/** Evento de clique em qualquer botão/link de WhatsApp (Google Ads). */
export function trackWhatsAppClick() {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === "function") {
    w.gtag("event", "whatsapp_click", {
      event_category: "contato",
      event_label: "botao_whatsapp",
    });
  }
  // Meta Pixel: evento padrão de contato.
  trackMetaEvent("Contact");
}

/**
 * Conversão do Google Ads disparada UMA vez por envio bem-sucedido do
 * formulário. Deve ser chamada junto ao generate_lead existente.
 */
export function trackFormConversion() {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === "function") {
    w.gtag("event", "conversion", { send_to: FORM_CONVERSION_ID });
  }
  // Meta Pixel: evento padrão de lead.
  trackMetaEvent("Lead");
}

/**
 * Conversão do Google Ads no clique de qualquer link/botão de WhatsApp
 * (href contendo "wa.me/" ou "api.whatsapp.com"). Helper único reutilizado
 * por todos os botões.
 *
 * - Nova aba (target="_blank"): só dispara o evento e deixa o link seguir.
 * - Mesma aba: preventDefault, dispara com event_callback que navega para o
 *   href, e um setTimeout de 400 ms como plano B caso o callback não volte.
 */
export function handleWhatsAppConversion(
  event: MouseEvent<HTMLAnchorElement>,
) {
  const anchor = event.currentTarget;
  const href = anchor.href || "";
  const isWhatsAppLink =
    href.includes("wa.me/") || href.includes("api.whatsapp.com");
  if (!isWhatsAppLink) return;
  if (typeof window === "undefined") return;

  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  const opensNewTab = anchor.target === "_blank";

  // Nova aba: dispara e deixa o navegador abrir normalmente.
  if (opensNewTab) {
    if (typeof w.gtag === "function") {
      w.gtag("event", "conversion", { send_to: WHATSAPP_CONVERSION_ID });
    }
    return;
  }

  // Mesma aba: protege contra descarregamento antes do evento sair.
  event.preventDefault();
  let navigated = false;
  const navigate = () => {
    if (navigated) return;
    navigated = true;
    window.location.href = href;
  };

  if (typeof w.gtag === "function") {
    w.gtag("event", "conversion", {
      send_to: WHATSAPP_CONVERSION_ID,
      event_callback: navigate,
    });
  } else {
    navigate();
  }
  setTimeout(navigate, 400);
}

/** Data limite da oferta: último dia do mês corrente. */
export function offerDeadline(now = new Date()) {
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
}
