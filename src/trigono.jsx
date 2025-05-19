const nTerms = 15;

function factorial(n) {
  if (n === 0) return 1;
  return Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a * b, 1);
}

export function sin(x) {
  let result = 0;
  for (let n = 0; n < nTerms; n++) {
    const term = Math.pow(-1, n) * Math.pow(x, 2 * n + 1) / factorial(2 * n + 1);
    result += term;
  }
  return result;
}

export function cos(x) {
  let result = 0;
  for (let n = 0; n < nTerms; n++) {
    const term = Math.pow(-1, n) * Math.pow(x, 2 * n) / factorial(2 * n);
    result += term;
  }
  return result;
}

export function tan(x) {
  return sin(x) / cos(x);
}

export function arcsin(x) {
  if (x < -1 || x > 1) throw new Error("Input out of domain");
  let result = 0;
  for (let n = 0; n < nTerms; n++) {
    const coeff = factorial(2 * n) / (Math.pow(4, n) * Math.pow(factorial(n), 2) * (2 * n + 1));
    result += coeff * Math.pow(x, 2 * n + 1);
  }
  return result;
}

export function arccos(x) {
  return Math.PI / 2 - arcsin(x);
}

export function arctan(x) {
  let result = 0;
  for (let n = 0; n < nTerms; n++) {
    const term = Math.pow(-1, n) * Math.pow(x, 2 * n + 1) / (2 * n + 1);
    result += term;
  }
  return result;
}

export function sinh(x) {
  let result = 0;
  for (let n = 0; n < nTerms; n++) {
    const term = Math.pow(x, 2 * n + 1) / factorial(2 * n + 1);
    result += term;
  }
  return result;
}

export function cosh(x) {
  let result = 0;
  for (let n = 0; n < nTerms; n++) {
    const term = Math.pow(x, 2 * n) / factorial(2 * n);
    result += term;
  }
  return result;
}

export function tanh(x) {
  return sinh(x) / cosh(x);
}

export function arcsinh(x) {
  let result = 0;
  for (let n = 0; n < nTerms; n++) {
    const coeff = Math.pow(-1, n) * factorial(2 * n) / (Math.pow(4, n) * Math.pow(factorial(n), 2) * (2 * n + 1));
    result += coeff * Math.pow(x, 2 * n + 1);
  }
  return result;
}

export function arccosh(x) {
  if (x < 1) throw new Error("Input out of domain");
  let result = 0;
  for (let n = 0; n < nTerms; n++) {
    const coeff = factorial(2 * n) / (Math.pow(4, n) * Math.pow(factorial(n), 2) * (2 * n + 1));
    result += coeff * Math.pow(x - 1, n + 0.5);
  }
  return result;
}

export function arctanh(x) {
  if (x <= -1 || x >= 1) throw new Error("Input out of domain");
  let result = 0;
  for (let n = 0; n < nTerms; n++) {
    const term = Math.pow(x, 2 * n + 1) / (2 * n + 1);
    result += term;
  }
  return result;
}