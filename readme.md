# EDC; Mildly Opinionated JavaScript Utilities

```
npm i @trozlabs/edc
```

### Work in Progress:

__`EDC.Type.toBoolean`__

```javascript

// True
EDC.toBoolean('Y')
EDC.toBoolean('y')
EDC.toBoolean('yes')
EDC.toBoolean(1)
EDC.toBoolean({ 1: null })

// False
EDC.toBoolean('')
EDC.toBoolean(' ')
EDC.toBoolean('no')
EDC.toBoolean('N')
EDC.toBoolean(0)
EDC.toBoolean(-1)
EDC.toBoolean({ })
EDC.toBoolean(undefined)
EDC.toBoolean(null)

```

__`EDC.util.object.query`__

```javascript
const EDC = require('@trozlabs/edc');
const { query } = EDC.util.object;
const reddit = require('reddit.json');

var res = query(reddit, {
    property: 'subreddit_subscribers',
    value: 1310549
});
console.log(res);
```