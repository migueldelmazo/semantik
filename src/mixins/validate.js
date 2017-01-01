const

  _ = require('lodash'),
  semantik = require('../index'),
  regex = require('../libs/regex');

semantik.addMixin('isNotEmpty', (value) => !_.isEmpty(value));

semantik.addMixin('isNumberGreatThan', (value, min, equal = false) => {
  return equal === false ? min < value : min <= value;
});

semantik.addMixin('isNumberLessThan', (value, max, equal = false) => {
  return equal === false ? max > value : max >= value;
});

semantik.addMixin('isNumberBetween', (value, min, max, equal) => {
  var _min = Math.min(min, max),
   _max = Math.max(min, max);
  return equal === false ? _min < value && value < _max : _min <= value && value <= _max;
});

semantik.addMixin('isStringNumber', (value) => !isNaN(value + ''));

semantik.addMixin('isArray', _.isArray);

semantik.addMixin('isEmpty', _.isEmpty);

semantik.addMixin('isNumber', _.isNumber);

semantik.addMixin('isString', _.isString);

regex.add('isEmail', /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

semantik.addMixin('isEmail', (value) => regex.list.isEmail.test(value));

regex.add('isNotEmpty', /([^\s])/);

semantik.addMixin('isStringNotEmpty', (value) => regex.list.isNotEmpty.test(value));
