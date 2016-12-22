/* global test, expect */
const semantik = require('../src/index'),

  sourceObject = [
    {
      name: 'Node JS Design Patterns',
      price: 10,
      units: 1
    },
    {
      name: 'T-Shirts Node JS',
      price: 20,
      units: 2,
      options: [
        'green and black',
        'xl',
        'polyester'
      ]
    }
  ],

  semantikObject = {
    '[].name': 'product name',
    '[].price': 'product price',
    '[].units': 'product units',
    '[].options[]': 'an option'
  },

  result = semantik.compose(sourceObject, semantikObject);

test('semantik: compose array', () => {
  expect(result['[0].name']).toBe('product name');
  expect(result['[0].price']).toBe('product price');
  expect(result['[0].units']).toBe('product units');
  expect(result['[1].name']).toBe('product name');
  expect(result['[1].price']).toBe('product price');
  expect(result['[1].units']).toBe('product units');
  expect(result['[1].options[0]']).toBe('an option');
  expect(result['[1].options[1]']).toBe('an option');
  expect(result['[1].options[2]']).toBe('an option');
});
