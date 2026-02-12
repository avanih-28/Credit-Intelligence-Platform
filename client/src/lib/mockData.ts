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
    hybrid: 738,
  },
};

export const NAV_ITEMS = [
  { label: "Dashboard", icon: Home, href: "/" },
  { label: "Credit Analysis", icon: Activity, href: "/scoring" },
  { label: "KYC Verification", icon: ShieldCheck, href: "/kyc" },
  { label: "Investments", icon: TrendingUp, href: "/invest" },
  { label: "Loan Simulator", icon: CreditCard, href: "/loans" },
  { label: "Lender View", icon: PieChart, href: "/admin" },
];

export const MOCK_HISTORY = [
  { month: "Jan", rule: 680, ml: 690, hybrid: 687 },
  { month: "Feb", rule: 685, ml: 700, hybrid: 695 },
  { month: "Mar", rule: 690, ml: 710, hybrid: 704 },
  { month: "Apr", rule: 688, ml: 715, hybrid: 707 },
  { month: "May", rule: 710, ml: 730, hybrid: 724 },
  { month: "Jun", rule: 720, ml: 745, hybrid: 738 },
];

export const FEATURE_IMPORTANCE = [
  { feature: "Avg Income", importance: 0.35, value: "$8,500" },
  { feature: "Bill Payment", importance: 0.25, value: "98%" },
  { feature: "Savings Rate", importance: 0.20, value: "22%" },
  { feature: "Credit Mix", importance: 0.10, value: "Diverse" },
  { feature: "Spending Volatility", importance: 0.10, value: "Low" },
];
