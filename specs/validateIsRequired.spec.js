/* global test, expect */
const semantik = require('../src/index'),

  sourceObject = { email: 'info@migueldelmazo.com' };

test('semantik: validate is required', () => {
  expect(semantik.validate(sourceObject, { 'email': 'isRequired' })).toBe(true);
  expect(semantik.validate(sourceObject, { 'mail': 'isRequired' })).toBe(false);
});
