// Core Scoring Engine Logic
// Preserves transparency and explainability as requested

export interface FinancialData {
  avgIncome: number;
  incomeStdDev: number; // Stability measure
  expenseRatio: number; // 0-1
  savingsRate: number; // 0-1
  billPaymentRatio: number; // 0-1
  spendingVolatility: number; // Lower is better
}

export interface ScoreResult {
  score: number;
  riskCategory: "Low" | "Moderate" | "High" | "Critical";
  factors: {
    name: string;
    score: number; // Contribution to total
    maxPossible: number;
    explanation: string;
  }[];
}

export const SCORING_WEIGHTS = {
  income: 0.25,
  stability: 0.15,
  savings: 0.20,
  expenses: 0.20,
  paymentHistory: 0.20,
};

export function calculateCreditScore(data: FinancialData): ScoreResult {
  // Base Score: 300
  let totalScore = 300;
  const MAX_ADDITIONAL_POINTS = 600; // 300 + 600 = 900 Max

  const factors = [];

  // 1. Income Factor (Max 150 pts)
  // Logic: Higher income -> Higher score, capped at $10k/mo for max points
  const incomeScore = Math.min(data.avgIncome / 10000, 1) * (MAX_ADDITIONAL_POINTS * SCORING_WEIGHTS.income);
  totalScore += incomeScore;
  factors.push({
    name: "Income Level",
    score: Math.round(incomeScore),
    maxPossible: MAX_ADDITIONAL_POINTS * SCORING_WEIGHTS.income,
    explanation: data.avgIncome > 5000 ? "Strong income level supports creditworthiness." : "Income level indicates limited repayment capacity."
  });

  // 2. Stability (Income Std Dev) (Max 90 pts)
  // Logic: Lower deviation relative to mean is better.
  const cv = data.incomeStdDev / (data.avgIncome || 1); // Coefficient of Variation
  const stabilityMultiplier = Math.max(0, 1 - cv); // 1.0 if stable, 0.0 if highly volatile
  const stabilityScore = stabilityMultiplier * (MAX_ADDITIONAL_POINTS * SCORING_WEIGHTS.stability);
  totalScore += stabilityScore;
  factors.push({
    name: "Income Stability",
    score: Math.round(stabilityScore),
    maxPossible: MAX_ADDITIONAL_POINTS * SCORING_WEIGHTS.stability,
    explanation: cv < 0.2 ? "Income is highly stable and predictable." : "Income volatility poses a risk for consistent repayment."
  });

  // 3. Savings Rate (Max 120 pts)
  // Logic: >20% savings is ideal
  const savingsMultiplier = Math.min(data.savingsRate / 0.20, 1);
  const savingsScore = savingsMultiplier * (MAX_ADDITIONAL_POINTS * SCORING_WEIGHTS.savings);
  totalScore += savingsScore;
  factors.push({
    name: "Savings Habits",
    score: Math.round(savingsScore),
    maxPossible: MAX_ADDITIONAL_POINTS * SCORING_WEIGHTS.savings,
    explanation: data.savingsRate > 0.15 ? "Healthy savings buffer available." : "Low savings rate indicates vulnerability to shocks."
  });

  // 4. Expense Ratio (Max 120 pts)
  // Logic: Lower is better. <30% is ideal, >80% is 0 points.
  const expenseScoreCalc = Math.max(0, 1 - (data.expenseRatio - 0.3) / 0.5); // Simplified linear decay
  const expenseScore = Math.min(expenseScoreCalc, 1) * (MAX_ADDITIONAL_POINTS * SCORING_WEIGHTS.expenses);
  totalScore += expenseScore;
  factors.push({
    name: "Expense Burden",
    score: Math.round(expenseScore),
    maxPossible: MAX_ADDITIONAL_POINTS * SCORING_WEIGHTS.expenses,
    explanation: data.expenseRatio < 0.5 ? "Low fixed expenses relative to income." : "High fixed costs reduce repayment flexibility."
  });

  // 5. Bill Payment History (Max 120 pts)
  // Logic: 100% payment is critical
  const paymentScore = data.billPaymentRatio * (MAX_ADDITIONAL_POINTS * SCORING_WEIGHTS.paymentHistory);
  totalScore += paymentScore;
  factors.push({
    name: "Payment Discipline",
    score: Math.round(paymentScore),
    maxPossible: MAX_ADDITIONAL_POINTS * SCORING_WEIGHTS.paymentHistory,
    explanation: data.billPaymentRatio > 0.95 ? "Excellent history of on-time payments." : "Missed payments significantly impact score."
  });

  // Clamp Score
  const finalScore = Math.round(Math.min(900, Math.max(300, totalScore)));

  // Risk Categorization
  let riskCategory: ScoreResult["riskCategory"] = "Critical";
  if (finalScore >= 750) riskCategory = "Low";
  else if (finalScore >= 650) riskCategory = "Moderate";
  else if (finalScore >= 550) riskCategory = "High";

  return {
    score: finalScore,
    riskCategory,
    factors
  };
}
