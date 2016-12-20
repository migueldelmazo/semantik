const

  _ = require('lodash'),
  mixins = require('../libs/mixins');

mixins.add('parseArray', (value) => {
  return _.isArray(value) ? value : [value];
});

mixins.add('parseCamelCase', _.camelCase);

mixins.add('parseString', (value) => value + '');
