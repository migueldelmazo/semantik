'use strict';

var semantik = require('../src/semantik'),

  inc = function (value) {
    return value + 1;
  },

  reverseWords = function (words) {
    return words.split(' ').reverse().join(' ');
  },

  sourceObject = {
    products: [
      {
        name: 'Node JS Design Patterns',
        price: '10',
        units: 1
      },
      {
        name: 'T-Shirts NodeJS',
        price: '20',
        units: 2
      }
    ]
  },

  semantikObject = {
    'products[].name': [reverseWords, 'parseCamelCase'],
    'products[].price': [parseFloat, inc, inc, inc],
    'products[].units': [parseInt, 'parseString']
  };

console.log(
  semantik.parse(sourceObject, semantikObject)
);

// {
//   products: [
//     {
//       name: 'patternsDesignJsNode',
//       price: 13,
//       units: '1'
//     },
//     {
//       name: 'nodeJsTShirts',
//       price: 23,
//       units: '2'
//     }
//   ]
// }
