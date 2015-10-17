'use strict';

var semantik = require('../src/semantik'),

  isBetween5And25 = function (value) {
    value = parseInt(value, 10);
    return 5 < value && value < 25;
  },

  isBetweenWithArray = function (value, min, max) {
    value = parseInt(value, 10);
    return min < value && value < max;
  },

  isBetweenWithObject = function (value, limits) {
    value = parseInt(value, 10);
    return limits.min < value && value < limits.max;
  },

  sourceObject = {
    products: [
      {
        name: 'Node JS Design Patterns',
        price: '10',
        units: 1
      },
      {
        name: 'T-Shirts NodeJS',
        price: '20',
        units: 2
      }
    ]
  },

  semantikObject = {
    'products[].name': ['isStringNotEmpty', 'isString'],
    'products[].price': [
      'isStringNumber',
      isBetween5And25,
      { cb: isBetweenWithArray, params: [ 5, 25 ] },
      { cb: isBetweenWithObject, params: { min: 5, max: 25 } }
    ],
    'products[].units': 'isNumber'
  };

console.log(
  'is valid?',
  semantik.validate(sourceObject, semantikObject)
);

// true
