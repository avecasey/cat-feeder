import React, { useState } from "react";
import { foods } from "../data/foods";

export default function CatForm({ onSubmit }) {
  // Existing states
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("male");
  const [brand, setBrand] = useState(foods[0].brand);

  // NEW states for weight management
  const [isOverweight, setIsOverweight] = useState(false);
  const [goalWeight, setGoalWeight] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare the goal weight: use the user's input if overweight, otherwise null
    const finalGoalWeight = isOverweight ? parseFloat(goalWeight) : null;

    // Pass all data, including the new fields, to the onSubmit handler
    onSubmit([parseFloat(weight), gender, brand, finalGoalWeight]);
  };

  return (
    <form onSubmit={handleSubmit} className="cat-form">
      {/* Existing Weight Input */}
      <label>
        Cat Current Weight (kg):
        <input
          type="number"
          step="0.1"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
      </label>

      {/* Existing Gender and Food Brand Inputs (Unchanged) */}
      <label>
        Gender:
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>

      <label>
        Food Brand:
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {foods.map((f) => (
            <option key={f.brand} value={f.brand}>
              {f.brand}
            </option>
          ))}
        </select>
      </label>

      {/* NEW: Overweight Checkbox */}
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={isOverweight}
          onChange={(e) => {
            setIsOverweight(e.target.checked);
            // Optional: clear goalWeight when unchecked
            if (!e.target.checked) setGoalWeight(""); 
          }}
        />
        Cat is Overweight
      </label>

      {/* NEW: Goal Weight Input (Conditional Rendering) */}
      {isOverweight && (
        <label>
          Goal Weight (kg):
          <input
            type="number"
            step="0.1"
            value={goalWeight}
            onChange={(e) => setGoalWeight(e.target.value)}
            // Make goal weight required only if the box is checked
            required 
            min="0.1" 
            max={weight} // Goal weight must be less than current weight
          />
        </label>
      )}

      <button type="submit">Calculate</button>
    </form>
  );
}