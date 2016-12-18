const

  _ = require('lodash'),
  common = require('./common'),
  compose = require('./compose'),
  mixins = require('./mixins'),

  pick = function (obj, attrsKeys) {
    var attrs = pickGetAttrs(attrsKeys),
      composedObj = compose(obj, attrs);
    return pickGetResult(obj, composedObj);
  },

  pickGetAttrs = function (attrsKeys) {
    return _.transform(attrsKeys, function (memo, attrsKey) {
      memo[attrsKey] = '';
    }, {});
  },

  pickGetResult = function (obj, composedObj) {
    return _.transform(composedObj, function (memo, value, key) {
      _.set(memo, key, _.get(obj, key));
    }, mixins.list.getObjType(obj));
  };

module.exports = pick;
