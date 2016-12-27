const

  _ = require('lodash'),
  semantik = require('../index');

semantik.addMixin('getObjType', (value) => {
  return _.isArray(value) ? [] : {};
});
