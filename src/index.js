module.exports = class EDC {
    constructor() { throw new Error('EDC is a singleton') }

    static Type = require('./statics/type')
    static Text = require('./statics/text')
    
    static functions = require('./functions')
}