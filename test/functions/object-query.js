const { objectQuery } = require('../../src/functions');
const { object } = require('../data');

var res = [];

res = objectQuery(object, {
    property: 'permalink',
    value: '/r/science/comments/u7urps/donating_blood_regularly_can_reduce_toxic_forever/'
});

console.log('objectQuery results', res);