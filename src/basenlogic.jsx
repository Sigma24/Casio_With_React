

export function logicGate(gate, input1, input2 = null) {

  const normalize = (val) => (val ? 1 : 0);

  switch (gate.toLowerCase()) {
    case "and":
      return normalize(input1) & normalize(input2);

    case "or":
      return normalize(input1) | normalize(input2);

    case "xor":
      return normalize(input1) ^ normalize(input2);

    case "xnor":
      return Number(!(normalize(input1) ^ normalize(input2)));

    case "not":
      return normalize(input1) ? 0 : 1;

    case "neg":
      return -input1; 

    default:
      return "Invalid gate";
  }
}


