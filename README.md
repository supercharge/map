<div align="center">
  <a href="https://superchargejs.com">
    <img width="471" style="max-width:100%;" src="https://superchargejs.com/images/supercharge-text.svg" />
  </a>
  <br/>
  <br/>
  <p>
    <h3>Map</h3>
  </p>
  <p>
    An extended <code>Map</code> and the one JavaScript should have shipped
  </p>
  <br/>
  <p>
    <a href="#installation"><strong>Installation</strong></a> ·
    <a href="#Docs"><strong>Docs</strong></a> ·
    <a href="#usage"><strong>Usage</strong></a>
  </p>
  <br/>
  <br/>
  <p>
    <a href="https://www.npmjs.com/package/@supercharge/map"><img src="https://img.shields.io/npm/v/@supercharge/map.svg" alt="Latest Version"></a>
    <a href="https://www.npmjs.com/package/@supercharge/map"><img src="https://img.shields.io/npm/dm/@supercharge/map.svg" alt="Monthly downloads"></a>
  </p>
  <p>
    <em>Follow <a href="http://twitter.com/marcuspoehls">@marcuspoehls</a> and <a href="http://twitter.com/superchargejs">@superchargejs</a> for updates!</em>
  </p>
</div>

---

## Introduction
The `@supercharge/map` package provides an extended JavaScript `Map` class. It comes with additional methods like `.isEmpty()` or `.map(callback)`.

You already know methods like `.map()` from arrays and having them available on maps improves your development experience and makes your code more readable.


## Installation

```
npm i @supercharge/map
```


## Docs
Find all the [details for `@supercharge/map` in the extensive Supercharge docs](https://superchargejs.com/docs/map).


## Usage
Using `@supercharge/map` is pretty straightforward. Import the `Map` class exported from the `@supercharge/map` package and use it (almost) the same way you would use JavaScript’s `Map` class. This package gives you the parameter order `key, value, map` in callbacks. JavaScript’s Map class gives you `value, key, map`:

```js
const Map = require('@supercharge/map')

const cache = new Map()

cache.isEmpty()
// true

cache
  .set('user:1', 'Marcus')
  .set('user:2', 'Supercharge')

cache.isNotEmpty()
// true

const users = cache.map((key, value, map) => {
  return { [key]: value }
})

// [{ 'user:1': 'Marcus' }, { 'user:2': 'Supercharge' }]

```


## Contributing
Do you miss a function? We very much appreciate your contribution! Please send in a pull request 😊

1.  Create a fork
2.  Create your feature branch: `git checkout -b my-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request 🚀


## License
MIT © [Supercharge](https://superchargejs.com)

---

> [superchargejs.com](https://superchargejs.com) &nbsp;&middot;&nbsp;
> GitHub [@supercharge](https://github.com/supercharge) &nbsp;&middot;&nbsp;
> Twitter [@superchargejs](https://twitter.com/superchargejs)
