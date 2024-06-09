'use client'

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";


export default function Trial() {
  const router = useRouter();

  const environment = process.env.NODE_ENV;
  const baseUrl = environment === 'production'
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : process.env.NEXT_PUBLIC_DEVELOPMENT_BACKEND_URL;
  const protocol = environment === 'production' ? 'https' : 'http';
  const backendUrl = (endpoint) => `${protocol}://${baseUrl}${endpoint}`;

  console.log("Environment:", environment);
  console.log("Base URL:", baseUrl);
  console.log("Backend URL:", backendUrl('/flowRate'));

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
    "flowRate": ["gal/min","m3/h","l/h"],
    "inletPressure": ["psia","psi","bar", "kPa"],
    "pressureDrop": ["psi","bar","kPa"],
    "specificGravity": ["unitless"],
    "vapourPressure": ["psia","psi","bar", "kPa"],
    "criticalPressure": ["psia","psi","bar", "kPa"],
    "recoveryFactor": ["unitless","%"],
    "lineDiameter": ["in", "mm"],
    "valveDiameter": ["in", "mm"]
  };

  function fromCamelCase(str) {
    return str
        .replace(/([A-Z])/g, ' $1') // Insert a space before each uppercase letter
        .trim() // Remove leading and trailing spaces
        .replace(/^./, str[0].toUpperCase()); // Capitalize the first letter
  }

  const initialFormData = {};
  const initialSelectedUnits = {};
  const initialErrors = {};

  // Initialize form data, selected units, and errors objects dynamically
  quantities.forEach(quantity => {
    initialFormData[quantity] = "";
    initialSelectedUnits[quantity] = units[quantity][0]; // Set default unit
    initialErrors[quantity] = ""; // Initialize error messages as empty
  });

  const [formData, setFormData] = useState(initialFormData);
  const [selectedUnit, setSelectedUnit] = useState(initialSelectedUnits);
  const [errors, setErrors] = useState(initialErrors);

  const handleSelectChange = (quantity, value) => {
    setSelectedUnit((prev) => ({ ...prev, [quantity]: value }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // Validate input to ensure it is a number
    const numberValue = parseFloat(value);
    if (isNaN(numberValue)) {
      setErrors((prev) => ({ ...prev, [id]: "Value must be a number" }));
    } else {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Check for any validation errors
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      console.error('Validation errors:', errors);
      return;
    }

    const combinedData = {formData, selectedUnit};

    console.log(combinedData);

    try {
      const response = await fetch(backendUrl('/flowRate'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedData),
      });

      const result = await response.json();
      localStorage.setItem("response", JSON.stringify(result));
      localStorage.setItem("unit", selectedUnit['inletPressure']);


      router.push(`/result`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClear = () => {
    setFormData(initialFormData);
    setSelectedUnit(initialSelectedUnits);
    setErrors(initialErrors);
  };

  const handleFillSampleData = () => {
    const sampleData = {
      flowRate: '8069.6721',
      inletPressure: '100',
      pressureDrop: '3.107',
      specificGravity: '1',
      vapourPressure: '1',
      criticalPressure: '3.208',
      recoveryFactor: '0.27',
      lineDiameter: '24',
      valveDiameter: '12'
    };

    const sampleUnits = {
      flowRate: 'gal/min',
      inletPressure: 'psia',
      pressureDrop: 'psi',
      specificGravity: 'unitless',
      vapourPressure: 'psia',
      criticalPressure: 'psia',
      recoveryFactor: 'unitless',
      lineDiameter: 'in',
      valveDiameter: 'in'
    };

    setFormData(sampleData);
    setSelectedUnit(sampleUnits);
    setErrors(initialErrors);
  };

  return (
    <div className="m-10">
      <h1 className="text-primary scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Control Valve Sizing
      </h1>
      <div className="text-lg font-semibold">Demo: Liquid, Full port ball valve, 100% travel</div>
      <br/>
      <form onSubmit={handleSubmit}>
        <div className="grid w-full items-center gap-4">
          {quantities.map((quantity) => (
            <div key={quantity} className="flex items-center space-x-4">
              <Label htmlFor={quantity} className="font-semibold w-40">{fromCamelCase(quantity) + ":"}</Label>
              <Select
                onValueChange={(value) => handleSelectChange(quantity, value)}
                value={selectedUnit[quantity]} // Controlled select component
                defaultValue={units[quantity][0]}
              >
                <SelectTrigger id={quantity} className="w-32">
                  <SelectValue placeholder="select unit" />
                </SelectTrigger>
                <SelectContent position="popper">
                {
                  units[quantity].map((unit) => (
                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                  ))
                }
                </SelectContent>
              </Select>
              <Input
                id={quantity}
                placeholder={`Enter ${fromCamelCase(quantity)}`}
                value={formData[quantity]}
                onChange={handleInputChange}
                className="w-64"
                required
              />
              {errors[quantity] && (
                <small className="text-primary text-sm font-medium leading-none">{errors[quantity]}</small>
              )}
            </div>
          ))}
        </div>
        <div className="w-[575px] flex justify-between items-center mt-7">
          <Button variant="outline" type="button" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="outline" type="button" onClick={handleFillSampleData}>
            Fill Sample Data
          </Button>
          <Button type="submit">Calculate Cv</Button>
        </div>
      </form>
    </div>
  );
}
