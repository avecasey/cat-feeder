export default function ResultCard({ result }) {
    // Ensure we safely access properties (using nullish coalescing for safety)
    const dailyKcal = result.dailyKcal ?? 0;
    const cupsPerDay = result.cupsPerDay ?? 0;
  
    return (
      <div className="result-card">
        <h2>Feeding Recommendation</h2>
        
        {result.isWeightLoss && (
          <p className="weight-loss-note">
            **This is a Weight Loss calculation.** <br />
            Calories are based on a **{result.weightUsed.toFixed(1)} kg** target weight.
          </p>
        )}
  
        <p>Daily Calories: **{dailyKcal.toFixed(0)}** kcal</p>
        <p>Daily Food: **{cupsPerDay.toFixed(2)}** cups</p>
  
        {/* Add a button to reset the calculation if needed */}
      </div>
    );
  }