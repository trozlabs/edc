const { objectRemap } = require('../../src/functions');

// You have your your source object...
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

console.log(newObject);