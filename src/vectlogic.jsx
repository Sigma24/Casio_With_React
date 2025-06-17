  const VectorOperations = {
    parseVector: (vector) => {
      return vector?.map(v => parseFloat(v)).filter(v => !isNaN(v)) || null;
    },

    allSameSize: (vectors) => {
      const sizes = vectors.map(v => v.length);
      return new Set(sizes).size === 1;
    },

    addVectors: (...vectors) => {
      const parsed = vectors.map(v => VectorOperations.parseVector(v)).filter(v => v);
      if (parsed.length < 2 || parsed.length > 3) return null;
      if (!VectorOperations.allSameSize(parsed)) return null;

      return parsed.reduce((acc, curr) => acc.map((val, i) => val + curr[i]));
    },

    subtractVectors: (...vectors) => {
      const parsed = vectors.map(v => VectorOperations.parseVector(v)).filter(v => v);
      if (parsed.length < 2 || parsed.length > 3) return null;
      if (!VectorOperations.allSameSize(parsed)) return null;

      return parsed.reduce((acc, curr) => acc.map((val, i) => val - curr[i]));
    },

    dotProduct: (vec1, vec2) => {
      const v1 = VectorOperations.parseVector(vec1);
      const v2 = VectorOperations.parseVector(vec2);
      if (!v1 || !v2 || v1.length !== v2.length) return null;
      return v1.reduce((sum, val, i) => sum + val * v2[i], 0);
    }
  };

  return null;
