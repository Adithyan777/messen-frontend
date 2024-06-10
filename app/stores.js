import { create } from 'zustand';

const quantities = [
  "flowRate",
  "inletPressure",
  "pressureDrop",
  "specificGravity",
  "vapourPressure",
  "criticalPressure",
  "recoveryFactor",
  "lineDiameter",
  "valveDiameter"
];

const units = {
  "flowRate": ["gal/min", "m3/h", "l/h"],
  "inletPressure": ["psia", "psi", "bar", "kPa"],
  "pressureDrop": ["psi", "bar", "kPa"],
  "specificGravity": ["unitless"],
  "vapourPressure": ["psia", "psi", "bar", "kPa"],
  "criticalPressure": ["psia", "psi", "bar", "kPa"],
  "recoveryFactor": ["unitless", "%"],
  "lineDiameter": ["in", "mm"],
  "valveDiameter": ["in", "mm"]
};

const initialFormData = {};
const initialSelectedUnits = {};
const initialErrors = {};

// Initialize form data, selected units, and errors objects dynamically
quantities.forEach(quantity => {
  initialFormData[quantity] = "";
  initialSelectedUnits[quantity] = units[quantity][0]; // Set default unit
  initialErrors[quantity] = ""; // Initialize error messages as empty
});

export const useStateStore = create(set => ({
  formData: initialFormData,
  selectedUnit: initialSelectedUnits,
  errors: initialErrors,
  response: null,
  unit: "",
  quantities,
  units,
  handleSelectChange: (quantity, value) => set(state => ({
    selectedUnit: { ...state.selectedUnit, [quantity]: value }
  })),
  handleInputChange: (id, value) => set(state => {
    const numberValue = parseFloat(value);
    return {
      formData: { ...state.formData, [id]: value },
      errors: { ...state.errors, [id]: isNaN(numberValue) ? "Value must be a number" : "" }
    };
  }),
  handleClear: () => set({
    formData: initialFormData,
    selectedUnit: initialSelectedUnits,
    errors: initialErrors,
    response : null,
    unit: ""
  }),
  handleFillSampleData: () => set({
    formData: {
      flowRate: '2.746',
      inletPressure: '146',
      pressureDrop: '1',
      specificGravity: '1',
      vapourPressure: '0.03158',
      criticalPressure: '220.5',
      recoveryFactor: '0.9',
      lineDiameter: '25',
      valveDiameter: '24'
    },
    selectedUnit: {
      flowRate: 'm3/h',
      inletPressure: 'psi',
      pressureDrop: 'psi',
      specificGravity: 'unitless',
      vapourPressure: 'bar',
      criticalPressure: 'bar',
      recoveryFactor: 'unitless',
      lineDiameter: 'mm',
      valveDiameter: 'mm'
    },
    errors: initialErrors
  }),
  setResponse: (response, unit) => set({ response, unit })
}));
