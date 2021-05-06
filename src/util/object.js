const { Type } = require('../classes');

const query = exports.query = function query(obj, { results, path, value, property, depth }) {
    results = results || [];
    path  = path  || [];
    depth = depth || 1;
    
    const objInfo = Type.get(obj);
    const array = objInfo.alias === Type.OBJECT ? Object.keys(obj) : obj;
    // const indent = new Array(depth * 1).fill('.___').join('');

    for (let index = 0; index < array.length; index++) {
        const key = objInfo.alias === Type.OBJECT ? array[index] : index;
        const val = obj[key];
        const type = Type.get(val).alias;
            
        if (type == Type.ARRAY || type == Type.OBJECT) {
            results = query(val, {
                results,
                value,
                property,
                path: path.concat(Type.isNumber(key) ? `[${key}]` : `.${key}`),
                depth: depth + 1 
            });
        } else {
            if (property == key) {
                path.push('.' + key);
                results.push({
                    depth,
                    key,
                    val,
                    path,
                    namespace: path.join('')
                });
            }
        }
    }

    return results;
}
