import {
  sin, cos, tan,
  arcsin, arccos, arctan,
  sinh, cosh, tanh,
  arcsinh, arccosh, arctanh
} from './trigono';
import { polarToRectangular ,rectangularToPolar,complexConjugate,complexArgument} from './complexlogic';

function formatFunctionExpr(expr) {
  const superscripts = {
    '⁰': '0', '¹': '1', '²': '2', '³': '3',
    '⁴': '4', '⁵': '5', '⁶': '6',
    '⁷': '7', '⁸': '8', '⁹': '9',
    '⁺': '+', '⁻': '-', '⁼': '=', '⁽': '(', '⁾': ')'
  };

  expr = expr.replace(/x[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, match => {
    const power = match.slice(1).split('').map(c => superscripts[c] || '').join('');
    return `x**${power}`;
  });

  expr = expr.replace(/(\d)([a-zA-Z])/g, '$1*$2');
  expr = expr.replace(/([a-zA-Z])(\d)/g, '$1*$2');
  expr = expr.replace(/÷/g, '/');
  expr = expr.replace(/×/g, '*');
  expr = expr.replace(/\^/g, '**');

  return expr;
}

function simpsonsRule(fxStr, a, b, n = 100) {
  if (n % 2 !== 0) n++;
  const h = (b - a) / n;

  function f(x) {
    const expr = fxStr.replace(/x/g, `(${x})`);
    return eval(expr);
  }

  let result = f(a) + f(b);
  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    result += (i % 2 === 0 ? 2 : 4) * f(x);
  }

  return (h / 3) * result;
}

function numericalDerivative(fxStr, x, h = 0.0001) {
  function f(xVal) {
    const expr = fxStr.replace(/x/g, `(${xVal})`);
    return eval(expr);
  }

  return (f(x + h) - f(x - h)) / (2 * h);
}

function factorial(n) {
  if (n < 0 || n % 1 !== 0) throw new Error("Factorial requires non-negative integer");
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function doubleFactorial(n) {
  if (n < 0 || n % 1 !== 0) throw new Error("Double factorial requires non-negative integer");
  let result = 1;
  for (let i = n; i > 0; i -= 2) result *= i;
  return result;
}

function preprocessExpression(expr, mode) {
  // Factorial and double factorial
  expr = expr.replace(/(\d+)(!+)/g, (_, numStr, bangs) => {
    const num = parseFloat(numStr);
    return bangs.length === 2
      ? doubleFactorial(num).toString()
      : factorial(num).toString();
  });

  // Reciprocal
  expr = expr.replace(/x⁻¹->\(([^)]+)\)/g, (_, val) => {
    const num = parseFloat(val);
    if (num === 0) throw new Error("Division by zero");
    return (1 / num).toString();
  });

  // Square root
  expr = expr.replace(/√x->\(([^)]+)\)/g, (_, val) => {
    const num = parseFloat(val);
    if (num < 0) throw new Error("Square root of negative number");
    return Math.sqrt(num).toString();
  });

  // Power xʸ->(base, exponent)
  expr = expr.replace(/xʸ->\(([^,]+),([^)]+)\)/g, (_, baseStr, expStr) => {
    const base = parseFloat(baseStr);
    const exp = parseFloat(expStr);
    return Math.pow(base, exp).toString();
  });

  // Trigonometric + special functions
  const trigFunctions = [
    { prefix: 'sin(', fn: x => sin(x, mode) },
    { prefix: 'cos(', fn: x => cos(x, mode) },
    { prefix: 'tan(', fn: x => tan(x, mode) },
    { prefix: 'arcsin(', fn: x => arcsin(x, mode) },
    { prefix: 'arccos(', fn: x => arccos(x, mode) },
    { prefix: 'arctan(', fn: x => arctan(x, mode) },
    { prefix: 'sinh(', fn: sinh },
    { prefix: 'cosh(', fn: cosh },
    { prefix: 'tanh(', fn: tanh },
    { prefix: 'arcsinh(', fn: arcsinh },
    { prefix: 'arccosh(', fn: arccosh },
    { prefix: 'arctanh(', fn: arctanh },
    { prefix: 'Log(', fn: x => Math.log10(x) },
    { prefix: 'ln(', fn: Math.log }
  ];

  for (const { prefix, fn } of trigFunctions) {
    while (expr.includes(prefix)) {
      const start = expr.indexOf(prefix);
      let parenCount = 1, end = start + prefix.length;
      while (parenCount > 0 && end < expr.length) {
        if (expr[end] === '(') parenCount++;
        if (expr[end] === ')') parenCount--;
        end++;
      }
      if (parenCount !== 0) throw new Error("Mismatched parentheses");

      const inner = expr.slice(start + prefix.length, end - 1);
      const innerValue = evaluateArithmetic(inner, mode);
      const result = fn(innerValue);
      expr = expr.slice(0, start) + result + expr.slice(end);
    }
  }

  return expr;
}

