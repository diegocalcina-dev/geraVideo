"use client";
import { useEffect, useState } from "react";

export default function StatsCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => setCount(127));
  }, []);

  return (
    <p className="text-xs mt-4 flex items-center justify-center gap-2" style={{ color: "#44444f" }}>
      <span
        className="live-dot inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: "#22c55e" }}
      />
      {count !== null ? (
        <span>
          <strong style={{ color: "#d0d0e0" }}>{count}</strong> vídeos criados
        </span>
      ) : (
        <span>carregando...</span>
      )}
    </p>
  );
}
