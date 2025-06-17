// const nTerms = 15;
// const factorialCache = [1];

// function factorial(n) {
//   if (factorialCache[n] != null) return factorialCache[n];
//   let result = factorialCache[factorialCache.length - 1];
//   for (let i = factorialCache.length; i <= n; i++) {
//     result *= i;
//     factorialCache[i] = result;
//   }
//   return result;
// }

// // Converts angle to radians based on mode
// function toRadians(x, mode) {
//   switch (mode) {
//     case 'degree': return x * (Math.PI / 180);
//     case 'radian': return x * (Math.PI / 200);
//     case 'gradian': return x;
//     default: throw new Error("Invalid mode. Use 'DEG', 'RAD', or 'GRAD'.");
//   }
// }

// // Trigonometric functions
// export function sin(x, mode = 'radian') {
//   x = toRadians(x, mode);
//   let result = 0;
//   for (let n = 0; n < nTerms; n++) {
//     result += Math.pow(-1, n) * Math.pow(x, 2 * n + 1) / factorial(2 * n + 1);
//   }
//   return result;
// }

// export function cos(x, mode = 'radian') {
//   x = toRadians(x, mode);
//   let result = 0;
//   for (let n = 0; n < nTerms; n++) {
//     result += Math.pow(-1, n) * Math.pow(x, 2 * n) / factorial(2 * n);
//   }
//   return result;
// }

// export function tan(x, mode = 'radian') {
//   x = toRadians(x, mode);
//   const cosine = cos(x, 'radian'); // Already converted to radians
//   if (cosine === 0) throw new Error("tan(x) is undefined at this input.");
//   return sin(x, 'radian') / cosine;
// }

// // Inverse Trigonometric functions (return in radians by default)
// export function arcsin(x, mode = 'radian') {
//   if (x < -1 || x > 1) throw new Error("Input out of domain");
//   let result = 0;
//   for (let n = 0; n < nTerms; n++) {
//     const coeff = factorial(2 * n) / (Math.pow(4, n) * Math.pow(factorial(n), 2) * (2 * n + 1));
//     result += coeff * Math.pow(x, 2 * n + 1);
//   }
//   return fromRadians(result, mode);
// }

// export function arccos(x, mode = 'radian') {
//   return fromRadians(Math.PI / 2 - arcsin(x, 'radian'), mode);
// }

// export function arctan(x, mode = 'radian') {
//   let result = 0;
//   for (let n = 0; n < nTerms; n++) {
//     result += Math.pow(-1, n) * Math.pow(x, 2 * n + 1) / (2 * n + 1);
//   }
//   return fromRadians(result, mode);
// }

// // Hyperbolic functions (no conversion needed)
// // Hyperbolic functions (accept angle in any mode)
// export function sinh(x, mode = 'radian') {
//   x = toRadians(x, mode);
//   let result = 0;
//   for (let n = 0; n < nTerms; n++) {
//     result += Math.pow(x, 2 * n + 1) / factorial(2 * n + 1);
//   }
//   return result;
// }

// export function cosh(x, mode = 'radian') {
//   x = toRadians(x, mode);
//   let result = 0;
//   for (let n = 0; n < nTerms; n++) {
//     result += Math.pow(x, 2 * n) / factorial(2 * n);
//   }
//   return result;
// }

// export function tanh(x, mode = 'radian') {
//   const sinhVal = sinh(x, mode);
//   const coshVal = cosh(x, mode);
//   return sinhVal / coshVal;
// }

// // Inverse hyperbolic functions (return in specified mode)
// export function arcsinh(x, mode = 'radian') {
//   let result = 0;
//   for (let n = 0; n < nTerms; n++) {
//     const coeff = Math.pow(-1, n) * factorial(2 * n) / (Math.pow(4, n) * Math.pow(factorial(n), 2) * (2 * n + 1));
//     result += coeff * Math.pow(x, 2 * n + 1);
//   }
//   return fromRadians(result, mode);
// }

// export function arccosh(x, mode = 'radian') {
//   if (x < 1) throw new Error("Input out of domain");
//   let result = 0;
//   for (let n = 0; n < nTerms; n++) {
//     const coeff = factorial(2 * n) / (Math.pow(4, n) * Math.pow(factorial(n), 2) * (2 * n + 1));
//     result += coeff * Math.pow(x - 1, n + 0.5);
//   }
//   return fromRadians(result, mode);
// }

// export function arctanh(x, mode = 'radian') {
//   if (x <= -1 || x >= 1) throw new Error("Input out of domain");
//   let result = 0;
//   for (let n = 0; n < nTerms; n++) {
//     result += Math.pow(x, 2 * n + 1) / (2 * n + 1);
//   }
//   return fromRadians(result, mode);
// }

// // Converts result from radians to target mode
// function fromRadians(x, mode) {
//   switch (mode) {
//     case 'degree': return x * (180 / Math.PI);
//     case 'gradian': return x * (200 / Math.PI);
//     case 'radian': return x;
//     default: throw new Error("Invalid mode. Use 'DEG', 'RAD', or 'GRAD'.");
//   }
// }

const nTerms = 15;
const factorialCache = [1];

