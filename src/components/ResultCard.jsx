export default function ResultCard({ result }) {
    const { dailyKcal, gramsPerDay } = result;
    return (
      <div className="result-card">
        <h2>Feeding Recommendation</h2>
        <p>Daily calories: {dailyKcal.toFixed(0)} kcal</p>
        <p>Daily food: {gramsPerDay.toFixed(1)} grams</p>
        <p>
          Suggestion: Feed twice a day (~
          {(gramsPerDay / 2).toFixed(1)} g per meal)
        </p>
      </div>
    );
  }
  