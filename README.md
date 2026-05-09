# VidZap

Plataforma web mobile-first para criar vídeos curtos gerados por IA com personagens virtuais, texto personalizado e entrega em até 5 minutos — feita para o WhatsApp brasileiro.

---

## O que é

VidZap permite que qualquer pessoa, sem conhecimento técnico, descreva uma cena em texto livre ("astronauta dentro de um foguete, tom debochado"), defina a fala do personagem, pague via PIX ou cartão e receba o link do vídeo gerado por IA em minutos.

**Casos de uso principais:** zoeira entre amigos em grupos de WhatsApp, aniversários, apostas perdidas, convites criativos.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 16 (App Router) + TypeScript + Tailwind v4 |
| Hospedagem | Vercel |
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
├── PRD-VideoIA-Personalizado.md   # Product Requirements Document completo
└── vidzap/                        # Aplicação Next.js
    ├── app/
    │   ├── page.tsx               # Landing page
    │   ├── criar/page.tsx         # Fluxo de criação (3 passos)
    │   ├── pedido/[id]/page.tsx   # Status do pedido + player de vídeo
    │   └── api/
    │       ├── orders/route.ts    # POST — criar pedido
    │       └── orders/[id]/route.ts  # GET — status do pedido
    ├── lib/
    │   ├── data.ts                # Tipos, chips de sugestão, preços
    │   └── store.ts               # Store in-memory + simulação de geração
    └── ...
```

---

## Fluxo de criação (v1 — local)

```
[1] Descreva a cena
    Campo de texto livre (máx. 300 chars) + chips de sugestão
    Seleção de formato: 9:16 (Stories) ou 16:9 (Horizontal)
        ↓
[2] Defina a fala
    Nome do destinatário + fala do personagem (máx. 200 chars)
    Chips de sugestão de tom
        ↓
[3] Revisão e pagamento
    Resumo do pedido + opção Express + PIX ou Cartão
        ↓
[4] Aguarda geração (~15s em modo local, até 5 min em produção)
        ↓
[5] Assiste o vídeo e envia pelo WhatsApp
```

---

## Rodar localmente

```bash
cd vidzap
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

Nenhuma variável de ambiente necessária na v1 — pagamento e geração de vídeo são simulados automaticamente.

---

## Preços

| Produto | Preço |
|---|---|
| Vídeo Padrão | R$ 14,90 — entrega em até 5 min |
| Vídeo Express | R$ 19,90 — entrega em até 2 min |

---

## Roadmap

**v1 — MVP local (atual)**
- [x] Landing page com tom adulto e debochado
- [x] Fluxo de 3 passos em texto livre (sem seleção de cards)
- [x] Pagamento e geração simulados localmente
- [x] Página de status com polling e player de vídeo

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

  generated_prompt  TEXT,                 -- prompt cinematográfico em inglês gerado pela Claude API

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

- **Texto livre em vez de cards**: o modelo antigo limitava o usuário a 6 modelos e 6 cenários fixos. A nova abordagem deixa a criatividade livre — a Claude API transforma a descrição em prompt cinematográfico em inglês otimizado para o Kling AI.
- **Tom adulto e direto**: o produto é para zoeira entre adultos em grupos de WhatsApp, não para cartões de aniversário. A interface reflete isso — sem emojis decorativos, linguagem direta.
- **Mobile-first**: fluxo completo concluível em menos de 3 minutos no celular, sem cadastro.
