import AwaitLock from 'await-lock';
import { PrefetchCacheNotFoundException } from './prefetchCacheNotFoundException';

/**
 * A cache that can be used to prefetch data from the database.
 * Purpose of this cache is to reduce the number of database queries and solve the N+1 problem.
 *
 * First, register all required keys which will be used in the future.
 * Then, get required item by key with get(...) method.
 *
 * If key is not found directly in memory cache,
 * it will be added to the list of keys to fetch from the database
 * and batch fetch will be triggered.
 *
 * Cache should be registered as scoped per request in the DI container.
 */
export class PrefetchCache<TKey, TValue> {
  constructor(private readonly fetchFunc: (keys: Set<TKey>) => Promise<Map<TKey, TValue>>) {}
  private cache: Map<TKey, TValue> = new Map();
  private registeredKeys: Set<TKey> = new Set();
  private lock = new AwaitLock();

  /**
   * Registers a key to be fetched in the next batch.
   */
  registerKey(key: TKey): void {
    this.registeredKeys.add(key);
  }

  /**
   * Registers keys to be fetched in the next batch.
   */
  registerKeys(keys: TKey[]): void {
    keys.forEach((key) => this.registerKey(key));
  }

  /**
   * Try to get the item from the cache.
   * If not found, adds key to registered keys for batch and fetches all registered keys in a batch.
   * Festch is done in a lock to prevent multiple fetches.
   *
   * @throws PrefetchCacheNotFoundException if key was not found in the cache.
   */
  async get(key: TKey): Promise<TValue> {
    const fromCache = this.cache.get(key);
    if (fromCache !== undefined) return fromCache;

    await this.lock.acquireAsync();
    try {
      const fromCacheUnderLock = this.cache.get(key);
      if (fromCacheUnderLock !== undefined) return fromCacheUnderLock;

      this.registerKey(key);

      await this.batchFetchData();
    } finally {
      this.lock.release();
    }
    const fromCacheAfterFetch = this.cache.get(key);
    if (fromCacheAfterFetch !== undefined) return fromCacheAfterFetch;
    throw new PrefetchCacheNotFoundException();
  }

  private async batchFetchData() {
    const res = await this.fetchFunc(this.registeredKeys);
    this.registeredKeys.clear();
    this.cache = new Map([...this.cache, ...res]);
  }
}
