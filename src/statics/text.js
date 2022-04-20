module.exports = class Text {

    static SPACE = ' '

    static toWords(string) {
        const regex = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;
        return string.replace(/\'/igm, '').match(regex);
    }

    static toTitle(string) {
        return this.toWords(string).join(this.SPACE).replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
    
    static toUpper(string) {
        return String(string).toUpperCase();
    }

    static toLower(string) {
        return String(string).toLowerCase();
    }

    static toCamel(string) {
        return this.toWords(string).join(this.SPACE).replace(/(?:^\w|[A-Z]|\b\w)/g, (char, index) => index === 0 ? char.toLowerCase() : char.toUpperCase()).replace(/\s+/g, '');
    }

    static toKebab(string) {
        return this.toWords(string).join(this.SPACE).replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase();
    }

    static toSnake(string) {
        return this.toWords(string).join(' ').replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s-]+/g, '_').toLowerCase();
    }
}