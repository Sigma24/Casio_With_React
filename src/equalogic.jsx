
  const PI = 3.141592653589793;

 export function solveTwoVariable(inputs) {
    const [a, b, c, d, e, f] = inputs;
    const det = a * e - b * d;
    if (det === 0) throw new Error("No unique solution");
    const x = (c * e - b * f) / det;
    const y = (a * f - c * d) / det;
    return [x, y];
  }

 export function solveThreeVariable(inputs) {
    const A = [
      [inputs[0], inputs[1], inputs[2], inputs[3]],
      [inputs[4], inputs[5], inputs[6], inputs[7]],
      [inputs[8], inputs[9], inputs[10], inputs[11]]
    ];

    for (let i = 0; i < 3; i++) {
      const factor = A[i][i];
      if (factor === 0) throw new Error("No unique solution");
      for (let j = 0; j < 4; j++) A[i][j] /= factor;

      for (let k = 0; k < 3; k++) {
        if (k !== i) {
          const ratio = A[k][i];
          for (let j = 0; j < 4; j++) A[k][j] -= ratio * A[i][j];
        }
      }
    }

    return [A[0][3], A[1][3], A[2][3]];
  }

 export function solveQuadratic(inputs) {
    const [a, b, c] = inputs;
    if (a === 0) throw new Error("Not a quadratic equation");
    const discriminant = b * b - 4 * a * c;

    if (discriminant > 0) {
      const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      return [root1.toString(), root2.toString()];
    } else if (discriminant === 0) {
      const root = -b / (2 * a);
      return [root.toString(), root.toString()];
    } else {
      const realPart = -b / (2 * a);
      const imagPart = Math.sqrt(-discriminant) / (2 * a);
      return [`X1=${realPart} + ${imagPart}i`, `X2=${realPart} - ${imagPart}i`];
    }
  }

 export function solveCubic(inputs) {
    const [a, b, c, d] = inputs;
    if (a === 0) throw new Error("Not a cubic equation");

    const a1 = b / a;
    const a2 = c / a;
    const a3 = d / a;

    const p = (3 * a2 - a1 * a1) / 3;
    const q = (2 * a1 * a1 * a1 - 9 * a1 * a2 + 27 * a3) / 27;
    const discriminant = (q * q) / 4 + (p * p * p) / 27;

    if (discriminant > 0) {
      const u = Math.cbrt(-q / 2 + Math.sqrt(discriminant));
      const v = Math.cbrt(-q / 2 - Math.sqrt(discriminant));
      const root = u + v - a1 / 3;
      return [root.toString()];
    } else if (discriminant === 0) {
      const u = Math.cbrt(-q / 2);
      const root1 = 2 * u - a1 / 3;
      const root2 = -u - a1 / 3;
      return [`X1=${root1.toString()}, X2=${root2.toString()}, X2=${root2.toString()}`];
    } else {
      const r = Math.sqrt(-p * p * p / 27);
      const phi = Math.acos(-q / (2 * r));
      const t = 2 * Math.cbrt(r);
      const root1 = t * Math.cos(phi / 3) - a1 / 3;
      const root2 = t * Math.cos((phi + 2 * PI) / 3) - a1 / 3;
      const root3 = t * Math.cos((phi + 4 * PI) / 3) - a1 / 3;
      return [`X1=${root1.toString()}, X2=${root2.toString()}, X3=${root3.toString()}`];
    }
  }





