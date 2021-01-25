
const Type = require('./Type');
const Color = require('./Color');

class Log {
    static ENV = process.env.NODE_ENV;
    static DEBUG = Log.ENV === 'production' ? false : true;
    static Color = Color;

    static method(name, args, scope) {
        if (!Log.DEBUG) return;
        const message = `\n${Color.BRIGHT}@method${Color.RESET} ${name}`;
        console.group(message);
        if (args) Log.params(args);
        console.groupEnd(message);
        console.log('\n');
    }

    static params(args) {
        if (!Log.DEBUG) return;
        Array.from(args).forEach(Log.param);
    }

    static param(arg, name='') {
        if (!Log.DEBUG) return;
        const meta = Type.get(arg);
        console.log(
            `${Color.BRIGHT}@param${Color.RESET} ` +
            `${Color.fg.YELLOW}{${meta.type}}${Color.RESET} ` +
            `${Color.fg.CYAN}${name}${Color.RESET} ` +
            `${meta.primitive == 'function' ? 'fn' : meta.value}`
        );
    }

    static banner(message, border = '-') {
        var line = new Array(arguments[0].length + 2).fill(border).join('');
        console.log('\n' + line + '\n ' + message + ' \n' + line + '\n');
    }

    static value(obj, name = 'value') {
        if (!Log.DEBUG) return obj;
        Log.param(obj, name);
        return obj;
    }
}

module.exports = Log;
