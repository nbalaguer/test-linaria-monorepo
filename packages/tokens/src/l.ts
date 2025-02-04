export function mapValues<K extends PropertyKey, V, O>(o: Record<K, V>, mapFn: (v: V, k?: K) => O): Record<K, O> {
  return Object.fromEntries(Object.entries(o).map(([k, v]) => [k as K, mapFn(v as V, k as K)])) as Record<K, O>
}

export function mapKeys<K extends PropertyKey, V, O extends PropertyKey>(o: Record<K, V>, mapFn: (k: K) => O): Record<O, V> {
  return Object.fromEntries(Object.entries(o).map(([k, v]) => [mapFn(k as K), v])) as Record<O, V>
}

export function isObject(o: unknown) {
  const type = typeof o;
  return type === 'function' || (type === 'object' && !!o);
}
