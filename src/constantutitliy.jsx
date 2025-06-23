// constants.js
export const constants = [
  { name: "Speed of light in vacuum", symbol: "c", value: "2.99792458 × 10⁸ m/s" },
  { name: "Magnetic constant", symbol: "μ₀", value: "4π × 10⁻⁷ N/A²" },
  { name: "Electric constant", symbol: "ε₀", value: "8.854187817 × 10⁻¹² F/m" },
  { name: "Gravitational constant", symbol: "G", value: "6.67430 × 10⁻¹¹ N·m²/kg²" },
  { name: "Planck constant", symbol: "h", value: "6.62607015 × 10⁻³⁴ Js" },
  { name: "Rationalized Planck constant", symbol: "ħ", value: "1.054571817 × 10⁻³⁴ Js" },
  { name: "Planck mass", symbol: "mₚ", value: "2.176434 × 10⁻⁸ kg" },
  { name: "Elementary charge", symbol: "e", value: "1.602176634 × 10⁻¹⁹ C" },
  { name: "Coulomb's constant", symbol: "kₑ", value: "8.9875517923 × 10⁹ N·m²/C²" },
  { name: "Avogadro constant", symbol: "Nₐ", value: "6.02214076 × 10²³ mol⁻¹" },
  { name: "Proton mass", symbol: "mp", value: "1.67262192369 × 10⁻²⁷ kg" },
  { name: "Neutron mass", symbol: "mn", value: "1.67492749804 × 10⁻²⁷ kg" },
  { name: "Electron mass", symbol: "me", value: "9.1093837015 × 10⁻³¹ kg" },
  { name: "Muon mass", symbol: "mu", value: "1.883531627 × 10⁻²⁸ kg" },
  { name: "Bohr radius", symbol: "a₀", value: "5.29177210903 × 10⁻¹¹ m" },
  { name: "Atomic mass constant", symbol: "u", value: "1.66053906660 × 10⁻²⁷ kg" },
  { name: "Classical electron radius", symbol: "re", value: "2.8179403262 × 10⁻¹⁵ m" },
  { name: "Fine-structure constant", symbol: "α", value: "7.2973525693 × 10⁻³" },
  { name: "Rydberg constant", symbol: "R∞", value: "1.0973731568160 × 10⁷ m⁻¹" },
  { name: "Faraday constant", symbol: "F", value: "96485.33289 C/mol" },
  { name: "Bohr magneton", symbol: "μB", value: "9.27400999457 × 10⁻²⁴ J/T" },
  { name: "Nuclear magneton", symbol: "μN", value: "5.0507837461 × 10⁻²⁷ J/T" },
  { name: "Magnetic flux quantum", symbol: "Φ₀", value: "2.067833848 × 10⁻¹⁵ Wb" },
  { name: "Conductance quantum", symbol: "G₀", value: "7.748091729 × 10⁻⁵ S" },
  { name: "Josephson constant", symbol: "KJ", value: "4.835978484 × 10¹⁴ Hz/V" },
  { name: "Von Klitzing constant", symbol: "RK", value: "25812.80745 Ω" },
  { name: "Boltzmann constant", symbol: "k", value: "1.380649 × 10⁻²³ J/K" },
  { name: "Stefan–Boltzmann constant", symbol: "σ", value: "5.670374419 × 10⁻⁸ W·m⁻²·K⁻⁴" },
  { name: "Gas constant", symbol: "R", value: "8.314462618 J/mol·K" },
  { name: "Molar volume of ideal gas", symbol: "Vm", value: "2.2413996 × 10⁻² m³/mol" },
  { name: "Standard gravity", symbol: "g", value: "9.80665 m/s²" },
  { name: "Standard atmosphere", symbol: "atm", value: "101325 Pa" },
  { name: "Standard temperature", symbol: "T₀", value: "273.15 K" },
  { name: "Electron volt", symbol: "eV", value: "1.602176634 × 10⁻¹⁹ J" },
  { name: "Unified atomic mass unit", symbol: "u", value: "1.66053906660 × 10⁻²⁷ kg" },
  { name: "Molar volume (STP)", symbol: "Vm", value: "22.413996 × 10⁻³ m³/mol" },
  { name: "Wien displacement constant", symbol: "b", value: "2.897771955 × 10⁻³ m·K" },
  { name: "Molar Planck constant", symbol: "NA·h", value: "3.990312714 × 10⁻¹⁰ J·s/mol" },
  { name: "First radiation constant", symbol: "c₁", value: "3.741771852 × 10⁻¹⁶ W·m²" },
  { name: "Second radiation constant", symbol: "c₂", value: "1.438776877 × 10⁻² m·K" }
];
export const constantsMap = constants.reduce((map, constant) => {
  map.set(constant.symbol, normalizeConstantValue(constant.value));
  return map;
}, new Map());

export function normalizeConstantValue(raw) {
  return raw
    .replace(/×/g, '*')
    .replace(/⁻/g, '-')
    .replace(/\s+/g, '')
    .replace(/⁰/g, '0')
    .replace(/¹/g, '1')
    .replace(/²/g, '2')
    .replace(/³/g, '3')
    .replace(/⁴/g, '4')
    .replace(/⁵/g, '5')
    .replace(/⁶/g, '6')
    .replace(/⁷/g, '7')
    .replace(/⁸/g, '8')
    .replace(/⁹/g, '9')
    .replace(/π/g, Math.PI.toString());
}