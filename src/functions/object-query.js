const { Type } = require('../statics');

const objectQuery = module.exports = function objectQuery(obj, { results, path, value, property, depth }) {

    results = results || [];
    path  = path  || [];
    depth = depth || 1;
    
    const objMeta = Type.getMeta(obj);
    const array = objMeta.type === Type.Object ? Object.keys(obj) : obj;
    
    for (let index = 0; index < array.length; index++) {

        const key = objMeta.type === Type.Object ? array[index] : index;
        const val = obj[key];
        const type = Type.get(val);
        
        if (type == Type.Array || type == Type.Object) {
            results = objectQuery(val, { results, value, property, path: path.concat(Type.isNumber(key) ? `[${key}]` : `.${key}`), depth: depth + 1 });
        } else {
            if (property == key || value == val) {
                path.push('.' + key);
                results.push({ depth, key, val, path, namespace: path.join(''), context: obj });
            }
        }
    }

    return results;
}
