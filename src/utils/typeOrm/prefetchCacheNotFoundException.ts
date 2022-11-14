export class PrefetchCacheNotFoundException extends Error {
  constructor() {
    super(
      'Requested key was not found in the cache. This is a fatal error, because the key was registered as key to fetch and fetching is already done.',
    );
  }
}
