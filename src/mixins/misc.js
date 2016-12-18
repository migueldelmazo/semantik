const

  _ = require('lodash'),
  mixins = require('../libs/mixins');

mixins.add('getObjType', (value) => _.isArray(value) ? [] : {});
