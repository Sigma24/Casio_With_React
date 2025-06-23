import {
  sin, cos, tan,
  arcsin, arccos, arctan,
  sinh, cosh, tanh,
  arcsinh, arccosh, arctanh
} from './trigono';
import { polarToRectangular ,rectangularToPolar,complexConjugate,complexArgument} from './complexlogic';
import { convertValueofConversion } from './conv';
import { constantsMap,normalizeConstantValue } from './constantutitliy';
import { VectorOperations } from './vectlogic';

function formatFunctionExpr(expr) {

  const superscripts = {
    '⁰': '0', '¹': '1', '²': '2', '³': '3',
    '⁴': '4', '⁵': '5', '⁶': '6',
    '⁷': '7', '⁸': '8', '⁹': '9',
    '⁺': '+', '⁻': '-', '⁼': '=', '⁽': '(', '⁾': ')'
  };
  expr = expr.replace(/10ˣ\(/g, 'antilog10(')  // No asterisk here
             .replace(/eˣ\(/g, 'antiln(')
             .replace(/(\d+\.?\d*)ˣ\(/g, 'antilogBase($1,');


  // Convert all x to uppercase X
  expr = expr.replace(/x/gi, 'X');

  // Handle superscripts
  expr = expr.replace(/X[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, match => {
    const power = match.slice(1).split('').map(c => superscripts[c] || '').join('');
    return `X**${power}`;
  });

  // Handle implicit multiplication
  expr = expr.replace(/([0-9π])([a-zA-Z(])/g, '$1*$2');
  expr = expr.replace(/([a-zA-Z])([0-9π])/g, '$1*$2');
  expr = expr.replace(/÷/g, '/');
  expr = expr.replace(/×/g, '*');
  expr = expr.replace(/\^/g, '**');
    expr = expr.replace(/([XY])\/([YZ])->/gi, '$1/$2->')  
            .replace(/([XY])\s([YZ])\/([YZ])->/gi, '$1 $2/$3->');
  
  return expr;
}

function numericalDerivative(fxStr, x, h = 0.0001) {
  // Create a context with the current X value
  const context = { X: x };
  
  function f(xVal) {
    const currentExpr = fxStr.replace(/X/g, xVal.toString());
    return evaluateBasicExpression(currentExpr, 'radian', context);
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

function preprocessExpression(expr, mode = 'radian') {
   expr = expr.replace(/°/g, '');
  
    expr = expr.replace(/x/gi, 'X');

  // Handle factorials and double factorials
  expr = expr.replace(/(\d+)(!+)/g, (_, numStr, bangs) => {
    const num = parseFloat(numStr);
    return bangs.length === 2 ? doubleFactorial(num).toString() : factorial(num).toString();
  });

 expr = expr.replace(/(\d+\.?\d*)ˣ\(([^)]+)\)/g, (_, base, exponent) => {
    return `Math.pow(${base},${exponent})`;
  });

  expr = expr.replace(/antilog10\(([^)]+)\)/g, 'Math.pow(10,$1)')
             .replace(/antiln\(([^)]+)\)/g, 'Math.exp($1)')
             .replace(/antilogBase\(([^,]+),([^)]+)\)/g, 'Math.pow($1,$2)');
  // Handle reciprocal (x⁻¹)
  expr = expr.replace(/X⁻¹->\(([^)]+)\)/g, (_, val) => {
    const num = parseFloat(val);
    if (num === 0) throw new Error("Division by zero");
    return (1 / num).toString();
  });

  // Handle square root
  expr = expr.replace(/√x->\(([^)]+)\)/g, (_, val) => {
    const num = parseFloat(val);
    if (num < 0) throw new Error("Square root of negative number");
    return Math.sqrt(num).toString();
  });

  expr = expr.replace(/(X)\s?(Y)\/(Z)->\(([^,]+),([^,]+),([^)]+)\)/gi, (_, x, y, z, wholeStr, numStr, denStr) => {
    const whole = parseFloat(wholeStr);
    const num = parseFloat(numStr);
    const den = parseFloat(denStr);
    if (den === 0) throw new Error("Division by zero");
    return (whole + num / den).toString();
  });



    expr = expr.replace(/X\/Y->\(([^,]+),([^)]+)\)/g, (_, numStr, denStr) => {
    const num = parseFloat(numStr);
    const den = parseFloat(denStr);
    if (den === 0) throw new Error("Division by zero");
    return (num / den).toString();
  });

  // Handle power function
  expr = expr.replace(/Xʸ->\(([^,]+),([^)]+)\)/g, (_, baseStr, expStr) => {
    const base = parseFloat(baseStr);
    const exp = parseFloat(expStr);
    return Math.pow(base, exp).toString();
  });

  // Handle derivative notation d/dx(a,f(X))
  expr = expr.replace(/d\/dx\(([^,]+),([^)]+)\)/g, (_, xValStr, fxStr) => {
    const xVal = parseFloat(xValStr);
    return numericalDerivative(fxStr, xVal).toString();
  });

  // Define function mappings
  const functionMap = {
    'sin(': (x) => sin(x, mode),
    'cos(': (x) => cos(x, mode),
    'tan(': (x) => tan(x, mode),
    'sin⁻¹(': (x) => arcsin(x, mode),
    'cos⁻¹(': (x) => arccos(x, mode),
    'tan⁻¹(': (x) => arctan(x, mode),
    'sinh(': (x) => sinh(x),
    'cosh(': (x) => cosh(x),
    'tanh(': (x) => tanh(x),
    'sinh⁻¹(': (x) => arcsinh(x),
    'cosh⁻¹(': (x) => arccosh(x),
    'tanh⁻¹(': (x) => arctanh(x),
    'log(': (x) => Math.log10(x),
    'ln(': (x) => Math.log(x)
  };

  for (const [funcPattern, func] of Object.entries(functionMap)) {
    while (expr.includes(funcPattern)) {
      const start = expr.indexOf(funcPattern);
      let parenCount = 1;
      let end = start + funcPattern.length;

      while (parenCount > 0 && end < expr.length) {
        if (expr[end] === '(') parenCount++;
        if (expr[end] === ')') parenCount--;
        end++;
      }

      if (parenCount !== 0) throw new Error("Mismatched parentheses");

      const fullFunc = expr.slice(start, end);
      const inner = expr.slice(start + funcPattern.length, end - 1);
      
      try {
        const innerValue = evaluateArithmetic(inner, mode);
        const result = func(innerValue);
        expr = expr.substring(0, start) + result.toString() + expr.substring(end);
      } catch (error) {
        throw new Error(`Error evaluating ${funcPattern}...: ${error.message}`);
      }
    }
  }

  return expr;
}
function evaluateBasicExpression(expr, mode = 'radian', variables = {}) {
  // First handle special cases before general evaluation
  if (expr.includes('∑')) return evaluateSummation(expr, mode);
  if (expr.startsWith('∫(')) return evaluateIntegral(expr, mode);
  
  // Handle derivative notation d/dX(a,f(X))
  if (expr.startsWith('d/dX(')) {
    const match = expr.match(/^d\/dX\(([^,]+),([^)]+)\)$/);
    if (!match) throw new Error("Invalid derivative format. Use d/dX(a,f(X))");
    
    const xValStr = match[1];
    const fxStr = match[2];
    const xVal = evaluateBasicExpression(xValStr, mode);
    
    return numericalDerivative(fxStr, xVal);
  }

  // Replace constants and handle multiplication
  expr = expr.replace(/π/g, Math.PI.toString())
             .replace(/e/g, Math.E.toString())
             .replace(/(\d+)([a-zπe(])/gi, '$1*$2');

  // Create evaluation context
  const context = {
    ...variables,
    sin: (x) => sin(x, mode),
    cos: (x) => cos(x, mode),
    tan: (x) => tan(x, mode),
    asin: (x) => arcsin(x, mode),
    acos: (x) => arccos(x, mode),
    atan: (x) => arctan(x, mode),
    sinh: (x) => sinh(x),
    cosh: (x) => cosh(x),
    tanh: (x) => tanh(x),
    asinh: (x) => arcsinh(x),
    acosh: (x) => arccosh(x),
    atanh: (x) => arctanh(x),
    
    antilog: (x) => Math.pow(10, x),       // Base 10 antilog
    antiln: (x) => Math.exp(x), 

    sqrt: Math.sqrt,
    X: variables.X || 0  // Default X value if not provided
  };

  // Safe evaluation
  try {
    const evaluator = new Function(...Object.keys(context), `return ${expr}`);
    return evaluator(...Object.values(context));
  } catch (error) {
    throw new Error(`Evaluation error in expression: ${expr}. ${error.message}`);
  }
}

