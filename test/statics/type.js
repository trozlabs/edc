
const Type = require('../../src/statics/type');

class SomeExampleClass {}

const border = new Array(74).fill('*').join('');
const commentOpen = '\n/' + border;
const commentClose = ' ' + border + '/\n';

console.log(`Testing: Type.js...`);
console.log(commentOpen);
console.log(' * Type.instanceOf(obj)');
console.log(commentClose);

console.log(`Type.instanceOf(async function myAsyncFunction() {}, 'myAsyncFunction') //`, Type.instanceOf(async function myAsyncFunction() {}, 'myAsyncFunction'))
console.log(`Type.instanceOf([]) //`, Type.instanceOf([], 'Array'))
console.log(`Type.instanceOf(new SomeExampleClass(), 'Array') //`, Type.instanceOf(new SomeExampleClass(), 'Array'))
console.log(`Type.instanceOf(new SomeExampleClass(), 'SomeExampleClass') //`, Type.instanceOf(new SomeExampleClass(), 'SomeExampleClass'))
console.log(`Type.instanceOf(true, 'Boolean') //`, Type.instanceOf(true, 'Boolean'))

console.log(commentOpen);
console.log(' * Type.getName(obj)');
console.log(commentClose);

console.log(`Type.getName(async function myAsyncFunction() {}) //`, Type.getName(async function myAsyncFunction() {}))
console.log(`Type.getName([]) //`, Type.getName([]))
console.log(`Type.getName(new SomeExampleClass()) //`, Type.getName(new SomeExampleClass()))
console.log(`Type.getName(SomeExampleClass) //`, Type.getName(new SomeExampleClass()))
console.log(`Type.getName(true) //`, Type.getName(true))

console.log(commentOpen);
console.log(' * Type.get(obj)');
console.log(commentClose);

console.log(`Type.get(async function myAsyncFunction() {}) //`, Type.get(async function myAsyncFunction() {}))
console.log(`Type.get([]) //`, Type.get([]))
console.log(`Type.get(new SomeExampleClass()) //`, Type.get(new SomeExampleClass()))
console.log(`Type.get(SomeExampleClass) //`, Type.get(new SomeExampleClass()))
console.log(`Type.get(true) //`, Type.get(true))

console.log(commentOpen);
console.log(' * Type.isSimpleObject(obj)');
console.log(commentClose);

console.log(`Type.isSimpleObject(null) //`, Type.isSimpleObject(null))
console.log(`Type.isSimpleObject(undefined) //`, Type.isSimpleObject(undefined))
console.log(`Type.isSimpleObject([]) //`, Type.isSimpleObject([]))
console.log(`Type.isSimpleObject(new Map()) //`, Type.isSimpleObject(new Map()))
console.log(`Type.isSimpleObject({ key: 'val' }) //`, Type.isSimpleObject({ key: 'val' }))

console.log(commentOpen);
console.log(' * Type.getMeta(obj)');
console.log(commentClose);

console.log(`Type.getMeta(async function myAsyncFunction() {}) //`, JSON.stringify(Type.getMeta(async function myAsyncFunction() {})))
console.log(`Type.getMeta([]) //`, JSON.stringify(Type.getMeta([])))
console.log(`Type.getMeta(new SomeExampleClass()) //`, JSON.stringify(Type.getMeta(new SomeExampleClass())))
console.log(`Type.getMeta(SomeExampleClass) //`, JSON.stringify(Type.getMeta(new SomeExampleClass())))
console.log(`Type.getMeta(true) //`, JSON.stringify(Type.getMeta(true)))

console.log('Testing: Type.js Complete');

