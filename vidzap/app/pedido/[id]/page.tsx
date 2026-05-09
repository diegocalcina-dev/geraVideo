"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Order, formatCents } from "@/lib/data";

const STATUS_LABELS: Record<string, string> = {
  pending: "Aguardando pagamento...",
  paid: "Pagamento confirmado! Iniciando geração...",
  generating: "Gerando seu vídeo com IA...",
  completed: "Vídeo pronto! 🎉",
  failed: "Ocorreu um erro.",
  refunded: "Reembolso processado.",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  paid: "#3b82f6",
  generating: "#a855f7",
  completed: "#10b981",
  failed: "#ef4444",
  refunded: "#6b7280",
};

export default function PedidoPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const fetchOrder = useCallback(async () => {
    try {
      const res = await fetch(`/api/orders/${id}`);
      if (res.status === 404) {
        setNotFound(true);
        return;
      }
      const data: Order = await res.json();
      setOrder(data);
    } catch {
      // silently retry
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  // Poll every 3 seconds while not completed
  useEffect(() => {
    if (!order || order.status === "completed" || order.status === "failed" || order.status === "refunded") return;
    const interval = setInterval(fetchOrder, 3000);
    return () => clearInterval(interval);
  }, [order, fetchOrder]);

  const whatsappText = order
    ? encodeURIComponent(
        `🎬 Olha esse vídeo que eu fiz pra você, ${order.recipientName}!\n${order.videoUrl ?? ""}`
      )
    : "";

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#08080f" }}
      >
        <div className="text-center">
          <div
            className="w-12 h-12 rounded-full border-2 border-t-purple-500 mx-auto mb-4 animate-spin"
            style={{ borderColor: "rgba(168,85,247,0.2)", borderTopColor: "#a855f7" }}
          />
          <p className="text-sm" style={{ color: "#888899" }}>
            Carregando pedido...
          </p>
        </div>
      </div>
    );
  }

  if (notFound || !order) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-5"
        style={{ background: "#08080f" }}
      >
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">😕</div>
          <h2 className="text-xl font-bold text-white mb-2">
            Pedido não encontrado
          </h2>
          <p className="text-sm mb-6" style={{ color: "#888899" }}>
            O pedido #{id} não existe ou foi removido.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-xl font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  const isCompleted = order.status === "completed";
  const isFailed = order.status === "failed";
  const isActive = !isCompleted && !isFailed && order.status !== "refunded";

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#08080f", color: "#f0f0f5" }}
    >
      {/* Header */}
      <header className="flex items-center px-5 py-4 max-w-2xl mx-auto w-full">
        <Link href="/" className="mr-4 text-xl" style={{ color: "#666680" }}>
          ←
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xl">⚡</span>
          <span className="text-lg font-bold text-white">VidZap</span>
        </div>
        <div className="ml-auto text-xs font-mono" style={{ color: "#444455" }}>
          #{order.id}
        </div>
      </header>

      <main className="flex-1 px-5 pb-10 max-w-2xl mx-auto w-full">
        {/* Status banner */}
        <div
          className="p-4 rounded-2xl mb-6 text-center"
          style={{
            background: `${STATUS_COLORS[order.status]}15`,
            border: `1px solid ${STATUS_COLORS[order.status]}40`,
          }}
        >
          {isActive && (
            <div
              className="w-8 h-8 rounded-full border-2 border-t-current mx-auto mb-3 animate-spin"
              style={{
                borderColor: `${STATUS_COLORS[order.status]}30`,
                borderTopColor: STATUS_COLORS[order.status],
              }}
            />
          )}
          {isCompleted && <div className="text-4xl mb-2">🎉</div>}
          {isFailed && <div className="text-4xl mb-2">😞</div>}

          <p
            className="font-bold text-sm"
            style={{ color: STATUS_COLORS[order.status] }}
          >
            {STATUS_LABELS[order.status]}
          </p>

          {order.status === "generating" && (
            <p className="text-xs mt-1" style={{ color: "#888899" }}>
              Isso pode levar até {order.isExpress ? "2" : "5"} minutos
            </p>
          )}
        </div>

        {/* Progress bar (while generating) */}
        {isActive && (
          <div className="mb-6">
            <div
              className="h-2 rounded-full overflow-hidden mb-2"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="h-full rounded-full progress-animate"
                style={{
                  background:
                    "linear-gradient(to right, #7c3aed, #ec4899)",
                }}
              />
            </div>
            <div className="flex justify-between text-xs" style={{ color: "#666680" }}>
              <span>Pedido criado</span>
              <span>Processando IA...</span>
              <span>Vídeo pronto</span>
            </div>
          </div>
        )}

        {/* Video player (when completed) */}
        {isCompleted && order.videoUrl && (
          <div className="mb-6 fade-in">
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: "#000", border: "1px solid rgba(168,85,247,0.3)" }}
            >
              <video
                src={order.videoUrl}
                controls
                autoPlay
                loop
                playsInline
                className="w-full"
                style={{ maxHeight: "480px", objectFit: "contain" }}
              />
            </div>
            <p className="text-xs mt-2 text-center" style={{ color: "#666680" }}>
              Disponível por 7 dias · {order.format} · {order.isExpress ? "⚡ Express" : "Padrão"}
            </p>
          </div>
        )}

        {/* Share buttons (when completed) */}
        {isCompleted && (
          <div className="flex flex-col gap-3 mb-6 fade-in">
            <a
              href={`https://wa.me/?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-white text-lg transition-transform hover:scale-105"
              style={{
                background: "#25d366",
                boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
              }}
            >
              <span className="text-2xl">💬</span>
              Enviar pelo WhatsApp
            </a>

            {order.videoUrl && (
              <a
                href={order.videoUrl}
                download={`vidzap-${order.recipientName}-${order.id}.mp4`}
                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-all"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  color: "#d0d0e0",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                ⬇️ Baixar vídeo
              </a>
            )}
          </div>
        )}

        {/* Error state */}
        {isFailed && (
          <div className="mb-6 fade-in">
            <div
              className="p-4 rounded-2xl mb-4"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
              }}
            >
              <p className="text-sm" style={{ color: "#f87171" }}>
                Não foi possível gerar seu vídeo. O valor será reembolsado
                automaticamente em até 24 horas.
              </p>
            </div>
            <Link
              href="/criar"
              className="flex items-center justify-center py-3.5 rounded-2xl font-semibold text-sm text-white"
              style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}
            >
              Tentar novamente
            </Link>
          </div>
        )}

        {/* Order details */}
        <div
          className="p-5 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p
            className="text-xs font-semibold mb-4 tracking-wider"
            style={{ color: "#666680" }}
          >
            DETALHES DO PEDIDO
          </p>

          <div className="mb-4">
            <p className="text-xs mb-1" style={{ color: "#666680" }}>
              CENA
            </p>
            <p className="text-sm font-semibold text-white leading-relaxed">
              {order.sceneDescription}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-y-3 gap-x-4">
            <div>
              <p className="text-xs mb-0.5" style={{ color: "#666680" }}>
                DESTINATÁRIO
              </p>
              <p className="text-sm text-white">{order.recipientName}</p>
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: "#666680" }}>
                FORMATO
              </p>
              <p className="text-sm text-white">{order.format}</p>
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: "#666680" }}>
                PAGAMENTO
              </p>
              <p className="text-sm text-white">
                {order.paymentMethod === "pix" ? "🏦 PIX" : "💳 Cartão"} ·{" "}
                {formatCents(order.amountCents)}
              </p>
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: "#666680" }}>
                TIPO
              </p>
              <p className="text-sm text-white">
                {order.isExpress ? "⚡ Express" : "Padrão"}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs mb-1" style={{ color: "#666680" }}>
              MENSAGEM
            </p>
            <p
              className="text-xs leading-relaxed p-3 rounded-xl"
              style={{
                color: "#a0a0b5",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              &ldquo;{order.videoText}&rdquo;
            </p>
          </div>
        </div>

        {/* New order CTA */}
        {isCompleted && (
          <div className="mt-6 text-center fade-in">
            <Link
              href="/criar"
              className="inline-block text-sm font-semibold px-5 py-2.5 rounded-xl"
              style={{
                background: "rgba(168,85,247,0.1)",
                color: "#c084fc",
                border: "1px solid rgba(168,85,247,0.2)",
              }}
            >
              + Criar outro vídeo
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
