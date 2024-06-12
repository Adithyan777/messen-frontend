'use client';

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useStateStore } from "@/app/stores";

export default function Trial() {
  const router = useRouter();

  const environment = process.env.NODE_ENV;
  const baseUrl = environment === 'production'
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : process.env.NEXT_PUBLIC_DEVELOPMENT_BACKEND_URL;
  const protocol = environment === 'production' ? 'https' : 'http';
  const backendUrl = (endpoint) => `${protocol}://${baseUrl}${endpoint}`;

  const {
    formData,
    selectedUnit,
    errors,
    quantities,
    units,
    handleSelectChange,
    handleInputChange,
    handleClear,
    handleFillSampleData,
    setResponse
  } = useStateStore();

  useEffect(() => {
    setResponse(null, "");
  }, []);

  function fromCamelCase(str) {
    return str
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .replace(/^./, str[0].toUpperCase());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      console.error('Validation errors:', errors);
      return;
    }

    const combinedData = { formData, selectedUnit };

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
      setResponse(result, selectedUnit['inletPressure']);

      router.push(`/result`);
    } catch (error) {
      console.error('Error:', error);
    }
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
              <Label htmlFor={quantity} className="font-semibold w-40">
                {fromCamelCase(quantity) + ":"}
              </Label>
              <Select
                onValueChange={(value) => handleSelectChange(quantity, value)}
                value={selectedUnit[quantity]}
                defaultValue={units[quantity][0]}
              >
                <SelectTrigger id={quantity} className="w-32">
                  <SelectValue placeholder="select unit" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {units[quantity].map((unit) => (
                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id={quantity}
                placeholder={`Enter ${fromCamelCase(quantity)}`}
                value={formData[quantity]}
                onChange={(e) => handleInputChange(e.target.id, e.target.value)}
                className="w-64"
                required
              />
              {errors[quantity] && (
                <small className="text-primary text-sm font-medium leading-none">
                  {errors[quantity]}
                </small>
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
