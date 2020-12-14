'use strict'

import { tap } from '@supercharge/goodies'

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
  constructor (entries?: Array<[K, V]> | null) {
    this.items = new Map<K, V>(entries)
  }

  /**
   * Create a new map instance of the given key/value pair `entries`.
   *
   * @param {Array} entries
   *
   * @returns {SuperchargedMap}
   */
  static of<K, V> (entries?: Array<[K, V]>): SuperchargedMap<K, V> {
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
    return tap(this, () => {
      this.items.clear()
    })
  }

  /**
   * Delete the given `value` from the set.
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
   * Runs the given `action` on each key-value-pair in the set.
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
   * Determine whether the set contains the given `key`.
   *
   * @param {*} key
   *
   * @returns {Boolean}
   */
  has (key: K): boolean {
    return this.items.has(key)
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
   * Set the `key`-`value`-pair in the map. This method overrides
   * a map entry with the given `key` if it already exists.
   *
   * @param {*} key
   * @param {*} value
   *
   * @returns {SuperchargedMap}
   */
  set (key: K, value: V): this {
    return tap(this, () => {
      this.items.set(key, value)
    })
  }

  /**
   * Returns the size of the map.
   *
   * @returns {Number}
   */
  size (): number {
    return this.items.size
  }

  /**
   * Returns an iterable of all values in the map.
   *
   * @returns {IterableIterator}
   */
  values (): IterableIterator<V> {
    return this.items.values()
  }

  /**
   * Returns an array containing the results of applying the
   * given `transform` function to each entry in the map.
   *
   * @param {Function} transform
   *
   * @returns {Array}
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
   * Returns a map containing only items matching the given `predicate`. Return
   * `true` from your `predicate` function to keep the entry in the map.
   * Return `false` to remove the entry form the map.
   *
   * @param {Function} predicate
   *
   * @returns {SuperchargedMap}
   */
  filter (predicate: (key: K, value: V, map: SuperchargedMap<K, V>) => boolean): SuperchargedMap<K, V> {
    const results: SuperchargedMap<K, V> = new SuperchargedMap<K, V>()

    this.forEach((key: K, value: V) => {
      if (predicate(key, value, this)) {
        results.set(key, value)
      }
    })

    return results
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
}
