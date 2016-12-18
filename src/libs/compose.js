const

  _ = require('lodash'),

  compose = (obj, attrs) => {
    // return the composed attributes with their values
    return _.reduce(composeAttrs(attrs), (memo, value, attr) => {
      composeAttr(memo, obj, attr, value);
      return memo;
    }, {});
  },

  composeAttrs = (attrs) => {
    if (_.isArray(attrs)) {
      attrs = _.reduce(attrs, (memo, attr) => {
        memo[attr] = _.identity;
        return memo;
      }, {});
    }
    return _.isPlainObject(attrs) ? attrs : {};
  },

  composeAttr = (composedAttrs, obj, attr, value) => {
    // compose next array attributes
    const arrayKey = composeGetArrayKey(attr);
    if (arrayKey !== null) {
      composeSubAttr(composedAttrs, obj, attr, value, arrayKey);
    } else {
      composeAddNewAttr(composedAttrs, obj, attr, value);
    }
  },

  composeSubAttr = (composedAttrs, obj, attr, value, arrayKey) => {
    const arrayLength = composeGetArrayKeyLength(obj, arrayKey);
    let newAttr,
      i;
    for (i = 0; i < arrayLength; i += 1) {
      // compose attr with array index
      newAttr = attr.replace('[]', '[' + i + ']');
      // add new attr to composed attrs
      composeAddNewAttr(composedAttrs, obj, newAttr, value);
      // recursive call
      composeAttr(composedAttrs, obj, newAttr, value);
    }
  },

  composeAddNewAttr = (composedAttrs, obj, attr, value) => {
    //check if is valid and exists attr
    if (attr.indexOf('[]') < 0 && _.has(obj, attr)) {
      composedAttrs[attr] = _.isFunction(value) ? value(_.get(obj, attr), attr, obj) : value;
    }
  },

  composeGetArrayKey = (attr) => {
    //get first valid array
    const index = attr.indexOf('[]');
    return index >= 0 ? attr.substr(0, index) : null;
  },

  composeGetArrayKeyLength = (obj, subAttr) => {
    const array = subAttr === '' ? obj : _.get(obj, subAttr);
    return _.isArray(array) ? array.length : 0;
  };

module.exports = compose;
