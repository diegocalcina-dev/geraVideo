import { NextResponse } from "next/server";
import { getCompletedOrdersCount } from "@/lib/store";

const SEED = 127;

export async function GET() {
  const count = SEED + getCompletedOrdersCount();
  return NextResponse.json({ count });
}
