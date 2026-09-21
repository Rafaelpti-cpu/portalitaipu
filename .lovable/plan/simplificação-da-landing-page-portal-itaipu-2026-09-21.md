# Simplificação da landing page Portal Itaipu

## Objetivo
Transformar a landing multi-cidade em uma página única para todo o oeste do Paraná, mantendo o visual, os planos, a ordem das seções e todo o funil de conversão existente.

## Alterações
- Remover seletor, parâmetro e memória de cidade, além do link “Trocar cidade” e do indicador de ofertas locais.
- Remover listas e referências de bairros; deixar a consulta com um campo obrigatório “Sua rua e cidade”.
- Substituir menções locais pelos novos textos regionais em página, SEO, FAQ, depoimentos e rodapés.
- Aplicar o novo título, herói, selo, regra promocional com validade em 31/10/2026, texto institucional e chamada final.
- Manter os três depoimentos, identificados apenas como “Avaliação no Google”.
- Atualizar mensagens do WhatsApp para os textos fornecidos, preservando os parâmetros UTM.
- Enviar rua/cidade no mesmo campo atualmente enviado à planilha e usar esse dado na nova mensagem automática após o formulário.
- Adicionar no rodapé: “PTI SERVICOS SVA LTDA · CNPJ 48.637.529/0001-47 · Av. Tiradentes, 2170 - Centro, Itaipulândia - PR, 85880-000”. A referência ao ato da ANATEL será omitida.
- Manter o endpoint do formulário, `/obrigado`, abertura automática em 2 segundos, Google Ads, Meta Pixel e eventos atuais.

## Validação
- Conferir a página em desktop e celular, incluindo ausência total do seletor e das menções de cidade antigas.
- Enviar um formulário de teste e confirmar visualmente o redirecionamento para `/obrigado` e a tentativa de abertura automática do WhatsApp.
- A gravação na planilha só poderá ser afirmada se houver acesso verificável à planilha; o envio ao endpoint será conferido pela requisição de rede.
