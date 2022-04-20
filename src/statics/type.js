module.exports = class Type {
    constructor() { throw new Error(`Type is a singleton`); }

    // primitives
    static undefined = 'undefined'
    static symbol = 'symbol'
    static string = 'string'
    static number = 'number'
    static bigint = 'bigint'
    static boolean = 'boolean'
    static function = 'function'
    static object = 'object'

    static Undefined = 'Undefined'
    static Null = 'Null'
    static Object = 'Object'
    static Number = 'Number'
    static Boolean = 'Boolean'
    static String = 'String'
    static Date = 'Date'    
    static Integer = 'Integer'
    static Float = 'Float'
    static BigInt = 'BigInt'
    static Prime = 'Prime'
    static Map = 'Map'
    static Set = 'Set'
    static WeakMap = 'WeakMap'
    static WeakSet = 'WeakSet'
    static Array = 'Array'
    static Int8Array = 'Int8Array'
    static Uint8Array = 'Uint8Array'
    static Uint8ClampedArray = 'Uint8ClampedArray'
    static Int16Array = 'Int16Array'
    static Uint16Array = 'Uint16Array'
    static Int32Array = 'Int32Array'
    static Uint32Array = 'Uint32Array'
    static Float32Array = 'Float32Array'
    static Float64Array = 'Float64Array'
    static BigInt64Array = 'BigInt64Array'
    static BigUint64Array = 'BigUint64Array'
    static Class = 'Class'
    static Function = 'Function'
    static AsyncFunction = 'AsyncFunction'
    static GeneratorFunction = 'GeneratorFunction'
    static Arguments = 'Arguments'
    static Promise = 'Promise'
    static Worker = 'Worker'
    static Error = 'Error'
    static EvalError = 'EvalError'
    static TypeError = 'TypeError'
    static SyntaxError = 'SyntaxError'
    static RangeError = 'RangeError'
    static ReferenceError = 'ReferenceError'
    static BooleanLike = 'BooleanLike'
    
    static Iterable = 'Iterable'
    static SimpleObject = 'Object'
    static AnonymousClass = 'AnonymousClass'

    static get(obj) {

        let string = Object.prototype.toString.call(obj);
        let tag = string.slice(8, -1);

        switch(tag) {
            case Type.Number:
                if (this.isFloat(obj))   tag = Type.Float;
                if (this.isInteger(obj)) tag = Type.Integer;
                break;
            case Type.Function:
                // this handles checking for anonymous classes and named classes 
                let str = String(obj);
                if (String(obj).startsWith('class') || str.startsWith('Function class {')) {
                    tag = Type.Class;
                }
                // when it's a function try and get the function name.
                else {
                    tag = obj?.name || Type.Function;
                }
                break;
            case Type.Object:
                tag = String(obj.constructor).startsWith('class') 
                    // attempt to get class name from an instance if 
                    // it's getting tagged as an object
                    // ? obj?.constructor.name + Type.Class || Type.Class 
                    ? Type.Class
                    : Type.Object;
                break;
        }

        return tag;
    }
    static is(obj, ...types) {
        types = types.map(type => type.toLowerCase());
        return types.includes(this.get(obj).toLowerCase());
    }
    static of(obj) {
        return typeof(obj);
    }
    static instanceOf(obj, className) {
        return this.getName(obj) === className;
    }
    static getName(obj) {
        let name = obj?.name || obj?.constructor.name || 'Anonymous';
        let type = this.get(obj);
        
        switch (type) {
            case Type.Class:
                name = name === 'Function' ? 'AnonymousClass' : name;
                break;
            default:
                break;
        }
        return name;
    }
    static getMeta(obj) {
        return {
            name: this.getName(obj),
            type: this.get(obj),
            primitive: this.of(obj),
            empty: this.isEmpty(obj),
            value: obj
        }
    }

    static isSymbol(obj) {
        return this.is(obj, Type.Symbol);
    }
    static isBoolean(obj) {
        return this.is(obj, Type.Boolean);
    }
    static isDate(obj) {
        return this.is(obj, Type.Date);
    }
    static isNumber(obj) {
        return this.is(obj, Type.Number, Type.Integer, Type.Float, Type.BigInt);
    }
    static isInteger(obj) {
        try {
            return Number(obj) === obj && obj % 1 === 0;
        } catch (e) {
            return false;
        }
    }
    static isFloat(obj) {
        try {
            return Number(obj) === obj && obj % 1 !== 0;
        } catch (e) {
            return false;
        }
    }
    static isBigInt(obj) {
        return this.is(obj, Type.BigInt);
    }
    static isPrime(obj) {
        for (let i = 2n; i * i <= obj; i++) {
            if (obj % i === 0n) return false;
        }
        return true
    }
    static isClass(obj) {
        return this.is(obj, Type.Class);
    }
    static isFunction(obj) {
        return this.is(obj, Type.Function);
    }
    static isAsyncFunction(obj) {
        return this.is(obj, Type.AsyncFunction);
    }
    static isGeneratorFunction(obj) {
        return this.is(obj, Type.GeneratorFunction);
    }
    static isArguments(obj) {
        return this.is(obj, Type.Arguments);
    }
    static isPromise(obj) {
        return this.is(obj, Type.Promise);
    }
    static isWorker(obj) {
        return this.is(obj, Type.Worker);
    }
    static isString(obj) {
        return this.is(obj, Type.String);
    }
    static isUndefined(obj) {
        return this.is(obj, Type.Undefined);
    }
    static isNull(obj) {
        return this.is(obj, Type.Null);
    }
    static isObject(obj) {
        return this.is(obj, Type.Object);
    }
    static isMap(obj) {
        return this.is(obj, Type.Map);
    }
    static isSet(obj) {
        return this.is(obj, Type.Set);
    }
    static isArray(obj) {
        return this.is(obj, Type.Array);
    }
    static isInt8Array(obj) {
        return this.is(obj, Type.Int8Array);
    }
    static isUint8Array(obj) {
        return this.is(obj, Type.Uint8Array);
    }
    static isUint8ClampedArray(obj) {
        return this.is(obj, Type.Uint8ClampedArray);
    }
    static isInt16Array(obj) {
        return this.is(obj, Type.Int16Array);
    }
    static isUint16Array(obj) {
        return this.is(obj, Type.Uint16Array);
    }
    static isInt32Array(obj) {
        return this.is(obj, Type.Int32Array);
    }
    static isUint32Array(obj) {
        return this.is(obj, Type.Uint32Array);
    }
    static isFloat32Array(obj) {
        return this.is(obj, Type.Float32Array);
    }
    static isFloat64Array(obj) {
        return this.is(obj, Type.Float64Array);
    }
    static isBigInt64Array(obj) {
        return this.is(obj, Type.BigInt64Array);
    }
    static isBigUint64Array(obj) {
        return this.is(obj, Type.BigUint64Array);
    }
    static isError(obj) {
        return this.is(obj, Type.Error);
    }

    static isEmpty(obj) {
        if (this.isNull(obj) || this.isUndefined(obj)) {
            return true;
        }
        else if (obj?.length) {
            return obj.length === 0;
        }
        else if (obj?.size) {
            return obj.size === 0;
        } 
        else if (this.isObject(obj)) {
            return Object.entries(obj).length === 0;
        }
        return false;
    }
    static isSimpleObject(obj) {
        return (
            this.isObject(obj)
            && !this.isArray(obj)
            && !this.isMap(obj)
            && !this.isSet(obj)
            && !this.isNull(obj)
        );
    }
    static isIterable(obj) {
        return Symbol.iterator in Object(obj);
    }
    static isBooleanLike(obj) {
        return obj == true || obj == false;
    }
}