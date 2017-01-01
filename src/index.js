module.exports = {

  addMixin (key, callback) {
    if (this[key]) {
      throw new Error('Semantik error: There is already a mixin with the name "' + key + '"');
    } else {
      this[key] = callback;
    }
  }

};

require('./mixins/misc');
require('./mixins/parse');
require('./mixins/validate');

module.exports.compose = require('./libs/compose');
module.exports.mapKeys = require('./libs/mapKeys');
module.exports.parse = require('./libs/parse');
module.exports.pick = require('./libs/pick');
module.exports.run = require('./libs/run');
module.exports.validate = require('./libs/validate');
