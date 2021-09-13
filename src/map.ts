'use strict'

export class SuperchargedMap<K, V> implements Iterable<[K, V]> {
  /**
   * Contains the key-value-pairs in the map.
   */
  private readonly items: Map<K, V>

  /**
   * Create a new map instance for the given `entries`.
   *
   * @param entries
   */
  constructor (entries?: Array<[K, V]> | Record<string, V> | null) {
    this.items = new Map<K, V>(
      this.createEntries(entries)
    )
  }

  /**
   * Create an array of [key, value] entries from the given `entries` parameter.
   *
   * @param entries
   *
   * @returns {Array}
   */
  private createEntries (entries?: Array<[K, V]> | Record<string, V> | null): Array<[K, V]> {
    return Array.isArray(entries)
      ? entries
      : this.createEntriesFromObject(entries)
  }

  /**
   * Create the internal map from the given `entries` object.
   *
   * @param {Object} entries
   *
   * @returns {Array}
   */
  private createEntriesFromObject (entries?: Record<string, V> | null): Array<[K, V]> {
    return Object.entries(entries ?? {}) as unknown as Array<[K, V]>
  }

  /**
   * Create a new map instance of the given key/value pair `entries`.
   *
   * @param {*} entries
   *
   * @returns {SuperchargedMap}
   *
   * @deprecated use `Map.from()` instead
   */
  static of<K, V> (entries?: Array<[K, V]> | Record<string, V>): SuperchargedMap<K, V> {
    return new this<K, V>(entries)
  }

  /**
   * Create a new map from the given `entries`.
   *
   * @param {*} entries
   *
   * @returns {SuperchargedMap}
   */
  static from<K, V> (entries?: Array<[K, V]> | Record<string, V>): SuperchargedMap<K, V> {
    return new this<K, V>(entries)
  }

  /**
   * Returns an iterable of key-value-pairs for every entry in the map.
   *
   * @returns {IterableIterator}
   */
  [Symbol.iterator] (): IterableIterator<[K, V]> {
    return this.entries()
  }

  /**
   * Clears the map by removing all entries.
   *
   * @returns {SuperchargedMap}
   */
  clear (): this {
    this.items.clear()

    return this
  }

  /**
   * Determine whether the map contains an item identified by the predicate function.
   *
   * @param {Function} predicate
   *
   * @returns {boolean}
   */
  contains (predicate: (key: K, value: V, map: SuperchargedMap<K, V>) => boolean): boolean {
    return typeof predicate !== 'function'
      ? this.has(predicate)
      : this.filter(predicate).isNotEmpty()
  }

  /**
   * Delete the given `value` from the map.
   *
   * @param {*} key
   *
   * @returns {Boolean}
   */
  delete (key: K): boolean {
    return this.items.delete(key)
  }

  /**
   * Returns an iterable of key-value-pairs for all entries in the map.
   *
   * @returns {IterableIterator}
   */
  entries (): IterableIterator<[K, V]> {
    return this.items.entries()
  }

  /**
   * Returns a map containing only items matching the given `predicate`. Return
   * `true` from your `predicate` function to keep the entry in the map.
   * Return `false` to remove the entry form the map.
   *
   * @param {Function} predicate
   *
   * @returns {SuperchargedMap}
   */
  filter (predicate: (key: K, value: V, predicate: SuperchargedMap<K, V>) => boolean): SuperchargedMap<K, V> {
    const results = SuperchargedMap.from<K, V>()

    this.forEach((key: K, value: V) => {
      if (predicate(key, value, this)) {
        results.set(key, value)
      }
    })

    return results
  }

  /**
   * Runs the given `action` on each key-value-pair in the map.
   *
   * @param {Function} action
   */
  forEach (action: (key: K, value: V, set: SuperchargedMap<K, V>) => void): void {
    this.items.forEach((value: V, key: K) => {
      action(key, value, this)
    })
  }

