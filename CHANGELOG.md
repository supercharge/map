# Changelog

## [1.5.0](https://github.com/supercharge/map/compare/v1.4.0...v1.5.0) - 2021-0x-xx

### Added
- add `toArray()` method: converting the map to a JavaScript array containing arrays for each key-value-pair of this map
- `Map.from()` method to create a new Map instance. This `Map.from` method aligns with JavaScript’s `Array.from` or `Object.fromX` methods

### Updated
- bump dependencies


## [1.4.0](https://github.com/supercharge/map/compare/v1.3.0...v1.4.0) - 2021-07-05

### Added
- create a map with entries from an existing object:
  - you can now use `Map.of({ key: 'value' })` or `new Map({ key: 'value' })`
  - you can still use the key-value arrays for entries: `Map.of([['key', 'value']])`
- add `isMissing(key)` method: determining whether the map is missing the given `key`
- add `toObject()` method: converting the map to a plain JavaScript object

### Updated
- bump dependencies
- remove the `@supercharge/goodies` dependency
- deprecated `missing(key)` method in favor of `isMissing(key)`


## [1.3.0](https://github.com/supercharge/map/compare/v1.2.0...v1.3.0) - 2021-02-19

### Added
- add `missing(key)` method  determining whether the map is missing the given `key`

### Updated
- bump dependencies


## [1.2.0](https://github.com/supercharge/map/compare/v1.1.0...v1.2.0) - 2020-12-14

### Added
- add `contains(predicate)` method to determine whether the map satisfies the predicate function
- add `includes(predicate)` method as an alias for the `contains` method


## [1.1.0](https://github.com/supercharge/map/compare/v1.0.0...v1.1.0) - 2020-12-14

### Updated
- bump dependencies
- change `main` entrypoint in `package.json` to `dist` folder
- move test runner from `@hapi/lab` to `jest`
- move assertions from `@hapi/code` to `jest`

### Removed
- remove `index.js` file which acted as a middleman to export from `dist` folder


## 1.0.0 - 2020-08-13

### Added
- `1.0.0` release 🚀 🎉
