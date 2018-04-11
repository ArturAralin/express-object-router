const {
  getMin,
  getMax,
} = require('../tools');

const allowedValuePart = (type, allowedValues) => {
  if (!allowedValues) {
    return '';
  }

  const items = allowedValues
    .map(value =>
      (type === 'string'
        ? `"${value}"`
        : value))
    .join(',');

  return `=${items}`;
};

const sizes = (type, rules) => {
  const min = getMin(rules);
  const max = getMax(rules);
  const rulesIsNotExists = !min && !max;

  if (rulesIsNotExists) {
    return '';
  }

  return [
    '{',
    min || (type === 'number' ? '-Infinite' : '0'),
    type === 'string' ? '..' : '-',
    max || 'Infinite',
    '}',
  ].join('');
};

module.exports = ({
  type,
  allowedValues,
  rules,
}) => `{${type}${sizes(type, rules)}${allowedValuePart(type, allowedValues)}}`;
