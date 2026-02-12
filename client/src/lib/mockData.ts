import { LucideIcon, Home, CreditCard, ShieldCheck, TrendingUp, Landmark, Activity, Settings, LogOut, PieChart } from "lucide-react";

export interface UserProfile {
  name: "Alex Mercer";
  country: "USA" | "India" | "UK" | "EU" | "Singapore";
  verified: boolean;
  score: {
    rule: number;
    ml: number;
    hybrid: number;
  };
}

export const COUNTRIES = [
  { code: "USA", name: "United States", currency: "$", flag: "🇺🇸" },
  { code: "India", name: "India", currency: "₹", flag: "🇮🇳" },
  { code: "UK", name: "United Kingdom", currency: "£", flag: "🇬🇧" },
  { code: "EU", name: "European Union", currency: "€", flag: "🇪🇺" },
  { code: "Singapore", name: "Singapore", currency: "S$", flag: "🇸🇬" },
];

export const INITIAL_USER: UserProfile = {
  name: "Alex Mercer",
  country: "USA",
  verified: false,
  score: {
    rule: 720,
    ml: 745,
    hybrid: 728, // 70% of 720 + 30% of 745 = 504 + 223.5 = ~728
  },
};

export const MOCK_HISTORY = [
  { month: "Jan", rule: 680, ml: 690, hybrid: 683 },
  { month: "Feb", rule: 685, ml: 700, hybrid: 690 },
  { month: "Mar", rule: 690, ml: 710, hybrid: 696 },
  { month: "Apr", rule: 688, ml: 715, hybrid: 696 },
  { month: "May", rule: 710, ml: 730, hybrid: 716 },
  { month: "Jun", rule: 720, ml: 745, hybrid: 728 },
];

export const FEATURE_IMPORTANCE = [
  { feature: "Avg Income", importance: 0.35, value: "$8,500" },
  { feature: "Bill Payment", importance: 0.25, value: "98%" },
  { feature: "Savings Rate", importance: 0.20, value: "22%" },
  { feature: "Credit Mix", importance: 0.10, value: "Diverse" },
  { feature: "Spending Volatility", importance: 0.10, value: "Low" },
];

export const INVESTMENT_RECOMMENDATIONS = [
  {
    country: "USA",
    name: "S&P 500 ETF (VOO)",
    type: "Index Fund",
    risk: "Moderate",
    return: "+10.5%",
    desc: "Broad exposure to large-cap US equities.",
    match: 98
  },
  {
    country: "India",
    name: "NIFTY 50 Index",
    type: "Growth Fund",
    risk: "High",
    return: "+14.2%",
    desc: "Top 50 companies listed on National Stock Exchange.",
    match: 85
  },
  {
    country: "UK",
    name: "FTSE 100 Dividend",
    type: "Income Fund",
    risk: "Low",
    return: "+4.8%",
    desc: "Blue-chip UK companies with strong dividend history.",
    match: 70
  },
  {
    country: "Singapore",
    name: "STI ETF",
    type: "REITs Focus",
    risk: "Moderate",
    return: "+6.1%",
    desc: "Singapore straits times index with high REIT exposure.",
    match: 60
  }
];
