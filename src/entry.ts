'use strict'

export class Entry<K, V> {
  public key: K
  public value: V

  constructor (key: K, value: V) {
    this.key = key
    this.value = value
  }
}
