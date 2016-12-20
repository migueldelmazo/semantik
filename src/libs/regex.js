const

  add = (key, regex) => {
    list[key] = regex;
  },

  list = {};

module.exports = { add, list };
