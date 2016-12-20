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
  ];

test('semantik: compose with bad attributes', () => {
  expect(semantik.compose(sourceObject, 'error')).toEqual({});
});
