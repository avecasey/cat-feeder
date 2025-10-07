import React, { useState } from "react";
import { foods } from "./data/foods";
import CatForm from "./components/CatForm";
import ResultCard from "./components/ResultCard";
import "./App.css";

// You will also need to update CaseyForm and its handler later, but starting with CatForm:

export default function App() {
  const [catData, setCatData] = useState(null);

  // NOTE: Added 'goalWeight' to the parameters here
  const calculateFeeding = (weight, gender, brand, goalWeight = null) => {
    const food = foods.find((f) => f.brand === brand);
    const kcalPerCup = food?.kcalPerCup ?? 3.6;

    // --- Core Logic Change Here ---
    
    // 1. Determine the weight to use in the RER calculation:
    //    Use goalWeight if provided (for weight loss), otherwise use the current weight.
    const weightForCalculation = goalWeight !== null && goalWeight < weight
      ? goalWeight
      : weight;

    // 2. Determine the Calorie Multiplier:
    let multiplier;
    if (goalWeight !== null && goalWeight < weight) {
      // If aiming for weight loss, use a specific weight loss multiplier (0.8 to 1.0)
      multiplier = 1.0; 
      // Vets often recommend 0.8 for strict weight loss, 1.0 for maintenance/obese prone
    } else {
      // Otherwise, use the standard maintenance multipliers (simplified for this app)
      multiplier = gender === "male" ? 1.2 : 1.0;
    }
    // --- End Core Logic Change ---


    // Basic calorie formula (RER and DER)
    const RER = 70 * Math.pow(weightForCalculation, 0.75); 
    const dailyKcal = RER * multiplier;
    const cupsPerDay = dailyKcal / kcalPerCup;
    
    // Pass the goal weight info for display in the ResultCard
    return { 
      dailyKcal, 
      cupsPerDay,
      isWeightLoss: goalWeight !== null && goalWeight < weight,
      weightUsed: weightForCalculation
    };
  };

  return (
    <div className="app">
      <h1>🐱 Cat Feeding Calculator</h1>
      {/* Updated onSubmit to handle the new array of arguments */}
      <CatForm onSubmit={(data) => setCatData(calculateFeeding(...data))} />
      
      {catData && <ResultCard result={catData} />}
    </div>
  );
}