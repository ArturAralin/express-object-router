const { testsParser } = require('./tests-parser');
const commonParser = require('./common');
const {
  merge,
} = require('ramda');

const objectParser = (parsers, validation) => {
  const type = validation._type;
  const rules = validation._tests.map(testsParser);
  const keysRules = validation._inner.children && validation._inner.children
    .map(({ key, schema }) => [
      key,
      merge(
        commonParser(schema),
        parsers[schema._type](schema)
      ),
    ]);

  return {
    type,
    rules,
    keysRules,
  };
};

module.exports = objectParser;
