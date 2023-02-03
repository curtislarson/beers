export class StatMap<T extends string> extends Map<T, number> {
  #uniqueCache = new Map<T, Set<string | number>>();
  constructor() {
    super();
  }

  inc(key: T) {
    const val = this.get(key) ?? 0;
    this.set(key, val + 1);
  }

  uniq(key: T, val: string | number) {
    const set = this.#uniqueCache.get(key) ?? new Set();
    set.add(val);
    this.#uniqueCache.set(key, set);
  }

  getUniq(key: T) {
    return this.#uniqueCache.get(key)?.size;
  }
}
