/**
 * Normalize ingredient / product names for fuzzy matching.
 */
export function normalizeKey(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\b(organic|fresh|frozen|canned|dried|raw|whole|ground|boneless|skinless|large|medium|small|extra|grade|a|the|of|for|to)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Simple token Jaccard similarity */
export function similarity(a: string, b: string): number {
  const ta = new Set(normalizeKey(a).split(" ").filter(Boolean));
  const tb = new Set(normalizeKey(b).split(" ").filter(Boolean));
  if (ta.size === 0 || tb.size === 0) return 0;
  let inter = 0;
  for (const t of ta) if (tb.has(t)) inter++;
  const union = ta.size + tb.size - inter;
  return inter / union;
}

export function bestMatchKey(
  query: string,
  candidates: string[],
  threshold = 0.35
): { key: string; score: number } | null {
  const nq = normalizeKey(query);
  let best: { key: string; score: number } | null = null;

  for (const c of candidates) {
    const nc = normalizeKey(c);
    // Exact / substring boost
    let score = similarity(nq, nc);
    if (nq === nc) score = 1;
    else if (nq.includes(nc) || nc.includes(nq)) score = Math.max(score, 0.85);
    // Token containment: all query tokens in candidate
    const qt = nq.split(" ").filter(Boolean);
    const ct = new Set(nc.split(" ").filter(Boolean));
    if (qt.length > 0 && qt.every((t) => ct.has(t))) {
      score = Math.max(score, 0.9);
    }
    if (!best || score > best.score) best = { key: c, score };
  }

  if (!best || best.score < threshold) return null;
  return best;
}
