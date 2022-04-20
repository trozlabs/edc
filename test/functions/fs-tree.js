const { fsTree } = require('../../src/functions');

fsTree('.', {
    ignore: ['node_modules'],
    toArray: true,
    maxDepth: 3
}).then(array => {
   console.log(array);
});