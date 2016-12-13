/* global test, expect */
const semantik = require('../src/semantik'),

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
      }
    ],
    'products[].units': 'isNumber'
  };

test('semantik: validate', () => {
  const result = semantik.validate(sourceObject, semantikObject);
  // console.log('Expected result:', result);
  expect(result).toBe(true);
});
