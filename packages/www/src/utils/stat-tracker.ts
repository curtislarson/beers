export class StatTracker<T extends string> extends Map<T, number> {
  #uniqueCache = new Map<T, Set<string | number>>();
  #faveCache = new Map<T, Map<string, number>>();
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

  fave(key: T, val: string) {
    const faveMap = this.#faveCache.get(key) ?? new Map<string, number>();
    faveMap.set(val, (faveMap.get(val) ?? 0) + 1);
    this.#faveCache.set(key, faveMap);
  }

  getFave(key: T) {
    const faveMap = this.#faveCache.get(key);
    if (faveMap == null) {
      return "";
    }
    let fave = "";
    let faveCount = -1;
    for (const [currFave, currFaveCount] of faveMap.entries()) {
      if (currFaveCount > faveCount) {
        faveCount = currFaveCount;
        fave = currFave;
      } else if (currFaveCount === faveCount) {
        fave += `, ${currFave}`;
      }
    }
    return `${fave} (x${faveCount})`;
  }
}
