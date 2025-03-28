// import Ship from '../src/main.js';

// beforeEach(() => {});

// describe('hit', () => {
//   const ship = new Ship();
//   console.log(ship);
//   it('hit once', () => {
//     expect(ship.hit()).toBe('');
//   });
// });

// app/tst/esm-test.spec.js
import { describe, test, expect } from '@jest/globals';

describe('ESM Test', () => {
  test('should work with imports', () => {
    expect(1).toBe(1);
  });
});
