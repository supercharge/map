<div align="center">
  <a href="https://superchargejs.com">
    <img width="471" style="max-width:100%;" src="https://superchargejs.com/images/supercharge-text.svg" />
  </a>
  <br/>
  <br/>
  <p>
    <h3>Maps</h3>
  </p>
  <p>
    An extended <code>Map</code> class for Node.js
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
    <a href="https://www.npmjs.com/package/@supercharge/maps"><img src="https://img.shields.io/npm/v/@supercharge/maps.svg" alt="Latest Version"></a>
    <a href="https://www.npmjs.com/package/@supercharge/maps"><img src="https://img.shields.io/npm/dm/@supercharge/maps.svg" alt="Monthly downloads"></a>
  </p>
  <p>
    <em>Follow <a href="http://twitter.com/marcuspoehls">@marcuspoehls</a> and <a href="http://twitter.com/superchargejs">@superchargejs</a> for updates!</em>
  </p>
</div>

---

## Introduction
The `@supercharge/maps` package … tba.


## Installation

```
npm i @supercharge/maps
```


## Docs
Find all the [details for `@supercharge/maps` in the extensive Supercharge docs](https://superchargejs.com/docs/maps).


## Usage
Using `@supercharge/maps` is pretty straightforward

```js
const Map = require('@supercharge/maps')

const cache = new Map()

cache.isEmpty()
// true

cache
  .set('user:1', 'Marcus')
  .set('user:2', 'Supercharge')

cache.isNotEmpty()
// true

const users = cache.map((value, key) => {
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
> GitHub [@superchargejs](https://github.com/superchargejs/) &nbsp;&middot;&nbsp;
> Twitter [@superchargejs](https://twitter.com/superchargejs)
