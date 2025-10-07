import React, { useState } from "react";
import { foods } from "./data/foods";
import CatForm from "./components/CatForm";
import ResultCard from "./components/ResultCard";
import "./App.css";

export default function App() {
  const [catData, setCatData] = useState(null);

  const calculateFeeding = (weight, gender, brand) => {
    const food = foods.find((f) => f.brand === brand);
    const kcalPerGram = food?.kcalPerGram ?? 3.6;

    // Basic calorie formula (approximation)
    const RER = 70 * Math.pow(weight, 0.75);
    const multiplier = gender === "male" ? 1.2 : 1.0;
    const dailyKcal = RER * multiplier;
    const gramsPerDay = dailyKcal / kcalPerGram;

    return { dailyKcal, gramsPerDay };
  };

  return (
    <div className="app">
      <h1>🐱 Cat Feeding Calculator</h1>
      <CatForm onSubmit={(data) => setCatData(calculateFeeding(...data))} />
      {catData && <ResultCard result={catData} />}
    </div>
  );
}