// Factorial function with caching
function factorial(n) {
  if (factorialCache[n] != null) return factorialCache[n];
  let result = factorialCache[factorialCache.length - 1];
  for (let i = factorialCache.length; i <= n; i++) {
    result *= i;
    factorialCache[i] = result;
  }
  return result;
}

/**
 * Casio fx-991 style rounding (10 significant digits)
 * Uses IEEE 754 "round to nearest, ties to even" for the 11th digit
 */
function casioRound(num) {
  if (num === 0) return 0;
  
  const magnitude = Math.floor(Math.log10(Math.abs(num))) + 1;
  const scale = Math.pow(10, 10 - magnitude);
  const scaled = num * scale;
  const rounded = Math.round(scaled);
  return rounded / scale;
}

// Angle conversion
function toRadians(x, mode) {
  switch (mode) {
    case 'degree': return x * (Math.PI / 180);
    case 'gradian': return x * (Math.PI / 200);
    case 'radian': return x;
    default: throw new Error("Invalid mode. Use 'degree', 'radian', or 'gradian'.");
  }
}

function fromRadians(x, mode) {
  switch (mode) {
    case 'degree': return x * (180 / Math.PI);
    case 'gradian': return x * (200 / Math.PI);
    case 'radian': return x;
    default: throw new Error("Invalid mode. Use 'degree', 'radian', or 'gradian'.");
  }
}

// Trigonometric functions
export function sin(x, mode = 'radian') {
  x = toRadians(x, mode);
  let result = 0;
  for (let n = 0; n < nTerms; n++) {
    result += Math.pow(-1, n) * Math.pow(x, 2 * n + 1) / factorial(2 * n + 1);
  }
  return casioRound(result);
}

export function cos(x, mode = 'radian') {
  x = toRadians(x, mode);
  let result = 0;
  for (let n = 0; n < nTerms; n++) {
    result += Math.pow(-1, n) * Math.pow(x, 2 * n) / factorial(2 * n);
  }
  return casioRound(result);
}

export function tan(x, mode = 'radian') {
  x = toRadians(x, mode);
  const cosine = cos(x, 'radian'); // Already rounded
  if (Math.abs(cosine) < 1e-10) throw new Error("tan(x) is undefined at this input.");
  return casioRound(sin(x, 'radian') / cosine);
}

// Inverse Trigonometric functions
export function arcsin(x, mode = 'radian') {
  if (x < -1 || x > 1) throw new Error("Input out of domain");
  let result = 0;
  for (let n = 0; n < nTerms; n++) {
    const coeff = factorial(2 * n) / (Math.pow(4, n) * Math.pow(factorial(n), 2) * (2 * n + 1));
    result += coeff * Math.pow(x, 2 * n + 1);
  }
  return casioRound(fromRadians(result, mode));
}

export function arccos(x, mode = 'radian') {
  return casioRound(fromRadians(Math.PI / 2 - arcsin(x, 'radian'), mode))
}

export function arctan(x, mode = 'radian') {
  let result = 0;
  for (let n = 0; n < nTerms; n++) {
    result += Math.pow(-1, n) * Math.pow(x, 2 * n + 1) / (2 * n + 1);
  }
  return casioRound(fromRadians(result, mode));
}

// Hyperbolic functions
export function sinh(x, mode = 'radian') {
  x = toRadians(x, mode);
  let result = 0;
  for (let n = 0; n < nTerms; n++) {
    result += Math.pow(x, 2 * n + 1) / factorial(2 * n + 1);
  }
  return casioRound(result);
}

export function cosh(x, mode = 'radian') {
  x = toRadians(x, mode);
  let result = 0;
  for (let n = 0; n < nTerms; n++) {
    result += Math.pow(x, 2 * n) / factorial(2 * n);
  }
  return casioRound(result);
}

export function tanh(x, mode = 'radian') {
  const sinhVal = sinh(x, mode);
  const coshVal = cosh(x, mode);
  return casioRound(sinhVal / coshVal);
}

// Inverse Hyperbolic functions
export function arcsinh(x, mode = 'radian') {
  let result = 0;
  for (let n = 0; n < nTerms; n++) {
    const coeff = Math.pow(-1, n) * factorial(2 * n) / (Math.pow(4, n) * Math.pow(factorial(n), 2) * (2 * n + 1));
    result += coeff * Math.pow(x, 2 * n + 1);
  }
  return casioRound(fromRadians(result, mode));
}

export function arccosh(x, mode = 'radian') {
  if (x < 1) throw new Error("Input out of domain");
  let result = 0;
  for (let n = 0; n < nTerms; n++) {
    const coeff = factorial(2 * n) / (Math.pow(4, n) * Math.pow(factorial(n), 2) * (2 * n + 1));
    result += coeff * Math.pow(x - 1, n + 0.5);
  }
  return casioRound(fromRadians(result, mode));
}

export function arctanh(x, mode = 'radian') {
  if (x <= -1 || x >= 1) throw new Error("Input out of domain");
  let result = 0;
  for (let n = 0; n < nTerms; n++) {
    result += Math.pow(x, 2 * n + 1) / (2 * n + 1);
  }
  return casioRound(fromRadians(result, mode));
}