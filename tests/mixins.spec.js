/* global test, expect */
const semantik = require('../src/index');

semantik.addMixin('retangleArea', (length, width) => length * width);

test('semantik: mixins', () => {
  expect(semantik.retangleArea(2, 3)).toBe(6);
  try {
    semantik.addMixin('retangleArea', (length, width) => length * width);
  } catch (err) {
    expect(err.message).toEqual('Semantik error: There is already a mixin with the name "retangleArea"');
  }
});
