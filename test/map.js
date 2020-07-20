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

    const users = cache.map((value, key) => {
      return { [key]: value }
    })

    expect(users).to.equal([
      { 'user:1': 'Marcus' },
      { 'user:2': 'Supercharge' }
    ])
  })
})
