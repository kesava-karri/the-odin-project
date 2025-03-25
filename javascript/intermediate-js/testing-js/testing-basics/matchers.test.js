test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

test('object assignment', () => {
  const data = { one: 1 };
  data['two'] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

test('Adding +ve items', () => {
  expect(() => {
    let x;
    for (let i = 0; i < 10; i++) {
      x += i;
    }
    return x;
  }).not.toBe(0);
});

test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(2);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5.5);
  expect(value).toBeLessThanOrEqual(4.5);

  expect(value).toBe(4);
  expect(value).toEqual(4);
});

test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //.toBe(0.3) won't work 'cause of rounding error
  expect(value).toBeCloseTo(0.3);
});

test('there is no I in team :)', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christopher', () => {
  expect('Christopher').toMatch(/stop/);
});

function compileAndroidCode() {
  throw new Error('you are using the wrong JDK!');
}

test('compiling android goes as expected', () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
  expect(() => compileAndroidCode()).toThrow(/JDK/);
  // using regex
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/);
});
