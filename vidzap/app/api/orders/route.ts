import { NextRequest, NextResponse } from "next/server";
import { createOrder, simulateGeneration } from "@/lib/store";
import { PRICES } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { recipientName, videoText, sceneDescription, format, isExpress, paymentMethod } = body;

    if (!recipientName || !videoText || !sceneDescription) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes." }, { status: 400 });
    }

    const amountCents = isExpress ? PRICES.express : PRICES.standard;

    const order = createOrder({
      status: "paid", // mock: skip real payment, go straight to paid
      recipientName,
      videoText,
      sceneDescription,
      format: format ?? "9:16",
      isExpress: isExpress ?? false,
      paymentMethod: paymentMethod ?? "pix",
      amountCents,
      paidAt: new Date().toISOString(),
      videoUrl: null,
      videoExpiresAt: null,
      attempts: 0,
      generatedPrompt: null,
    });

    // kick off mock generation
    simulateGeneration(order.id);

    return NextResponse.json({ orderId: order.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
