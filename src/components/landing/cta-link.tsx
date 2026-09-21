import type { ReactNode } from "react";
import {
  buildWhatsAppLink,
  handleWhatsAppConversion,
  trackLead,
  trackWhatsAppClick,
} from "@/lib/lead";

type Props = {
  message: string;
  location: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

/** Link de WhatsApp que dispara o evento de conversão antes de abrir a conversa. */
export function WhatsAppLink({
  message,
  location,
  className,
  children,
  ...rest
}: Props) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={(e) => {
        trackLead("whatsapp_click", { location });
        trackWhatsAppClick();
        handleWhatsAppConversion(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
