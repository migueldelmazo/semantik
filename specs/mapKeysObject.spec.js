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

  semantikObject = {
    'user.email': 'userEmail',
    'address.street': 'addressStreet',
    'address.city': 'addressCity',
    'products[].name': 'products[].productName',
    'products[].price': 'data.products[].price',
    'products[].options': 'data.products[].options'
  },

  result = semantik.mapKeys(sourceObject, semantikObject);

test('semantik: mapKeys object', () => {
  expect(result.userEmail).toBe('info@migueldelmazo.com');
  expect(result.addressStreet).toBe('Calle Castellana 1');
  expect(result.addressCity).toBe('Madrid');
  expect(result.products[0].productName).toBe('Node JS Design Patterns');
  expect(result.data.products[0].price).toBe('10');
  expect(result.products[1].productName).toBe('T-Shirts Node JS');
  expect(result.data.products[1].price).toBe('20');
  expect(result.data.products[1].options[0]).toBe('green and black');
  expect(result.data.products[1].options[1]).toBe('xl');
  expect(result.data.products[1].options[2]).toBe('polyester');
});
