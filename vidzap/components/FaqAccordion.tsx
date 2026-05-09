"use client";
import { useState } from "react";

const FAQS = [
  {
    q: "Quanto tempo demora pra chegar o vídeo?",
    a: "No plano Padrão, até 5 minutos. No Express, até 2 minutos. Você acompanha o status em tempo real na página do pedido.",
  },
  {
    q: "O vídeo vai ter cara de robô?",
    a: "A IA que usamos gera vídeos fotorrealistas com personagens virtuais. Não é perfeito — mas vai destruir o grupo.",
  },
  {
    q: "Preciso me cadastrar?",
    a: "Não. Você cria o vídeo, paga e recebe o link. Sem conta, sem senha, sem bobagem.",
  },
  {
    q: "Quais formas de pagamento são aceitas?",
    a: "PIX (confirmação instantânea) e cartão de crédito. O vídeo começa a ser gerado assim que o pagamento é confirmado.",
  },
  {
    q: "Por quanto tempo fica disponível o vídeo?",
    a: "O link do vídeo fica ativo por 7 dias. Se precisar de mais tempo, entre em contato.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-2">
      {FAQS.map((faq, i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="text-sm font-medium text-white pr-2">{faq.q}</span>
            <span
              className="text-xl flex-shrink-0 leading-none"
              style={{ color: "#7a7a90" }}
            >
              {open === i ? "−" : "+"}
            </span>
          </button>
          <div
            style={{
              display: "grid",
              gridTemplateRows: open === i ? "1fr" : "0fr",
              transition: "grid-template-rows 0.25s ease",
            }}
          >
            <div style={{ overflow: "hidden" }}>
              <p
                className="px-5 pb-4 text-sm leading-relaxed"
                style={{ color: "#7a7a90" }}
              >
                {faq.a}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
