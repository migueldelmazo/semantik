[![Build Status](https://travis-ci.org/migueldelmazo/semantik.svg?branch=actions)](https://travis-ci.org/migueldelmazo/semantik)
[![Test Coverage](https://codeclimate.com/github/migueldelmazo/semantik/badges/coverage.svg)](https://codeclimate.com/github/migueldelmazo/semantik/coverage)

#SemantiK

This is a library to iterate over arrays and objects semantically, assigning values, validating and parsing. From an object, JSON or array we can create another object using a declarative and semantic programming.

##How does it work:

From this JSON:

```javascript
    var source = {
      products: [{
        name: 'Node JS Design Patterns',
        units: '5'
      },
      {
        name: 'T-Shirts NodeJS',
        units: '10'
      }]
    };
```

####semantik.compose(source, semantik);
Returns an object whose keys are a string with the full path of the properties of the object `source`. The values are the same as the values of the object `semantik`.

    semantik.compose(source, { 'products[].name': 'some name', 'products[].units': 'some units' });
    // {
    //   'products[0].name': 'some name',
    //   'products[1].name': 'some name'
    //   'products[0].units': 'some units',
    //   'products[1].units': 'some units'
    // }

####semantik.validate(source, semantik);
Returns `true` if all functions of the object `semantik` returns `true`, when the functions receive as parameter the values of the object `source`. Otherwise it returns `false`. The functions of object `semantik` must return a boolean value.

    semantik.validate(source, { 'products[].name': 'isString' });
    // true

You can use the pseudo-method `isRequired` to ensure that a property exists on the object `source`.

    semantik.validate(source, { 'products[].asdf': 'isRequired' });
    // false

####semantik.parse(source, semantik);
Returns a copy of the object `source`, modified by the functions of the object `semantik`. The functions of object `semantik` must return a value.

    semantik.parse(source, { 'products[].units': parseInt });
    // {
    //   products: [{
    //     name: 'Node JS Design Patterns',
    //     units: 5
    //   },
    //   {
    //     name: 'T-Shirts NodeJS',
    //     units: 10
    //   }]
    // }

####Functions of object `semantik`:

* The values of object `semantik` can be a function or an array of functions:
  * `{ 'products[].units': 'isString' }`
  * `{ 'products[].units': ['isString', 'isNotEmpty'] }`
* The functions of object `semantic` can be a real function or the name of a function of this library:
  * `{ 'products[].units': _.isString }`
  * `{ 'products[].units': 'isString' }`
* To pass parameters to the function you can use an object:
  * `{ 'products[].units': [ { cb: isNumberBetween, params: [5, 25] ] } }` // isNumberBetween will receive the parameters: 'value', 5 and 25
  * `{ 'products[].units': [ { cb: isNumberBetween, params: { min: 5, max: 25 } } ] }` // isNumberBetween will receive the parameters: 'value' and { min: 5, max: 25 }
  * `{ 'products[].units': [ { cb: isNumberGreatThan, params: 5 } ] }` // isNumberGreatThan will receive the parameters: 'value' and 5
* To pass a context to the function you can use an object:
  * `{ 'products[].units': [ { cb: sort, ctx: this } ]`
* All functions of object `semantik` receive as first parameter the value of object `source`.

####Parse helpers:

`semantik.parseString(value)`

####Validate helpers:

`semantik.isEmail(value)`

`semantik.isNotEmpty(value)`

`semantik.isNumberGreatThan(value, min, equal = true)`

`semantik.isNumberLessThan(value, max, equal = true)`

`semantik.isNumberBetween(value, min, max, equal = true)`

`semantik.isStringNotEmpty(value)`

`semantik.isStringNumber(value)`

####Lodash methods:

`semantik.parseCamelCase(value)`

`semantik.isArray(value)`

`semantik.isEmpty(value)`

`semantik.isNumber(value)`

`semantik.isString(value)`

####semantik.mixin({ name: method });
Add new functions to this library, so that they can be used in any time.

    semantik.mixin({ isString: _.isString });
    semantik.validate(source, { 'products[].units': 'isString' });

##When is it useful:
For example this library is useful to validate and parse the JSON that are received and sent from a server, in order to ensure that the input and output of an application are correct.

##Examples:
Look at the folder `examples/` to see how easy it is to use this library.

##Tests:
Coming soon...
