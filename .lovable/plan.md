# Landing Page — Portal Itaipu (Medianeira/PR)

## Objetivo
Criar uma landing page de alta conversão para campanhas do Google Ads, direcionada a pessoas que estão procurando internet para contratar em Medianeira/PR. A página deve levar o visitante a iniciar uma conversa no WhatsApp da Portal Itaipu com o menor atrito possível.

## Público-alvo e oferta
- **Localização:** Medianeira, Paraná.
- **Oferta principal:** Plano FOR FAMILY — 550 Mbps + WiFi 6 por R$ 109,90/mês.
- **Ganchos de conversão:** instalação grátis e ativação em até 24 horas.
- **Diferenciais:** provedor local, atendimento humanizado, rede nova em Medianeira, 20 anos de experiência no oeste do Paraná.

## Estrutura da página
1. **Hero** — headline focada na intenção de busca ("Internet fibra em Medianeira"), subheadline com oferta, botão grande para WhatsApp, selo de instalação grátis/24h.
2. **Benefícios** — 3 a 4 cards com diferenciais: velocidade real, WiFi 6, atendimento local, instalação rápida.
3. **Plano em destaque** — card do plano de R$ 109,90 com o que está incluído, preço, botão de contratar via WhatsApp.
4. **Prova social / confiança** — selos: 20 anos de mercado, rede nova, cobertura em Medianeira.
5. **FAQ** — 3 a 4 perguntas comuns ("Tem disponibilidade no meu bairro?", "Quanto tempo para instalar?", "O WiFi 6 é incluso?").
6. **CTA final** — reforço da oferta + botão flutuante de WhatsApp persistente.

## Captação de leads
- **Canal único:** WhatsApp (`554535591665`).
- **Botões:** todos os CTAs abrem `https://wa.me/554535591665` com mensagem pré-preenchida relacionada à oferta.
- **Rastreamento:** incluir parâmetros UTM nos links (`utm_source=google`, `utm_medium=cpc`, `utm_campaign=medianeira_internet`) para identificar a origem dos leads no atendimento.

## Design e identidade visual
- Reutilizar a identidade do Portal Itaipu: logo, tipografia e paleta do site oficial.
- Estilo limpo, mobile-first, com foco em legibilidade e CTA evidente.
- Cores semânticas definidas em `src/styles.css` seguindo o design system do projeto.
- Animações leves de entrada (fade/slide) para dar fluidez sem prejudicar a velocidade de carregamento.

## SEO e performance para Google Ads
- Meta tags otimizadas: title, description, og:title, og:description, og:type, twitter:card.
- Canonical e og:url apontando para a própria rota.
- JSON-LD com `LocalBusiness` ou `Organization` para reforçar a localidade.
- Carregamento rápido, imagens otimizadas, sem dependências pesadas.

## Tecnologia
- TanStack Start + React + Tailwind CSS v4.
- Rota única em `/` (substituir o placeholder atual do `src/routes/index.tsx`).
- Sem backend necessário: a conversão acontece via WhatsApp.

## Resultado esperado
Uma landing page pronta para receber tráfego pago do Google Ads, com mensagem clara, CTA repetido e rastreamento via WhatsApp + UTM, aumentando a taxa de conversão de visitantes em leads qualificados para contratação de internet em Medianeira/PR.
