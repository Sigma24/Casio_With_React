export default function ComplexConverter() {
  const PI = 3.141592653589793;

  const BaseMode = {
    DECIMAL: 'DECIMAL',
    BINARY: 'BINARY',
    HEXADECIMAL: 'HEXADECIMAL',
    OCTAL: 'OCTAL',
  };

  let currentBase = BaseMode.DECIMAL;
  let lastOutput = "0";

  function calculate(input) {
    let decimalValue;
    switch (currentBase) {
      case BaseMode.DECIMAL:
        decimalValue = parseInt(input, 10) || 0;
        break;
      case BaseMode.BINARY:
        decimalValue = parseInt(input, 2) || 0;
        break;
      case BaseMode.HEXADECIMAL:
        decimalValue = parseInt(input, 16) || 0;
        break;
      case BaseMode.OCTAL:
        decimalValue = parseInt(input, 8) || 0;
        break;
      default:
        decimalValue = 0;
    }
    lastOutput = decimalValue.toString();
    return formatOutput(lastOutput);
  }

  function convertOutput(toBase) {
    const decimalValue = parseInt(lastOutput, 10) || 0;
    currentBase = toBase;
    switch (toBase) {
      case BaseMode.DECIMAL:
        lastOutput = decimalValue.toString();
        break;
      case BaseMode.BINARY:
        lastOutput = decimalValue.toString(2);
        break;
      case BaseMode.HEXADECIMAL:
        lastOutput = decimalValue.toString(16).toUpperCase();
        break;
      case BaseMode.OCTAL:
        lastOutput = decimalValue.toString(8);
        break;
    }
    return formatOutput(lastOutput);
  }

  function formatOutput(value) {
    const padded = value.padStart(8, '0');
    return `${currentBase.substring(0, 3)} ${padded}`;
  }

  const LogicGates = {
    OR: (...inputs) => inputs.some(Boolean),
    AND: (...inputs) => inputs.every(Boolean),
    XOR: (input1, input2) => input1 !== input2,
    NOT: (input) => !input,
    XNOR: (input1, input2) => input1 === input2,
    NEG: (input) => -input,

    binaryOR: (...inputs) => {
      inputs.forEach(i => { if (i !== 0 && i !== 1) throw new Error("Input must be 0 or 1"); });
      return inputs.includes(1) ? 1 : 0;
    },

    binaryAND: (...inputs) => {
      inputs.forEach(i => { if (i !== 0 && i !== 1) throw new Error("Input must be 0 or 1"); });
      return inputs.every(i => i === 1) ? 1 : 0;
    }
  };

  return null;
}
