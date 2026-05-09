import Link from "next/link";
import { SCENE_CHIPS, formatCents, PRICES } from "@/lib/data";
import StatsCounter from "@/components/StatsCounter";
import FaqAccordion from "@/components/FaqAccordion";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Descreva a cena",
    desc: "Qualquer personagem, ambiente e tom em texto livre. Sem catálogo, sem limitação.",
  },
  {
    step: "02",
    title: "Defina a fala",
    desc: "Nome do alvo e o que o personagem vai dizer. Direto ao ponto.",
  },
  {
    step: "03",
    title: "Pague e aguarde",
    desc: "PIX ou cartão. A IA monta o vídeo e entrega em até 5 minutos.",
  },
  {
    step: "04",
    title: "Solte no grupo",
    desc: "Um clique e o link vai direto pro WhatsApp. O resto é história.",
  },
];

const EXAMPLES = [
  {
    tag: "ZOEIRA",
    text: "Ricardão, a gente sabe que você não foi na academia hoje. Vimos você no pastel da feira, seu miserável.",
    meta: "Cena: mulher no parque, tom debochado",
  },
  {
    tag: "ZOEIRA",
    text: "Brunão, você perdeu a aposta, perdeu a dignidade, e vai pagar o churrasco. Essa é a ordem.",
    meta: "Cena: homem num bar, cerveja na mão, sério",
  },
  {
    tag: "ESPECIAL",
    text: "Mariana, 30 anos. Você sobreviveu a tudo. A gente sabe. E ainda tá linda. Feliz aniversário.",
    meta: "Cena: mulher elegante numa varanda ao anoitecer",
  },
];

