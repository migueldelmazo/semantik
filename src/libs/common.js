const

  _ = require('lodash'),

  semantik = require('../index'),

  ensureSemantikAttrs = (attrs) => {
    return _.reduce(attrs, (attrsObj, callbacks, key) => {
      attrsObj[key] = _.reduce(semantik.parseArray(callbacks), (callbacksArr, callback) => {
        callbacksArr.push(callback);
        return callbacksArr;
      }, []);
      return attrsObj;
    }, {});
  };

module.exports = { ensureSemantikAttrs };
