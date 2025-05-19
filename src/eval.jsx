import {
  sin, cos, tan,
  arcsin, arccos, arctan,
  sinh, cosh, tanh,
  arcsinh, arccosh, arctanh
} from './trigono'; 

export function evaluateExpression(expr) {
  try {
    if (expr.startsWith("sin(") && expr.endsWith(")")) {
      const value = parseFloat(expr.slice(4, -1));
      return sin(value);
    } else if (expr.startsWith("cos(") && expr.endsWith(")")) {
      const value = parseFloat(expr.slice(4, -1));
      return cos(value);
    } else if (expr.startsWith("tan(") && expr.endsWith(")")) {
      const value = parseFloat(expr.slice(4, -1));
      const result = tan(value);
      if (isNaN(result) || !isFinite(result)) throw new Error("Invalid tan result");
      return result;
    } else if (expr.startsWith("arcsin(") && expr.endsWith(")")) {
      const value = parseFloat(expr.slice(7, -1));
      if (value < -1 || value > 1) throw new Error("arcsin input out of range");
      return arcsin(value);
    } else if (expr.startsWith("arccos(") && expr.endsWith(")")) {
      const value = parseFloat(expr.slice(7, -1));
      if (value < -1 || value > 1) throw new Error("arccos input out of range");
      return arccos(value);
    } else if (expr.startsWith("arctan(") && expr.endsWith(")")) {
      const value = parseFloat(expr.slice(7, -1));
      return arctan(value);
    } else if (expr.startsWith("sinh(") && expr.endsWith(")")) {
      const value = parseFloat(expr.slice(5, -1));
      return sinh(value);
    } else if (expr.startsWith("cosh(") && expr.endsWith(")")) {
      const value = parseFloat(expr.slice(5, -1));
      return cosh(value);
    } else if (expr.startsWith("tanh(") && expr.endsWith(")")) {
      const value = parseFloat(expr.slice(5, -1));
      return tanh(value);
    } else if (expr.startsWith("arcsinh(") && expr.endsWith(")")) {
      const value = parseFloat(expr.slice(8, -1));
      return arcsinh(value);
    } else if (expr.startsWith("arccosh(") && expr.endsWith(")")) {
      const value = parseFloat(expr.slice(8, -1));
      if (value < 1) throw new Error("arccosh input out of range");
      return arccosh(value);
    } else if (expr.startsWith("arctanh(") && expr.endsWith(")")) {
      const value = parseFloat(expr.slice(8, -1));
      if (value <= -1 || value >= 1) throw new Error("arctanh input out of range");
      return arctanh(value);
    } else {
      throw new Error("Unsupported Expression");
    }
  } catch (err) {
    console.error(err.message);
    return "Error";
  }
}