const EXAMPLE_VIDEOS: { tag: string; src: string }[] = [
  { tag: "ZOEIRA", src: "/surfer.mp4" },
  { tag: "ZOEIRA", src: "/homem.mp4" },
  { tag: "ESPECIAL", src: "/mulher.mp4" },
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#08080f", color: "#f0f0f5" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 max-w-2xl mx-auto">
        <span className="text-xl font-bold tracking-tight text-white">Mandaí</span>
        <Link
          href="/criar"
          className="text-sm font-semibold px-4 py-2 rounded-full text-white"
          style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}
        >
          Criar vídeo
        </Link>
      </header>

      {/* Hero */}
      <section className="px-5 pt-10 pb-16 max-w-2xl mx-auto text-center relative overflow-hidden">
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, rgba(212,83,126,0.06) 0%, transparent 60%)",
            zIndex: 0,
          }}
        />

        {/* Background thumbnails */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          {[
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
            "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=400",
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400",
          ].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              loading="lazy"
              width={400}
              height={267}
              className="absolute rounded-lg"
              style={{
                opacity: 0.08,
                filter: "blur(2px) saturate(0.5)",
                objectFit: "cover",
                width: "38%",
                height: "48%",
                top: i < 2 ? "4%" : "52%",
                right: i % 2 === 0 ? "-4%" : "42%",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative" style={{ zIndex: 1 }}>
          <div
            className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-8 tracking-wider"
            style={{
              background: "rgba(168,85,247,0.12)",
              color: "#9d6fe8",
              border: "1px solid rgba(168,85,247,0.2)",
            }}
          >
            PARA O WHATSAPP BRASILEIRO
          </div>

          <h1 className="text-4xl font-extrabold leading-tight mb-5 text-white">
            O vídeo que vai{" "}
            <span className="gradient-text">destruir o grupo</span>{" "}
            do WhatsApp
          </h1>

          <p className="text-base mb-10" style={{ color: "#7a7a90", lineHeight: "1.7" }}>
            Você descreve a cena, a IA gera o vídeo com um personagem virtual
            falando o que você quiser. Entrega em até{" "}
            <span style={{ color: "#d0d0e0" }}>5 minutos</span>. A partir de{" "}
            <span style={{ color: "#d0d0e0" }}>{formatCents(PRICES.standard)}</span>.
          </p>

          <Link
            href="/criar"
            className="inline-flex w-full items-center justify-center text-base font-bold px-8 py-4 rounded-xl text-white transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #db2777)",
              boxShadow: "0 4px 24px rgba(124,58,237,0.4)",
            }}
          >
            Criar meu vídeo agora
          </Link>

          {/* ITEM 1 — dynamic video counter */}
          <StatsCounter />

        </div>
      </section>

      {/* Examples */}
      <section className="px-5 pb-16 max-w-2xl mx-auto">
        <p className="text-xs font-semibold tracking-widest mb-6" style={{ color: "#44444f" }}>
          EXEMPLOS REAIS
        </p>
        <div className="flex flex-col gap-3">
          {EXAMPLES.map((ex, i) => (
            <div
              key={i}
              className="p-5 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderLeft:
                  ex.tag === "ZOEIRA"
                    ? "3px solid rgba(168,85,247,0.7)"
                    : "3px solid rgba(255,255,255,0.12)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs font-bold tracking-wider px-2 py-0.5 rounded"
                  style={
                    ex.tag === "ZOEIRA"
                      ? {
                          background: "rgba(168,85,247,0.15)",
                          color: "#a855f7",
                          border: "1px solid rgba(168,85,247,0.25)",
                        }
                      : {
                          background: "rgba(16,185,129,0.12)",
                          color: "#10b981",
                          border: "1px solid rgba(16,185,129,0.2)",
                        }
                  }
                >
                  {ex.tag}
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "#c8c8d8" }}>
                &ldquo;{ex.text}&rdquo;
              </p>
              <p className="text-xs" style={{ color: "#3a3a4a" }}>
                {ex.meta}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* video grid */}
      <section className="px-5 pb-10 max-w-2xl mx-auto">
        <div className="grid grid-cols-3 gap-3">
          {EXAMPLE_VIDEOS.map((v, i) => (
            <div
              key={i}
              className="rounded-xl relative overflow-hidden"
              style={{
                aspectRatio: "9/16",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <video
                src={v.src}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span
                className="absolute top-2 left-2 text-xs font-bold tracking-wider px-1.5 py-0.5 rounded"
                style={
                  v.tag === "ZOEIRA"
                    ? { background: "rgba(168,85,247,0.2)", color: "#a855f7" }
                    : { background: "rgba(16,185,129,0.15)", color: "#10b981" }
                }
              >
                {v.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ITEM 5 — inline CTA after video grid */}
      <div className="px-5 pb-16 max-w-2xl mx-auto text-center">
        <Link
          href="/criar"
          className="inline-flex items-center text-sm font-semibold px-6 py-3 rounded-xl text-white transition-all hover:opacity-90"
          style={{
            background: "rgba(124,58,237,0.15)",
            border: "1px solid rgba(124,58,237,0.3)",
          }}
        >
          Quero criar o meu →
        </Link>
      </div>

      {/* How it works */}
      <section className="px-5 pb-16 max-w-2xl mx-auto">
        <p className="text-xs font-semibold tracking-widest mb-6" style={{ color: "#44444f" }}>
          COMO FUNCIONA
        </p>
        <div className="grid grid-cols-2 gap-3">
          {HOW_IT_WORKS.map((item) => (
            <div
              key={item.step}
              className="p-5 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p
                className="text-2xl font-extrabold mb-3 tabular-nums"
                style={{ color: "rgba(168,85,247,0.4)" }}
              >
                {item.step}
              </p>
              <p className="text-sm font-semibold mb-1 text-white">{item.title}</p>
              <p className="text-xs leading-relaxed" style={{ color: "#555566" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Scene inspiration */}
      <section className="px-5 pb-16 max-w-2xl mx-auto">
        <p className="text-xs font-semibold tracking-widest mb-2" style={{ color: "#44444f" }}>
          INSPIRAÇÃO DE CENAS
        </p>
        <p className="text-sm mb-6" style={{ color: "#555566" }}>
          A cena é você quem define. Abaixo, algumas ideias para começar.
        </p>
        <div className="flex flex-wrap gap-2">
          {SCENE_CHIPS.map((chip) => (
            <span
              key={chip}
              className="px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                color: "#7a7a90",
              }}
            >
              {chip}
            </span>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="px-5 pb-6 max-w-2xl mx-auto">
        <p className="text-xs font-semibold tracking-widest mb-6" style={{ color: "#44444f" }}>
          PREÇOS
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div
            className="p-5 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <p className="text-xs font-semibold mb-3 tracking-wider" style={{ color: "#555566" }}>
              PADRÃO
            </p>
            <p className="text-3xl font-extrabold text-white mb-1">
              {formatCents(PRICES.standard)}
            </p>
            <p className="text-xs" style={{ color: "#555566" }}>
              Entrega em até 5 min
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#555566" }}>
              1 vídeo de até 10s
            </p>
          </div>
          <div
            className="p-5 rounded-xl"
            style={{
              background: "rgba(124,58,237,0.08)",
              border: "1px solid rgba(124,58,237,0.2)",
            }}
          >
            <p className="text-xs font-semibold mb-3 tracking-wider" style={{ color: "#a855f7" }}>
              EXPRESS
            </p>
            <p className="text-3xl font-extrabold text-white mb-1">
              {formatCents(PRICES.express)}
            </p>
            <p className="text-xs" style={{ color: "#555566" }}>
              Entrega em até 2 min
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#555566" }}>
              Prioridade na fila
            </p>
          </div>
        </div>

        {/* ITEM 3 — security badges */}
        <div
          className="flex items-center justify-center gap-5 mt-5 flex-wrap"
          style={{ color: "#3a3a4a" }}
        >
          <div className="flex items-center gap-1.5">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="text-xs">Pagamento seguro</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 32 20" fill="none">
              <rect width="32" height="20" rx="3" fill="rgba(255,255,255,0.08)" />
              <text x="16" y="13.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#22c55e" fontFamily="system-ui">
                PIX
              </text>
            </svg>
            <span className="text-xs">PIX</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            <span className="text-xs">Cartão de crédito</span>
          </div>
        </div>
      </section>

      {/* ITEM 6 — FAQ accordion */}
      <section className="px-5 pt-10 pb-16 max-w-2xl mx-auto">
        <p className="text-xs font-semibold tracking-widest mb-6" style={{ color: "#44444f" }}>
          PERGUNTAS FREQUENTES
        </p>
        <FaqAccordion />
      </section>

      {/* Bottom CTA */}
      <section className="px-5 pb-20 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-extrabold text-white mb-2">
          Qual vai ser o próximo alvo?
        </h2>
        <p className="text-sm mb-8" style={{ color: "#555566" }}>
          Satisfação garantida
        </p>
        <Link
          href="/criar"
          className="inline-flex w-full items-center justify-center text-base font-bold px-8 py-4 rounded-xl text-white transition-all hover:opacity-90"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #db2777)",
            boxShadow: "0 4px 24px rgba(124,58,237,0.35)",
          }}
        >
          Criar meu vídeo agora
        </Link>
      </section>

      {/* Footer */}
      <footer
        className="px-5 py-6 text-center"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "#2e2e38" }}
      >
        <p className="text-xs">© 2026 Mandaí</p>
        <p className="text-xs mt-1">
          <a href="#" className="hover:text-purple-400 transition-colors">
            Termos de Uso
          </a>
          {" · "}
          <a href="#" className="hover:text-purple-400 transition-colors">
            Privacidade
          </a>
        </p>
      </footer>
    </div>
  );
}
