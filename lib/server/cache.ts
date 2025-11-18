type Entry<T> = { value: T; expires: number };
const store = new Map<string, Entry<any>>();

export function cacheGet<T = any>(key: string): T | null {
  const e = store.get(key);
  if (!e) return null;
  if (Date.now() > e.expires) {
    store.delete(key);
    return null;
  }
  return e.value as T;
}

export function cacheSet<T = any>(key: string, value: T, ttlMs: number): void {
  store.set(key, { value, expires: Date.now() + ttlMs });
}

export function cacheDel(key: string): void {
  store.delete(key);
}