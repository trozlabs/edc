
class Color {
    
    static RESET      = '\x1b[0m';
    static BRIGHT     = '\x1b[1m';
    static DIM        = '\x1b[2m';
    static UNDERSCORE = '\x1b[4m';
    static BLINK      = '\x1b[5m';
    static REVERSE    = '\x1b[7m';
    static HIDDEN     = '\x1b[8m';
    
    static fg = {
        BLACK    : '\x1b[30m',
        RED      : '\x1b[31m',
        GREEN    : '\x1b[32m',
        YELLOW   : '\x1b[33m',
        BLUE     : '\x1b[34m',
        MAGENTA  : '\x1b[35m',
        CYAN     : '\x1b[36m',
        WHITE    : '\x1b[37m',
    };
    
    static bg = {
        BLACK    : '\x1b[40m',
        RED      : '\x1b[41m',
        GREEN    : '\x1b[42m',
        YELLOW   : '\x1b[43m',
        BLUE     : '\x1b[44m',
        MAGENTA  : '\x1b[45m',
        CYAN     : '\x1b[46m',
        WHITE    : '\x1b[47m',
    };
}

module.exports = Color;