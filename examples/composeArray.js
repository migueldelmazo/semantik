'use strict';

var semantik = require('../src/semantik'),

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

console.log(
  semantik.compose(sourceObject, semantikObject)
);

// {
//   '[0].name': 'product name',
//   '[1].name': 'product name',
//   '[0].price': 'product price',
//   '[1].price': 'product price',
//   '[0].units': 'product units',
//   '[1].units': 'product units',
//   '[1].options[0]': 'an option',
//   '[1].options[1]': 'an option',
//   '[1].options[2]': 'an option'
// }
