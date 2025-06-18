
import React from "react";
import "./conv.css";

const ConvBtnMenu = ({ showConvMenu, setShowConvMenu, resetshift,setInput }) => {
  
const conversions = [
  "in ► cm", "cm ► in",
  "ft ► m", "m ► ft",
  "yd ► m", "m ► yd",
  "mile ► km", "km ► mile",
  "n mile ► m", "m ► n mile",
  "acre ► m²", "m² ► acre",
  "gal (US) ► ℓ", "ℓ ► gal (US)",
  "gal (UK) ► ℓ", "ℓ ► gal (UK)",
  "pc ► km", "km ► pc",
  "km/h ► m/s", "m/s ► km/h",
  "oz ► g", "g ► oz",
  "lb ► kg", "kg ► lb",
  "atm ► Pa", "Pa ► atm",
  "mmHg ► Pa", "Pa ► mmHg",
  "hp ► kW", "kW ► hp",
  "kgf/cm² ► Pa", "Pa ► kgf/cm²",
  "kgf·m ► J", "J ► kgf·m",
  "lbf/in² ► kPa", "kPa ► lbf/in²",
  "°F ► °C", "°C ► °F",
  "J ► cal", "cal ► J"
];


  const handleConversionClick = (conversion) => {
    console.log("Selected Conversion:", conversion);
    setShowConvMenu(false);
    setInput(inp=>inp+conversion)
    resetshift();
  };

  return (
    <>
      {showConvMenu && (
        <div className="menu">
          <a href="#" className="cancel" onClick={() => setShowConvMenu(false)}>
            Cancel
          </a>
          <p className="menu-title">SELECT CONVERSION</p>
          <ul className="menu-list">
            {conversions.map((conversion, index) => (
              <li key={index} className="menu-item" onClick={() => handleConversionClick(conversion)}>
                {index + 1}: {conversion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ConvBtnMenu;



export function convertValueofConversion(value, conversionLabel) {
  const factorMap = {
    "in ► cm": 2.54,
    "cm ► in": 1 / 2.54,
    "ft ► m": 0.3048,
    "m ► ft": 1 / 0.3048,
    "yd ► m": 0.9144,
    "m ► yd": 1 / 0.9144,
    "mile ► km": 1.60934,
    "km ► mile": 1 / 1.60934,
    "n mile ► m": 1852,
    "m ► n mile": 1 / 1852,
    "acre ► m²": 4046.86,
    "m² ► acre": 1 / 4046.86,
    "gal (US) ► ℓ": 3.78541,
    "ℓ ► gal (US)": 1 / 3.78541,
    "gal (UK) ► ℓ": 4.54609,
    "ℓ ► gal (UK)": 1 / 4.54609,
    "pc ► km": 3.0857e13,
    "km ► pc": 1 / 3.0857e13,
    "km/h ► m/s": 0.277778,
    "m/s ► km/h": 1 / 0.277778,
    "oz ► g": 28.3495,
    "g ► oz": 1 / 28.3495,
    "lb ► kg": 0.453592,
    "kg ► lb": 1 / 0.453592,
    "atm ► Pa": 101325,
    "Pa ► atm": 1 / 101325,
    "mmHg ► Pa": 133.322,
    "Pa ► mmHg": 1 / 133.322,
    "hp ► kW": 0.7457,
    "kW ► hp": 1 / 0.7457,
    "kgf/cm² ► Pa": 98066.5,
    "Pa ► kgf/cm²": 1 / 98066.5,
    "kgf·m ► J": 9.80665,
    "J ► kgf·m": 1 / 9.80665,
    "lbf/in² ► kPa": 6.89476,
    "kPa ► lbf/in²": 1 / 6.89476,
    "°F ► °C": 5/9,  
    "°C ► °F": 9/5 , 
    "J ► cal": 0.239006,
    "cal ► J": 1 / 0.239006
  };

  const num = parseFloat(value);
  if (isNaN(num)) throw new Error("Invalid numeric input.");

  const factor = factorMap[conversionLabel.trim()];
  if (factor === undefined) throw new Error("Unsupported conversion.");

  // handle temp conversions separately
  if (conversionLabel === "°F ► °C") {
    return +(((num - 32) * factor).toFixed(6));
  }
  if (conversionLabel === "°C ► °F") {
    return +((num * factor + 32).toFixed(6));
  }

  return +(num * factor).toFixed(6);
}

