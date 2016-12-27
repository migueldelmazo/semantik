const

  _ = require('lodash'),
  semantik = require('../index'),

  getParams = (args, params) => {
    let _args = args;
    if (_.isArray(params) || params !== undefined) {
      return _args.concat(params);
    } else {
      return _args;
    }
  },

  run = (callback, ...args) => {
    let cb = callback,
      ctx,
      params;
    if (_.isPlainObject(callback)) {
      cb = callback.cb;
      ctx = callback.ctx;
      params = callback.params;
    }
    if (_.isString(cb)) {
      cb = semantik[cb];
    }
    return _.isFunction(cb) ? cb.apply(ctx, getParams(args, params)) : undefined;
  };

module.exports = run;
