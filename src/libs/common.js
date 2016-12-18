const

  _ = require('lodash'),

  mixins = require('./mixins'),

  ensureAttrs = (attrs) => {
    // todo: comprobar nombre de esta funcion
    return _.reduce(attrs, (attrsObj, callbacks, key) => {
      attrsObj[key] = _.reduce(mixins.list.parseArray(callbacks), (callbacksArr, callback) => {
        if (_.isString(callback) && _.isFunction(mixins.list[callback])) {
          // check if is a function of this library
          callbacksArr.push({
            cb: mixins.list[callback]
          });
        } else if (_.isPlainObject(callback)) {
          // check if is a plain object
          callbacksArr.push({
            cb: getCallback(callback.cb),
            params: callback.params,
            ctx: callback.ctx
          });
        } else if (_.isFunction(callback)) {
          // check if is a function
          callbacksArr.push({
            cb: callback
          });
        }
        return callbacksArr;
      }, []);
      return attrsObj;
    }, {});
  },

  getCallback = (callback) => {
    return _.isString(callback) && _.isFunction(mixins.list[callback])
      ? mixins.list[callback]
      : callback;
  },

  runCallback = (callback, value) => {
    const params = getParams(value, callback.params);
    return callback.cb.apply(callback.ctx, params);
  },

  getParams = (value, params) => {
    if (_.isArray(params)) {
      return [value].concat(params);
    } else if (params !== undefined) {
      return [value, params];
    } else {
      return [value];
    }
  };

module.exports = {

  ensureAttrs,
  runCallback

};
