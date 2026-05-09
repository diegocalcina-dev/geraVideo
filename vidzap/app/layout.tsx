import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const BASE_URL = "https://mandai.com.br";

export const viewport: Viewport = {
  themeColor: "#08080f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Mandaí — Vídeos IA Personalizados para WhatsApp",
  description:
    "Descreva a cena, a IA gera o vídeo com um personagem virtual falando o que você quiser. Entrega em até 5 minutos a partir de R$ 14,90.",
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Mandaí — Vídeos IA Personalizados para WhatsApp",
    description:
      "Descreva a cena, a IA gera o vídeo. Entrega em até 5 minutos a partir de R$ 14,90.",
    siteName: "Mandaí",
    locale: "pt_BR",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Mandaí" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mandaí — Vídeos IA Personalizados para WhatsApp",
    description:
      "Descreva a cena, a IA gera o vídeo. Entrega em até 5 minutos a partir de R$ 14,90.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} h-full`}>
      <body
        className="min-h-full flex flex-col antialiased"
        style={{ fontFamily: "var(--font-geist), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
