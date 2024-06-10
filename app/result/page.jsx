'use client'

import { useStateStore } from "../stores";
import GoBackButton from "@/components/GoBackButton";
import { useRouter } from "next/navigation";

const fromCamelCase = (str) => {
  return str
    .replace(/([A-Z])/g, ' $1') // Insert a space before each uppercase letter
    .trim() // Remove leading and trailing spaces
    .replace(/^./, (char) => char.toUpperCase()); // Capitalize the first letter
};

const Page = () => {
  const { response, unit } = useStateStore();
  const router = useRouter();
  const baseUnits = {
    pressureDropAcrossInletReducers: unit,
    pressureAtTheValveInlet: unit,
    pressureDropAcrossReducers: unit,
    pressureDropAcrossTheValveConsideringThePressureDropAcrossReducers: unit,
    chokedPressureDropAcrossTheValve: unit,
    actualPressureDropUsedForValveSizing: unit,
    requiredFlowCoefficient: unit
  };

  if (response === null) {
   router.replace('/')
   return;
  }

  // Extract the final quantity
  const finalQuantity = response.requiredFlowCoefficient;

  // Remove the final quantity from the response to only show intermediate quantities
  const { requiredFlowCoefficient, ...intermediateQuantities } = response;

  return (
    <>
    <GoBackButton/>
    <div className='mx-10 my-2'>
      <h1 className="text-primary scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Flow Coefficient Calculation Report
      </h1>
      <br/>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Intermediate Quantities</h3>
      <div className="text-base mt-4">
        {Object.keys(intermediateQuantities).map((key, index) => (
          <div key={index} className="mt-2">
            {fromCamelCase(key) + " : "}
            <strong>{intermediateQuantities[key] + " " + baseUnits[key]}</strong>
          </div>
        ))}
      </div>
      <br/><br/>
      <h3 className="text-primary scroll-m-20 text-2xl font-semibold tracking-tight">
        <strong>{"Required Flow Coefficent" + " : " + finalQuantity}</strong>
      </h3>
    </div>
    </>
  );
};

export default Page;
