const

  _ = require('lodash'),
  mixins = require('../libs/mixins'),
  regex = require('../libs/regex');

mixins.add('isNotEmpty', (value) => !_.isEmpty(value));

mixins.add('isNumberGreatThan', (value, min, equal) => {
  return equal === false ? min < value : min <= value;
});

mixins.add('isNumberLessThan', (value, max, equal) => {
  return equal === false ? max > value : max >= value;
});

mixins.add('isNumberBetween', (value, min, max, equal) => {
  var _min = Math.min(min, max),
   _max = Math.max(min, max);
  return equal === false ? _min < value && value < _max : _min <= value && value <= _max;
});

mixins.add('isStringNumber', (value) => !isNaN(value + ''));

mixins.add('isArray', _.isArray);

mixins.add('isEmpty', _.isEmpty);

mixins.add('isNumber', _.isNumber);

mixins.add('isString', _.isString);

regex.add('isEmail', /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

mixins.add('isEmail', (value) => regex.list.isEmail.test(value));

regex.add('isNotEmpty', /([^\s])/);

mixins.add('isStringNotEmpty', (value) => regex.list.isNotEmpty.test(value));
