
  const PI = 3.141592653589793;

  function degreesToRadians(degrees) {
    return degrees * (PI / 180);
  }

  function calculateCos(x) {
    x = x % (2 * PI);
    let result = 1;
    let term = 1;
    let sign = -1;
    let n = 2;

    for (let i = 0; i < 6; i++) {
      term *= (x * x) / ((n - 1) * n);
      result += sign * term;
      sign *= -1;
      n += 2;
    }
    return result;
  }

  function calculateSin(x) {
    x = x % (2 * PI);
    let result = x;
    let term = x;
    let sign = -1;
    let n = 3;

    for (let i = 0; i < 6; i++) {
      term *= (x * x) / ((n - 1) * n);
      result += sign * term;
      sign *= -1;
      n += 2;
    }
    return result;
  }

  function formatNumber(value) {
    return value % 1 === 0 ? value.toString() : value.toFixed(4).replace(/\.0000$/, '');
  }

 export function polarToRectangular(r, theta) {
    const thetaRad = degreesToRadians(theta);
    const a = r * calculateCos(thetaRad);
    const b = r * calculateSin(thetaRad);

    if (b === 0) return `${formatNumber(a)}`;
    if (a === 0) return `${formatNumber(b)}i`;
    return b > 0 ? `${formatNumber(a)} + ${formatNumber(b)}i` : `${formatNumber(a)} - ${formatNumber(Math.abs(b))}i`;
  }

  function parseComplex(input) {
    input = input.replace(/\s+/g, '');
    if (input.includes('i')) {
      const parts = input.split(/(?=[+-])/);
      let real = 0.0, imag = 0.0;
      parts.forEach(part => {
        if (part.includes('i')) {
          imag = parseFloat(part.replace('i', '')) || (part === '+i' ? 1 : part === '-i' ? -1 : 0);
        } else {
          real = parseFloat(part) || 0.0;
        }
      });
      return [real, imag];
    }
    return [parseFloat(input) || 0.0, 0.0];
  }

  function atanApprox(x) {
    const x2 = x * x;
    return x * (1.0 - x2 * (0.3333 - x2 * (0.2 - x2 * (0.1428 - x2 * 0.1111))));
  }

  function calculateAtan2(y, x) {
    if (x > 0) return atanApprox(y / x);
    if (x < 0) return atanApprox(y / x) + PI * (y >= 0 ? 1 : -1);
    return PI / 2 * (y > 0 ? 1 : y < 0 ? -1 : 0);
  }

  function radToDeg(rad) {
    return rad * 180 / PI;
  }

  function radToGrad(rad) {
    return rad * 200 / PI;
  }

  export function complexArgument(input, mode) {
    const [real, imag] = parseComplex(input);
    const angleRad = calculateAtan2(imag, real);
    if (mode.toLowerCase() === 'degree') return formatNumber(radToDeg(angleRad));
    if (mode.toLowerCase() === 'gradian') return formatNumber(radToGrad(angleRad));
    return formatNumber(angleRad);
  }

  function sqrtApprox(x) {
    let guess = x / 2;
    for (let i = 0; i < 10; i++) {
      guess = (guess + x / guess) / 2;
    }
    return guess;
  }

 export function rectangularToPolar(input) {
    const [real, imag] = parseComplex(input);
    const r = sqrtApprox(real * real + imag * imag);
    const theta = calculateAtan2(imag, real) * 180 / PI;
    return `${formatNumber(r)}∠${formatNumber(theta)}°`;
  }

export function complexConjugate(input) {
  input = input.trim().replace(/\s+/g, '');

  // Handle pure imaginary like "5i", "-5i", "+5i"
  if (/^[+-]?\d*\.?\d*i$/.test(input)) {
    const num = parseFloat(input.replace('i', '')) || (input.startsWith('-') ? -1 : 1);
    return (num * -1) + 'i';
  }

  // Handle pure real like "5"
  if (/^[+-]?\d*\.?\d+$/.test(input)) {
    return input;
  }

  // Handle full complex form like "3+4i" or "-3-4i"
  const match = input.match(/^([+-]?\d*\.?\d+)([+-])(\d*\.?\d+)i$/);
  if (!match) throw new Error("Invalid complex format for conjugate");

  const real = match[1];
  const operator = match[2];
  const imag = match[3];

  const newOp = operator === '+' ? '-' : '+';
  return `${real}${newOp}${imag}i`;
}

// export function complexConjugate(value) {
//   if (typeof value === 'number') {
//     return value; // Pure real number
//   }

//   if (typeof value === 'string') value = value.replace(/\s+/g, "");

//   // Handle pure imaginary: e.g. "-5i"
//   if (/^-?\d*\.?\d*i$/.test(value)) {
//     const imag = parseFloat(value.replace('i', '')) || (value.startsWith('-') ? -1 : 1);
//     return (imag * -1) + 'i';
//   }

//   const parsed = parseComplex(value);
//   if (!parsed) throw new Error("Invalid complex number for conjugate");
//   return {
//     real: parsed.real,
//     imag: -parsed.imag
//   };
// }







