import { createFileRoute, Link } from "@tanstack/react-router";
import logoAsset from "@/assets/portal-itaipu-logo.png.asset.json";

const TITLE = "Política de Privacidade | Portal Itaipu";
const DESCRIPTION = "Política de Privacidade da Portal Itaipu. Saiba como tratamos seus dados pessoais de acordo com a LGPD.";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/privacidade" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [
      { rel: "canonical", href: "/privacidade" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logoAsset.url}
              alt="Portal Itaipu — internet fibra óptica em Medianeira/PR"
              className="h-9 w-auto"
              width="1733"
              height="593"
            />
          </Link>
        </div>
      </header>

      <main className="px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Política de Privacidade
          </h1>
          <p className="mt-4 text-muted-foreground">
            A Portal Itaipu valoriza a privacidade dos seus usuários e está
            comprometida em proteger os dados pessoais coletados, em conformidade
            com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
          </p>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-foreground">
              1. Dados que coletamos
            </h2>
            <p className="text-muted-foreground">
              Coletamos apenas os dados necessários para atender às suas
              solicitações, como nome, bairro, número de WhatsApp e endereço, quando
              informados voluntariamente por meio dos formulários da página ou do
              WhatsApp.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-foreground">
              2. Como usamos os dados
            </h2>
            <p className="text-muted-foreground">
              Utilizamos os dados para responder consultas, verificar viabilidade
              técnica, enviar propostas, realizar atendimento comercial e prestar
              suporte técnico. Não utilizamos seus dados para finalidades
              incompatíveis com o motivo do seu contato.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-foreground">
              3. Compartilhamento de dados
            </h2>
            <p className="text-muted-foreground">
              Não vendemos dados pessoais. Podemos compartilhar informações apenas
              com prestadores de serviço essenciais à operação (ex.: sistema de
              atendimento e cobrança), mediante contrato de confidencialidade e
              sempre dentro do necessário para a finalidade contratada.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-foreground">
              4. Segurança da informação
            </h2>
            <p className="text-muted-foreground">
              Adotamos medidas técnicas e administrativas adequadas para proteger
              seus dados contra acessos não autorizados, perdas, destruição ou
              alteração indevida.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-foreground">
              5. Seus direitos
            </h2>
            <p className="text-muted-foreground">
              Você tem direito a acessar, corrigir, limitar o uso ou solicitar a
              exclusão dos seus dados pessoais, conforme previsto na LGPD. Para
              exercer seus direitos, entre em contato pelo WhatsApp ou telefone
              disponíveis na página inicial.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-foreground">
              6. Cookies e rastreamento
            </h2>
            <p className="text-muted-foreground">
              Nossa página pode utilizar ferramentas de análise e rastreamento de
              conversão (como Google Ads e Meta Ads) para melhorar a experiência e
              medir o desempenho das campanhas. Você pode gerenciar cookies
              diretamente no seu navegador.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-foreground">
              7. Alterações nesta política
            </h2>
            <p className="text-muted-foreground">
              Esta política pode ser atualizada periodicamente. Recomendamos que
              você a consulte sempre que utilizar nossos canais digitais.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-foreground">
              8. Contato
            </h2>
            <p className="text-muted-foreground">
              Dúvidas sobre esta Política de Privacidade podem ser enviadas pelo
              WhatsApp ou telefone disponíveis na página inicial.
            </p>
          </section>

          <p className="mt-12 text-sm text-muted-foreground">
            Última atualização: agosto de 2026.
          </p>
        </div>
      </main>

      <footer className="border-t border-border bg-background px-4 py-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <img
              src={logoAsset.url}
              alt="Portal Itaipu"
              className="h-10 w-auto"
              width="1733"
              height="593"
              loading="lazy"
            />
            <div className="text-center text-sm text-muted-foreground md:text-right">
              <p>© 2026 Portal Itaipu. Todos os direitos reservados.</p>
              <p className="mt-1">Medianeira/PR • Internet Fibra Óptica de qualidade</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
