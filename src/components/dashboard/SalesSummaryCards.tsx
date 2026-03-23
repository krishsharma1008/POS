import StatCard from "@/components/ui/StatCard";
import { salesSummary } from "@/lib/mock-data/dashboard";
import { formatRupiah, formatPercent } from "@/lib/format";

export default function SalesSummaryCards() {
  const s = salesSummary;
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard label="Gross Sales" value={formatRupiah(s.grossSales)} />
      <StatCard label="Net Sales" value={formatRupiah(s.netSales)} />
      <StatCard label="Gross Profit" value={formatRupiah(s.grossProfit)} />
      <StatCard label="Transactions" value={s.transactions} />
      <StatCard
        label="Average Sale Per Transaction"
        value={formatRupiah(s.avgSalePerTransaction)}
      />
      <StatCard
        label="Gross Margin"
        value={formatPercent(s.grossMarginPct)}
      />
    </div>
  );
}
