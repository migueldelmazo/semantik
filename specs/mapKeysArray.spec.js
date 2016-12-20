/* global test, expect */
const semantik = require('../src/index'),

  sourceObject = [
    {
      name: 'Node JS Design Patterns',
      price: '10',
      units: 1
    },
    {
      name: 'T-Shirts NodeJS',
      price: '20',
      units: 2,
      options: [
        'green and black',
        'xl',
        'polyester'
      ]
    }
  ],

  semantikObject = {
    '[].name': '[].productName',
    '[].price': '[].price',
    '[].options': '[].options'
  },

  result = semantik.mapKeys(sourceObject, semantikObject);

test('semantik: pick', () => {
  expect(result[0].productName).toBe('Node JS Design Patterns');
  expect(result[0].price).toBe('10');
  expect(result[1].productName).toBe('T-Shirts NodeJS');
  expect(result[1].price).toBe('20');
  expect(result[1].options[0]).toBe('green and black');
  expect(result[1].options[1]).toBe('xl');
  expect(result[1].options[2]).toBe('polyester');
});
