
/**
 * A class to create a enum style object class to hold static values.
 * The constructor will accept an anonymous class, object, array or 
 * multiple strings as enum constants.
 * 
 * @example
 *  const Size1 = new Enum(class {
 *      SM;
 *      MD;
 *      LG;
 *  })
 *  console.log('\n Size1', Size1, '\n')
 * 
 * @example
 *  const Size2 = new Enum(class {
 *      SM = 'SM';
 *      MD = 'MD';
 *      LG = 'LG';
 *  })
 *  console.log('\n Size2', Size2, '\n')
 *  
 * @example
 *  const Size3 = new Enum({
 *      SM : 'SM',
 *      MD : 'MD',
 *      LG : 'LG',
 *  })
 *  console.log('\n Size3', Size3, '\n')
 *  
 * @example
 *  const Size4 = new Enum([
 *      'SM',
 *      'MD',
 *      'LG',
 *  ])
 *  console.log('\n Size4', Size4, '\n')
 * 
 * @example
 *  const Size5 = new Enum(
 *      'SM',
 *      'MD',
 *      'LG',
 *  )
 *  console.log('\n Size5', Size5, '\n')
 * 
 * @class
 */
class Enum {
    constructor() {
        const en = new class {};
        const count = arguments.length;
        const type = (Array.isArray(arguments[0]) && 'array') || typeof arguments[0];
        const config = count > 1 ? Array.from(arguments) : (type == 'function' ? new arguments[0]() : arguments[0]);
        const keys = type != 'array' ? Object.keys(config) : config;
        for (let index = 0; index < keys.length; index++) {
            const constant = keys[index];
            const value = config[constant] || index;
            en[constant] = en[value] = value;
        }
        Object.seal(en);
        return en;
    }    
}

module.exports = Enum;