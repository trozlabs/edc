(function () {

    var call = Function.prototype.call;

    Function.prototype.call = function () {

        if (Log.enabled) {

            var args = Array.from(arguments).map((arg, index) => ({
                index,
                value: (arg ? arg.toString() : 'n/a'),
                type: arg ? arg.constructor.name : 'undefined'
            }));

            Log.trace({
                type: 'INFO',
                timestamp: Date.now(),
                method: this.name,
                params: args,
                params_total: args.length,
                params_expected: this.length,
                source: this.toString()
            });
        }

        return call.apply(this, arguments);
    };
}());

class Log {
    static stack = [];
    static enabled = true;

    static info(info) {
        console.log('INFO', arguments);
    }
    static warn(warn) {
        console.log('WARN', arguments);
    }
    static error(error) {
        console.log('ERROR', arguments);
    }
    static trace(obj) {
        Log.stack.push(obj);
    }
    static print() {
        console.log(Log.stack);
    }
    static toJSON() {
        JSON.stringify(Log.stack);
    }

    static method(scope, args) {
    
        var css = 'color: gray;';
        var classpath = this.getClassPath(scope, args);
    
        if (args && args.length) {
            try {
                console.groupCollapsed(`%c${classpath}`, css);
                this.params(args);
                console.log(`%c@scope %c{${this.getType(scope)}}%c this`, 'color: lightgray;', 'color: cyan;', 'color: lightgray;', scope);
                console.groupEnd(`%c${classpath}`, css);
            } catch(e) {
                console.warn(arguments.callee.name, e.message);
            }
        } else {
            console.log(`%c${classpath}`, css);
        }
    }
}

module.exports = Log;