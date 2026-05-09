# Mandaí

Plataforma web mobile-first para criar vídeos curtos gerados por IA com personagens virtuais, texto personalizado e entrega em até 5 minutos — feita para o WhatsApp brasileiro.

> "O vídeo que vai destruir o grupo do WhatsApp."

---

## O que é

Mandaí permite que qualquer pessoa, sem conhecimento técnico, descreva uma cena em texto livre ("astronauta dentro de um foguete, tom debochado"), defina a fala do personagem, pague via PIX ou cartão e receba o link do vídeo gerado por IA em minutos.

**Casos de uso principais:** zoeira entre amigos em grupos de WhatsApp, aniversários, apostas perdidas, convites criativos.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 16 (App Router) + TypeScript + Tailwind v4 |
| Hospedagem | Vercel |
| Moderação de conteúdo | OpenAI Moderation API (`omni-moderation-latest`) |
| Banco de dados | Supabase (PostgreSQL) — v2 |
| Fila de jobs | BullMQ + Redis — v2 |
| Storage | Cloudflare R2 — v2 |
| Pagamento | Mercado Pago (PIX + Cartão) — v2 |
| Geração de prompt | Claude API (Anthropic) — v2 |
| Geração de vídeo | Kling AI — v2 |

---

## Estrutura do projeto

```
GeraVideo/
├── PRD-VideoIA-Personalizado.md     # Product Requirements Document completo
└── vidzap/                          # Aplicação Next.js
    ├── app/
    │   ├── page.tsx                 # Landing page
    │   ├── opengraph-image.tsx      # OG image gerada via ImageResponse
    │   ├── layout.tsx               # Metadata global + OG/Twitter tags
    │   ├── criar/page.tsx           # Fluxo de criação (3 passos)
    │   ├── pedido/[id]/page.tsx     # Status do pedido + player de vídeo
    │   └── api/
    │       ├── moderate/route.ts    # POST — verificação de conteúdo
    │       ├── orders/route.ts      # POST — criar pedido
    │       ├── orders/[id]/route.ts # GET — status do pedido
    │       └── stats/route.ts       # GET — contador de vídeos criados
    ├── components/
    │   ├── StatsCounter.tsx         # Contador dinâmico com live dot verde
    │   └── FaqAccordion.tsx         # FAQ com animação CSS grid (sem lib)
    ├── hooks/
    │   └── useModerationCheck.ts   # Hook de moderação em tempo real
    ├── lib/
    │   ├── data.ts                  # Tipos, chips de sugestão, preços
    │   ├── moderate.ts              # Lógica central da OpenAI Moderation API
    │   └── store.ts                 # Store in-memory + simulação de geração
    ├── public/
    │   ├── surfer.mp4               # Vídeo de exemplo (ZOEIRA)
    │   ├── homem.mp4                # Vídeo de exemplo (ZOEIRA)
    │   └── mulher.mp4               # Vídeo de exemplo (ESPECIAL)
    └── .env.local.example           # Variáveis de ambiente necessárias
```

---

## Fluxo de criação (v1 — local)

```
[1] Descreva a cena
    Campo de texto livre (máx. 300 chars) + chips de sugestão
    Seleção de formato: 9:16 (Stories) ou 16:9 (Horizontal)
    Moderação em tempo real enquanto digita
        ↓
[2] Defina a fala
    Nome do destinatário + fala do personagem (máx. 200 chars)
    Dica de pronúncia sempre visível (acentos, vírgulas, reticências)
    Chips de sugestão de tom
    Moderação combinada (cena + fala)
        ↓
[3] Revisão e pagamento
    Resumo do pedido + opção Express + PIX ou Cartão
        ↓
[4] Aguarda geração (~15s em modo local, até 5 min em produção)
        ↓
[5] Assiste o vídeo e envia pelo WhatsApp
```

---

## Landing page

### Seções (ordem vertical)

1. **Hero** — headline + CTA + contador dinâmico de vídeos criados (live dot verde)
2. **Exemplos reais** — 3 cards com badge ZOEIRA/ESPECIAL e borda esquerda colorida
3. **Grid de vídeos** — 3 vídeos reais em loop (9:16), sem legenda, com badge de categoria
4. **CTA inline** — "Quero criar o meu →" centralizado
5. **Como funciona** — 4 cards numerados 01–04
6. **Inspiração de cenas** — chips clicáveis
7. **Preços** — PADRÃO / EXPRESS + badges de segurança (cadeado, PIX, cartão)
8. **FAQ** — 5 perguntas com acordeão CSS (grid-template-rows, sem lib)
9. **CTA final** — "Qual vai ser o próximo alvo?"

### Componentes client-side

- `StatsCounter` — faz `GET /api/stats` e exibe contagem com dot animado
- `FaqAccordion` — abre um item por vez, animação via `grid-template-rows: 0fr → 1fr`

---

## Sistema de moderação de conteúdo

3 camadas independentes que se somam:

**Camada 1 — Filtro local (instantâneo, sem custo)**
Regex rodando no cliente enquanto o usuário digita. Bloqueia menores + contexto sexual, estupro, terrorismo. Resultado em < 10ms.

**Camada 2 — OpenAI Moderation API (debounce 800ms)**
Hook `useModerationCheck` chama `POST /api/moderate`. Detecta categorias como `sexual/minors`, `illicit`, `harassment`, `hate`. Falha silenciosa — nunca bloqueia o usuário se a API estiver fora.

