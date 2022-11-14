import { PrefetchCache } from './prefetchCache';

describe('PrefetchCache', () => {
  let prefetchCache: PrefetchCache<string, string>;

  const fetchFuncSpy = jest.fn(async (keys: Set<string>) => {
    await new Promise((r) => setTimeout(r, 20)); //simulate DB query delay
    const keyArr = Array.from(keys);
    return new Map(keyArr.map((key) => [key, `${key}-value`]));
  });

  beforeEach(() => {
    prefetchCache = new PrefetchCache<string, string>(async (keys) => {
      return fetchFuncSpy(keys);
    });
    fetchFuncSpy.mockClear();
  });

  const testRegisterKey = (keysToAdd: string[], expectedKeys: string[]) => {
    for (const key of keysToAdd) {
      prefetchCache.registerKey(key);
    }
    expect(fetchFuncSpy).toBeCalledTimes(0);
    assertRegisteredKeys(expectedKeys);
  };

  const testRegisterKeys = (keysToAdd: string[], expectedKeys: string[]) => {
    prefetchCache.registerKeys(keysToAdd);
    expect(fetchFuncSpy).toBeCalledTimes(0);
    assertRegisteredKeys(expectedKeys);
  };

  const assertRegisteredKeys = (expectedKeys: string[]) => {
    const registeredKeys = prefetchCache['registeredKeys'] as Set<string>;
    expect(registeredKeys.size).toBe(expectedKeys.length);
    for (const key of expectedKeys) {
      expect(registeredKeys.has(key)).toBe(true);
    }
  };

  /**
   * Gets all specified keys from the cache parallelly.
   * Also tests that all returned values has right value.
   */
  const testGetValuesFromCacheAndAssertReturnedValues = async (keys: string[]) => {
    const cacheGetItems: Map<string, Promise<string>> = new Map();
    for (const key of keys) {
      cacheGetItems.set(key, prefetchCache.get(key));
    }
    await Promise.all(cacheGetItems.values());
    for (const [key, value] of cacheGetItems) {
      expect(await value).toBe(`${key}-value`);
    }
  };

  describe('get values', () => {
    it('clean registered keys after fetch data without previous key registration', async () => {
      await testGetValuesFromCacheAndAssertReturnedValues(['key1']);
      assertRegisteredKeys([]);
    });
    it('clean registered keys after fetch data with previous key registration', async () => {
      prefetchCache.registerKey('key1');
      await testGetValuesFromCacheAndAssertReturnedValues(['key1']);
      assertRegisteredKeys([]);
    });
    it('get single value without previous key registration', async () => {
      await testGetValuesFromCacheAndAssertReturnedValues(['key1']);
      expect(fetchFuncSpy).toBeCalledTimes(1);
    });
    it('get multiple values without previous key registration', async () => {
      await testGetValuesFromCacheAndAssertReturnedValues(['key1', 'key2', 'key3']);
      expect(fetchFuncSpy).toBeCalledTimes(3);
    });
    it('get single value with previous key registration', async () => {
      prefetchCache.registerKey('key1');
      await testGetValuesFromCacheAndAssertReturnedValues(['key1']);
      expect(fetchFuncSpy).toBeCalledTimes(1);
    });
    it('get multiple values with previous key registration', async () => {
      prefetchCache.registerKeys(['key1', 'key2', 'key3']);
      await testGetValuesFromCacheAndAssertReturnedValues(['key1', 'key2', 'key3']);
      expect(fetchFuncSpy).toBeCalledTimes(1);
    });
    it('get mutiple values in two batch loads', async () => {
      prefetchCache.registerKeys(['key1', 'key2', 'key3']);
      await testGetValuesFromCacheAndAssertReturnedValues(['key1', 'key2', 'key3']);
      prefetchCache.registerKeys(['key4', 'key5', 'key6']);
      await testGetValuesFromCacheAndAssertReturnedValues(['key1', 'key2', 'key3', 'key4', 'key5', 'key6']);
      expect(fetchFuncSpy).toBeCalledTimes(2);
    });
  });

  describe('register key', () => {
    it('register one key', async () => {
      testRegisterKey(['key1'], ['key1']);
    });
    it('register duplicite key', async () => {
      testRegisterKey(['key1', 'key1'], ['key1']);
    });
    it('register multiple keys', async () => {
      testRegisterKey(['key1', 'key2', 'key3'], ['key1', 'key2', 'key3']);
    });
  });

  describe('register keys', () => {
    it('register one key', async () => {
      testRegisterKeys(['key1'], ['key1']);
    });
    it('register duplicite key', async () => {
      testRegisterKeys(['key1', 'key1'], ['key1']);
    });
    it('register multiple keys', async () => {
      testRegisterKeys(['key1', 'key2', 'key3'], ['key1', 'key2', 'key3']);
    });
  });
});
