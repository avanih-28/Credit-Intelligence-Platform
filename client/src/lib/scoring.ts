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
  score: number; // Hybrid Score
  components: {
    rule: number;
    ml: number;
  };
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

// Simulation of a Trained RandomForest Regressor
function predictMLScore(data: FinancialData): number {
    // In a real backend, this would use scikit-learn
    // Here we simulate the non-linear relationships ML finds
    let baseML = 300;
    
    // Feature Engineering Simulation
    const disposableIncome = data.avgIncome * (1 - data.expenseRatio);
    const stabilityFactor = 1 - (data.incomeStdDev / (data.avgIncome || 1));
    
    // Non-linear boosts (ML "finding" patterns)
    if (disposableIncome > 2000 && data.billPaymentRatio > 0.98) baseML += 150;
    if (data.savingsRate > 0.30 && stabilityFactor > 0.8) baseML += 100;
    if (data.spendingVolatility < 0.1) baseML += 50;

    // Standard linear contributions
    baseML += (data.billPaymentRatio * 200);
    baseML += (Math.min(data.avgIncome / 5000, 1) * 100);
    
    // Random forest "noise" / ensemble variance simulation
    const noise = Math.random() * 20 - 10; 

    return Math.round(Math.min(900, Math.max(300, baseML + noise)));
}

export function calculateCreditScore(data: FinancialData): ScoreResult {
  // 1. Rule-Based Calculation (70% Weight)
  let ruleScore = 300;
  const MAX_ADDITIONAL_POINTS = 600; 

  const factors = [];

  // Income Factor
  const incomeScore = Math.min(data.avgIncome / 10000, 1) * (MAX_ADDITIONAL_POINTS * SCORING_WEIGHTS.income);
  ruleScore += incomeScore;
  factors.push({
    name: "Income Level",
    score: Math.round(incomeScore),
    maxPossible: MAX_ADDITIONAL_POINTS * SCORING_WEIGHTS.income,
    explanation: data.avgIncome > 5000 ? "Strong income level supports creditworthiness." : "Income level indicates limited repayment capacity."
  });

  // Stability
  const cv = data.incomeStdDev / (data.avgIncome || 1); 
  const stabilityMultiplier = Math.max(0, 1 - cv); 
  const stabilityScore = stabilityMultiplier * (MAX_ADDITIONAL_POINTS * SCORING_WEIGHTS.stability);
  ruleScore += stabilityScore;
  factors.push({
    name: "Income Stability",
    score: Math.round(stabilityScore),
    maxPossible: MAX_ADDITIONAL_POINTS * SCORING_WEIGHTS.stability,
    explanation: cv < 0.2 ? "Income is highly stable and predictable." : "Income volatility poses a risk for consistent repayment."
  });

  // Savings
  const savingsMultiplier = Math.min(data.savingsRate / 0.20, 1);
  const savingsScore = savingsMultiplier * (MAX_ADDITIONAL_POINTS * SCORING_WEIGHTS.savings);
  ruleScore += savingsScore;
  factors.push({
    name: "Savings Habits",
    score: Math.round(savingsScore),
    maxPossible: MAX_ADDITIONAL_POINTS * SCORING_WEIGHTS.savings,
    explanation: data.savingsRate > 0.15 ? "Healthy savings buffer available." : "Low savings rate indicates vulnerability to shocks."
  });

  // Expenses
  const expenseScoreCalc = Math.max(0, 1 - (data.expenseRatio - 0.3) / 0.5); 
  const expenseScore = Math.min(expenseScoreCalc, 1) * (MAX_ADDITIONAL_POINTS * SCORING_WEIGHTS.expenses);
  ruleScore += expenseScore;
  factors.push({
    name: "Expense Burden",
    score: Math.round(expenseScore),
    maxPossible: MAX_ADDITIONAL_POINTS * SCORING_WEIGHTS.expenses,
    explanation: data.expenseRatio < 0.5 ? "Low fixed expenses relative to income." : "High fixed costs reduce repayment flexibility."
  });

  // Payment History
  const paymentScore = data.billPaymentRatio * (MAX_ADDITIONAL_POINTS * SCORING_WEIGHTS.paymentHistory);
  ruleScore += paymentScore;
  factors.push({
    name: "Payment Discipline",
    score: Math.round(paymentScore),
    maxPossible: MAX_ADDITIONAL_POINTS * SCORING_WEIGHTS.paymentHistory,
    explanation: data.billPaymentRatio > 0.95 ? "Excellent history of on-time payments." : "Missed payments significantly impact score."
  });

  const finalRuleScore = Math.round(Math.min(900, Math.max(300, ruleScore)));

  // 2. ML Calculation (30% Weight)
  const mlScore = predictMLScore(data);

  // 3. Hybrid Score Calculation
  // 70% Rule + 30% ML
  const hybridScore = Math.round((finalRuleScore * 0.7) + (mlScore * 0.3));

  // Risk Categorization
  let riskCategory: ScoreResult["riskCategory"] = "Critical";
  if (hybridScore >= 750) riskCategory = "Low";
  else if (hybridScore >= 650) riskCategory = "Moderate";
  else if (hybridScore >= 550) riskCategory = "High";

  return {
    score: hybridScore,
    components: {
        rule: finalRuleScore,
        ml: mlScore
    },
    riskCategory,
    factors
  };
}
