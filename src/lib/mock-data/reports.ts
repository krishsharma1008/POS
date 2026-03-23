export const salesSummaryReport = {
  grossSales: 0,
  discounts: 0,
  refunds: 0,
  netSales: 0,
  gratuity: 0,
  tax: 0,
  rounding: 0,
  totalCollected: 0,
};

export const grossProfitReport = {
  grossSales: 0,
  costOfGoods: 0,
  grossProfit: 0,
  grossMargin: 0,
  items: [] as { name: string; sold: number; grossSales: number; costOfGoods: number; grossProfit: number }[],
};

export const paymentMethodsReport = {
  totalCollected: 0,
  methods: [] as { name: string; transactions: number; amount: number }[],
};

export const salesTypeReport = {
  total: 0,
  types: [] as { name: string; transactions: number; amount: number }[],
};

export const itemSalesReport = {
  totalItemsSold: 0,
  totalGrossSales: 0,
  items: [] as { name: string; category: string; sold: number; grossSales: number; refunds: number; discounts: number; netSales: number }[],
};

export const categorySalesReport = {
  totalSold: 0,
  totalGrossSales: 0,
  categories: [] as { name: string; itemsSold: number; grossSales: number; refunds: number; discounts: number; netSales: number }[],
};

export const brandSalesReport = {
  totalSold: 0,
  totalGrossSales: 0,
  brands: [] as { name: string; itemsSold: number; grossSales: number; refunds: number; discounts: number; netSales: number }[],
};

export const modifierSalesReport = {
  totalSold: 0,
  totalGrossSales: 0,
  modifiers: [] as { name: string; sold: number; grossSales: number }[],
};

export const discountsReport = {
  totalDiscountAmount: 0,
  discounts: [] as { name: string; type: string; timesApplied: number; amount: number }[],
};

export const taxesReport = {
  totalTaxCollected: 0,
  taxes: [] as { name: string; rate: string; taxableAmount: number; taxCollected: number }[],
};

export const gratuityReport = {
  totalGratuity: 0,
  entries: [] as { date: string; transactions: number; gratuityAmount: number }[],
};

export const collectedByReport = {
  totalCollected: 0,
  collectors: [] as { name: string; transactions: number; grossSales: number; refunds: number; discounts: number; netSales: number; totalCollected: number }[],
};

export const servedByReport = {
  totalServed: 0,
  servers: [] as { name: string; transactions: number; grossSales: number; refunds: number; discounts: number; netSales: number; totalCollected: number }[],
};

export const transactions: {
  id: string;
  outlet: string;
  time: string;
  collectedBy: string;
  items: number;
  totalPrice: number;
}[] = [];

export const cancelledOrders: typeof transactions = [];
export const voidItems: {
  id: string;
  outlet: string;
  time: string;
  item: string;
  qty: number;
  price: number;
}[] = [];

export const REPORT_SECTIONS = [
  "Sales Summary",
  "Gross Profit",
  "Payment Methods",
  "Sales Type",
  "Item Sales",
  "Category Sales",
  "Brand Sales",
  "Modifier Sales",
  "Discounts",
  "Taxes",
  "Gratuity",
  "Collected By",
  "Served By",
] as const;

export type ReportSection = (typeof REPORT_SECTIONS)[number];
