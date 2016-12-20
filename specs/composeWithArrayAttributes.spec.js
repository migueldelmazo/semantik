/* global test, expect */
const semantik = require('../src/index'),

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

  semantikArray = [
    '[].name',
    '[].price',
    '[].units',
    '[].options[]'
  ],

  result = semantik.compose(sourceObject, semantikArray);

test('semantik: compose with array attributes', () => {
  expect(result['[0].name']).toBe('NodeJS Design Patterns');
  expect(result['[0].price']).toBe(10);
  expect(result['[0].units']).toBe(1);
  expect(result['[1].name']).toBe('T-Shirts NodeJS');
  expect(result['[1].price']).toBe(20);
  expect(result['[1].units']).toBe(2);
  expect(result['[1].options[0]']).toBe('green and black');
  expect(result['[1].options[1]']).toBe('xl');
  expect(result['[1].options[2]']).toBe('polyester');
});
