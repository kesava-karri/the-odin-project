function capitalize(str) {
  if (!str) throw new Error(`Please provide a valid input`);
  return str[0].toUpperCase() + str.slice(1);
}

function reverseString(str) {
  if (!str) throw new Error(`Please provide a valid input`);

  let reversedStr = '';
  for (const letter of str) {
    reversedStr += letter;
  }
  return reversedStr;
}

class Calculator {
  add = (num1, num2) => {
    if (
      (typeof num1 !== 'number' || Number.isNaN(num1) || !isFinite(num1)) || 
      (typeof num2 !== 'number' || Number.isNaN(num2) || !isFinite(num2))
    ) {
      throw new Error('The provided input is either NaN or Infinity');
    }
    return num1 + num2;
  };

  subtract = (num1, num2) => {
    if (
      (typeof num1 !== 'number' || Number.isNaN(num1) || !isFinite(num1)) || 
      (typeof num2 !== 'number' || Number.isNaN(num2) || !isFinite(num2))
    ) {
      throw new Error('The provided input is either NaN or Infinity');
    }
    return num1 - num2;
  };

  divide(num1, num2) {
    if(typeof num1 !== 'number' || Number.isNaN(num1) ||
      typeof num2 !== 'number' || Number.isNaN(num2)
    ) throw new Error('The provided input is either NaN or Infinity');
    if (num2 === 0) throw new Error('Cannot divide w 0');
    return num1 / num2;
  }

  multiply(num1, num2) {
    if (
      (typeof num1 !== 'number' || Number.isNaN(num1) || !isFinite(num1)) || 
      (typeof num2 !== 'number' || Number.isNaN(num2) || !isFinite(num2))
    ) {
      throw new Error('The provided input is either NaN or Infinity');
    }
    return num1 * num2;
  }
}

const caesarCipher = (str, shiftFactor) => {
  /** Initial thoughts:
   * iterate over the given string
   * Deal w each letter individually & use a reference map to find it's encrypted version - why not ascii?
   * - Yup actually a good idea to use ascii instead of creating 2 reference maps for lower & uppercase letters
  */
  let encryptedStr = '';
  // bring shiftFactor to alphabet range; 
  shiftFactor %= 26;
  for (let i = 0; i < str.length; i++) {
    const currChar = str.charAt(i);
    const processedDecimalCode = processDecimalCode(shiftFactor, currChar);
    const isUnchanged = currChar.charCodeAt(0) === processedDecimalCode;
    
    if (isUnchanged) {
      // when the current char is neither lower nor uppercase letter, simply append it
      encryptedStr += currChar;
      continue;
    }
    // Append the new letter obtained after encryption
    encryptedStr += String.fromCharCode(processedDecimalCode);
  }
  return encryptedStr;
}

const processDecimalCode = (shiftFactor, currChar) => {
  let decimalCode = currChar.charCodeAt(0);
  if (65 <= decimalCode && decimalCode <= 90) {
    // uppercase ascii ∈ [65, 90]
    decimalCode += shiftFactor;
    if (decimalCode > 90) {
      // Bring within the range of uppercase ascii
      decimalCode %= 90;
      decimalCode += 64;
    }
  } else if(97 <= decimalCode && decimalCode <= 122) {
    // lowercase ascii ∈ [97, 122]
    decimalCode += shiftFactor;
    if (decimalCode > 122) {
      // Bring within the range of lowercase ascii
      decimalCode %= 122;
      decimalCode += 96;
    }
  }
  return decimalCode;
}

export { 
  capitalize,
  reverseString,
  Calculator,
  caesarCipher,
};