function evaluateIntegral(expr, mode = 'radian') {
  const match = expr.match(/^∫\(([^,]+),([^,]+),([^)]+)\)$/);
  if (!match) throw new Error("Invalid integral format. Use ∫(a,b,f(X))");
  
  const [, aStr, bStr, fxStr] = match;
  const a = evaluateBasicExpression(aStr, mode);
  const b = evaluateBasicExpression(bStr, mode);
  
  if (a === b) return 0;
  
  const n = 1000;
  const h = (b - a) / n;
  let sum = 0;

  for (let i = 0; i <= n; i++) {
    const x = a + i * h;
    const weight = (i === 0 || i === n) ? 1 : (i % 2 === 0 ? 2 : 4);
    sum += weight * evaluateBasicExpression(fxStr, mode, {X: x});
  }
  
  return (h / 3) * sum;
}

function evaluateSummation(expr, mode = 'radian') {
  const match = expr.match(/^∑\(([^,]+),([^,]+),([^)]+)\)$/);
  if (!match) throw new Error("Invalid summation format. Use ∑(a,b,f(X))");
  
  const [, startStr, endStr, funcStr] = match;
  const start = Math.floor(evaluateBasicExpression(startStr, mode));
  const end = Math.floor(evaluateBasicExpression(endStr, mode));
  
  let sum = 0;
  for (let X = start; X <= end; X++) {
    sum += evaluateBasicExpression(funcStr, mode, {X});
  }
  return sum;
}

