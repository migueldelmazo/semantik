'use strict';

var semantik = require('../src/semantik'),

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

console.log(
  semantik.compose(sourceObject, semantikObject)
);

// {
//   'user.email': 'user email',
//   'address.street': 'delivery street',
//   'address.city': 'delivery city',
//   'products[0].name': 'product name',
//   'products[1].name': 'product name',
//   'products[0].price': 'product price',
//   'products[1].price': 'product price',
//   'products[0].units': 'product units',
//   'products[1].units': 'product units',
//   'products[1].options[0]': 'an option',
//   'products[1].options[1]': 'an option',
//   'products[1].options[2]': 'an option'
// }
