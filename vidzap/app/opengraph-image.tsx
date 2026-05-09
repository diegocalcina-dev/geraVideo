import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mandaí — Vídeos IA Personalizados para WhatsApp";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#08080f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 70% 50%, rgba(124,58,237,0.3) 0%, transparent 60%)",
          }}
        />
        <p
          style={{
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: "#9d6fe8",
            marginBottom: 28,
          }}
        >
          PARA O WHATSAPP BRASILEIRO
        </p>
        <h1
          style={{
            fontSize: 68,
            fontWeight: 900,
            color: "#f0f0f5",
            textAlign: "center",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          O vídeo que vai destruir o grupo do WhatsApp
        </h1>
        <p
          style={{
            fontSize: 26,
            color: "#7a7a90",
            marginTop: 36,
          }}
        >
          A partir de R$ 14,90 · Entrega em até 5 minutos
        </p>
        <p
          style={{
            position: "absolute",
            bottom: 44,
            right: 64,
            fontSize: 26,
            fontWeight: 800,
            color: "#ffffff",
            margin: 0,
          }}
        >
          Mandaí
        </p>
      </div>
    ),
    size
  );
}
