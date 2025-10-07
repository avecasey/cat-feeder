// import React, { useState } from "react";
// import { foods } from "./data/foods";
// import CatForm from "./components/CatForm";
// import ResultCard from "./components/ResultCard";
// import "./App.css";

// export default function App() {
//   const [catData, setCatData] = useState(null);

//   const calculateFeeding = (weight, gender, brand) => {
//     const food = foods.find((f) => f.brand === brand);
//     const kcalPerGram = food?.kcalPerGram ?? 3.6;

//     // Basic calorie formula (approximation)
//     const RER = 70 * Math.pow(weight, 0.75);
//     const multiplier = gender === "male" ? 1.2 : 1.0;
//     const dailyKcal = RER * multiplier;
//     const gramsPerDay = dailyKcal / kcalPerGram;

//     return { dailyKcal, gramsPerDay };
//   };

//   return (
//     <div className="app">
//       <h1>🐱 Cat Feeding Calculator</h1>
//       <CatForm onSubmit={(data) => setCatData(calculateFeeding(...data))} />
//       {catData && <ResultCard result={catData} />}
//     </div>
//   );
// }

import React, { useState } from "react";
import { foods } from "./data/foods";
import CatForm from "./components/CatForm";
import CaseyForm from "./components/CaseyForm"; // Import CaseyForm
import ResultCard from "./components/ResultCard";
import "./App.css";

// Define an enum or constants for view states for clarity
const VIEWS = {
  DEFAULT: "default",
  CASEY: "casey",
};

export default function App() {
  const [catData, setCatData] = useState(null);
  // New state to track the current view (Default Form or Casey's Form)
  const [currentView, setCurrentView] = useState(VIEWS.DEFAULT);

  const calculateFeeding = (weight, gender, brand) => {
    const food = foods.find((f) => f.brand === brand);
    // Use optional chaining with a nullish coalescing operator for safety
    const kcalPerGram = food?.kcalPerGram ?? 3.6; 

    // Basic calorie formula (approximation)
    // RER (Resting Energy Requirement)
    const RER = 70 * Math.pow(weight, 0.75); 
    // Multiplier for intact male (1.2) vs. spayed/neutered or female (1.0) - simplified
    const multiplier = gender === "male" ? 1.2 : 1.0; 
    const dailyKcal = RER * multiplier;
    const gramsPerDay = dailyKcal / kcalPerGram;

    return { dailyKcal, gramsPerDay };
  };

  const handleCalculate = (data) => {
    // data is the array [weight, gender, brand]
    setCatData(calculateFeeding(...data));
  };
  
  // Logic to render the correct form/view
  const renderContent = () => {
    // If a result is calculated, show the ResultCard
    if (catData) {
      return <ResultCard result={catData} />;
    }

    // If no result, show the appropriate form or the initial buttons
    if (currentView === VIEWS.CASEY) {
      return (
        <CaseyForm 
          onSubmit={handleCalculate} 
          onBack={() => setCurrentView(VIEWS.DEFAULT)} // Button to go back
        />
      );
    } 
    
    // Default View: Show the initial button and the standard form
    return (
      <>
        <button 
          onClick={() => setCurrentView(VIEWS.CASEY)} 
          style={{ marginBottom: '20px', padding: '10px 20px', fontSize: '1.2em' }}
        >
          I am Casey
        </button>
        <CatForm onSubmit={handleCalculate} />
      </>
    );
  };


  return (
    <div className="app">
      <h1>🐱 Cat Feeding Calculator</h1>
      {/* Button to clear the result and go back to the default view */}
      {catData && (
        <button 
          onClick={() => setCatData(null)}
          style={{ marginBottom: '20px' }}
        >
          New Calculation
        </button>
      )}
      {renderContent()}
    </div>
  );
}