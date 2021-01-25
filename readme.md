# EDC (Every Day Code); Mildly Opinionated JavaScript Utilities

```
npm i trozlabs/edc
```


## Optional package.json `edcConfig` Object

You can override some default options by adding `edcConfig` to your projects package.json file. Below shows current default config values. Only the options you want to change need to be included.

```json
{
    //...

    "edcConfig": {
        "DEBUG"         : true,
        "DEFAULT_PAGE"  : 1,
        "DEFAULT_LIMIT" : 25,
        "PAGING_PARAMS" : [ "sort", "dir", "limit", "page" ],
        "FORBIDDEN"     : [ "not-even-in-code" ],
        "REDACTED"      : [ "password" ],
        "LASTFOUR"      : [ "ssn", "cc", ],
        "EMPTY"         : "",
        "SPACE"         : " ",
        "BREAK"         : "\n",
        "RETURN"        : "\r",
        "EOL"           : "\n",
        "TAB"           : "    ",
    }
}
```

### Work in Progress:

## `EDC.Type`

Get Type metadata from any object (unless I forgot a scenario).

```javascript
const { Type } = require('edc');

var map = new Map();
    map.set('test', 1234);

var values = [
    // Value Properties
    Infinity, NaN, globalThis, undefined,
    // Objects
    Object, Function, Boolean, Symbol('1'), null,
    // Error Objects
    Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError,
    // Numbers and Dates
    Number, BigInt, Math, 1, -0, -1,
    Date, Date.now(),

    Buffer.from(''),
    new Int8Array(2),
    new RegExp(''),
    
    {},
    [],
    'S',
    true,
    false,
    
    map,
    new Set(),
    new WeakMap(),
    new WeakSet(),
    BigInt(9007199254740991),
    Promise,
]

for (obj of values) {
    const { alias, primitive, type, value, size, length } = Type.get(obj)
    console.log(value);
    console.table({ results: { alias, primitive, type, length: (size || length) } });
}
```


### `EDC.Type.toBoolean`

Cast to a boolean (more intuitive than what is truthy be default JS IMO)

```javascript
// True
EDC.Type.toBoolean('Y')
EDC.Type.toBoolean('y')
EDC.Type.toBoolean('yes')
EDC.Type.toBoolean(1)
EDC.Type.toBoolean({ 1: null })

// False
EDC.Type.toBoolean({ }) // empty objects return false as they should. 
EDC.Type.toBoolean('')
EDC.Type.toBoolean(' ')
EDC.Type.toBoolean('no')
EDC.Type.toBoolean('N')
EDC.Type.toBoolean(0)
EDC.Type.toBoolean(-1)
EDC.Type.toBoolean(undefined)
EDC.Type.toBoolean(null)
```


## `EDC.util`

### `EDC.util.object.query`

```javascript
const EDC = require('edc');
const { query } = EDC.util.object;
const reddit = require('reddit.json'); // used data from https://reddit.com/r/popular.json

var res = query(reddit, {
    property: 'subreddit_subscribers',
    value: 1310549
});
console.log(res);
```


### `EDC.util.fs.tree`

```javascript
const EDC = require('edc');
const { tree } EDC.util.fs;

tree('../').then(map => {
    console.log(map);
});

tree('.', {
   ignore: ['node_modules'],
   toArray: true,
   maxDepth: 3
}).then(array => {
   console.log(array);
});
```