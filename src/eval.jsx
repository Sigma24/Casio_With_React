import {
  sin, cos, tan,
  arcsin, arccos, arctan,
  sinh, cosh, tanh,
  arcsinh, arccosh, arctanh
} from './trigono';
import { polarToRectangular ,rectangularToPolar,complexConjugate,complexArgument} from './complexlogic';
import { convertValueofConversion } from './conv';
import { logicGate } from './basenlogic';
import { constantsMap } from './const';
import { VectorOperations } from './vectlogic';

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

function evaluateLogicExpression(expr) {
  // Convert to lowercase and remove spaces (except within parentheses)
  let expression = expr.toLowerCase().replace(/\s+(?![^(]*\))/g, '');

  // First handle neg() operations separately since they're not standard logic gates
  while (expression.includes('neg(')) {
    const negMatch = expression.match(/neg\(([01]+)\)/);
    if (!negMatch) break;
    
    const inside = negMatch[1];
    if (!/^[01]+$/.test(inside)) return null;
    
    const value = parseInt(inside, 2);
    const bitLength = inside.length;
    const result = (-value) & ((1 << bitLength) - 1);
    const resultStr = result.toString(2).padStart(bitLength, '0');
    
    expression = expression.replace(`neg(${inside})`, resultStr);
  }

  // Then process the rest of the logic operations
  return evaluateStandardLogic(expression);
}

function evaluateStandardLogic(expression) {
  const isBinary = (str) => /^[01]+$/.test(str);
  const binToDec = (bin) => parseInt(bin, 2);
  const decToBin = (dec, length = 0) => (dec >>> 0).toString(2).padStart(length, '0');

  // Process parentheses first
  while (expression.includes('(')) {
    const parenMatch = expression.match(/\(([^()]+)\)/);
    if (!parenMatch) break;
    
    const innerResult = evaluateStandardLogic(parenMatch[1]);
    if (innerResult === null) return null;
    
    expression = expression.replace(`(${parenMatch[1]})`, innerResult);
  }

  // Handle NOT operations
  while (expression.startsWith('not(') && expression.endsWith(')')) {
    const inside = expression.slice(4, -1);
    if (!isBinary(inside)) return null;
    
    const value = binToDec(inside);
    const bitLength = inside.length;
    const result = ~value & ((1 << bitLength) - 1);
    expression = decToBin(result, bitLength);
  }

  // Handle binary operations with proper precedence
  const operators = [
    { regex: /([01]+)and([01]+)/, handler: (a, b) => a & b },
    { regex: /([01]+)xor([01]+)/, handler: (a, b) => a ^ b },
    { regex: /([01]+)xnor([01]+)/, handler: (a, b, len) => ~(a ^ b) & ((1 << len) - 1) },
    { regex: /([01]+)or([01]+)/, handler: (a, b) => a | b }
  ];

  let changed;
  do {
    changed = false;
    for (const op of operators) {
      const match = expression.match(op.regex);
      if (match) {
        const left = match[1];
        const right = match[2];
        if (!isBinary(left) || !isBinary(right)) return null;
        
        const a = binToDec(left);
        const b = binToDec(right);
        const bitLength = Math.max(left.length, right.length);
        let result = op.handler(a, b, bitLength);
        
        expression = expression.replace(match[0], decToBin(result, bitLength));
        changed = true;
        break;
      }
    }
  } while (changed);

  return isBinary(expression) ? expression : null;
}



