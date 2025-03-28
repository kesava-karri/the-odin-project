import Ship from '../src/main.js';

beforeEach(() => {});

describe('hit', () => {
  const ship = new Ship();
  console.log(ship);
  it('hit once', () => {
    expect(ship.hit()).toBe('');
  });
});
