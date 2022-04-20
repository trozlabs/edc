# EDC (Every Day Code)

```
npm i @trozlabs/edc
```

## Type Class

```js

const { Type } = require('@trozlabs/edc');

/************************************************
 * Type.instanceOf(obj)
 ************************************************/

Type.instanceOf(async function myAsyncFunction() {}, 'myAsyncFunction') // true
Type.instanceOf([]) // true
Type.instanceOf(new SomeExampleClass(), 'Array') // false
Type.instanceOf(new SomeExampleClass(), 'SomeExampleClass') // true
Type.instanceOf(true, 'Boolean') // true

/************************************************
 * Type.getName(obj)
 ************************************************/

Type.getName(async function myAsyncFunction() {}) // myAsyncFunction
Type.getName([]) // Array
Type.getName(new SomeExampleClass()) // SomeExampleClass
Type.getName(SomeExampleClass) // SomeExampleClass
Type.getName(true) // Boolean

/************************************************
 * Type.get(obj)
 ************************************************/

Type.get(async function myAsyncFunction() {}) // AsyncFunction
Type.get([]) // Array
Type.get(new SomeExampleClass()) // Class
Type.get(SomeExampleClass) // Class
Type.get(true) // Boolean

/************************************************
 * Type.isSimpleObject(obj)
 ************************************************/

Type.isSimpleObject(null) // false
Type.isSimpleObject(undefined) // false
Type.isSimpleObject([]) // false
Type.isSimpleObject(new Map()) // false
Type.isSimpleObject({ key: 'val' }) // true

/************************************************
 * Type.getMeta(obj)
 ************************************************/

Type.getMeta(async function myAsyncFunction() {}) 
// { name: myAsyncFunction, type: AsyncFunction, primitive: function, empty: false }
Type.getMeta([]) 
// { name: Array, type: Array, primitive: object, empty: false, value: [] }
Type.getMeta(new SomeExampleClass()) 
// { name: SomeExampleClass, type: Class, primitive: object, empty: false, value: {} }
Type.getMeta(SomeExampleClass) 
// { name: SomeExampleClass, type: Class, primitive: object, empty: false, value: {} }
Type.getMeta(true) 
// { name: Boolean, type: Boolean, primitive: boolean, empty: false, value: true }

/************************************************
 * Type.is<Type>(obj)
 ************************************************/

Type.isSymbol(someVar) // true/false
Type.isBoolean(someVar) // true/false
Type.isDate(someVar) // true/false
Type.isNumber(someVar) // true/false
Type.isInteger(someVar) // true/false
Type.isFloat(someVar) // true/false
Type.isBigInt(someVar) // true/false
Type.isPrime(someVar) // true/false
Type.isClass(someVar) // true/false
Type.isFunction(someVar) // true/false
Type.isAsyncFunction(someVar) // true/false
Type.isGeneratorFunction(someVar) // true/false
Type.isArguments(someVar) // true/false
Type.isPromise(someVar) // true/false
Type.isWorker(someVar) // true/false
Type.isString(someVar) // true/false
Type.isUndefined(someVar) // true/false
Type.isNull(someVar) // true/false
Type.isObject(someVar) // true/false
Type.isMap(someVar) // true/false
Type.isSet(someVar) // true/false
Type.isArray(someVar) // true/false
Type.isInt8Array(someVar) // true/false
Type.isUint8Array(someVar) // true/false
Type.isUint8ClampedArray(someVar) // true/false
Type.isInt16Array(someVar) // true/false
Type.isUint16Array(someVar) // true/false
Type.isInt32Array(someVar) // true/false
Type.isUint32Array(someVar) // true/false
Type.isFloat32Array(someVar) // true/false
Type.isFloat64Array(someVar) // true/false
Type.isBigInt64Array(someVar) // true/false
Type.isBigUint64Array(someVar) // true/false
Type.isError(someVar) // true/false
Type.isEmpty(someVar) // true/false
Type.isSimpleObject(someVar) // true/false
Type.isIterable(someVar) // true/false
Type.isBooleanLike(someVar) // true/false
```

## Text Class

```js
const { Text } = require('@trozlabs/edc');

Text.toCamel('Text to Transform') // textToTransform
Text.toSnake('textToTransform')   // text_to_transform
Text.toKebab('text_to_transform') // text-to-transform
Text.toUpper('text-to-transform') // TEXT-TO-TRANSFORM
Text.toLower('TEXT-TO-TRANSFORM') // text-to-transform
Text.toTitle('text-to-transform') // Text To Transform
Text.toWords('textToTransform')   // [ 'Text', 'To', 'Transform' ]
```


## objectRemap()

```js
const { objectRemap } = require('@trozlabs/edc');

const square = {
    ID: 1,
    CAT: 'products',
    NAME: 'A',
    DESCRIPTION: 'First Object',
    CREATED_DATE: new Date().toJSON(),
    UPDATED_DATE: new Date().toJSON()
}

// but you want it to look like this...
const newObject = objectRemap(square, {
    id: 'ID',
    category: 'CAT',
    slug: [ 'ID', '-', 'CAT', '_', 'NAME' ],
    name: 'NAME',
    desc: 'DESCRIPTION',
    createdAt: 'CREATED_DATE',
    updatedAt: 'UPDATED_DATE'
});

```

Example result:
```js
{
    id: 1,
    category: 'products',
    slug: '1-products_A',
    name: 'A',
    desc: 'First Object',
    createdAt: '2022-04-20T21:58:20.970Z',
    updatedAt: '2022-04-20T21:58:20.970Z'
}
```

### objectQuery()

```js
const { objectQuery } = require('@trozlabs/edc');
const object = require('data.json'); // used data from https://reddit.com/r/popular.json

// search by key and/or value either are optional.
objectQuery(object, {
    // property: 'permalink',
    value: '/r/science/comments/u7urps/donating_blood_regularly_can_reduce_toxic_forever/'
});
```

Example result:
```js
[
    {
        depth: 5,
        key: 'permalink',
        val: '/r/science/comments/u7urps/donating_blood_regularly_can_reduce_toxic_forever/',
        path: [ '.data', '.children', '[12]', '.data', '.permalink' ],
        namespace: '.data.children[12].data.permalink',
        context: { the object result was contained in }
    }
]
```

### fsTree()

```javascript

const { fsTree } = require('@trozlabs/edc');

fsTree('../').then(map => {
    console.log(map);
});

fsTree('.', {
    ignore: ['node_modules'],
    toArray: true,
    maxDepth: 3
}).then(array => {
    console.log(array);
});
```

Example result:
```js
[
    {
        dev: 16777234,
        mode: 16877,
        nlink: 6,
        uid: 501,
        gid: 20,
        rdev: 0,
        blksize: 4096,
        ino: 56697446,
        size: 192,
        blocks: 0,
        atimeMs: 1650489395814.3723,
        mtimeMs: 1650489331697.1792,
        ctimeMs: 1650489331697.1792,
        birthtimeMs: 1650413396244.5251,
        atime: 2022-04-20T21:16:35.814Z,
        mtime: 2022-04-20T21:15:31.697Z,
        ctime: 2022-04-20T21:15:31.697Z,
        birthtime: 2022-04-20T00:09:56.245Z,
        root: '/',
        dir: '/absolute/path/to/edc',
        base: 'test',
        ext: '',
        name: 'test',
        index: 7,
        depth: 1,
        type: 'directory',
        pathname: '/absolute/path/to/edc/test',
        total: 4,
        files: [ [Object], [Object], [Object], [Object] ]
    },
    {...}, 
    {...}, 
    ...
]
```

## More Coming...