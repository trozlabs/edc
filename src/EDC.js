const { edcConfig } = require(process.cwd() + '/package.json');

const util = require('./util');

const classes = require('./classes');
const { Enum, Type, Log } = classes;

/**
 * @class EDC
 */
module.exports = class EDC {
    static env      = process.NODE_ENV;
    
    static util     = util;

    static Type     = Type;
    static Log      = Log;
    
    static #config  = Object.assign({
        DEBUG         : true,
        DEFAULT_PAGE  : 1,
        DEFAULT_LIMIT : 25,
        PAGING_PARAMS : [ 'sort', 'dir', 'limit', 'page' ],
        FORBIDDEN     : [ 'not-even-in-code' ],
        REDACTED      : [ 'password' ],
        LASTFOUR      : [ 'ssn', 'cc', ],
        EMPTY         : '',
        SPACE         : ' ',
        BREAK         : '\n',
        RETURN        : '\r',
        EOL           : '\n',
        TAB           : '    ',
    }, edcConfig);
    
    static config(name, value) {
        var result = undefined;
        var argsLength = arguments.length;
        // get all values
        if (argsLength === 0) {
            result = this.#config;
        }
        // set multiple values
        if (argsLength === 1 && EDC.Type.isObject(name)) {
            this.#config = Object.assign(this.#config, name);
        } else {
            result = this.#config[name];
        }
        // set config value
        if (argsLength === 2) {
            this.#config[name] = value;
        }
        return result;
    }

    static log(obj) {
        console.log(obj);
        return obj;
    }

    static debug(obj) {
        if (EDC.config('DEBUG')) {
            console.log(require('util').inspect(obj, true, null, true));
        }
        return obj;
    }

    static error(err) {
        const { message } = err;
        console.log('ERROR:', message || err);
        return err;
    }

    static val(val) {
        EDC.debug(val);
        return val;
    }

    static result(a, b) {
        EDC.debug(a)
        EDC.debug(b)
        return a === b;
    }

    static test(fnIn, fn, expectedResult) {
        
        var fnRes = EDC.Type.isArray(fnIn) ? fn(...fnIn) : fn(fnIn);

        if (EDC.Type.isObject(fnRes) && EDC.Type.isObject(expectedResult)) {
            fnRes = JSON.stringify(fnRes);
            expectedResult = JSON.stringify(expectedResult);
        }
        var pass = (fnRes === expectedResult);
        
        EDC.log(
            `[${pass?'√':'x'}]- ${fn.name}(${fnIn})\n` +
            ` |__ ${fnRes}\n` +
            ` |__ ${expectedResult}\n` +
            ` |__ ${(pass ? 'PASSED':'FAILED')}\n`
        );
        if (!pass) console.error('FAILED:', fnRes, expectedResult);
        return (fnRes === expectedResult);
    }

    /*****************************************************
     * Types:
     *****************************************************/

    static getType(obj) {
        return EDC.Type.get(obj).alias;
    }

    static isEmpty(obj) {
        const { alias, length } = EDC.Type.get(obj);
        
        switch (alias) {
            case Type.NULL:
            case Type.UNDEFINED:
                return true;
            case Type.NUMBER:
                return (!Type.isNumber(obj));
            case Type.STRING:
            case Type.ARRAY:
            case Type.BUFFER:
                return (length === 0);
            case Type.OBJECT:
                return JSON.stringify(obj) === JSON.stringify({});
            default:
                return false;
        }
    }

    static ifEmpty(obj, defaults) {
        if (EDC.isEmpty(obj)) return defaults;
        return obj;
    }

    /*****************************************************
     * Validation:
     *****************************************************/

    /**
     * String is case insenstive match.
     */
    static isSame(a = '', b = '') {
        return a.toLowerCase() === b.toLowerCase();
    }

    /**
     * If a value is not provided the method throws an error. 
     */
    static required(obj, error) {
        if (EDC.isEmpty(obj)) throw new Error(error || 'Value Required');
        return obj;
    }

    /**
     * Passed in value must be one of the options specified. 
     */
    static check(obj, options = []) {
        if (!options.includes(obj)) throw new Error(`value must be one of ${options.join()} but received ${obj}`);
        return obj;
    }

    /**
     * Returns true if A contains the contents of B. Optionally case sensitive.
     */
    static contains(a, b, caseSensitive) {
        a = (caseSensitive) ? a : a.toLowerCase();
        b = (caseSensitive) ? b : b.toLowerCase();
        return a.includes(b);
    }

    /**
     * Short hand for Object.assign
     */
    static merge(defaults, ...objects) {
        return Object.assign({}, defaults, ...objects);
    }

    /**
     * Paging, Sorting and Query parameter cleanup to match a provided object or array.
     * @param {Object} params any of key:val object to be checked against a Model class.
     * @param {Object/Array} model a model class to be used to verify sort columns or params.
     * @returns {Object} 
     */
    static parameters(params, model, caseSensitive) {
        var fieldList = (EDC.Type.isArray(model) ? model : Object.keys(model));
        var allowed = fieldList.concat(EDC.config('PAGING_PARAMS')).join(' ');

        console.log('model:', fieldList);
        console.log('allowed:', allowed);

        params.sort  = model.hasOwnProperty(params.sort) ? params.sort : undefined;
        params.dir   = params.sort ? ((params.dir.toUpperCase() === 'ASC' || params.dir.toUpperCase() === 'DESC') ? params.dir : 'ASC') : undefined;
        params.page  = params.page && parseInt(params.page)   || EDC.config('DEFAULT_PAGE');
        params.limit = params.limit && parseInt(params.limit) || EDC.config('DEFAULT_LIMIT');

        for (let param in params) {
            if (EDC.Type.isUndefined(params[param])) {
                delete params[param];
            } else if (EDC.contains(allowed, param, caseSensitive)) {
                continue;
            } else {
                delete params[param];
                console.warn(`Removing '${param}' from parameters as it does not match list of allowed field names. (Parameter names ${caseSensitive ? 'ARE' : 'are NOT'} case sensitive)`);
            }
        }

        return params;
    }

    /**
     * Removes any properties from an object with matching property names.
     * @param {Object} object the object to remove matching fields
     * @param {Array} redacted the property names to remove from an object.
     * @return {Object}
     */
    static redact(object, redacted = ['password']) {
        redacted.forEach((field) => {
            delete object[field];
        });
        return object;
    }

    /**
     * Remove extra whitespace including line breaks and tabs.
     * @param {String} text
     * @return {String}
     */
    static strip(string) {
        var words = string.match(/(\w+)/gmi);
        return words.join(' ');
    }

    static json(obj, format) {
        return JSON.stringify(obj, null, format? 4 : null);
    }

    /*****************************************************
     * Format:
     *****************************************************/


    static toWords(string) {
        var regex = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;
        return string.replace(/\'/igm, '').match(regex);
    }

    static toTitle(string) {
        return EDC.toWords(string).join(EDC.config('SPACE')).replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
    
    static upper(string) {
        return EDC.toUpper(string);
    }
    
    static toUpper(string) {
        return String(string).toUpperCase();
    }

    static toLower(string) {
        return String(string).toLowerCase();
    }

    static toCamel(string) {
        return EDC.toWords(string).join(EDC.config('SPACE')).replace(/(?:^\w|[A-Z]|\b\w)/g, (char, index) => index === 0 ? char.toLowerCase() : char.toUpperCase()).replace(/\s+/g, '');
    }

    static toKebab(string) {
        return EDC.toWords(string).join(EDC.config('SPACE')).replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase();
    }

    static toSnake(string) {
        return EDC.toWords(string).join(' ').replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s-]+/g, '_').toLowerCase();
    }

    /*****************************************************
     * Generate:
     *****************************************************/

    static token() {
        if (!require) throw Error('This method doesn\'t work in the browser');
        return require('crypto').randomBytes(16).toString('hex');
    }

    static uuid(placeholder) {
        return placeholder ? (0|Math.random()*16).toString(16) : ( ""+1e7+-1e3+-4e3+-8e3+-1e11).replace(/1|0/g, EDC.uuid);
    }    

     /*****************************************************
     * Calculations:
     *****************************************************/

    static mean(...values) {
        var count = values.length;
        var total = 0;
        values.forEach(value => total += value);
        return total / count;
    }

    static distance(x1, x2, y1, y2) {
        return Math.sqrt(Math.exp((y1 - y2), 2) + Math.exp((y1 - y2), 2))
    }
}