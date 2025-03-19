import {
  capitalize, 
  reverseString, 
  Calculator, 
  caesarCipher,
} from './main.js';

describe('capitalize', function () {
  it('all lower case', () => {
    expect(capitalize('val')).toBe('Val');
  });
  it('all uppercase', () => {
    expect(capitalize('VAL')).toBe('VAL');
  });
  it('empty string', () => {
    expect(() => capitalize('')).toThrow(
      new Error('Please provide a valid input')
    );
  });
});

describe('reverseString', function () {
  test('palindrome', () => {
    expect(reverseString('racecar')).toBe('racecar');
  });

  test('empty string', () => {
    expect(() => reverseString('')).toThrow(
      new Error('Please provide a valid input')
    );
  });
});

describe('Calculator', function () {
  const calc = new Calculator();
  describe('add', () => {
    it('add simple numbers', () => {
      expect(calc.add(1, 2)).toBe(3);
    });

    it('add min & max safe integers', () => {
      expect(calc.add(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER)).toBe(0);
    });

    it('add min & max values', () => {
      // Since MIN_VALUE is very negligible (in higher orders of magnitude), the precision would hardly change
      expect(calc.add(Number.MAX_VALUE, Number.MIN_VALUE)).toBe(Number.MAX_VALUE);
    });

    it('add floating point numbers', () => {
      expect(calc.add(1.01, 2.01)).toBeCloseTo(3.02, 2);
    });

    it('Not a number', () => {
      expect(() => calc.add(NaN, 16)).toThrow(
        new Error('The provided input is either NaN or Infinity')
      );
    });

    it('Infinity', () => {
      expect(() => calc.add(8, Number.NEGATIVE_INFINITY)).toThrow(new Error('The provided input is either NaN or Infinity'));
    });

    it('add zero', () => {
      expect(calc.add(0, 10)).toBe(10);
    });
  });

  describe('subtract', () => {
    it('subtract simple numbers', () => {
      expect(calc.subtract(5, 3)).toBe(2);
    });

    it('subtract min & max safe integers', () => {
      expect(calc.subtract(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER)).toBe(Number.MAX_SAFE_INTEGER - Number.MIN_SAFE_INTEGER);
    });

    it('subtract min & max values', () => {
      expect(calc.subtract(Number.MAX_VALUE, Number.MIN_VALUE)).toBe(Number.MAX_VALUE);
    });

    it('subtract floating point numbers', () => {
      expect(calc.subtract(2.02, 1.01)).toBeCloseTo(1.01, 2);
    });

    it('Not a number', () => {
      expect(() => calc.subtract(NaN, 5)).toThrow(
        new Error('The provided input is either NaN or Infinity')
      );
    });

    it('Infinity', () => {
      expect(() => calc.subtract(8, Number.POSITIVE_INFINITY)).toThrow(new Error('The provided input is either NaN or Infinity'));
    });

    it('subtract zero', () => {
      expect(calc.subtract(10, 0)).toBe(10);
    });

    it('negative result', () => {
      expect(calc.subtract(3, 5)).toBe(-2);
    });
  });

  describe('divide', () => {
    it('divide w 0', () => {
      expect(() => calc.divide(2, 0)).toThrow(new Error('Cannot divide w 0'));
    });

    it('numberator as 0', () => {
      expect(calc.divide(0, 100)).toBe(0);
    })

    it('fractional output', () => {
      expect(calc.divide(1, 2)).toBeCloseTo(0.5, 1);
    });

    it ('negative denominator', () => {
      expect(calc.divide(10, -5)).toBe(-2);
    });

    it ('Divide w Infinity', () => {
      expect(calc.divide(6, Infinity)).toBe(0);
    });

    it('Max value', () => {
      expect(calc.divide(1, Number.MAX_VALUE)).toBeCloseTo(0);
    });

    it('divide by NaN', () => {
      expect(() => calc.divide(2, NaN)).toThrow(new Error('The provided input is either NaN or Infinity'));
    });

    it('Invalid input', () => {
      expect(() => calc.divide('invalid-string', 2)).toThrow(new Error('The provided input is either NaN or Infinity'));
    });
  });

  describe('multiply', () => {
    it('multiply w 0', () => {
      expect(calc.multiply(98, 0)).toBe(0);
    });

    it('Invalid input', () => {
      expect(() => calc.multiply('invalid-string', 1)).toThrow(new Error('The provided input is either NaN or Infinity'));
    });
    // Omitting the other similar unit tests as above
  });
});

describe('caesarCipher', () => {
  it('all lowercase string', () => {
    expect(caesarCipher('xyz', 3)).toBe('abc');
  });

  it('all uppercase string', () => {
    expect(caesarCipher('ABC', 24)).toBe('YZA');
  });

  it('mixed lettercase', () => {
    expect(caesarCipher('HeLLo', 3)).toBe('KhOOr');
  });

  it('punctuation, spaces and other non-alphabetic characters', () => {
    expect(caesarCipher('Hello, World!', 3)).toBe('Khoor, Zruog!');
  });

  it('out of bounds shift factor', () => {
    expect(caesarCipher('GGWP', 52)).toBe('GGWP');
  });
});