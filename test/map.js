'use strict'

const Map = require('../dist')
const Sinon = require('sinon')
const { test } = require('uvu')
const expect = require('expect')

test('of', () => {
  expect(Map.of().isEmpty()).toBe(true)
  expect(Map.of([]).isEmpty()).toBe(true)
  expect(Map.of(null).isEmpty()).toBe(true)
  expect(Map.of(undefined).isEmpty()).toBe(true)

  expect(() => Map.of(['key', 'value'])).toThrow()
  expect(() => Map.of([['key', 'value']])).not.toThrow()
  expect(() => Map.of({ key: 'value' })).not.toThrow()

  expect(Map.of([['key', 'value']]).has('key')).toBe(true)
  expect(Map.of([['key', 'value'], ['name', 'Marcus']]).has('key')).toBe(true)

  expect(Map.of({ key: 'value' }).size()).toBe(1)
  expect(Map.of({ key: 'value' }).has('key')).toBe(true)
})

test('from', () => {
  expect(Map.from().isEmpty()).toBe(true)
  expect(Map.from([]).isEmpty()).toBe(true)
  expect(Map.from(null).isEmpty()).toBe(true)
  expect(Map.from(undefined).isEmpty()).toBe(true)

  expect(() => Map.from(['key', 'value'])).toThrow()
  expect(() => Map.from([['key', 'value']])).not.toThrow()
  expect(() => Map.from({ key: 'value' })).not.toThrow()

  expect(Map.from([['key', 'value']]).has('key')).toBe(true)
  expect(Map.from([['key', 'value'], ['name', 'Marcus']]).has('key')).toBe(true)

  expect(Map.from({ key: 'value' }).size()).toBe(1)
  expect(Map.from({ key: 'value' }).has('key')).toBe(true)
})

test('clear', () => {
  const map = Map.from([
    [1, 'Marcus'],
    [2, 'Supercharge']
  ])

  expect(map.size()).toEqual(2)
  expect(map.has(1)).toBe(true)
  expect(map.has(2)).toBe(true)

  map.clear()

  expect(map.size()).toEqual(0)
  expect(map.has(1)).toBe(false)
  expect(map.has(2)).toBe(false)
})

test('missing', () => {
  const map = Map.from([
    [1, 'Marcus'],
    [2, 'Supercharge']
  ])

  const logStub = Sinon.stub(console, 'log').returns(() => {})

  expect(map.missing(1)).toBe(false)
  expect(logStub.calledOnce).toBe(true)

  logStub.restore()
})

test('isMissing', () => {
  const map = Map.from([
    [1, 'Marcus'],
    [2, 'Supercharge']
  ])

  expect(map.isMissing(1)).toBe(false)
  expect(map.isMissing(2)).toBe(false)

  map.delete(1)

  expect(map.isMissing(1)).toBe(true)
  expect(map.isMissing(2)).toBe(false)
})

test('delete', () => {
  const map = Map.from([
    [1, 'Marcus'],
    [2, 'Supercharge']
  ])

  expect(map.size()).toEqual(2)
  expect(map.has(1)).toBe(true)

  map.delete(1)

  expect(map.size()).toEqual(1)
  expect(map.has(1)).toBe(false)
})

test('entries', () => {
  const map = Map.from([
    [1, 'Marcus'],
    [2, 'Supercharge']
  ])

  const iterator = map.entries()

  expect(iterator.next().value).toEqual([1, 'Marcus'])
  expect(iterator.next().value).toEqual([2, 'Supercharge'])
  expect(iterator.next().value).toBeUndefined()
})

test('isEmpty', () => {
  const map = new Map()
  expect(map.isEmpty()).toBe(true)
})

test('isNotEmpty', () => {
  const map = new Map()
  expect(map.isEmpty()).toBe(true)

  map.set('name', 'Marcus')
  expect(map.isNotEmpty()).toBe(true)
})

test('keys', () => {
  const map = Map.from([
    [1, 'Marcus'],
    [2, 'Supercharge']
  ])

  const iterator = map.keys()

  expect(iterator.next().value).toEqual(1)
  expect(iterator.next().value).toEqual(2)
  expect(iterator.next().value).toBeUndefined()
})

