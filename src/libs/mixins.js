const

  _ = require('lodash'),

  add = (key, callback) => list[key] = callback,

  exists = (key) => key in list,

  list = {};

module.exports = { add, exists, list };
