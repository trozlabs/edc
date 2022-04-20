/*
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
*/
const objectRemap = module.exports = function objectRemap(data, definition) {
    const result = {};
    
    for (const [ definitionField, dataField ] of Object.entries(definition)) {
        
        let value = undefined;
        let dataConfigType = Array.isArray(dataField) ? 'array' : typeof(dataField);
        
        // handle fieldName: [ 'array', 'of', 'field', 'names' ]
        if (dataConfigType === 'array') {
            
            value = dataField.map(field => {
                return (
                    // use the value of the field 
                    (new RegExp('(-|_)', 'gi').test(field) && field) 
                    // OR when - or _ treat as delimeter 
                    || data[field]
                    // OR just return the field name
                    || field
                );
            }).join('');
        } else {
            value = data[dataField];
        }

        if (value === undefined) continue;

        result[definitionField] = value;
    }

    return result;
}
