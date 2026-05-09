import { NextRequest, NextResponse } from "next/server";
import { runModeration } from "@/lib/moderate";

export async function POST(req: NextRequest) {
  try {
    const { scene, speech } = await req.json();
    const result = await runModeration(scene, speech);
    return NextResponse.json(result);
  } catch {
    // Never block the user if moderation API fails
    return NextResponse.json({
      flagged: false,
      hardBlock: false,
      softWarn: false,
      categories: [],
    });
  }
}
