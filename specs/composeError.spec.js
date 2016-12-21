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
  ];

test('semantik: compose with bad attributes', () => {
  expect(semantik.compose(sourceObject, 'error')).toEqual({});
  expect(semantik.compose(sourceObject, true)).toEqual({});
  expect(semantik.compose(sourceObject, false)).toEqual({});
  expect(semantik.compose(sourceObject, 12345)).toEqual({});
});
