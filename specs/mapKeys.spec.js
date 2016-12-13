/* global test, expect */
const semantik = require('../src/semantik'),

  sourceObject = {
    user: {
      email: 'info@migueldelmazo.com'
    },
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
        name: 'T-Shirts NodeJS',
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
  };

test('semantik: pick', () => {
  const result = semantik.mapKeys(sourceObject, semantikObject);
  console.log('Expected result', result);
  expect(result.userEmail).toBe('info@migueldelmazo.com');
  expect(result.addressStreet).toBe('Calle Castellana 1');
  expect(result.addressCity).toBe('Madrid');
});
