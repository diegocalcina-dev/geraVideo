"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SCENE_CHIPS, TONE_CHIPS, PRICES, formatCents } from "@/lib/data";

type Step = 1 | 2 | 3;

type FormData = {
  sceneDescription: string;
  format: "9:16" | "16:9";
  recipientName: string;
  videoText: string;
  isExpress: boolean;
  paymentMethod: "pix" | "credit_card";
};

const MAX_SCENE = 300;
const MAX_TEXT = 200;
const MAX_NAME = 50;
const WARN_TEXT = 180;
const MIN_CHARS = 5;

const TONE_TEMPLATES: Record<string, (name: string) => string> = {
  "chamando o sumido": (n) =>
    `${n || "Você"}, sumiu né?! Cadê você, seu sumido? Aparece mais!`,
  "tom irônico": (n) =>
    `Olha quem existe... ${n || "você"}! Que surpresa, né não?`,
  "convite pro bar": (n) =>
    `${n || "Você"}, hoje tem forró no bar! Aparece às 20h ou vai dar desculpa de novo?`,
  "parabéns animado": (n) =>
    `${n || "Você"}, feliz aniversário!! Você merece tudo de bom, meu parceiro!!`,
  "zoando o amigo": (n) =>
    `${n || "Você"}, essa foi boa demais! Não esqueci não, viu?!`,
};

