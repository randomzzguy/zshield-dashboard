type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function allow(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  let b = buckets.get(key);
  if (!b || now > b.resetAt) {
    b = { count: 0, resetAt: now + windowMs };
    buckets.set(key, b);
  }
  if (b.count >= max) return false;
  b.count += 1;
  return true;
}