export function evaluateExpression(expr, mode = 'RAD') {
  try {
    if (!expr || typeof expr !== 'string') throw new Error("Empty input");
    const logicResult = evaluateLogicExpression(expr);
    if (logicResult !== null) return logicResult;

    // 1. Normalize input
    expr = expr.trim()
      .replace(/\s+/g, '')
      .replace(/×|x/g, '*')
      .replace(/÷/g, '/');

    // 2. Constants Map
    const constantsMap = new Map([
      ["c", 2.99792458e8],
      ["μ₀", 4 * Math.PI * 1e-7],
      ["ε₀", 8.854187817e-12],
      ["G", 6.67430e-11],
      ["h", 6.62607015e-34],
      ["ħ", 1.054571817e-34],
      ["mₚ", 2.176434e-8],
      ["e", 1.602176634e-19],
      ["kₑ", 8.9875517923e9],
      ["Nₐ", 6.02214076e23],
      ["mp", 1.67262192369e-27],
      ["mn", 1.67492749804e-27],
      ["me", 9.1093837015e-31],
      ["mu", 1.883531627e-28],
      ["a₀", 5.29177210903e-11],
      ["u", 1.6605390666e-27],
      ["re", 2.8179403262e-15],
      ["α", 7.2973525693e-3],
      ["R∞", 1.0973731568160e7],
      ["F", 96485.33289],
      ["μB", 9.27400999457e-24],
      ["μN", 5.0507837461e-27],
      ["Φ₀", 2.067833848e-15],
      ["G₀", 7.748091729e-5],
      ["KJ", 4.835978484e14],
      ["RK", 25812.80745],
      ["k", 1.380649e-23],
      ["σ", 5.670374419e-8],
      ["R", 8.314462618],
      ["Vm", 2.2413996e-2],
      ["g", 9.80665],
      ["atm", 101325],
      ["T₀", 273.15],
      ["eV", 1.602176634e-19],
      ["b", 2.897771955e-3],
      ["NA·h", 3.990312714e-10],
      ["c₁", 3.741771852e-16],
      ["c₂", 1.438776877e-2]
    ]);

    // 3. Replace constants safely
    const replaceConstantsInExpr = (expression) => {
      const sortedSymbols = Array.from(constantsMap.keys()).sort((a, b) => b.length - a.length);
      for (let symbol of sortedSymbols) {
        const value = constantsMap.get(symbol);
        if (symbol === 'e') {
          // Replace e only when it's not part of scientific notation
          expression = expression.replace(/([^0-9a-zA-Z_])e([^0-9])/g, `$1(${value})$2`);
          expression = expression.replace(/^e([^0-9])/g, `(${value})$1`);
          expression = expression.replace(/([^0-9a-zA-Z_])e$/g, `$1(${value})`);
        } else {
          const escaped = symbol.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
          const regex = new RegExp(`\\b${escaped}\\b`, 'g');
          expression = expression.replace(regex, `(${value})`);
        }
      }
      return expression;
    };

    expr = replaceConstantsInExpr(expr);

    // 4. Handle RandInt(min, max)
    expr = expr.replace(/RandInt\((\d+),\s*(\d+)\)?/gi, (_, min, max) => {
      const low = parseInt(min, 10);
      const high = parseInt(max, 10);
      return Math.floor(Math.random() * (high - low + 1)) + low;
    });

    // 5. Handle Ran# (Random Float)
    expr = expr.replace(/Ran#/gi, () => {
      return Math.random();
    });

    // 6. Replace π and e if not scientific notation
    expr = expr.replace(/π/g, `(${Math.PI})`);
    expr = expr.replace(/([^0-9a-zA-Z_])e([^0-9])/g, `$1(${Math.E})$2`);
    expr = expr.replace(/^e([^0-9])/g, `(${Math.E})$1`);
    expr = expr.replace(/([^0-9a-zA-Z_])e$/g, `$1(${Math.E})`);

    // 7. Vector Arithmetic Support
    if (/vect[ABC]/.test(expr)) {
      const stored = JSON.parse(localStorage.getItem("vectors")) || {};
      const vectorLabels = ["vectA", "vectB", "vectC"];

      // Validate & map vector names to their arrays
      const vectorValues = {};
      for (let name of vectorLabels) {
        const val = stored[name];
        if (!Array.isArray(val)) throw new Error(`${name} is undefined or invalid`);
        vectorValues[name] = val;
      }

      // Replace vectX with temp variables like _v_vectA
      let transformed = expr.replace(/\s+/g, '');
      for (let name of vectorLabels) {
        transformed = transformed.replaceAll(name, `_v_${name}`);
      }

      // Replace . with __DOT__ so it's not misinterpreted
      transformed = transformed.replace(/\./g, '__DOT__');

      // Convert infix expressions to function-style
      // 1. Handle dot products: a__DOT__b → __DOT__(a, b)
      transformed = transformed.replace(/(_v_vect[ABC])__DOT__(_v_vect[ABC])/g, `__DOT__($1, $2)`);

      // 2. Replace vector addition/subtraction:
      const parseAddSub = (input) => {
        const tokens = input.match(/(?:__DOT__\([^)]+\)|_v_vect[ABC]|[+\-()])/g);
        if (!tokens) return input;

        let stack = [];
        let i = 0;

        const parse = () => {
          let operands = [];
          let operator = null;

          while (i < tokens.length) {
            const token = tokens[i++];

            if (token === "(") {
              operands.push(parse());
            } else if (token === ")") {
              break;
            } else if (token === "+" || token === "-") {
              operator = token;
            } else {
              if (operator && operands.length) {
                const left = operands.pop();
                const right = token;
                const opFunc = operator === "+" ? "add" : "sub";
                operands.push(`${opFunc}(${left}, ${right})`);
                operator = null;
              } else {
                operands.push(token);
              }
            }
          }

          return operands[0];
        };

        return parse();
      };

      transformed = parseAddSub(transformed);

      // Build the scope
      const scope = {
        __DOT__: (a, b) => {
          if (!Array.isArray(a) || !Array.isArray(b)) throw new Error("Dot requires two vectors");
          const result = VectorOperations.dotProduct(a, b);
          if (result === null) throw new Error("Size mismatch in dot product");
          return result;
        },
        add: (...args) => {
          const parsed = args.filter(v => Array.isArray(v));
          if (parsed.length < 2 || parsed.length > 3) return null;
          if (!VectorOperations.allSameSize(parsed)) return null;
          return parsed.reduce((acc, curr) => acc.map((v, i) => v + curr[i]));
        },
        sub: (...args) => {
          const parsed = args.filter(v => Array.isArray(v));
          if (parsed.length < 2 || parsed.length > 3) return null;
          if (!VectorOperations.allSameSize(parsed)) return null;
          return parsed.reduce((acc, curr) => acc.map((v, i) => v - curr[i]));
        },
        _v_vectA: vectorValues.vectA,
        _v_vectB: vectorValues.vectB,
        _v_vectC: vectorValues.vectC,
      };

      try {
        const result = Function(...Object.keys(scope), `return ${transformed}`)(...Object.values(scope));
        if (result === null) throw new Error("Vector calculation failed");

        // Extra safety: prevent adding scalar to vector
        if (typeof result === "number" && /\+_v_vect[ABC]/.test(transformed)) {
          throw new Error("Cannot add scalar to vector");
        }

        return result;
      } catch (err) {
        throw new Error("Invalid vector expression: " + err.message);
      }
    }

    // 8. Logic Gates (Binary)
    const binToDec = (bin) => parseInt(bin, 2);
    const decToBin = (dec, length) => (dec >>> 0).toString(2).padStart(length, '0');
    const isBinary = (str) => /^[01]+$/.test(str);

    // Handle NOT operation
    if (expr.startsWith('not(') && expr.endsWith(')')) {
      const inside = expr.slice(4, -1);
      if (!isBinary(inside)) return 'Invalid input';
      const bitLength = inside.length;
      const result = ~binToDec(inside) & ((1 << bitLength) - 1);
      return decToBin(result, bitLength);
    }

    // Regex to capture [binary][operator][binary]
    const match = expr.match(/^([01]+)(and|or|xor|xnor)([01]+)$/);
    if (match) {
      const [, left, operator, right] = match;

      const a = binToDec(left);
      const b = binToDec(right);
      const bitLength = Math.max(left.length, right.length);
      let result;

      switch (operator) {
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
        default:
          return 'Unknown gate';
      }

      return decToBin(result, bitLength);
    }

    // 9. Complex Conjugate
    if (expr.startsWith("conj")) {
      const inner = expr.replace(/^conj\(?/, '').replace(/\)?$/, '');
      if (!inner) throw new Error("Invalid conj syntax");
      return complexConjugate(inner);
    }

    // 10. Argument
    if (expr.startsWith('arg(')) {
      const input = expr.slice(4).replace(')', '').trim();
      if (!input) throw new Error("Invalid input to arg()");
      return complexArgument(input, mode);
    }

    // 11. Polar Conversion
    if (expr.includes("⯈r∠θ")) {
      const [realPart] = expr.split("⯈r∠θ");
      return rectangularToPolar(realPart, mode);
    }

    if (expr.includes("⯈a+bi")) {
      const match = expr.match(/^([+-]?\d*\.?\d+)\∠([+-]?\d*\.?\d+)\⯈a\+bi$/);
      if (!match) throw new Error("Invalid polar to rectangular format");
      const r = parseFloat(match[1]);
      const theta = parseFloat(match[2]);
      return polarToRectangular(r, theta, mode);
    }

    if (expr.includes("∠") && !expr.includes("⯈")) {
      const match = expr.match(/^([+-]?\d*\.?\d+)\∠([+-]?\d*\.?\d+)$/);
      if (!match) throw new Error("Invalid polar format");
      const r = parseFloat(match[1]);
      const theta = parseFloat(match[2]);
      return polarToRectangular(r, theta, mode);
    }

    // 12. Simple number check
    if (/^-?\d+(\.\d+)?$/.test(expr)) {
      return parseFloat(expr);
    }

    // 13. Integration
    if (/^∫\s*\(u,l,f\(x\)\)\s*dx\s*->\s*\(([^,]+),([^,]+),([^)]+)\)/.test(expr)) {
      const match = expr.match(/^∫\s*\(u,l,f\(x\)\)\s*dx\s*->\s*\(([^,]+),([^,]+),([^)]+)\)/);
      const [lower, upper, rawFuncStr] = [parseFloat(match[1]), parseFloat(match[2]), match[3].trim()];
      if (isNaN(lower) || isNaN(upper)) throw new Error("Invalid integration limits");
      return simpsonsRule(formatFunctionExpr(rawFuncStr), lower, upper);
    }

    // 14. Derivative
    if (/^d\/dx\s*\(f\(x\),x\)\s*->\s*\(([^,]+),([^)]+)\)/.test(expr)) {
      const match = expr.match(/^d\/dx\s*\(f\(x\),x\)\s*->\s*\(([^,]+),([^)]+)\)/);
      const [rawFuncStr, xValue] = [match[1].trim(), parseFloat(match[2])];
      if (isNaN(xValue)) throw new Error("Invalid x value");
      return numericalDerivative(formatFunctionExpr(rawFuncStr), xValue);
    }

    // 15. Unit Conversion
    const unitConvPattern = /^(\d*\.?\d+)\s*([a-zA-Z]+)\s*►\s*([a-zA-Z\s().°°]+)$/;
    const matchConv = expr.match(unitConvPattern);
    if (matchConv) {
      const value = matchConv[1];
      const fromTo = `${matchConv[2]} ► ${matchConv[3]}`.replace(/\s+/g, ' ').trim();
      return convertValueofConversion(value, fromTo);
    }

    // 16. Default arithmetic evaluation
    return evaluateArithmetic(expr, mode);

  } catch (err) {
    console.error("Evaluation error:", err.message);
    return "Error: " + err.message;
  }
}

// Helper functions would need to be defined elsewhere:
// - VectorOperations (dotProduct, allSameSize)
// - complexConjugate, complexArgument
// - rectangularToPolar, polarToRectangular
// - simpsonsRule, numericalDerivative
// - formatFunctionExpr
// - convertValueofConversion
// - evaluateArithmetic




