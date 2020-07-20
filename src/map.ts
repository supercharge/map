'use strict'

export class SuperchargedMap<K, V> extends Map<K, V> {
  /**
   * Determine whether the map is empty (contains no entries).
   */
  isEmpty (): boolean {
    return this.size === 0
  }

  /**
   * Determine whether the map is not empty (contains entries).
   */
  isNotEmpty (): boolean {
    return !this.isEmpty()
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
   * Returns an array containing the results of applying the
   * given `transform` function to each entry in the map.
   *
   * @param {Function} transform
   *
   * @returns {Array}
   */
  map<R> (transform: (value: V, key: K, map: SuperchargedMap<K, V>) => R): R[] {
    const results: R[] = []

    this.forEach((value, key) => {
      results.push(transform(value, key, this))
    })

    return results
  }
}
