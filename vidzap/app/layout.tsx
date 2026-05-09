import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VidZap — Vídeos IA Personalizados para WhatsApp",
  description:
    "Crie vídeos engraçados e personalizados com IA para mandar no WhatsApp. Entrega em minutos a partir de R$ 14,90.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased" style={{ fontFamily: "var(--font-geist), system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
