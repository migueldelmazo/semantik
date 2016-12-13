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
    'user.email': 'user email',
    'address.street': 'delivery street',
    'address.city': 'delivery city',
    'products[].name': 'product name',
    'products[].price': 'product price',
    'products[].units': 'product units',
    'products[].options[]': 'an option'
  };

test('semantik: compose object', () => {
  const result = semantik.compose(sourceObject, semantikObject);
  // console.log('Expected result', result);
  expect(result['user.email']).toBe('user email');
  expect(result['address.street']).toBe('delivery street');
  expect(result['address.city']).toBe('delivery city');
  expect(result['products[0].name']).toBe('product name');
  expect(result['products[0].price']).toBe('product price');
  expect(result['products[0].units']).toBe('product units');
  expect(result['products[1].name']).toBe('product name');
  expect(result['products[1].price']).toBe('product price');
  expect(result['products[1].units']).toBe('product units');
  expect(result['products[1].options[0]']).toBe('an option');
  expect(result['products[1].options[1]']).toBe('an option');
  expect(result['products[1].options[2]']).toBe('an option');
});