function evaluateArithmetic(expr, mode) {
  console.log("Original expression:", expr);
  expr = formatFunctionExpr(expr);
  console.log("After formatting:", expr);
  
  expr = preprocessExpression(expr, mode);
  console.log("After preprocessing:", expr);

  const dmsMatch = expr.match(/^(\d+)°(?:(\d+)°)?(?:(\d+)°)?$/);
  if (dmsMatch) {
    const deg = parseInt(dmsMatch[1], 10);
    const min = dmsMatch[2] ? parseInt(dmsMatch[2], 10) : 0;
    const sec = dmsMatch[3] ? parseInt(dmsMatch[3], 10) : 0;
    return deg + min / 60 + sec / 3600;
  }

  if (expr.includes('∑')) return evaluateSummation(expr, mode);
  if (expr.startsWith('∫(')) return evaluateIntegral(expr, mode);
  if (expr.startsWith('d/dX(')) return evaluateBasicExpression(expr, mode);

  if (expr.startsWith("X Y/Z->(") && expr.endsWith(")")) {
    const [whole, num, den] = expr.slice(8, -1).split(",").map(Number);
    if (den === 0) throw new Error("Division by zero");
    return whole + num / den;
  }

  if (expr.startsWith("X/Y ->(") && expr.endsWith(")")) {
    const [num, den] = expr.slice(7, -1).split(",").map(Number);
    if (den === 0) throw new Error("Division by zero");
    return num / den;
  }

  const result = evaluateBasicExpression(expr, mode);
  if (typeof result !== 'number' || isNaN(result) || !isFinite(result)) {
    throw new Error("Invalid result");
  }
  return result;
}

function evaluateLogicExpression(expr) {
  let expression = expr.toLowerCase().replace(/\s+(?![^(]*\))/g, '');

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

  return evaluateStandardLogic(expression);
}

