const Text = require('../../src/statics/text');

var original = 'Text to Transform';

before = original;
after = Text.toCamel(before);
console.log('\t', before, '\t= toCamel =>\t', after);

before = after;
after = Text.toSnake(before);
console.log('\t', before, '\t= toSnake =>\t', after);

before = after;
after = Text.toKebab(before)
console.log('\t', before, '\t= toKebab =>\t', after);

before = after;
after = Text.toUpper(before)
console.log('\t', before, '\t= toUpper =>\t', after);

before = after;
after = Text.toLower(before)
console.log('\t', before, '\t= toLower =>\t', after);

before = after;
after = Text.toTitle(before)
console.log('\t', before, '\t= toTitle =>\t', after);

before = original;
after = Text.toCamel(before);
console.log('\t', before, '\t= toCamel =>\t', after);

before = after;
after = Text.toWords(before);
console.log('\t', before, '\t= toWords =>\t', after);