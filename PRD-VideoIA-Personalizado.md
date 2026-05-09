# PRD — Plataforma de Vídeos IA Personalizados para WhatsApp
**Versão:** 1.0  
**Data:** Maio 2026  
**Status:** Rascunho  
**Autor:** Fundador  

---

## Índice

1. [Visão Geral do Produto](#1-visão-geral-do-produto)
2. [Problema](#2-problema)
3. [Solução](#3-solução)
4. [Público-Alvo](#4-público-alvo)
5. [Objetivos e Métricas de Sucesso](#5-objetivos-e-métricas-de-sucesso)
6. [Funcionalidades do Produto (Features)](#6-funcionalidades-do-produto-features)
7. [Jornada do Usuário](#7-jornada-do-usuário)
8. [Requisitos Funcionais](#8-requisitos-funcionais)
9. [Requisitos Não Funcionais](#9-requisitos-não-funcionais)
10. [Arquitetura Técnica](#10-arquitetura-técnica)
11. [Integrações Externas](#11-integrações-externas)
12. [Modelo de Precificação](#12-modelo-de-precificação)
13. [Modelo de Dados](#13-modelo-de-dados)
14. [Segurança e Conformidade](#14-segurança-e-conformidade)
15. [Roadmap de Desenvolvimento](#15-roadmap-de-desenvolvimento)
16. [Riscos e Mitigações](#16-riscos-e-mitigações)
17. [Critérios de Aceite por Funcionalidade](#17-critérios-de-aceite-por-funcionalidade)
18. [Glossário](#18-glossário)

---

## 1. Visão Geral do Produto

### 1.1 Nome do Produto
**VidZap** *(nome provisório — sujeito a alteração)*

### 1.2 Tagline
> "Manda um vídeo pra ele que vai ser épico."

### 1.3 Descrição Resumida
Plataforma web mobile-first que permite qualquer pessoa — sem nenhum conhecimento técnico — solicitar, pagar e receber em minutos um vídeo curto gerado por Inteligência Artificial com uma modelo virtual, texto personalizado e cenário escolhido, pronto para ser compartilhado em grupos de WhatsApp.

### 1.4 Proposta de Valor
- **Para o usuário:** diversão instantânea e personalizada para enviar a amigos
- **Para o mercado:** primeiro produto brasileiro focado em vídeos IA engraçados e personalizados para WhatsApp, com UX ultra-simples para o público não-técnico
- **Diferencial:** geração em minutos (não dias), preço acessível, sem necessidade de cadastro para testar

---

## 2. Problema

### 2.1 Contexto
O Brasil possui a maior base de usuários de WhatsApp do mundo, com mais de 147 milhões de usuários ativos. Grupos de WhatsApp são o principal canal de entretenimento, piadas e interações sociais entre amigos e familiares brasileiros.

### 2.2 Dores Identificadas
| Dor | Impacto |
|-----|---------|
| Pessoas querem enviar algo original e engraçado para amigos, mas não sabem criar | Alto |
| Ferramentas de IA são complexas e em inglês | Alto |
| Plataformas existentes (Cameo, Memmo) têm preços altos (R$ 100–500) | Médio |
| Tempo de entrega de plataformas de celebridades é de dias | Médio |
| Conteúdo disponível é genérico, sem personalização real | Alto |

### 2.3 Validação da Dor
- Demanda orgânica comprovada: usuários pediram espontaneamente vídeos similares após ver exemplos
- Mercado de vídeos personalizados no Brasil já movimenta valores entre R$ 15 e R$ 500 por vídeo (Memmo, OKanal, Manda Salve)

---

## 3. Solução

### 3.1 Como Funciona (Resumo)
1. Usuário acessa a plataforma pelo celular
2. Descreve em texto livre qualquer cena que imaginar (personagem, ambiente, tom) e escolhe o formato do vídeo
3. Define o nome do destinatário e a fala exata do personagem
4. Revisa o resumo, realiza o pagamento via PIX ou cartão
5. Recebe o link do vídeo em até 5 minutos via WhatsApp ou na tela

### 3.2 O que Torna a Solução Única
- **UX para leigos:** fluxo de no máximo 4 telas para gerar o vídeo
- **Velocidade:** entrega em minutos, não dias
- **Preço acessível:** a partir de R$ 9,90
- **100% em português:** interface, suporte e conteúdo
- **Compartilhamento nativo:** botão de envio direto para WhatsApp

---

## 4. Público-Alvo

### 4.1 Persona Primária — "O Animador do Grupo"
- **Perfil:** homem ou mulher, 20–45 anos, classe C/B, qualquer região do Brasil
- **Comportamento:** sempre manda memes, áudios engraçados e "zoações" nos grupos
- **Tecnologia:** usa smartphone, WhatsApp e Instagram diariamente, mas não sabe usar IA
- **Motivação:** ser o mais engraçado do grupo, surpreender os amigos
- **Barreira:** complexidade das ferramentas de IA atuais

### 4.2 Persona Secundária — "O Presenteador Digital"
- **Perfil:** 30–55 anos, quer mandar algo criativo para aniversário, formatura ou "só porque sim"
- **Comportamento:** já comprou presente digital online antes
- **Motivação:** fazer algo diferente e memorável sem gastar muito

### 4.3 Persona Terciária — "O Revendedor"
- **Perfil:** microempreendedor, influenciador ou pessoa que quer monetizar a plataforma
- **Comportamento:** compra em volume e revende para contatos
- **Motivação:** renda extra fácil

---

## 5. Objetivos e Métricas de Sucesso

### 5.1 Objetivos de Negócio
| Objetivo | Métrica | Meta (3 meses) | Meta (6 meses) |
|----------|---------|----------------|----------------|
| Validar disposição de pagamento | Taxa de conversão visita → pagamento | > 3% | > 6% |
| Gerar receita | Receita mensal | R$ 5.000 | R$ 30.000 |
| Escalar volume | Vídeos gerados/mês | 300 | 2.000 |
| Fidelizar usuário | Taxa de recompra | > 20% | > 35% |
| Crescimento orgânico | % tráfego de indicação | > 40% | > 60% |

### 5.2 Métricas de Produto (KPIs)
- **CAC (Custo de Aquisição de Cliente):** meta < R$ 8,00
- **LTV (Lifetime Value):** meta > R$ 45,00
- **Tempo de geração do vídeo:** meta < 5 minutos
- **Taxa de erro na geração:** meta < 5%
- **NPS:** meta > 60

---

## 6. Funcionalidades do Produto (Features)

### 6.1 MVP — Versão 1.0

#### F01 — Criador de Vídeo em Texto Livre
Fluxo de 3 passos onde o usuário cria sua cena sem restrições:

**Passo 1 — Descreva a cena**
- Campo de texto livre (máx. 300 caracteres) para o usuário escrever qualquer cena: personagem, ambiente, tom
- Chips de sugestão clicáveis como atalhos opcionais, ex: "Astronauta dentro de foguete no espaço", "Cowboy num rancho ao pôr do sol", "Chef numa cozinha profissional"
- Seleção de formato: Vertical 9:16 (Reels/Stories) ou Horizontal 16:9 (WhatsApp)
- Dica contextual orientando mencionar personagem + ambiente + tom

**Passo 2 — Defina a fala**
- Campo: nome do destinatário (máx. 50 caracteres)
- Campo: fala exata do personagem (máx. 200 caracteres) com contador regressivo e aviso ao atingir 180 caracteres
- Chips de sugestão de tom: "chamando o sumido", "tom irônico", "convite pro bar"

**Passo 3 — Revisão e pagamento**
- Resumo do pedido: cena, destinatário, fala, formato
- Badge informando que a IA vai gerar o prompt cinematográfico automaticamente
- Exibição do preço e botão de pagamento

**Prioridade:** Must Have

#### F02 — Preview de Texto
Antes do pagamento, exibir para o usuário:
- Resumo do pedido (descrição da cena, destinatário, fala, formato)
- Estimativa de tempo de entrega
- Botão de confirmar e ir para pagamento

**Prioridade:** Must Have

#### F03 — Pagamento Integrado
- PIX (geração de QR Code instantâneo)
- Cartão de crédito/débito (Stripe ou Mercado Pago)
- Confirmação automática de pagamento via webhook

**Prioridade:** Must Have

#### F04 — Geração do Vídeo via IA
- Integração com API de geração de vídeo (Kling AI ou equivalente)
- Geração automática do prompt a partir das escolhas do usuário (via Claude API)
- Processamento assíncrono com fila de jobs
- Retry automático em caso de falha

**Prioridade:** Must Have

#### F05 — Entrega do Vídeo
- Link de download disponível na tela após geração
- Envio do link via WhatsApp (botão nativo wa.me)
- Notificação por e-mail com o link (opcional no cadastro)
- Vídeo disponível por 7 dias no link

**Prioridade:** Must Have

#### F06 — Página de Acompanhamento
- Tela de "seu vídeo está sendo criado" com barra de progresso
- Atualização em tempo real (polling a cada 10 segundos)
- Exibição do vídeo inline após conclusão

**Prioridade:** Must Have

### 6.2 Versão 1.1

#### F07 — Galeria de Inspiração
- Página separada com exemplos de vídeos já gerados pela plataforma
- Serve como vitrine e fonte de inspiração, não como limitador de escolha
- Botão "Criar algo parecido" pré-preenche o campo de cena com a descrição do exemplo
- Organizada por categorias: aniversário, zoação, convite, parabéns etc.

**Prioridade:** Should Have

#### F08 — Pacotes de Vídeos
- Compra de 3 vídeos com desconto
- Compra de 10 vídeos (plano revendedor)
- Saldo de créditos com validade de 30 dias

**Prioridade:** Should Have

#### F09 — Histórico do Usuário
- Cadastro opcional (login por WhatsApp OTP)
- Histórico de vídeos gerados com opção de reenvio
- Reutilização de configurações anteriores

**Prioridade:** Should Have

#### F10 — Taxa Express
- Opção de prioridade na fila (+R$ 5,00)
- Garantia de entrega em até 2 minutos
- Badge "⚡ Express" visível na seleção

**Prioridade:** Should Have

### 6.3 Versão 2.0

#### F11 — Upload de Rosto Personalizado
- Usuário envia foto de uma pessoa
- Sistema aplica o rosto via face swap (Kling AI)
- Aviso legal sobre uso de imagem e consentimento

**Prioridade:** Could Have

#### F12 — Criador de Modelo Própria
- Usuário cria sua modelo virtual com Midjourney-like configurator
- Modelo salva com seed para consistência futura
- Plano premium para modelo exclusiva

**Prioridade:** Could Have

#### F13 — Programa de Afiliados/Revendedores
- Link de afiliado com comissão de 20% por venda
- Dashboard de comissões
- Pagamento quinzenal via PIX

**Prioridade:** Could Have

---

## 7. Jornada do Usuário

### 7.1 Fluxo Principal (Happy Path)

```
[1] Usuário acessa o site pelo celular
        ↓
[2] Vê exemplos de vídeos na landing page
        ↓
[3] Clica em "Criar meu vídeo agora"
        ↓
[4] Descreve em texto livre a cena desejada (personagem + ambiente + tom)
    Opcionalmente clica em chips de sugestão para se inspirar
    Seleciona formato: 9:16 ou 16:9
        ↓
[5] Digita o nome do destinatário e a fala exata do personagem
    Chips de sugestão de tom disponíveis como atalho
        ↓
[6] Vê o resumo do pedido e confirma
        ↓
[7] Escolhe PIX ou cartão e paga
        ↓
[8] Aguarda na tela de progresso (avg. 3 min)
        ↓
[9] Vídeo aparece na tela — assiste inline
        ↓
[10] Clica em "Enviar pelo WhatsApp"
        ↓
[11] WhatsApp abre com o link pré-preenchido
        ↓
[12] Usuário encaminha para o grupo ou amigo
```

### 7.2 Fluxo de Erro — Falha na Geração
```
[Geração falha] → Usuário recebe notificação na tela
        ↓
Sistema tenta novamente automaticamente (1x)
        ↓
[Sucesso] → Entrega normal
[Nova falha] → Oferecer crédito ou reembolso automático via PIX
```

---

## 8. Requisitos Funcionais

### 8.1 Formulário de Pedido

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-01 | O sistema deve exibir um campo de texto livre para descrição da cena (máx. 300 caracteres) com contador regressivo | Must |
| RF-02 | O sistema deve exibir chips de sugestão clicáveis que preenchem automaticamente o campo de cena (não obrigatórios) | Must |
| RF-03 | O sistema deve permitir selecionar o formato do vídeo: Vertical 9:16 ou Horizontal 16:9 | Must |
| RF-04 | O sistema deve exibir campo de texto para o nome do destinatário (máx. 50 caracteres) | Must |
| RF-05 | O sistema deve exibir campo de texto para a fala do personagem (máx. 200 caracteres) com contador regressivo e aviso ao atingir 180 caracteres | Must |
| RF-06 | O sistema deve validar que cena (mín. 5 chars) e fala (mín. 5 chars) estejam preenchidas antes de avançar para pagamento | Must |
| RF-06b | O sistema deve exibir tela de revisão com resumo completo antes do pagamento | Must |

### 8.2 Pagamento

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-07 | O sistema deve gerar QR Code PIX dinâmico para cada pedido | Must |
| RF-08 | O sistema deve confirmar pagamento PIX via webhook em tempo real | Must |
| RF-09 | O sistema deve aceitar cartão de crédito/débito | Must |
| RF-10 | O sistema deve emitir confirmação de pagamento por tela e/ou e-mail | Must |
| RF-11 | O sistema deve processar reembolso automático em caso de falha irrecuperável | Must |

### 8.3 Geração de Vídeo

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-12 | O sistema deve gerar automaticamente o prompt cinematográfico em inglês a partir da descrição de cena em texto livre do usuário, via Claude API | Must |
| RF-13 | O sistema deve enviar o prompt para a API de geração de vídeo após confirmação do pagamento | Must |
| RF-14 | O sistema deve processar a geração de forma assíncrona sem bloquear a interface | Must |
| RF-15 | O sistema deve realizar até 2 tentativas automáticas em caso de falha | Must |
| RF-16 | O sistema deve armazenar o vídeo gerado e disponibilizá-lo por link por 7 dias | Must |

### 8.4 Entrega

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-17 | O sistema deve exibir o vídeo inline na tela após geração | Must |
| RF-18 | O sistema deve oferecer botão de download direto do vídeo | Must |
| RF-19 | O sistema deve oferecer botão de compartilhamento via WhatsApp (wa.me) | Must |
| RF-20 | O sistema deve enviar e-mail com o link do vídeo se fornecido pelo usuário | Should |

---

## 9. Requisitos Não Funcionais

### 9.1 Performance
| Requisito | Meta |
|-----------|------|
| Tempo de carregamento da landing page | < 2 segundos (LCP) |
| Tempo de resposta do servidor para criação do pedido | < 500ms |
| Tempo de geração do vídeo (P90) | < 5 minutos |
| Disponibilidade da plataforma | > 99,5% uptime |
| Capacidade simultânea de jobs de geração | Mínimo 20 jobs paralelos |

### 9.2 Usabilidade
- Interface 100% funcional em smartphones (iOS e Android)
- Fluxo completo concluível em menos de 3 minutos
- Sem necessidade de cadastro para o primeiro pedido
- Textos em português brasileiro, sem jargões técnicos
- Acessível em conexões 4G lentas (< 10 Mbps)

### 9.3 Escalabilidade
- Arquitetura deve suportar crescimento de 10x sem refatoração estrutural
- Sistema de filas para picos de demanda
- CDN para entrega dos vídeos gerados

### 9.4 Segurança
- HTTPS obrigatório em todas as rotas
- Dados de cartão nunca armazenados no servidor (tokenizados pelo gateway)
- PIX gerado via API oficial do banco/gateway
- Logs de acesso e auditoria de pedidos

---

## 10. Arquitetura Técnica

### 10.1 Stack Recomendada

```
┌─────────────────────────────────────────┐
│           FRONTEND (Next.js)            │
│   Landing Page + Formulário + Player   │
│         Hospedagem: Vercel             │
└─────────────────┬───────────────────────┘
                  │ HTTPS REST API
┌─────────────────▼───────────────────────┐
│           BACKEND (Node.js)             │
│   API Routes + Orquestrador de Jobs    │
│      Hospedagem: Railway ou Render     │
└──────┬──────────┬────────────┬──────────┘
       │          │            │
┌──────▼──┐  ┌───▼────┐  ┌───▼──────────┐
│ Banco   │  │ Fila   │  │  Storage     │
│ Dados   │  │ Jobs   │  │  (Vídeos)    │
│Supabase │  │ Redis/ │  │  S3 / R2     │
│(Postgres│  │ BullMQ │  │  Cloudflare  │
└─────────┘  └───┬────┘  └─────────────┘
                 │
    ┌────────────▼──────────────┐
    │     WORKERS (Node.js)     │
    │  1. Claude API (prompt)   │
    │  2. Kling AI API (vídeo)  │
    │  3. Notificação WhatsApp  │
    └───────────────────────────┘
```

### 10.2 Serviços por Responsabilidade

| Serviço | Responsabilidade | Tecnologia |
|---------|-----------------|------------|
| Frontend | UI, formulário, player | Next.js + TailwindCSS |
| Backend API | Pedidos, pagamentos, orquestração | Node.js + Express |
| Banco de dados | Pedidos, usuários, logs | PostgreSQL (Supabase) |
| Fila de jobs | Processamento assíncrono de vídeos | BullMQ + Redis |
| Storage | Armazenamento dos vídeos gerados | Cloudflare R2 (S3-compatible) |
| CDN | Entrega rápida dos vídeos | Cloudflare |
| Geração de prompt | Criação do prompt otimizado | Claude API (Anthropic) |
| Geração de vídeo | Síntese do vídeo com IA | Kling AI API |
| Pagamento | PIX + Cartão | Mercado Pago ou Stripe |
| E-mail | Notificação de entrega | Resend |

---

## 11. Integrações Externas

### 11.1 Claude API (Anthropic)
- **Uso:** Transformação da descrição em linguagem natural em prompt cinematográfico em inglês, otimizado para APIs de geração de vídeo (Kling AI)
- **Modelo:** claude-sonnet-4-20250514
- **Input:** Descrição livre da cena + fala do personagem + nome do destinatário + formato
- **System prompt:** Instruções para converter a descrição do usuário em prompt cinematográfico detalhado em inglês, contemplando composição visual, iluminação, movimento de câmera e tom
- **Output:** Prompt em inglês otimizado para a API de vídeo
- **Custo estimado:** ~R$ 0,05 por geração

### 11.2 Kling AI API
- **Uso:** Geração do vídeo final
- **Endpoint:** API REST oficial
- **Input:** Prompt em texto + parâmetros (duração, formato, estilo)
- **Output:** URL do vídeo gerado
- **Custo estimado:** R$ 1,50–3,00 por vídeo de 8–10 segundos
- **SLA:** até 3 minutos por vídeo

### 11.3 Mercado Pago
- **Uso:** Processamento de pagamentos (PIX + Cartão)
- **Recursos utilizados:**
  - PIX: Cobranças dinâmicas com QR Code
  - Cartão: Checkout Pro ou Checkout Transparente
  - Webhook: Confirmação de pagamento em tempo real
- **Taxa:** 3,49% + R$ 0,40 por transação no cartão; PIX sem taxa

### 11.4 Cloudflare R2
- **Uso:** Armazenamento dos vídeos gerados
- **Política de retenção:** 7 dias por padrão
- **Custo:** ~$0,015/GB/mês (praticamente gratuito no volume inicial)

### 11.5 Supabase
- **Uso:** Banco de dados PostgreSQL gerenciado + Auth (futuro)
- **Plano inicial:** Free tier (até 500MB)

---

## 12. Modelo de Precificação

### 12.1 Tabela de Preços ao Consumidor

| Produto | Preço | Descrição |
|---------|-------|-----------|
| Vídeo Unitário | R$ 14,90 | 1 vídeo de até 10s, entrega em até 5 min |
| Vídeo Express | R$ 19,90 | 1 vídeo com prioridade, entrega em até 2 min |
| Pack 3 Vídeos | R$ 34,90 | Equivale a R$ 11,63/vídeo |
| Pack 10 Vídeos | R$ 99,90 | Equivale a R$ 9,99/vídeo (revendedor) |

### 12.2 Estrutura de Custos por Vídeo (Unitário R$ 14,90)

| Item | Custo |
|------|-------|
| Claude API (prompt) | R$ 0,05 |
| Kling AI (geração) | R$ 2,50 |
| Storage + CDN | R$ 0,10 |
| Gateway pagamento (3,49% + R$0,40) | R$ 0,92 |
| Infraestrutura (proporcional) | R$ 0,20 |
| **Total de custos** | **R$ 3,77** |
| **Margem bruta** | **R$ 11,13 (74,7%)** |

### 12.3 Projeção de Rentabilidade

| Volume/mês | Receita | Custos | Lucro Líquido |
|------------|---------|--------|---------------|
| 100 vídeos | R$ 1.490 | R$ 377 | R$ 1.113 |
| 500 vídeos | R$ 7.450 | R$ 1.885 | R$ 5.565 |
| 1.000 vídeos | R$ 14.900 | R$ 3.770 | R$ 11.130 |
| 5.000 vídeos | R$ 74.500 | R$ 18.850 | R$ 55.650 |

---

## 13. Modelo de Dados

### 13.1 Entidades Principais

#### Tabela: `orders` (Pedidos)
```sql
CREATE TABLE orders (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at        TIMESTAMP DEFAULT NOW(),
  status            VARCHAR(20) NOT NULL, -- pending, paid, generating, completed, failed, refunded

  -- Configuração do vídeo
  recipient_name    VARCHAR(50) NOT NULL,
  video_text        VARCHAR(200) NOT NULL,
  scene_description TEXT NOT NULL,        -- descrição livre da cena em português
  video_format      VARCHAR(10) DEFAULT '9:16',
  is_express        BOOLEAN DEFAULT FALSE,

  -- Prompt gerado
  generated_prompt  TEXT,                 -- prompt cinematográfico em inglês gerado pela Claude API

  -- Pagamento
  payment_method    VARCHAR(20), -- pix, credit_card
  payment_id        VARCHAR(100),
  amount_cents      INTEGER NOT NULL,
  paid_at           TIMESTAMP,

  -- Geração
  generation_job_id VARCHAR(100),
  video_url         TEXT,
  video_expires_at  TIMESTAMP,
  attempts          INTEGER DEFAULT 0,

  -- Usuário
  user_phone        VARCHAR(20),
  user_email        VARCHAR(100),
  ip_address        VARCHAR(45)
);
```

> **Nota:** As tabelas `models` e `scenes` foram removidas. Com o modelo de criação em texto livre, personagens e ambientes são definidos pelo usuário e convertidos em prompt cinematográfico pela Claude API, eliminando a necessidade de catálogos pré-definidos.

#### Tabela: `generation_logs` (Logs de Geração)
```sql
CREATE TABLE generation_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    UUID REFERENCES orders(id),
  created_at  TIMESTAMP DEFAULT NOW(),
  attempt     INTEGER NOT NULL,
  status      VARCHAR(20), -- started, success, failed
  prompt_sent TEXT,
  api_response TEXT,
  error_msg   TEXT,
  duration_ms INTEGER
);
```

---

## 14. Segurança e Conformidade

### 14.1 LGPD (Lei Geral de Proteção de Dados)
- Coleta apenas dados necessários para o pedido (telefone e e-mail são opcionais)
- Política de privacidade clara e acessível antes do pagamento
- Direito de exclusão: usuário pode solicitar remoção de dados via e-mail
- Dados de pagamento nunca armazenados diretamente (tokenizados pelo gateway)
- Vídeos automaticamente deletados após 7 dias

### 14.2 Termos de Uso
O usuário deve aceitar os termos que incluem:
- Proibição de uso de imagens de terceiros sem consentimento
- Proibição de conteúdo ilegal, ofensivo ou difamatório
- Responsabilidade do usuário pelo texto inserido
- A plataforma não se responsabiliza pelo uso indevido do vídeo gerado

### 14.3 Moderação de Conteúdo

Sistema de 3 camadas implementado no MVP v1:

**Camada 1 — Filtro local (frontend, instantâneo, sem custo)**
- Função `checkLocalRules()` executada sincronamente enquanto o usuário digita
- Bloqueia padrões de conteúdo ilegal via regex (menores + contexto sexual, estupro, terrorismo)
- Detecta variações básicas de leet speak (ex: `cri4nça`, `menor1`)
- Resultado imediato, sem latência, sem chamada de API

**Camada 2 — OpenAI Moderation API (backend, debounce 800ms, gratuita)**
- Hook `useModerationCheck(scene, speech)` com debounce de 800ms no frontend
- Endpoint `POST /api/moderate` chama `openai.moderations.create` com modelo `omni-moderation-latest`
- Categorias de bloqueio total (`hardBlock`): `sexual/minors`, `illicit`, `illicit/violent`
- Categorias de aviso (`softWarn`): `harassment`, `harassment/threatening`, `hate`
- Em caso de falha da API, nunca bloqueia o usuário (degradação segura)

**Camada 3 — Bloqueio duplo no backend (antes do pagamento)**
- `POST /api/orders` chama `runModeration()` antes de criar qualquer pedido
- Retorna HTTP 422 com `CONTENT_POLICY_VIOLATION` se `hardBlock = true`
- Impede bypass via chamada direta à API sem passar pelo frontend

**4 estados visuais no formulário**
- `idle` / `ok` — ponto verde discreto: "Conteúdo verificado"
- `checking` — ponto azul pulsando: "Analisando o conteúdo..." / botão bloqueado
- `warn` — faixa amarela não bloqueante: avisa que a IA pode suavizar o texto / botão muda para "Entendi, prosseguir →"
- `blocked` — faixa vermelha: mensagem específica por categoria + tags / botão bloqueado até edição

**Regra de ouro — o que NÃO é moderado**
Palavrões comuns, gírias, tom de deboche, ironia, referências a bebida/churrasco/apostas e zoeiras entre adultos consentidos são permitidos — faz parte do produto.

**Outros controles**
- Rate limiting: máximo de 5 pedidos por IP por hora
- Revisão manual acionada por reportes

### 14.4 Segurança da Infraestrutura
- Todas as APIs com autenticação via chaves secretas (variáveis de ambiente)
- Webhooks de pagamento validados por assinatura HMAC
- Logs de acesso armazenados por 90 dias
- HTTPS obrigatório (TLS 1.2+)

---

## 15. Roadmap de Desenvolvimento

### Fase 0 — MVP Manual (Semanas 1–2) ✅ Validação
**Objetivo:** Validar disposição de pagamento antes de desenvolver

| Tarefa | Responsável | Prazo |
|--------|-------------|-------|
| Criar formulário no Tally.so ou Typeform | Fundador | Dia 1 |
| Configurar link de pagamento PIX | Fundador | Dia 1 |
| Gerar vídeos manualmente com VEO3/Kling | Fundador | Sob demanda |
| Divulgar para 50 contatos e medir conversão | Fundador | Semana 1–2 |

**Meta de validação:** 10 pedidos pagos = seguir para Fase 1

---

### Fase 1 — MVP Digital (Semanas 3–8)
**Objetivo:** Automatizar o fluxo end-to-end

| Semana | Entregas |
|--------|----------|
| 3–4 | Setup do projeto (Next.js + Supabase + Railway) + Landing page |
| 4–5 | Formulário de pedido + integração Claude API (geração de prompt) |
| 5–6 | Integração Kling AI API + sistema de fila (BullMQ) |
| 6–7 | Integração Mercado Pago (PIX + cartão) + webhooks |
| 7–8 | Tela de progresso + player de vídeo + botão WhatsApp |
| 8 | Testes end-to-end + correções + deploy em produção |

**Meta:** 100 pedidos no primeiro mês após lançamento

---

### Fase 2 — Crescimento (Meses 3–4)
| Feature | Prioridade |
|---------|------------|
| Galeria de Inspiração com botão "Criar algo parecido" | Alta |
| Pacotes de vídeos com desconto | Alta |
| Login opcional por WhatsApp (OTP) | Média |
| Histórico de pedidos | Média |
| Taxa express (⚡ entrega em 2 min) | Alta |
| Programa de afiliados básico | Média |

---

### Fase 3 — Expansão (Meses 5–6)
| Feature | Prioridade |
|---------|------------|
| Upload de rosto personalizado (face swap) | Alta |
| Dashboard de afiliados completo | Média |
| App mobile (PWA primeiro, depois nativo) | Média |
| API para revendedores (white-label) | Baixa |
| Integração com outros idiomas | Baixa |

---

## 16. Riscos e Mitigações

| # | Risco | Probabilidade | Impacto | Mitigação |
|---|-------|---------------|---------|-----------|
| R01 | API do Kling AI sair do ar ou mudar preços | Média | Alto | Integrar segunda opção (Runway ML) como fallback |
| R02 | Qualidade dos vídeos abaixo da expectativa | Alta | Alto | Curadoria manual dos prompts, modelos pré-testadas |
| R03 | Chargeback / fraude nos pagamentos | Baixa | Médio | Rate limiting, verificação de IP, política anti-fraude do MP |
| R04 | Usuário inserir conteúdo ofensivo/ilegal | Média | Alto | Sistema de moderação em 3 camadas (local + OpenAI API + backend) implementado no MVP |
| R09 | Falsos positivos na moderação frustram usuários e reduzem conversão | Baixa | Médio | Filtro cirúrgico: bloqueia apenas o que viola lei; palavrões e zoeira entre adultos são permitidos |
| R05 | Uso indevido de imagem de terceiros | Média | Alto | Termo de uso explícito + flag para imagens de pessoas reais |
| R06 | Concorrente copiar o modelo em semanas | Alta | Médio | Velocidade de execução + base de clientes fidelizada |
| R07 | Custo de geração superar preço cobrado | Baixa | Alto | Monitoramento de custo por pedido em tempo real |
| R08 | Google/Anthropic restringir APIs | Baixa | Alto | Diversificar fornecedores, manter termos de uso rigorosos |

---

## 17. Critérios de Aceite por Funcionalidade

### F01 — Criador de Vídeo em Texto Livre
- [ ] Formulário funciona em iPhone 12+ e Android (Chrome)
- [ ] Campo de cena aceita e valida até 300 caracteres com contador regressivo
- [ ] Chips de sugestão preenchem o campo de cena ao serem clicados
- [ ] Seleção de formato 9:16 / 16:9 funciona no touch
- [ ] Campo de fala exibe aviso visual ao atingir 180 caracteres
- [ ] Botão "continuar" permanece bloqueado até cena (mín. 5 chars) e fala (mín. 5 chars) preenchidos
- [ ] Tela de revisão exibe corretamente cena, destinatário, fala e formato antes do pagamento

### Moderação de Conteúdo (F01 — Segurança)
- [ ] Conteúdo com padrão de menor + contexto sexual é bloqueado imediatamente (< 10ms, sem API)
- [ ] Indicador visual aparece durante análise da API (estado `checking`, botão desabilitado)
- [ ] Conteúdo limpo exibe ponto verde "Conteúdo verificado" após análise
- [ ] Conteúdo com `softWarn` exibe faixa amarela e muda label do botão para "Entendi, prosseguir →"
- [ ] Conteúdo com `hardBlock` exibe faixa vermelha com categoria e bloqueia o botão
- [ ] `POST /api/orders` retorna 422 se conteúdo viola política (proteção contra bypass de frontend)
- [ ] Falha da OpenAI Moderation API nunca bloqueia o usuário (degradação segura)

### F03 — Pagamento
- [ ] QR Code PIX é gerado em menos de 3 segundos
- [ ] Confirmação de pagamento PIX ocorre em menos de 30 segundos via webhook
- [ ] Cartão de crédito é processado com sucesso em ambiente de produção
- [ ] Pedido é criado no banco de dados imediatamente após confirmação do pagamento

### F04 — Geração do Vídeo
- [ ] Prompt cinematográfico em inglês é gerado corretamente a partir da descrição livre da cena
- [ ] Job é adicionado à fila imediatamente após pagamento confirmado
- [ ] Sistema realiza retry automático em caso de timeout da API
- [ ] Falha após 2 tentativas dispara reembolso automático

### F05 — Entrega
- [ ] Vídeo aparece inline na tela em menos de 5 minutos (P90)
- [ ] Link do vídeo é válido e acessível por 7 dias
- [ ] Botão de WhatsApp abre o aplicativo com mensagem pré-preenchida
- [ ] Download do vídeo funciona em iOS e Android

---

## 18. Glossário

| Termo | Definição |
|-------|-----------|
| **Personagem gerado** | Personagem criado por IA a partir da descrição livre do usuário, sem identidade real |
| **Descrição de cena** | Texto livre escrito pelo usuário descrevendo personagem, ambiente e tom do vídeo |
| **Prompt** | Instrução em inglês, otimizada para APIs de vídeo, gerada pela Claude API a partir da descrição de cena |
| **Job** | Tarefa de processamento assíncrono na fila do sistema |
| **Face Swap** | Técnica de IA para substituir o rosto de uma pessoa em um vídeo por outro |
| **PIX** | Sistema de pagamento instantâneo brasileiro do Banco Central |
| **Webhook** | Notificação HTTP enviada automaticamente por um sistema externo (ex: gateway de pagamento) |
| **Seed** | Número que garante reprodutibilidade de um resultado gerado por IA |
| **MVP** | Minimum Viable Product — versão mínima funcional do produto |
| **LTV** | Lifetime Value — receita total gerada por um cliente ao longo do relacionamento |
| **CAC** | Customer Acquisition Cost — custo para adquirir um novo cliente |
| **P90** | Percentil 90 — 90% dos casos ocorrem abaixo deste valor (usado para SLAs) |
| **CDN** | Content Delivery Network — rede de distribuição de conteúdo para entrega rápida |

---

*Documento criado em Maio/2026. Revisão prevista a cada sprint (2 semanas).*

**Próximos passos:**
1. Revisar e aprovar este PRD com stakeholders
2. Iniciar Fase 0 (MVP Manual) imediatamente
3. Contratar desenvolvedor fullstack ou usar no-code para Fase 1
4. Definir nome e identidade visual do produto
