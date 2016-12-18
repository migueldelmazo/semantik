/* global test, expect */
const semantik = require('../src/index'),

  inc = (value) => value + 1,

  reverseWords = (words) => words.
    split(' ').
    reverse().
    join(' '),

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
    'products[].name': [reverseWords, 'parseCamelCase'],
    'products[].price': [parseFloat, inc, inc, inc],
    'products[].units': [parseInt, 'parseString']
  },

  result = semantik.parse(sourceObject, semantikObject);

test('semantik: parse', () => {
  expect(result.products[0].name).toBe('patternsDesignJsNode');
  expect(result.products[0].price).toBe(13);
  expect(result.products[0].units).toBe('1');
  expect(result.products[1].name).toBe('nodeJsTShirts');
  expect(result.products[1].price).toBe(23);
  expect(result.products[1].units).toBe('2');
});