**Camada 3 — Bloqueio duplo no backend**
`POST /api/orders` re-executa moderação antes de criar o pedido. Retorna HTTP 422 se `hardBlock = true`, impedindo bypass via chamada direta à API.

**4 estados visuais:**
- Verde — "Conteúdo verificado"
- Azul pulsando — "Analisando..." (botão desabilitado)
- Amarelo — aviso não bloqueante, botão vira "Entendi, prosseguir →"
- Vermelho — bloqueio total com categoria exibida

**Regra:** palavrões, gírias, deboche e zoeira entre adultos são **permitidos** — o filtro é cirúrgico.

---

## Rodar localmente

```bash
cd vidzap
npm install
cp .env.local.example .env.local
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

Sem variáveis de ambiente, pagamento e geração são simulados. A moderação via OpenAI é pulada silenciosamente (filtro local continua ativo). Para ativar a moderação completa, adicione `OPENAI_API_KEY` no `.env.local`.

---

## Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `OPENAI_API_KEY` | Não (v1) | Moderação de conteúdo via OpenAI — gratuita |
| `MERCADO_PAGO_ACCESS_TOKEN` | v2 | Pagamentos PIX + Cartão |
| `ANTHROPIC_API_KEY` | v2 | Geração de prompt cinematográfico |
| `KLING_API_KEY` | v2 | Geração de vídeo |
| `CLOUDFLARE_R2_*` | v2 | Storage dos vídeos |
| `SUPABASE_URL` + `SUPABASE_ANON_KEY` | v2 | Banco de dados |

---

## Preços

| Produto | Preço |
|---|---|
| Vídeo Padrão | R$ 14,90 — entrega em até 5 min |
| Vídeo Express | R$ 19,90 — entrega em até 2 min |

---

## Roadmap

**v1 — MVP local (atual)**
- [x] Landing page com tom adulto e debochado (dark, sem emojis decorativos)
- [x] Fluxo de 3 passos em texto livre (sem seleção de cards)
- [x] Sistema de moderação em 3 camadas com 4 estados visuais
- [x] Pagamento e geração simulados localmente
- [x] Página de status com polling e player de vídeo
- [x] Contador dinâmico de vídeos criados com live dot
- [x] Grid de vídeos reais em loop (surfer, homem, mulher)
- [x] FAQ accordion com animação CSS pura
- [x] OG/Twitter meta tags + imagem gerada via ImageResponse
- [x] Badges de segurança (pagamento seguro, PIX, cartão)
- [x] Dica de pronúncia no Passo 2 do formulário

**v2 — Integrações reais**
- [ ] Mercado Pago — PIX e cartão
- [ ] Claude API — geração de prompt cinematográfico em inglês
- [ ] Kling AI — geração de vídeo
- [ ] Cloudflare R2 — storage dos vídeos
- [ ] Supabase — banco de dados persistente

**v3 — Crescimento**
- [ ] Galeria de inspiração com "Criar algo parecido"
- [ ] Pacotes de vídeos com desconto
- [ ] Login por WhatsApp OTP + histórico de pedidos
- [ ] Programa de afiliados

---

## Modelo de dados

```sql
CREATE TABLE orders (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at        TIMESTAMP DEFAULT NOW(),
  status            VARCHAR(20) NOT NULL, -- pending | paid | generating | completed | failed | refunded

  scene_description TEXT NOT NULL,        -- descrição livre da cena em português
  video_format      VARCHAR(10) DEFAULT '9:16',
  recipient_name    VARCHAR(50) NOT NULL,
  video_text        VARCHAR(200) NOT NULL,
  is_express        BOOLEAN DEFAULT FALSE,

  generated_prompt  TEXT,                 -- prompt cinematográfico em inglês (Claude API)

  payment_method    VARCHAR(20),
  payment_id        VARCHAR(100),
  amount_cents      INTEGER NOT NULL,
  paid_at           TIMESTAMP,

  generation_job_id VARCHAR(100),
  video_url         TEXT,
  video_expires_at  TIMESTAMP,
  attempts          INTEGER DEFAULT 0,

  user_phone        VARCHAR(20),
  user_email        VARCHAR(100),
  ip_address        VARCHAR(45)
);
```

---

## Decisões de design

- **Texto livre em vez de cards**: o modelo antigo limitava a 6 modelos e 6 cenários fixos. A nova abordagem deixa a criatividade livre — a Claude API transforma a descrição em prompt cinematográfico em inglês otimizado para o Kling AI.
- **Tom adulto e direto**: o produto é para zoeira entre adultos em grupos de WhatsApp. A interface não tem emojis decorativos, usa tipografia limpa e linguagem direta.
- **Moderação cirúrgica**: filtro bloqueia apenas o que viola lei ou causa dano real. Palavrões, gírias e deboche são explicitamente permitidos para não frustrar o usuário-alvo.
- **Mobile-first**: fluxo completo concluível em menos de 3 minutos no celular, sem cadastro.
- **Profundidade visual sem peso**: landing page usa grain CSS (SVG, zero KB), thumbnails com `opacity: 0.08` no hero e borda esquerda colorida nos cards de exemplo — profundidade sem imagens pesadas.
- **Dica de pronúncia contextual**: a IA lê o texto literalmente para definir pronúncia. A dica é exibida fixamente no Passo 2 (campo de fala), sem hover e sem interação, para guiar o usuário no momento exato em que está escrevendo.
- **Vídeos reais na landing**: grid 3 colunas com aspect-ratio 9:16, `autoPlay loop muted playsInline` — demonstração imediata do produto sem exigir clique.
