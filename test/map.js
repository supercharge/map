'use strict'

const Map = require('..')
const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')

const { describe, it } = (exports.lab = Lab.script())

describe('Maps', () => {
  it('of', () => {
    expect(Map.of().isEmpty()).to.be.true()
    expect(Map.of([]).isEmpty()).to.be.true()
    expect(Map.of(null).isEmpty()).to.be.true()
    expect(Map.of(undefined).isEmpty()).to.be.true()

    expect(() => Map.of(['key', 'value'])).to.throw()
    expect(() => Map.of([['key', 'value']])).to.not.throw()

    expect(Map.of([['key', 'value']]).has('key')).to.be.true()
    expect(Map.of([['key', 'value'], ['name', 'Marcus']]).has('key')).to.be.true()
  })

  it('clear', () => {
    const map = Map.of([
      [1, 'Marcus'],
      [2, 'Supercharge']
    ])

    expect(map.size()).to.equal(2)
    expect(map.has(1)).to.be.true()
    expect(map.has(2)).to.be.true()

    map.clear()

    expect(map.size()).to.equal(0)
    expect(map.has(1)).to.be.false()
    expect(map.has(2)).to.be.false()
  })

  it('delete', () => {
    const map = Map.of([
      [1, 'Marcus'],
      [2, 'Supercharge']
    ])

    expect(map.size()).to.equal(2)
    expect(map.has(1)).to.be.true()

    map.delete(1)

    expect(map.size()).to.equal(1)
    expect(map.has(1)).to.be.false()
  })

  it('entries', () => {
    const map = Map.of([
      [1, 'Marcus'],
      [2, 'Supercharge']
    ])

    const iterator = map.entries()

    expect(iterator.next().value).to.equal([1, 'Marcus'])
    expect(iterator.next().value).to.equal([2, 'Supercharge'])
    expect(iterator.next().value).to.be.undefined()
  })

  it('isEmpty', () => {
    const map = new Map()
    expect(map.isEmpty()).to.be.true()
  })

  it('isNotEmpty', () => {
    const map = new Map()
    expect(map.isEmpty()).to.be.true()

    map.set('name', 'Marcus')
    expect(map.isNotEmpty()).to.be.true()
  })

  it('keys', () => {
    const map = Map.of([
      [1, 'Marcus'],
      [2, 'Supercharge']
    ])

    const iterator = map.keys()

    expect(iterator.next().value).to.equal(1)
    expect(iterator.next().value).to.equal(2)
    expect(iterator.next().value).to.be.undefined()
  })

  it('getOrDefault', () => {
    const map = new Map()
    expect(map.getOrDefault('name', 'default')).to.equal('default')

    map.set('name', '')
    expect(map.getOrDefault('name', 'default')).to.equal('')

    map.set('name', null)
    expect(map.getOrDefault('name', 'default')).to.equal('default')

    map.set('name', 'Marcus')
    expect(map.getOrDefault('name', 'default')).to.equal('Marcus')
  })

  it('map', () => {
    const cache = new Map()

    cache
      .set('user:1', 'Marcus')
      .set('user:2', 'Supercharge')

    const users = cache.map((key, value) => {
      return { [key]: value }
    })

    expect(users).to.equal([
      { 'user:1': 'Marcus' },
      { 'user:2': 'Supercharge' }
    ])
  })

  it('values', () => {
    const map = Map.of([
      [1, 'Marcus'],
      [2, 'Supercharge']
    ])

    const iterator = map.values()

    expect(iterator.next().value).to.equal('Marcus')
    expect(iterator.next().value).to.equal('Supercharge')
    expect(iterator.next().value).to.be.undefined()
  })

  it('filter', () => {
    const cache = new Map()

    cache
      .set('user:1', 'Marcus')
      .set('user:2', 'Norman')
      .set('user:3', 'Christian')
      .set('user:4', 'Supercharge')

    const users = cache.filter((key, value) => {
      return key === 'user:1' || value === 'Norman'
    })

    expect(users.size()).to.equal(2)
    expect(users.has('user:1')).to.be.true()
    expect(users.has('user:2')).to.be.true()
    expect(users.has('user:3')).to.be.false()
    expect(users.has('user:4')).to.be.false()
  })

  it('for..of', () => {
    const iterable = Map.of([
      [1, 'Marcus'],
      [2, 'Supercharge']
    ])

    const array = []

    for (const [key, value] of iterable) {
      array.push({ [key]: value })
    }

    expect(array).to.equal([
      { 1: 'Marcus' },
      { 2: 'Supercharge' }
    ])
  })

  it('Symbol.iterator', () => {
    const map = Map.of([
      [1, 'Marcus'],
      [2, 'Supercharge']
    ])

    const iterable = map[Symbol.iterator]()
    expect(iterable.next).to.be.a.function()

    const array = []

    for (const [key, value] of iterable) {
      array.push({ [key]: value })
    }

    expect(array).to.equal([
      { 1: 'Marcus' },
      { 2: 'Supercharge' }
    ])
  })
})
