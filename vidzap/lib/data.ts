export type OrderStatus =
  | "pending"
  | "paid"
  | "generating"
  | "completed"
  | "failed"
  | "refunded";

export type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  recipientName: string;
  videoText: string;
  sceneDescription: string;
  format: "9:16" | "16:9";
  isExpress: boolean;
  paymentMethod: "pix" | "credit_card" | null;
  amountCents: number;
  paidAt: string | null;
  videoUrl: string | null;
  videoExpiresAt: string | null;
  attempts: number;
  generatedPrompt: string | null;
};

export const SCENE_CHIPS = [
  "Astronauta num foguete",
  "Detetive interrogando alguém",
  "DJ numa balada",
  "Cowboy ao pôr do sol",
  "Atleta comemorando um gol",
  "Chef numa cozinha estrelada",
  "Surfista na praia",
  "Executivo numa reunião",
];

export const TONE_CHIPS = [
  "chamando o sumido",
  "tom irônico",
  "convite pro bar",
  "parabéns animado",
  "zoando o amigo",
];

export const PRICES = {
  standard: 1490,
  express: 1990,
};

export function formatCents(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
