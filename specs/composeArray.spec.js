/* global test, expect */
const semantik = require('../src/semantik'),

  sourceObject = [
    {
      name: 'NodeJS Design Patterns',
      price: 10,
      units: 1
    },
    {
      name: 'T-Shirts NodeJS',
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
  };

test('semantik: compose array', () => {
  const result = semantik.compose(sourceObject, semantikObject);
  // console.log('Expected result', result);
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
