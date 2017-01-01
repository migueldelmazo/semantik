/* global test, expect */
const semantik = require('../src/index');

test('semantik: sanitize', () => {
  expect(semantik.sanitize({
    array: [1, 2, 3],
    callback (a, b) {
      return a + b;
    }
  })).toEqual({ array: [1, 2, 3] });
});
