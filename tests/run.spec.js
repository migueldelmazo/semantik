/* global test, expect */
const semantik = require('../src/index');

test('semantik: run', () => {
  expect(semantik.run('notFoundFunction')).toBe(undefined);
});