test('getOrDefault', () => {
  const map = new Map()
  expect(map.getOrDefault('name', 'default')).toEqual('default')

  map.set('name', '')
  expect(map.getOrDefault('name', 'default')).toEqual('')

  map.set('name', null)
  expect(map.getOrDefault('name', 'default')).toEqual('default')

  map.set('name', 'Marcus')
  expect(map.getOrDefault('name', 'default')).toEqual('Marcus')
})

test('map', () => {
  const cache = new Map()

  cache
    .set('user:1', 'Marcus')
    .set('user:2', 'Supercharge')

  const users = cache.map((key, value) => {
    return { [key]: value }
  })

  expect(users).toEqual([
    { 'user:1': 'Marcus' },
    { 'user:2': 'Supercharge' }
  ])
})

test('values', () => {
  const map = Map.from([
    [1, 'Marcus'],
    [2, 'Supercharge']
  ])

  const iterator = map.values()

  expect(iterator.next().value).toEqual('Marcus')
  expect(iterator.next().value).toEqual('Supercharge')
  expect(iterator.next().value).toBeUndefined()
})

test('filter', () => {
  const cache = new Map()

  cache
    .set('user:1', 'Marcus')
    .set('user:2', 'Norman')
    .set('user:3', 'Christian')
    .set('user:4', 'Supercharge')

  const users = cache.filter((key, value) => {
    return key === 'user:1' || value === 'Norman'
  })

  expect(users.size()).toEqual(2)
  expect(users.has('user:1')).toBe(true)
  expect(users.has('user:2')).toBe(true)
  expect(users.has('user:3')).toBe(false)
  expect(users.has('user:4')).toBe(false)
})

test('for..from', () => {
  const iterable = Map.from([
    [1, 'Marcus'],
    [2, 'Supercharge']
  ])

  const array = []

  for (const [key, value] of iterable) {
    array.push({ [key]: value })
  }

  expect(array).toEqual([
    { 1: 'Marcus' },
    { 2: 'Supercharge' }
  ])
})

test('Symbol.iterator', () => {
  const map = Map.from([
    [1, 'Marcus'],
    [2, 'Supercharge']
  ])

  const iterable = map[Symbol.iterator]()
  expect(iterable.next).toBeInstanceOf(Function)

  const array = []

  for (const [key, value] of iterable) {
    array.push({ [key]: value })
  }

  expect(array).toEqual([
    { 1: 'Marcus' },
    { 2: 'Supercharge' }
  ])
})

test('includes', () => {
  const cache = new Map()

  cache
    .set('user:1', 'Marcus')
    .set('user:2', 'Supercharge')

  expect(cache.includes('user:1')).toBe(true)
  expect(cache.includes('Marcus')).toBe(false)

  expect(cache.includes((key) => key === 'user:1')).toBe(true)
  expect(cache.includes((_, value) => value === 'Supercharge')).toBe(true)
  expect(
    cache.includes((key, value) => {
      return key === 'user:3' || value === 'Marcus'
    })
  ).toBe(true)

  expect(cache.includes((key) => key === 'user:3')).toBe(false)
})

test('toObject', () => {
  const cache = new Map()

  cache
    .set('1', 'Marcus')
    .set(2, 'Supercharge')

  expect(cache.toObject()).toEqual({ 1: 'Marcus', 2: 'Supercharge' })
})

test('toArray', () => {
  const cache = new Map({ 1: 'Marcus', 2: 'Norman', 3: 'Christian' })

  expect(cache.toArray()).toEqual([
    ['1', 'Marcus'], ['2', 'Norman'], ['3', 'Christian']
  ])
})

test('pick', () => {
  const cache = new Map({ 1: 'Marcus', 2: 'Norman', 3: 'Christian' })

  expect(cache.pick('1').toObject()).toEqual({ 1: 'Marcus' })
  expect(cache.pick('1', '2').toObject()).toEqual({ 1: 'Marcus', 2: 'Norman' })
  expect(cache.pick(['2', '3']).toObject()).toEqual({ 2: 'Norman', 3: 'Christian' })

  const users = new Map()
    .set(1, 'Marcus')
    .set(2, 'Supercharge')

  expect(users.pick(1).toObject()).toEqual({ 1: 'Marcus' })
  expect(users.pick(1, 2).toObject()).toEqual({ 1: 'Marcus', 2: 'Supercharge' })
  expect(users.pick([1, 2]).toObject()).toEqual({ 1: 'Marcus', 2: 'Supercharge' })
})

test.run()