function evaluateArithmetic(expr, mode) {
  expr = preprocessExpression(expr, mode);
  expr = formatFunctionExpr(expr);

  // DMS Notation
  const dmsMatch = expr.match(/^(\d+)°(?:(\d+)°)?(?:(\d+)°)?$/);
  if (dmsMatch) {
    const deg = parseInt(dmsMatch[1], 10);
    const min = dmsMatch[2] ? parseInt(dmsMatch[2], 10) : 0;
    const sec = dmsMatch[3] ? parseInt(dmsMatch[3], 10) : 0;
    return deg + min / 60 + sec / 3600;
  }

  // Mixed Fraction: x y/z->(a,b,c)
  if (expr.startsWith("x y/z->(") && expr.endsWith(")")) {
    const [whole, num, den] = expr.slice(8, -1).split(",").map(Number);
    if (den === 0) throw new Error("Division by zero");
    return whole + num / den;
  }

  // Fraction: x/y ->(a,b)
  if (expr.startsWith("x/y ->(") && expr.endsWith(")")) {
    const [num, den] = expr.slice(7, -1).split(",").map(Number);
    if (den === 0) throw new Error("Division by zero");
    return num / den;
  }

  const result = Function('"use strict"; return (' + expr + ')')();
  if (typeof result !== 'number' || isNaN(result) || !isFinite(result)) {
    throw new Error("Invalid result");
  }
  return result;
}

// ✅ Final Exported Evaluator
export function evaluateExpression(expr, mode = 'RAD') {
  try {
    expr = expr.trim().replace(/\s+/g, '')
// 1. Handle "conj("
if (expr.startsWith("conj")) {
  const inner = expr.replace(/^conj\(?/, '').replace(/\)?$/, '');
  if (!inner) throw new Error("Invalid conj syntax");
  return complexConjugate(inner);
}

// 2. Handle "arg("
    if (expr.startsWith('arg(')) {
      const input = expr.slice(4).replace(')', '').trim();
      if (!input) throw new Error("Invalid input to arg()");
      return complexArgument(input, mode);
    }


// 3. Handle "a+bi⯈r∠θ"
if (expr.includes("⯈r∠θ")) {
  const [realPart] = expr.split("⯈r∠θ");
  return rectangularToPolar(realPart, mode);
}

// 4. Handle "r∠θ⯈a+bi"
if (expr.includes("⯈a+bi")) {
  const match = expr.match(/^([+-]?\d*\.?\d+)\∠([+-]?\d*\.?\d+)\⯈a\+bi$/);
  if (!match) throw new Error("Invalid polar to rectangular format");
  const r = parseFloat(match[1]);
  const theta = parseFloat(match[2]);
  return polarToRectangular(r, theta, mode);
}

// 5. Handle just "r∠θ"
if (expr.includes("∠") && !expr.includes("⯈")) {
  const match = expr.match(/^([+-]?\d*\.?\d+)\∠([+-]?\d*\.?\d+)$/);
  if (!match) throw new Error("Invalid polar format");
  const r = parseFloat(match[1]);
  const theta = parseFloat(match[2]);
  return polarToRectangular(r, theta, mode);
}

    if (/^-?\d+(\.\d+)?$/.test(expr)) {
      return parseFloat(expr);
    }

    // Integration
    if (/^∫\s*\(u,l,f\(x\)\)\s*dx\s*->\s*\(([^,]+),([^,]+),([^)]+)\)/.test(expr)) {
      const match = expr.match(/^∫\s*\(u,l,f\(x\)\)\s*dx\s*->\s*\(([^,]+),([^,]+),([^)]+)\)/);
      const [lower, upper, rawFuncStr] = [parseFloat(match[1]), parseFloat(match[2]), match[3].trim()];
      if (isNaN(lower) || isNaN(upper)) throw new Error("Invalid integration limits");
      return simpsonsRule(formatFunctionExpr(rawFuncStr), lower, upper);
    }

    // Derivative
    if (/^d\/dx\s*\(f\(x\),x\)\s*->\s*\(([^,]+),([^)]+)\)/.test(expr)) {
      const match = expr.match(/^d\/dx\s*\(f\(x\),x\)\s*->\s*\(([^,]+),([^)]+)\)/);
      const [rawFuncStr, xValue] = [match[1].trim(), parseFloat(match[2])];
      if (isNaN(xValue)) throw new Error("Invalid x value");
      return numericalDerivative(formatFunctionExpr(rawFuncStr), xValue);
    }

    return evaluateArithmetic(expr, mode);
  } catch (err) {
    console.error("Evaluation error:", err.message);
    return "Error: " + err.message;
  }
}