  /**
   * Returns the value stored for the the given `key`. Returns
   * `undefined` if the `key` is not present in the map.
   *
   * @param key
   *
   * @returns {*}
   */
  get (key: K): V | undefined {
    return this.items.get(key)
  }

  /**
   * Returns the value corresponding to `key` or the `defaultValue`
   * if there’s no entry present in the map.
   *
   * @param key
   * @param defaultValue
   *
   * @returns {*}
   */
  getOrDefault (key: K, defaultValue: V): V {
    return this.get(key) ?? defaultValue
  }

  /**
   * Determine whether the map contains the given `key`.
   *
   * @param {*} key
   *
   * @returns {Boolean}
   */
  has (key: K): boolean {
    return this.items.has(key)
  }

  /**
   * This is an alias method for `Map#contains`. Determine whether the
   * map contains an item identified by the predicate function.
   *
   * @param {Function} predicate
   *
   * @returns {boolean}
   */
  includes (predicate: (key: K, value: V, map: SuperchargedMap<K, V>) => boolean): boolean {
    return this.contains(predicate)
  }

  /**
   * Determine whether the map is empty (contains no entries).
   *
   * @returns {Boolean}
   */
  isEmpty (): boolean {
    return this.size() === 0
  }

  /**
   * Determine whether the map is not empty (contains entries).
   *
   * @returns {Boolean}
   */
  isNotEmpty (): boolean {
    return !this.isEmpty()
  }

  /**
   * Returns an iterable of all keys in the map.
   *
   * @returns {IterableIterator}
   */
  keys (): IterableIterator<K> {
    return this.items.keys()
  }

  /**
   * Returns an array containing the results of applying the
   * given `transform` function to each entry in the map.
   *
   * @param {Function} transform
   *
   * @returns {R[]}
   */
  map<R> (transform: (key: K, value: V, map: SuperchargedMap<K, V>) => R): R[] {
    const results: R[] = []

    this.forEach((key, value) => {
      results.push(
        transform(key, value, this)
      )
    })

    return results
  }

  /**
   * Determine whether the map is missing the given `key`.
   *
   * @param {*} key
   *
   * @returns {Boolean}
   */
  missing (key: K): boolean {
    console.log('The "missing" method is deprecated in the @supercharge/map package. Please use "isMissing" instead.')

    return this.isMissing(key)
  }

  /**
   * Determine whether the map is missing the given `key`.
   *
   * @param {*} key
   *
   * @returns {Boolean}
   */
  isMissing (key: K): boolean {
    return !this.has(key)
  }

  /**
   * Returns a map containing only the picked `keys`.
   *
   * @param {K[]|K[][]} keys
   *
   * @returns {SuperchargedMap<K,V>}
   */
  pick (...keys: K[]|K[][]): SuperchargedMap<K, V> {
    const picked = ([] as K[]).concat(...keys)

    return this.filter((key) => {
      return picked.includes(key)
    })
  }

  /**
   * Set the `key`-`value`-pair in the map. This method overrides
   * a map entry with the given `key` if it already exists.
   *
   * @param {*} key
   * @param {*} value
   *
   * @returns {SuperchargedMap}
   */
  set (key: K, value: V): this {
    this.items.set(key, value)

    return this
  }

  /**
   * Returns the size of the map, means the number of stored key-value entries.
   *
   * @returns {Number}
   */
  size (): number {
    return this.items.size
  }

  /**
   * Transforms the map to a JavaScript array containing arrays
   * for each key-value-pair of this map.
   *
   * @returns {Array<[K, V]>}
   */
  toArray (): Array<[K, V]> {
    return Array.from(this)
  }

  /**
   * Transforms the map to a plain JavaScript object.
   *
   * @returns {Record<string, V>}
   */
  toObject (): Record<string, V> {
    return Object.fromEntries(this)
  }

  /**
   * Returns an iterable of all values in the map.
   *
   * @returns {IterableIterator}
   */
  values (): IterableIterator<V> {
    return this.items.values()
  }
}
