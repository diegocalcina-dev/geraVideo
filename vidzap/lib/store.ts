import { Order } from "./data";

// In-memory store for local development/testing
const orders = new Map<string, Order>();

export function createOrder(data: Omit<Order, "id" | "createdAt">): Order {
  const id = Math.random().toString(36).slice(2, 10).toUpperCase();
  const order: Order = {
    id,
    createdAt: new Date().toISOString(),
    ...data,
  };
  orders.set(id, order);
  return order;
}

export function getOrder(id: string): Order | undefined {
  return orders.get(id);
}

export function updateOrder(id: string, patch: Partial<Order>): Order | null {
  const order = orders.get(id);
  if (!order) return null;
  const updated = { ...order, ...patch };
  orders.set(id, updated);
  return updated;
}

export function getCompletedOrdersCount(): number {
  let count = 0;
  for (const order of orders.values()) {
    if (order.status === "completed") count++;
  }
  return count;
}

// Simulate async video generation progression
export function simulateGeneration(orderId: string): void {
  setTimeout(() => {
    updateOrder(orderId, { status: "generating", attempts: 1 });
  }, 2000);

  setTimeout(() => {
    const videoUrl =
      "https://www.w3schools.com/html/mov_bbb.mp4"; // placeholder video for local testing
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    updateOrder(orderId, {
      status: "completed",
      videoUrl,
      videoExpiresAt: expires.toISOString(),
      generatedPrompt:
        "A young woman on a sunny beach, speaking directly to camera with a big smile, saying a personalized message, 9:16 vertical format, vibrant colors, natural lighting.",
    });
  }, 15000); // 15 seconds for demo — simulates fast "generation"
}