export default function CriarPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<FormData>({
    sceneDescription: "",
    format: "9:16",
    recipientName: "",
    videoText: "",
    isExpress: false,
    paymentMethod: "pix",
  });

  const canGoNext = (): boolean => {
    if (step === 1) return form.sceneDescription.trim().length >= MIN_CHARS;
    if (step === 2)
      return (
        form.recipientName.trim().length > 0 &&
        form.videoText.trim().length >= MIN_CHARS
      );
    return true;
  };

  const handleNext = () => {
    if (!canGoNext()) return;
    setStep((s) => (s < 3 ? ((s + 1) as Step) : s));
  };

  const handleBack = () => {
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Erro ao criar pedido.");
      }
      const { orderId } = await res.json();
      router.push(`/pedido/${orderId}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro inesperado.");
      setSubmitting(false);
    }
  };

  const price = form.isExpress ? PRICES.express : PRICES.standard;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#08080f", color: "#f0f0f5" }}>
      {/* Header */}
      <header className="flex items-center px-5 py-4 max-w-2xl mx-auto w-full">
        <Link href="/" className="mr-4 text-xl" style={{ color: "#666680" }}>
          ←
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xl">⚡</span>
          <span className="text-lg font-bold text-white">VidZap</span>
        </div>
      </header>

      {/* Step indicator */}
      <div className="px-5 pb-4 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-2 mb-2">
          {([1, 2, 3] as Step[]).map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className="w-full h-1.5 rounded-full transition-all duration-300"
                style={{
                  background:
                    s < step
                      ? "#a855f7"
                      : s === step
                      ? "linear-gradient(to right, #a855f7, #ec4899)"
                      : "rgba(255,255,255,0.1)",
                }}
              />
            </div>
          ))}
        </div>
        <p className="text-xs" style={{ color: "#666680" }}>
          Passo {step} de 3
        </p>
      </div>

      {/* Content */}
      <main className="flex-1 px-5 pb-8 max-w-2xl mx-auto w-full">

        {/* Step 1: Describe the scene */}
        {step === 1 && (
          <div className="fade-in">
            <h2 className="text-2xl font-bold mb-1 text-white">
              Descreva a cena
            </h2>
            <p className="text-sm mb-6" style={{ color: "#888899" }}>
              Qualquer personagem, ambiente e tom que você imaginar
            </p>

            <div className="mb-4">
              <textarea
                value={form.sceneDescription}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    sceneDescription: e.target.value.slice(0, MAX_SCENE),
                  }))
                }
                placeholder="Ex: um astronauta dentro de um foguete no espaço, tom animado e engraçado..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl text-white outline-none resize-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  fontSize: "16px",
                  lineHeight: "1.5",
                }}
                onFocus={(e) =>
                  (e.target.style.border = "1px solid rgba(168,85,247,0.6)")
                }
                onBlur={(e) =>
                  (e.target.style.border = "1px solid rgba(255,255,255,0.12)")
                }
              />
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs" style={{ color: "#666680" }}>
                  💡 Dica: mencione personagem + ambiente + tom
                </p>
                <p
                  className="text-xs font-semibold"
                  style={{
                    color:
                      form.sceneDescription.length > MAX_SCENE * 0.9
                        ? "#f97316"
                        : "#666680",
                  }}
                >
                  {form.sceneDescription.length}/{MAX_SCENE}
                </p>
              </div>
            </div>

            <p className="text-xs font-semibold mb-3" style={{ color: "#888899" }}>
              SUGESTÕES (clique para usar)
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {SCENE_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() =>
                    setForm((f) => ({ ...f, sceneDescription: chip }))
                  }
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                  style={{
                    background:
                      form.sceneDescription === chip
                        ? "rgba(168,85,247,0.25)"
                        : "rgba(168,85,247,0.1)",
                    border:
                      form.sceneDescription === chip
                        ? "1px solid rgba(168,85,247,0.6)"
                        : "1px solid rgba(168,85,247,0.2)",
                    color: "#c084fc",
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3 text-white">
                Formato do vídeo
              </label>
              <div className="flex gap-3">
                {(["9:16", "16:9"] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setForm((f) => ({ ...f, format: fmt }))}
                    className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background:
                        form.format === fmt
                          ? "rgba(168,85,247,0.2)"
                          : "rgba(255,255,255,0.04)",
                      border:
                        form.format === fmt
                          ? "1px solid #a855f7"
                          : "1px solid rgba(255,255,255,0.1)",
                      color: form.format === fmt ? "#c084fc" : "#888899",
                    }}
                  >
                    {fmt === "9:16" ? "📱 Vertical 9:16" : "🖥 Horizontal 16:9"}
                  </button>
                ))}
              </div>
              <p className="text-xs mt-2" style={{ color: "#666680" }}>
                {form.format === "9:16"
                  ? "Ideal para Stories e Reels"
                  : "Ideal para WhatsApp Desktop"}
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Speech */}
        {step === 2 && (
          <div className="fade-in">
            <h2 className="text-2xl font-bold mb-1 text-white">
              Defina a fala
            </h2>
            <p className="text-sm mb-6" style={{ color: "#888899" }}>
              Quem recebe e o que o personagem vai dizer?
            </p>

            <div className="mb-5">
              <label className="block text-sm font-semibold mb-2 text-white">
                Nome do destinatário
              </label>
              <input
                type="text"
                value={form.recipientName}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    recipientName: e.target.value.slice(0, MAX_NAME),
                  }))
                }
                placeholder="Ex: João, Fernanda, Zé..."
                className="w-full px-4 py-3 rounded-xl text-white outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  fontSize: "16px",
                }}
                onFocus={(e) =>
                  (e.target.style.border = "1px solid rgba(168,85,247,0.6)")
                }
                onBlur={(e) =>
                  (e.target.style.border = "1px solid rgba(255,255,255,0.12)")
                }
              />
              <p className="text-xs mt-1 text-right" style={{ color: "#666680" }}>
                {form.recipientName.length}/{MAX_NAME}
              </p>
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold mb-2" style={{ color: "#888899" }}>
                SUGESTÃO DE TOM (clique para usar)
              </p>
              <div className="flex flex-wrap gap-2">
                {TONE_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => {
                      const template = TONE_TEMPLATES[chip];
                      if (template) {
                        setForm((f) => ({
                          ...f,
                          videoText: template(f.recipientName).slice(0, MAX_TEXT),
                        }));
                      }
                    }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                    style={{
                      background: "rgba(236,72,153,0.1)",
                      border: "1px solid rgba(236,72,153,0.2)",
                      color: "#f472b6",
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold mb-2 text-white">
                Fala do personagem
              </label>
              <textarea
                value={form.videoText}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    videoText: e.target.value.slice(0, MAX_TEXT),
                  }))
                }
                placeholder={`Ex: "Oi ${form.recipientName || "amigo"}, vim aqui te desejar um feliz aniversário!"`}
                rows={5}
                className="w-full px-4 py-3 rounded-xl text-white outline-none resize-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border:
                    form.videoText.length >= WARN_TEXT
                      ? "1px solid rgba(249,115,22,0.5)"
                      : "1px solid rgba(255,255,255,0.12)",
                  fontSize: "16px",
                  lineHeight: "1.5",
                }}
                onFocus={(e) => {
                  e.target.style.border =
                    form.videoText.length >= WARN_TEXT
                      ? "1px solid rgba(249,115,22,0.8)"
                      : "1px solid rgba(168,85,247,0.6)";
                }}
                onBlur={(e) => {
                  e.target.style.border =
                    form.videoText.length >= WARN_TEXT
                      ? "1px solid rgba(249,115,22,0.5)"
                      : "1px solid rgba(255,255,255,0.12)";
                }}
              />
              <div className="flex justify-between items-center mt-1">
                {form.videoText.length >= WARN_TEXT ? (
                  <p className="text-xs" style={{ color: "#f97316" }}>
                    ⚠️ Quase no limite — falas longas podem ser cortadas
                  </p>
                ) : (
                  <p className="text-xs" style={{ color: "#888899" }}>
                    O personagem vai falar exatamente este texto
                  </p>
                )}
                <p
                  className="text-xs font-semibold ml-2 shrink-0"
                  style={{
                    color:
                      form.videoText.length >= WARN_TEXT ? "#f97316" : "#666680",
                  }}
                >
                  {form.videoText.length}/{MAX_TEXT}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review + Payment */}
        {step === 3 && (
          <div className="fade-in">
            <h2 className="text-2xl font-bold mb-1 text-white">
              Resumo do pedido
            </h2>
            <p className="text-sm mb-6" style={{ color: "#888899" }}>
              Confira tudo antes de pagar
            </p>

            {/* AI badge */}
            <div
              className="flex items-center gap-2 p-3 rounded-xl mb-5 text-xs"
              style={{
                background: "rgba(168,85,247,0.1)",
                border: "1px solid rgba(168,85,247,0.2)",
                color: "#c084fc",
              }}
            >
              <span>🤖</span>
              <span>
                A IA vai gerar o prompt cinematográfico automaticamente a partir
                da sua descrição
              </span>
            </div>

            {/* Summary card */}
            <div
              className="p-5 rounded-2xl mb-5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="mb-4">
                <p className="text-xs mb-1" style={{ color: "#666680" }}>
                  CENA
                </p>
                <p className="text-sm font-semibold text-white leading-relaxed">
                  {form.sceneDescription}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-xs mb-0.5" style={{ color: "#666680" }}>
                    DESTINATÁRIO
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {form.recipientName}
                  </p>
                </div>
                <div>
                  <p className="text-xs mb-0.5" style={{ color: "#666680" }}>
                    FORMATO
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {form.format === "9:16"
                      ? "📱 Vertical 9:16"
                      : "🖥 Horizontal 16:9"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs mb-1" style={{ color: "#666680" }}>
                  FALA DO PERSONAGEM
                </p>
                <p
                  className="text-sm leading-relaxed p-3 rounded-xl"
                  style={{
                    color: "#d0d0e0",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  &ldquo;{form.videoText}&rdquo;
                </p>
              </div>
            </div>

            {/* Express toggle */}
            <div
              className="flex items-center justify-between p-4 rounded-2xl mb-5 cursor-pointer"
              style={{
                background: form.isExpress
                  ? "rgba(168,85,247,0.1)"
                  : "rgba(255,255,255,0.04)",
                border: form.isExpress
                  ? "1px solid rgba(168,85,247,0.4)"
                  : "1px solid rgba(255,255,255,0.08)",
              }}
              onClick={() => setForm((f) => ({ ...f, isExpress: !f.isExpress }))}
            >
              <div>
                <p className="text-sm font-bold text-white">⚡ Modo Express</p>
                <p className="text-xs mt-0.5" style={{ color: "#888899" }}>
                  Entrega garantida em até 2 minutos
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold" style={{ color: "#888899" }}>
                  +{formatCents(PRICES.express - PRICES.standard)}
                </span>
                <div
                  className="w-10 h-6 rounded-full transition-all duration-200 relative"
                  style={{
                    background: form.isExpress
                      ? "#a855f7"
                      : "rgba(255,255,255,0.15)",
                  }}
                >
                  <div
                    className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200"
                    style={{
                      left: form.isExpress ? "calc(100% - 1.25rem)" : "0.25rem",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="mb-5">
              <p className="text-sm font-semibold mb-3 text-white">
                Forma de pagamento
              </p>
              <div className="flex gap-3">
                {(["pix", "credit_card"] as const).map((method) => (
                  <button
                    key={method}
                    onClick={() =>
                      setForm((f) => ({ ...f, paymentMethod: method }))
                    }
                    className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background:
                        form.paymentMethod === method
                          ? "rgba(168,85,247,0.2)"
                          : "rgba(255,255,255,0.04)",
                      border:
                        form.paymentMethod === method
                          ? "1px solid #a855f7"
                          : "1px solid rgba(255,255,255,0.1)",
                      color:
                        form.paymentMethod === method ? "#c084fc" : "#888899",
                    }}
                  >
                    {method === "pix" ? "🏦 PIX" : "💳 Cartão"}
                  </button>
                ))}
              </div>
              {form.paymentMethod === "pix" && (
                <p className="text-xs mt-2" style={{ color: "#10b981" }}>
                  ✓ PIX sem taxas adicionais
                </p>
              )}
            </div>

            {/* Price */}
            <div
              className="flex items-center justify-between p-4 rounded-2xl mb-5"
              style={{
                background: "rgba(168,85,247,0.08)",
                border: "1px solid rgba(168,85,247,0.2)",
              }}
            >
              <div>
                <p className="text-sm" style={{ color: "#888899" }}>
                  Total a pagar
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#666680" }}>
                  Entrega em até {form.isExpress ? "2" : "5"} minutos
                </p>
              </div>
              <p className="text-3xl font-extrabold text-white">
                {formatCents(price)}
              </p>
            </div>

            <div
              className="p-3 rounded-xl mb-5 text-xs"
              style={{
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.2)",
                color: "#34d399",
              }}
            >
              🧪 <strong>Modo de teste local:</strong> o pagamento é simulado
              automaticamente. Em produção, abrirá o QR Code do PIX ou
              formulário de cartão.
            </div>

            {error && (
              <div
                className="p-3 rounded-xl mb-4 text-sm"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#f87171",
                }}
              >
                ❌ {error}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom nav */}
      <div
        className="sticky bottom-0 px-5 py-4 max-w-2xl mx-auto w-full"
        style={{
          background: "rgba(8,8,15,0.95)",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex gap-3">
          {step > 1 && (
            <button
              onClick={handleBack}
              disabled={submitting}
              className="flex-none px-5 py-3.5 rounded-xl font-semibold text-sm transition-all"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "#888899",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              ← Voltar
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={handleNext}
              disabled={!canGoNext()}
              className="flex-1 py-3.5 rounded-xl font-bold text-sm text-white transition-all"
              style={{
                background: canGoNext()
                  ? "linear-gradient(135deg, #7c3aed, #db2777)"
                  : "rgba(255,255,255,0.1)",
                color: canGoNext() ? "white" : "#444455",
                boxShadow: canGoNext()
                  ? "0 4px 20px rgba(168,85,247,0.4)"
                  : "none",
              }}
            >
              Continuar →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 py-3.5 rounded-xl font-bold text-sm text-white transition-all"
              style={{
                background: submitting
                  ? "rgba(255,255,255,0.1)"
                  : "linear-gradient(135deg, #7c3aed, #db2777)",
                boxShadow: submitting
                  ? "none"
                  : "0 4px 20px rgba(168,85,247,0.4)",
              }}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processando...
                </span>
              ) : (
                `🚀 Pagar ${formatCents(price)} e Gerar Vídeo`
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
