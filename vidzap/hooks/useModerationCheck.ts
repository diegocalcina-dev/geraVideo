"use client";

import { useState, useEffect, useRef } from "react";

const CATEGORY_LABELS: Record<string, string> = {
  "sexual/minors": "menores de idade",
  illicit: "conteúdo ilegal",
  "illicit/violent": "violência ilícita",
  harassment: "assédio",
  "harassment/threatening": "ameaças",
  hate: "discurso de ódio",
};

function checkLocalRules(text: string): boolean {
  const BLOCKED_PATTERNS = [
    /\b(crian[çc]a|menor de idade|menino|menina)\b.{0,30}\b(sexo|nu[ao]|pelad|erot|íntim)/i,
    /\b([5-9]|1[0-7])\s*anos\b/i,
    /\b(estupro|violência sexual|abuso sexual)\b/i,
    /\b(terroris|bomba|explosivo)\b/i,
  ];
  return BLOCKED_PATTERNS.some((p) => p.test(text));
}

export type ModerationStatus = "idle" | "checking" | "ok" | "warn" | "blocked";

export function useModerationCheck(scene: string, speech: string) {
  const [status, setStatus] = useState<ModerationStatus>("idle");
  const [categories, setCategories] = useState<string[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const text = [scene, speech].filter(Boolean).join(" ");

    if (text.length < 10) {
      setStatus("idle");
      setCategories([]);
      return;
    }

    // Layer 1 — local, instant
    if (checkLocalRules(text)) {
      setStatus("blocked");
      setCategories(["conteúdo não permitido"]);
      return;
    }

    // Layer 2 — API with debounce
    setStatus("checking");
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch("/api/moderate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ scene, speech }),
        });
        const data = await res.json();

        if (data.hardBlock) {
          setStatus("blocked");
          setCategories(data.categories.map((c: string) => CATEGORY_LABELS[c] ?? c));
        } else if (data.softWarn) {
          setStatus("warn");
          setCategories(data.categories.map((c: string) => CATEGORY_LABELS[c] ?? c));
        } else {
          setStatus("ok");
          setCategories([]);
        }
      } catch {
        // Don't block user if API fails
        setStatus("ok");
        setCategories([]);
      }
    }, 800);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [scene, speech]);

  return { status, categories };
}
