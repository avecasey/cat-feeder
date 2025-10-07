import React, { useState } from "react";
import { foods } from "../data/foods";

export default function CatForm({ onSubmit }) {
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("male");
  const [brand, setBrand] = useState(foods[0].brand);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit([parseFloat(weight), gender, brand]);
  };

  return (
    <form onSubmit={handleSubmit} className="cat-form">
      <label>
        Cat Weight (kg):
        <input
          type="number"
          step="0.1"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
      </label>

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

      <button type="submit">Calculate</button>
    </form>
  );
}
