/* global test, expect */
const semantik = require('../src/index'),

  sourceObject = {
    user: { email: 'info@migueldelmazo.com' },
    address: {
      street: 'Calle Castellana 1',
      city: 'Madrid'
    },
    products: [
      {
        name: 'Node JS Design Patterns',
        price: '10',
        units: 1
      },
      {
        name: 'T-Shirts Node JS',
        price: '20',
        units: 2,
        options: [
          'green and black',
          'xl',
          'polyester'
        ]
      }
    ]
  },

  semantikObject = [
    'user.email',
    'address.city',
    'products[].name',
    'products[].price',
    'products[].options'
  ],

  result = semantik.pick(sourceObject, semantikObject);

test('semantik: pick', () => {
  expect(result.user.email).toBe('info@migueldelmazo.com');
  expect(result.address.city).toBe('Madrid');
  expect(result.products[0].name).toBe('Node JS Design Patterns');
  expect(result.products[0].price).toBe('10');
  expect(result.products[1].name).toBe('T-Shirts Node JS');
  expect(result.products[1].price).toBe('20');
  expect(result.products[1].options[0]).toBe('green and black');
  expect(result.products[1].options[1]).toBe('xl');
  expect(result.products[1].options[2]).toBe('polyester');
});