function evaluateStandardLogic(expression) {
  const isBinary = (str) => /^[01]+$/.test(str);
  const binToDec = (bin) => parseInt(bin, 2);
  const decToBin = (dec, length = 0) => (dec >>> 0).toString(2).padStart(length, '0');

  while (expression.includes('(')) {
    const parenMatch = expression.match(/\(([^()]+)\)/);
    if (!parenMatch) break;
    
    const innerResult = evaluateStandardLogic(parenMatch[1]);
    if (innerResult === null) return null;
    
    expression = expression.replace(`(${parenMatch[1]})`, innerResult);
  }

  while (expression.startsWith('not(') && expression.endsWith(')')) {
    const inside = expression.slice(4, -1);
    if (!isBinary(inside)) return null;
    
    const value = binToDec(inside);
    const bitLength = inside.length;
    const result = ~value & ((1 << bitLength) - 1);
    expression = decToBin(result, bitLength);
  }

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

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
export function evaluateExpression(expr, mode = 'RAD') {
  try {
    if (!expr || typeof expr !== 'string') throw new Error("Empty input");
    const logicResult = evaluateLogicExpression(expr);
    if (logicResult !== null) return logicResult;

      let displayExpr = expr.trim();
    let calcExpr = displayExpr.replace(/\s+/g, '')
                            .replace(/×|x/g, '*')
                            .replace(/÷/g, '/');

    // Handle constants replacement - NEW CODE ADDED HERE
const constantsMap = {
      'c': '2.99792458e8',
      'μ₀': (4 * Math.PI * 1e-7).toString(),
      'ε₀': '8.854187817e-12',
      'G': '6.67430e-11',
      'h': '6.62607015e-34',
      'ħ': '1.054571817e-34',
      'mₚ': '2.176434e-8',
      'e': '1.602176634e-19',
      'kₑ': '8.9875517923e9',
      'Nₐ': '6.02214076e23',
      'mp': '1.67262192369e-27',
      'mn': '1.67492749804e-27',
      'me': '9.1093837015e-31',
      'mu': '1.883531627e-28',
      'a₀': '5.29177210903e-11',
      'u': '1.6605390666e-27',
      're': '2.8179403262e-15',
      'α': '7.2973525693e-3',
      'R∞': '1.0973731568160e7',
      'F': '96485.33289',
      'μB': '9.27400999457e-24',
      'μN': '5.0507837461e-27',
      'Φ₀': '2.067833848e-15',
      'G₀': '7.748091729e-5',
      'KJ': '4.835978484e14',
      'RK': '25812.80745',
      'k': '1.380649e-23',
      'σ': '5.670374419e-8',
      'R': '8.314462618',
      'Vm': '2.2413996e-2',
      'g': '9.80665',
      'atm': '101325',
      'T₀': '273.15',
      'eV': '1.602176634e-19',
      'b': '2.897771955e-3',
      'NA·h': '3.990312714e-10',
      'c₁': '3.741771852e-16',
      'c₂': '1.438776877e-2'
    };

    // Replace constants with their numeric values
 for (const [symbol, value] of Object.entries(constantsMap)) {
      const regex = new RegExp(`(^|[^a-zA-Z0-9_])${escapeRegExp(symbol)}([^a-zA-Z0-9_]|$)`, 'g');
      calcExpr = calcExpr.replace(regex, `$1(${value})$2`);
    }

    // Convert scientific notation to evaluatable form (a*10^b)
    calcExpr = calcExpr.replace(/(\d+\.?\d*)e([+-]?\d+)/g, (match, coeff, exp) => {
      return `${coeff}*10^(${exp})`;
    });

    // Special handling for Euler's number
    calcExpr = calcExpr.replace(/([^a-zA-Z0-9_])e([^a-zA-Z0-9_]|$)/g, `$1${Math.E}$2`);


   calcExpr= calcExpr.replace(/π/g, Math.PI.toString())
                     .replace(/([^a-zA-Z0-9_])e([^a-zA-Z0-9_]|$)/g, `$1${Math.E}$2`);

    // Handle vector operations - YOUR EXISTING CODE
    if (/vect[ABC]/.test(calcExpr)) {
      const stored = JSON.parse(localStorage.getItem("vectors")) || {};
      const vectorLabels = ["vectA", "vectB", "vectC"];
      const vectorValues = {};
      
      for (let name of vectorLabels) {
        const val = stored[name];
        if (!Array.isArray(val)) throw new Error(`${name} is undefined or invalid`);
        vectorValues[name] = val;
      }

      let transformed = calcExpr.replace(/\s+/g, '');
      for (let name of vectorLabels) {
        transformed = transformed.replaceAll(name, `_v_${name}`);
      }

      transformed = transformed.replace(/\./g, '__DOT__');
      transformed = transformed.replace(/(_v_vect[ABC])__DOT__(_v_vect[ABC])/g, `__DOT__($1, $2)`);

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
        if (typeof result === "number" && /\+_v_vect[ABC]/.test(transformed)) {
          throw new Error("Cannot add scalar to vector");
        }
        return result;
      } catch (err) {
        throw new Error("Invalid vector expression: " + err.message);
      }
    }

    // Handle complex numbers and other special cases - YOUR EXISTING CODE
    if (calcExpr.startsWith("conj")) {
      const inner = expr.replace(/^conj\(?/, '').replace(/\)?$/, '');
      if (!inner) throw new Error("Invalid conj syntax");
      return complexConjugate(inner);
    }

    if (calcExpr.startsWith('arg(')) {
      const input = expr.slice(4).replace(')', '').trim();
      if (!input) throw new Error("Invalid input to arg()");
      return complexArgument(input, mode);
    }

    if (calcExpr.includes("⯈r∠θ")) {
      const [realPart] = expr.split("⯈r∠θ");
      return rectangularToPolar(realPart, mode);
    }

    if (calcExpr.includes("⯈a+bi")) {
      const match = expr.match(/^([+-]?\d*\.?\d+)\∠([+-]?\d*\.?\d+)\⯈a\+bi$/);
      if (!match) throw new Error("Invalid polar to rectangular format");
      const r = parseFloat(match[1]);
      const theta = parseFloat(match[2]);
      return polarToRectangular(r, theta, mode);
    }

    if (calcExpr.includes("∠") && !expr.includes("⯈")) {
      const match = expr.match(/^([+-]?\d*\.?\d+)\∠([+-]?\d*\.?\d+)$/);
      if (!match) throw new Error("Invalid polar format");
      const r = parseFloat(match[1]);
      const theta = parseFloat(match[2]);
      return polarToRectangular(r, theta, mode);
    }

    // Handle unit conversions - YOUR EXISTING CODE
    const unitConvPattern = /^(\d*\.?\d+)\s*([a-zA-Z]+)\s*►\s*([a-zA-Z\s().°°]+)$/;
    const matchConv = calcExpr.match(unitConvPattern);
    if (matchConv) {
      const value = matchConv[1];
      const fromTo = `${matchConv[2]} ► ${matchConv[3]}`.replace(/\s+/g, ' ').trim();
      return convertValueofConversion(value, fromTo);
    }

    // Handle custom log notation - YOUR EXISTING CODE
    if (/^logₓy->\(\s*[^,]+,\s*[^)]+\)/.test(calcExpr)) {
      const match = expr.match(/^logₓy->\(\s*([^,]+)\s*,\s*([^)]+)\)/);
      if (!match) throw new Error("Invalid logₓy->(base,value) format");
      const base = parseFloat(match[1]);
      const value = parseFloat(match[2]);

      if (isNaN(base) || isNaN(value)) throw new Error("Base or value is not a number");
      if (base <= 0 || base === 1 || value <= 0) throw new Error("Invalid base or value for logarithm");

      return Math.log(value) / Math.log(base);
    }

    if (calcExpr.includes("Ran#")) {
    // Return a random number between 0 and 1
    return Math.random();
}

if (calcExpr.includes("RandInt(")) {
    // Parse RandInt(min,max) format
    const match = expr.match(/^RandInt\((\d+),\s*(\d+)\)$/);
    if (!match) throw new Error("Invalid RandInt format. Use RandInt(min,max)");
    
    const min = parseInt(match[1]);
    const max = parseInt(match[2]);
    
    if (min >= max) throw new Error("Min must be less than max in RandInt");
    
    // Return a random integer between min and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

        if (constantsMap[displayExpr]) {
      return constantsMap[displayExpr]; // Returns exact string representation
    }

    // Default arithmetic evaluation - YOUR EXISTING CODE
    return evaluateArithmetic(calcExpr, mode);

  } catch (err) {
    console.error("Evaluation error:", err.message);
    return "Error: " + err.message;
  }
}