import OpenAI from "openai";

const HARD_BLOCK = ["sexual/minors", "illicit", "illicit/violent"];
const SOFT_WARN = ["harassment", "harassment/threatening", "hate"];

export type ModerationResult = {
  flagged: boolean;
  hardBlock: boolean;
  softWarn: boolean;
  categories: string[];
};

export async function runModeration(
  scene?: string,
  speech?: string
): Promise<ModerationResult> {
  const fullText = [scene, speech].filter(Boolean).join(" ");

  if (fullText.length < 10) {
    return { flagged: false, hardBlock: false, softWarn: false, categories: [] };
  }

  if (!process.env.OPENAI_API_KEY) {
    return { flagged: false, hardBlock: false, softWarn: false, categories: [] };
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const result = await client.moderations.create({
    model: "omni-moderation-latest",
    input: fullText,
  });

  const cats = result.results[0].categories as unknown as Record<string, boolean>;
  const flagged = result.results[0].flagged;

  const hardFlagged = HARD_BLOCK.filter((c) => cats[c]);
  const softFlagged = SOFT_WARN.filter((c) => cats[c]);

  return {
    flagged,
    hardBlock: hardFlagged.length > 0,
    softWarn: softFlagged.length > 0 && hardFlagged.length === 0,
    categories: [...hardFlagged, ...softFlagged],
  };
}
