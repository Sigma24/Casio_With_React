export function logicGate(expression) {
  expression = expression.toLowerCase().replace(/\s+/g, '');

  const isBinary = (str) => /^[01]+$/.test(str);
  const binToDec = (bin) => parseInt(bin, 2);
  const decToBin = (dec, length = 0) => {
    let bin = (dec >>> 0).toString(2);
    return length ? bin.padStart(length, '0') : bin;
  };

  if (expression.startsWith('not(') && expression.endsWith(')')) {
    const inside = expression.slice(4, -1);
    if (!isBinary(inside)) return "Invalid input for NOT gate";
    const value = binToDec(inside);
    const bitLength = inside.length;
    const result = ~value & ((1 << bitLength) - 1); // mask to preserve bit length
    return decToBin(result, bitLength);
  }

  const operators = ['and', 'or', 'xor', 'xnor'];
  for (let op of operators) {
    const parts = expression.split(op);
    if (parts.length === 2 && isBinary(parts[0]) && isBinary(parts[1])) {
      const [a, b] = parts.map(binToDec);
      const bitLength = Math.max(parts[0].length, parts[1].length);
      let result;

      switch (op) {
        case 'and':
          result = a & b;
          break;
        case 'or':
          result = a | b;
          break;
        case 'xor':
          result = a ^ b;
          break;
        case 'xnor':
          result = ~(a ^ b) & ((1 << bitLength) - 1);
          break;
      }
      return decToBin(result, bitLength);
    }
  }

  return "Invalid expression";
}
