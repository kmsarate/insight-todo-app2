# apis-helpers

Helper functions used in the [apis](https://github.com/kristjanmik/apis) project.

### installation

```sh
$ npm install apis-helpers
```

### Usage
```javascript
var helpers = require('apis-helpers');

// there are a few methods. getting a random user agent:
console.log(helpers.browser());
```

### Properties
- `helpers.currency`: A an object mapping a currency name to a short version and the icelandic name.

### Methods
- `helpers.mergeObjects(obj1, obj2)`: merges properties of one object to the other. No deep clone. You could just as well use
  one of the thousands of such modules out there
- `helpers.browser()`: returns a random browser user agent. Useful for scraping
- `helpers.deArrayfy(object)`: Takes an object and an array and iterates thorugh them. If the object/array contains an array
  with the lenght of 1, it will flatten it out to reference the contents of that array directly.

### License
MIT
