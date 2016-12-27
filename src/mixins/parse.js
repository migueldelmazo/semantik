const

  _ = require('lodash'),
  semantik = require('../index');

semantik.addMixin('parseArray', (value) => {
  return _.isArray(value) ? value : [value];
});

semantik.addMixin('parseCamelCase', _.camelCase);

semantik.addMixin('parseString', (value) => value + '');
