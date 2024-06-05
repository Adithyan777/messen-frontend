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
  const router = useRouter()
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

  // Initialize form data and selected units objects dynamically
  quantities.forEach(quantity => {
    initialFormData[quantity] = "";
    initialSelectedUnits[quantity] = units[quantity][0]; // Set default unit
  });

  const [formData, setFormData] = useState(initialFormData);
  const [selectedUnit, setSelectedUnit] = useState(initialSelectedUnits);

  const handleSelectChange = (quantity, value) => {
    setSelectedUnit((prev) => ({ ...prev, [quantity]: value }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const combinedData = {formData,selectedUnit};
    // quantities.forEach(quantity => {
    //   combinedData[quantity] = `${formData[quantity]} ${selectedUnit[quantity]}`;
    // });

    console.log(combinedData);

    try {
      const response = await fetch('http://localhost:8080/flowRate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedData),
      });

      const result = await response.json();
      localStorage.setItem("response" , JSON.stringify(result));
      localStorage.setItem("unit",selectedUnit['inletPressure']);

      // Navigate to result page with query parameters
      router.push(`/result`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClear = () => {
    setFormData(initialFormData);
    setSelectedUnit(initialSelectedUnits);
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
            </div>
          ))}
        </div>
        <div className="w-[575px] flex justify-between items-center mt-7">
          <Button variant="outline" type="button" onClick={handleClear}>
            Clear
          </Button>
          <Button type="submit">Calculate Cv</Button>
        </div>
      </form>
    </div>
  );
}