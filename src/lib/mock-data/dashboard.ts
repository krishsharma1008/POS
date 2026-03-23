export const salesSummary = {
  grossSales: 0,
  netSales: 0,
  grossProfit: 0,
  transactions: 0,
  avgSalePerTransaction: 0,
  grossMarginPct: 0,
};

export const dayOfWeekData = [
  { day: "Mon", amount: 0 },
  { day: "Tue", amount: 0 },
  { day: "Wed", amount: 0 },
  { day: "Thu", amount: 0 },
  { day: "Fri", amount: 0 },
  { day: "Sat", amount: 0 },
  { day: "Sun", amount: 0 },
];

export const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  hour: String(i).padStart(2, "0") + ":00",
  amount: 0,
}));

export const topItems: {
  rank: number;
  name: string;
  qty: number;
  revenue: number;
}[] = [];

export const categoryByVolume: { name: string; qty: number }[] = [];
export const categoryBySales: { name: string; revenue: number }[] = [];
export const topItemsByCategory: {
  category: string;
  item: string;
  qty: number;
  revenue: number;
}[] = [];
