const

  compose = require('./libs/compose'),
  mapKeys = require('./libs/mapKeys'),
  mixins = require('./libs/mixins'),
  parse = require('./libs/parse'),
  pick = require('./libs/pick'),
  validate = require('./libs/validate');

require('./mixins/misc');
require('./mixins/parse');
require('./mixins/validate');

module.exports = {

  addMixin: mixins.add,
  compose,
  parse,
  pick,
  mapKeys,
  validate

};
