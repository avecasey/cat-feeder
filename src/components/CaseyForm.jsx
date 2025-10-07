import React, { useState } from "react";
import { foods } from "../data/foods";
import { ourCats } from "../data/ourCats"; // Import the cat data

export default function CaseyForm({ onSubmit, onBack }) {
  // Set initial state to the first cat and the first food brand
  const [selectedCatName, setSelectedCatName] = useState(ourCats[0].name);
  const [brand, setBrand] = useState(foods[0].brand);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Find the selected cat's data
    const selectedCat = ourCats.find(cat => cat.name === selectedCatName);
    
    if (selectedCat) {
      // Pass the cat's weight, activity, and selected brand to the onSubmit function
      onSubmit([selectedCat.weight, selectedCat.active, selectedCat.overweight, brand]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="casey-form">
      <label>
        Select Cat:
        <select
          value={selectedCatName}
          onChange={(e) => setSelectedCatName(e.target.value)}
        >
          {ourCats.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name} ({cat.weight} lbs)
            </option>
          ))}
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

      <button type="submit">Calculate</button>
      <button type="button" onClick={onBack} style={{ marginLeft: "10px" }}>
        Back
      </button>
    </form>
  );
}