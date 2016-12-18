const

  _ = require('lodash'),

  add = (key, regex) => list[key] = regex,

  exists = (key) => key in list,

  get = (key) => list[key],

  list = {};

module.exports = { add, exists, get, list };
