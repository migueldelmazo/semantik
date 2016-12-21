/* global test, expect */
const semantik = require('../src/index'),

  isBetween5And25 = (value) => {
    value = parseInt(value, 10);
    return value > 5 && value < 25;
  },

  isBetweenWithArray = (value, min, max) => {
    value = parseInt(value, 10);
    return min < value && value < max;
  },

  isBetweenWithObject = (value, limits) => {
    value = parseInt(value, 10);
    return limits.min < value && value < limits.max;
  },

  sourceObject = {
    user: { email: 'info@migueldelmazo.com' },
    products: [
      {
        name: 'Node JS Design Patterns',
        price: '10',
        units: 1
      },
      {
        name: 'T-Shirts Node JS',
        price: '20',
        units: 2
      }
    ]
  },

  semantikObject = {
    'user.email': ['isEmail', 'isNotEmpty', 'isRequired'],
    'products[].name': ['isStringNotEmpty', 'isString'],
    'products[].price': [
      // my custom methods
      isBetween5And25,
      {
        cb: isBetweenWithArray,
        params: [5, 25]
      },
      {
        cb: isBetweenWithObject,
        params: {
          min: 5,
          max: 25
        }
      },
      // semantik methods
      'isStringNumber',
      {
        cb: 'isNumberGreatThan',
        params: [5]
      },
      {
        cb: 'isNumberGreatThan',
        params: [5, false]
      },
      {
        cb: 'isNumberLessThan',
        params: [25]
      },
      {
        cb: 'isNumberLessThan',
        params: [25, false]
      },
      {
        cb: 'isNumberBetween',
        params: [5, 25]
      },
      {
        cb: 'isNumberBetween',
        params: [5, 25, false]
      }
    ],
    'products[].units': 'isNumber'
  },

  result = semantik.validate(sourceObject, semantikObject);

test('semantik: validate', () => {
  expect(result).toBe(true);
});
