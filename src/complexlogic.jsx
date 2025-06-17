export default function ComplexConverter() {
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

  function polarToRectangular(r, theta) {
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

  function complexArgument(input, mode) {
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

  function rectangularToPolar(input) {
    const [real, imag] = parseComplex(input);
    const r = sqrtApprox(real * real + imag * imag);
    const theta = calculateAtan2(imag, real) * 180 / PI;
    return `${formatNumber(r)}∠${formatNumber(theta)}°`;
  }

  function complexConjugate(input) {
    if (input.includes('+')) {
      const parts = input.split('+');
      return `${parts[0]}-${parts[1].replace('i', '')}i`;
    }
    if (input.includes('-')) {
      const parts = input.split('-');
      if (input.startsWith('-')) {
        return `-${parts[1]}+${parts[2].replace('i', '')}i`;
      }
      return `${parts[0]}+${parts[1].replace('i', '')}i`;
    }
    return input;
  }

  // Example usage (for debugging/testing in browser console):
  console.log(polarToRectangular(5, 45));
  console.log(rectangularToPolar("3+4i"));
  console.log(complexArgument("3+4i", "degree"));
  console.log(complexConjugate("3+4i"));

  return null; // No UI yet
}
