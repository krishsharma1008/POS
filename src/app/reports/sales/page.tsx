"use client";

import { useState } from "react";
import OutletSelector from "@/components/ui/OutletSelector";
import DateNavigator from "@/components/ui/DateNavigator";
import {
  REPORT_SECTIONS,
  ReportSection,
  salesSummaryReport,
  grossProfitReport,
  paymentMethodsReport,
  salesTypeReport,
  itemSalesReport,
  categorySalesReport,
  brandSalesReport,
  modifierSalesReport,
  discountsReport,
  taxesReport,
  gratuityReport,
  collectedByReport,
  servedByReport,
} from "@/lib/mock-data/reports";
import { formatRupiah, formatPercent } from "@/lib/format";
import clsx from "clsx";
import ExportButton from "@/components/ui/ExportButton";
import { handleExport } from "@/lib/export";

/* ─── Shared table helpers ──────────────────────────────────── */

function ReportRow({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0",
        bold && "font-semibold"
      )}
    >
      <span className={clsx("text-sm", bold ? "text-gray-800" : "text-gray-600")}>
        {label}
      </span>
      <span className={clsx("text-sm", bold ? "text-gray-800" : "text-gray-600")}>
        {value}
      </span>
    </div>
  );
}

function DataTable({
  columns,
  rows,
  emptyMessage = "No Data",
}: {
  columns: { key: string; label: string; align?: "right" }[];
  rows: Record<string, string | number>[];
  emptyMessage?: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className={clsx(
                  "py-3 px-3 font-semibold text-gray-700 whitespace-nowrap",
                  col.align === "right" ? "text-right" : "text-left"
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-12 text-center text-gray-400"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={clsx(
                      "py-3 px-3 text-gray-600",
                      col.align === "right" && "text-right"
                    )}
                  >
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center bg-gray-100 rounded px-4 py-3 mb-4">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </span>
      <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
  );
}

/* ─── Section content components ────────────────────────────── */

function SalesSummaryContent() {
  const r = salesSummaryReport;
  return (
    <div>
      <ReportRow label="Gross Sales" value={formatRupiah(r.grossSales)} />
      <ReportRow label="Discounts" value={formatRupiah(r.discounts)} />
      <ReportRow label="Refunds" value={formatRupiah(r.refunds)} />
      <ReportRow label="Net Sales" value={formatRupiah(r.netSales)} bold />
      <ReportRow label="Gratuity" value={formatRupiah(r.gratuity)} />
      <ReportRow label="Tax" value={formatRupiah(r.tax)} />
      <ReportRow label="Rounding" value={formatRupiah(r.rounding)} />
      <ReportRow label="Total Collected" value={formatRupiah(r.totalCollected)} bold />
    </div>
  );
}

function GrossProfitContent() {
  const r = grossProfitReport;
  return (
    <div>
      <div className="mb-6">
        <ReportRow label="Gross Sales" value={formatRupiah(r.grossSales)} />
        <ReportRow label="Cost of Goods" value={formatRupiah(r.costOfGoods)} />
        <ReportRow label="Gross Profit" value={formatRupiah(r.grossProfit)} bold />
        <ReportRow label="Gross Margin" value={formatPercent(r.grossMargin)} />
      </div>
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Profit by Item
      </h3>
      <DataTable
        columns={[
          { key: "name", label: "Item Name" },
          { key: "sold", label: "Sold", align: "right" },
          { key: "grossSales", label: "Gross Sales", align: "right" },
          { key: "costOfGoods", label: "Cost of Goods", align: "right" },
          { key: "grossProfit", label: "Gross Profit", align: "right" },
        ]}
        rows={r.items.map((item) => ({
          name: item.name,
          sold: item.sold,
          grossSales: formatRupiah(item.grossSales),
          costOfGoods: formatRupiah(item.costOfGoods),
          grossProfit: formatRupiah(item.grossProfit),
        }))}
        emptyMessage="No items sold in this period"
      />
    </div>
  );
}

function PaymentMethodsContent() {
  const r = paymentMethodsReport;
  return (
    <div>
      <SummaryRow label="Total Collected" value={formatRupiah(r.totalCollected)} />
      <DataTable
        columns={[
          { key: "name", label: "Payment Method" },
          { key: "transactions", label: "Transactions", align: "right" },
          { key: "amount", label: "Amount", align: "right" },
        ]}
        rows={r.methods.map((m) => ({
          name: m.name,
          transactions: m.transactions,
          amount: formatRupiah(m.amount),
        }))}
        emptyMessage="No payment data in this period"
      />
    </div>
  );
}

function SalesTypeContent() {
  const r = salesTypeReport;
  return (
    <div>
      <SummaryRow label="Total" value={formatRupiah(r.total)} />
      <DataTable
        columns={[
          { key: "name", label: "Sales Type" },
          { key: "transactions", label: "Transactions", align: "right" },
          { key: "amount", label: "Amount", align: "right" },
        ]}
        rows={r.types.map((t) => ({
          name: t.name,
          transactions: t.transactions,
          amount: formatRupiah(t.amount),
        }))}
        emptyMessage="No sales data in this period"
      />
    </div>
  );
}

function ItemSalesContent() {
  const r = itemSalesReport;
  return (
    <div>
      <div className="flex gap-4 mb-4">
        <SummaryRow label="Total Items Sold" value={String(r.totalItemsSold)} />
        <SummaryRow label="Total Gross Sales" value={formatRupiah(r.totalGrossSales)} />
      </div>
      <DataTable
        columns={[
          { key: "name", label: "Item Name" },
          { key: "category", label: "Category" },
          { key: "sold", label: "Sold", align: "right" },
          { key: "grossSales", label: "Gross Sales", align: "right" },
          { key: "refunds", label: "Refunds", align: "right" },
          { key: "discounts", label: "Discounts", align: "right" },
          { key: "netSales", label: "Net Sales", align: "right" },
        ]}
        rows={r.items.map((item) => ({
          name: item.name,
          category: item.category,
          sold: item.sold,
          grossSales: formatRupiah(item.grossSales),
          refunds: formatRupiah(item.refunds),
          discounts: formatRupiah(item.discounts),
          netSales: formatRupiah(item.netSales),
        }))}
        emptyMessage="No items sold in this period"
      />
    </div>
  );
}

function CategorySalesContent() {
  const r = categorySalesReport;
  return (
    <div>
      <div className="flex gap-4 mb-4">
        <SummaryRow label="Total Sold" value={String(r.totalSold)} />
        <SummaryRow label="Total Gross Sales" value={formatRupiah(r.totalGrossSales)} />
      </div>
      <DataTable
        columns={[
          { key: "name", label: "Category" },
          { key: "itemsSold", label: "Items Sold", align: "right" },
          { key: "grossSales", label: "Gross Sales", align: "right" },
          { key: "refunds", label: "Refunds", align: "right" },
          { key: "discounts", label: "Discounts", align: "right" },
          { key: "netSales", label: "Net Sales", align: "right" },
        ]}
        rows={r.categories.map((c) => ({
          name: c.name,
          itemsSold: c.itemsSold,
          grossSales: formatRupiah(c.grossSales),
          refunds: formatRupiah(c.refunds),
          discounts: formatRupiah(c.discounts),
          netSales: formatRupiah(c.netSales),
        }))}
        emptyMessage="No category data in this period"
      />
    </div>
  );
}

function BrandSalesContent() {
  const r = brandSalesReport;
  return (
    <div>
      <div className="flex gap-4 mb-4">
        <SummaryRow label="Total Sold" value={String(r.totalSold)} />
        <SummaryRow label="Total Gross Sales" value={formatRupiah(r.totalGrossSales)} />
      </div>
      <DataTable
        columns={[
          { key: "name", label: "Brand" },
          { key: "itemsSold", label: "Items Sold", align: "right" },
          { key: "grossSales", label: "Gross Sales", align: "right" },
          { key: "refunds", label: "Refunds", align: "right" },
          { key: "discounts", label: "Discounts", align: "right" },
          { key: "netSales", label: "Net Sales", align: "right" },
        ]}
        rows={r.brands.map((b) => ({
          name: b.name,
          itemsSold: b.itemsSold,
          grossSales: formatRupiah(b.grossSales),
          refunds: formatRupiah(b.refunds),
          discounts: formatRupiah(b.discounts),
          netSales: formatRupiah(b.netSales),
        }))}
        emptyMessage="No brand data in this period"
      />
    </div>
  );
}

function ModifierSalesContent() {
  const r = modifierSalesReport;
  return (
    <div>
      <div className="flex gap-4 mb-4">
        <SummaryRow label="Total Sold" value={String(r.totalSold)} />
        <SummaryRow label="Total Gross Sales" value={formatRupiah(r.totalGrossSales)} />
      </div>
      <DataTable
        columns={[
          { key: "name", label: "Modifier" },
          { key: "sold", label: "Sold", align: "right" },
          { key: "grossSales", label: "Gross Sales", align: "right" },
        ]}
        rows={r.modifiers.map((m) => ({
          name: m.name,
          sold: m.sold,
          grossSales: formatRupiah(m.grossSales),
        }))}
        emptyMessage="No modifier data in this period"
      />
    </div>
  );
}

function DiscountsContent() {
  const r = discountsReport;
  return (
    <div>
      <SummaryRow
        label="Total Discount Amount"
        value={formatRupiah(r.totalDiscountAmount)}
      />
      <DataTable
        columns={[
          { key: "name", label: "Discount Name" },
          { key: "type", label: "Type" },
          { key: "timesApplied", label: "Times Applied", align: "right" },
          { key: "amount", label: "Amount", align: "right" },
        ]}
        rows={r.discounts.map((d) => ({
          name: d.name,
          type: d.type,
          timesApplied: d.timesApplied,
          amount: formatRupiah(d.amount),
        }))}
        emptyMessage="No discounts applied in this period"
      />
    </div>
  );
}

function TaxesContent() {
  const r = taxesReport;
  return (
    <div>
      <SummaryRow
        label="Total Tax Collected"
        value={formatRupiah(r.totalTaxCollected)}
      />
      <DataTable
        columns={[
          { key: "name", label: "Tax Name" },
          { key: "rate", label: "Rate" },
          { key: "taxableAmount", label: "Taxable Amount", align: "right" },
          { key: "taxCollected", label: "Tax Collected", align: "right" },
        ]}
        rows={r.taxes.map((t) => ({
          name: t.name,
          rate: t.rate,
          taxableAmount: formatRupiah(t.taxableAmount),
          taxCollected: formatRupiah(t.taxCollected),
        }))}
        emptyMessage="No tax data in this period"
      />
    </div>
  );
}

function GratuityContent() {
  const r = gratuityReport;
  return (
    <div>
      <SummaryRow label="Total Gratuity" value={formatRupiah(r.totalGratuity)} />
      <DataTable
        columns={[
          { key: "date", label: "Date" },
          { key: "transactions", label: "Transactions", align: "right" },
          { key: "gratuityAmount", label: "Gratuity Amount", align: "right" },
        ]}
        rows={r.entries.map((e) => ({
          date: e.date,
          transactions: e.transactions,
          gratuityAmount: formatRupiah(e.gratuityAmount),
        }))}
        emptyMessage="No gratuity data in this period"
      />
    </div>
  );
}

function CollectedByContent() {
  const r = collectedByReport;
  return (
    <div>
      <SummaryRow
        label="Total Collected"
        value={formatRupiah(r.totalCollected)}
      />
      <DataTable
        columns={[
          { key: "name", label: "Collected By" },
          { key: "transactions", label: "Transactions", align: "right" },
          { key: "grossSales", label: "Gross Sales", align: "right" },
          { key: "refunds", label: "Refunds", align: "right" },
          { key: "discounts", label: "Discounts", align: "right" },
          { key: "netSales", label: "Net Sales", align: "right" },
          { key: "totalCollected", label: "Total Collected", align: "right" },
        ]}
        rows={r.collectors.map((c) => ({
          name: c.name,
          transactions: c.transactions,
          grossSales: formatRupiah(c.grossSales),
          refunds: formatRupiah(c.refunds),
          discounts: formatRupiah(c.discounts),
          netSales: formatRupiah(c.netSales),
          totalCollected: formatRupiah(c.totalCollected),
        }))}
        emptyMessage="No data in this period"
      />
    </div>
  );
}

function ServedByContent() {
  const r = servedByReport;
  return (
    <div>
      <SummaryRow label="Total Served" value={String(r.totalServed)} />
      <DataTable
        columns={[
          { key: "name", label: "Served By" },
          { key: "transactions", label: "Transactions", align: "right" },
          { key: "grossSales", label: "Gross Sales", align: "right" },
          { key: "refunds", label: "Refunds", align: "right" },
          { key: "discounts", label: "Discounts", align: "right" },
          { key: "netSales", label: "Net Sales", align: "right" },
          { key: "totalCollected", label: "Total Collected", align: "right" },
        ]}
        rows={r.servers.map((s) => ({
          name: s.name,
          transactions: s.transactions,
          grossSales: formatRupiah(s.grossSales),
          refunds: formatRupiah(s.refunds),
          discounts: formatRupiah(s.discounts),
          netSales: formatRupiah(s.netSales),
          totalCollected: formatRupiah(s.totalCollected),
        }))}
        emptyMessage="No data in this period"
      />
    </div>
  );
}

/* ─── Section renderer map ──────────────────────────────────── */

const SECTION_CONTENT: Record<ReportSection, React.ReactNode> = {
  "Sales Summary": <SalesSummaryContent />,
  "Gross Profit": <GrossProfitContent />,
  "Payment Methods": <PaymentMethodsContent />,
  "Sales Type": <SalesTypeContent />,
  "Item Sales": <ItemSalesContent />,
  "Category Sales": <CategorySalesContent />,
  "Brand Sales": <BrandSalesContent />,
  "Modifier Sales": <ModifierSalesContent />,
  Discounts: <DiscountsContent />,
  Taxes: <TaxesContent />,
  Gratuity: <GratuityContent />,
  "Collected By": <CollectedByContent />,
  "Served By": <ServedByContent />,
};

/* ─── Page ──────────────────────────────────────────────────── */

function getExportData(section: ReportSection): { headers: string[]; rows: (string | number)[][] } {
  switch (section) {
    case "Sales Summary": {
      const r = salesSummaryReport;
      return {
        headers: ["Label", "Amount"],
        rows: [
          ["Gross Sales", r.grossSales], ["Discounts", r.discounts], ["Refunds", r.refunds],
          ["Net Sales", r.netSales], ["Gratuity", r.gratuity], ["Tax", r.tax],
          ["Rounding", r.rounding], ["Total Collected", r.totalCollected],
        ],
      };
    }
    case "Gross Profit": {
      const r = grossProfitReport;
      return {
        headers: ["Item Name", "Sold", "Gross Sales", "Cost of Goods", "Gross Profit"],
        rows: r.items.map((i) => [i.name, i.sold, i.grossSales, i.costOfGoods, i.grossProfit]),
      };
    }
    case "Payment Methods":
      return {
        headers: ["Payment Method", "Transactions", "Amount"],
        rows: paymentMethodsReport.methods.map((m) => [m.name, m.transactions, m.amount]),
      };
    case "Sales Type":
      return {
        headers: ["Sales Type", "Transactions", "Amount"],
        rows: salesTypeReport.types.map((t) => [t.name, t.transactions, t.amount]),
      };
    case "Item Sales":
      return {
        headers: ["Item", "Category", "Sold", "Gross Sales", "Refunds", "Discounts", "Net Sales"],
        rows: itemSalesReport.items.map((i) => [i.name, i.category, i.sold, i.grossSales, i.refunds, i.discounts, i.netSales]),
      };
    case "Category Sales":
      return {
        headers: ["Category", "Items Sold", "Gross Sales", "Refunds", "Discounts", "Net Sales"],
        rows: categorySalesReport.categories.map((c) => [c.name, c.itemsSold, c.grossSales, c.refunds, c.discounts, c.netSales]),
      };
    case "Brand Sales":
      return {
        headers: ["Brand", "Items Sold", "Gross Sales", "Refunds", "Discounts", "Net Sales"],
        rows: brandSalesReport.brands.map((b) => [b.name, b.itemsSold, b.grossSales, b.refunds, b.discounts, b.netSales]),
      };
    case "Modifier Sales":
      return {
        headers: ["Modifier", "Sold", "Gross Sales"],
        rows: modifierSalesReport.modifiers.map((m) => [m.name, m.sold, m.grossSales]),
      };
    case "Discounts":
      return {
        headers: ["Discount Name", "Type", "Times Applied", "Amount"],
        rows: discountsReport.discounts.map((d) => [d.name, d.type, d.timesApplied, d.amount]),
      };
    case "Taxes":
      return {
        headers: ["Tax Name", "Rate", "Taxable Amount", "Tax Collected"],
        rows: taxesReport.taxes.map((t) => [t.name, t.rate, t.taxableAmount, t.taxCollected]),
      };
    case "Gratuity":
      return {
        headers: ["Date", "Transactions", "Gratuity Amount"],
        rows: gratuityReport.entries.map((e) => [e.date, e.transactions, e.gratuityAmount]),
      };
    case "Collected By":
      return {
        headers: ["Collected By", "Transactions", "Gross Sales", "Refunds", "Discounts", "Net Sales", "Total Collected"],
        rows: collectedByReport.collectors.map((c) => [c.name, c.transactions, c.grossSales, c.refunds, c.discounts, c.netSales, c.totalCollected]),
      };
    case "Served By":
      return {
        headers: ["Served By", "Transactions", "Gross Sales", "Refunds", "Discounts", "Net Sales", "Total Collected"],
        rows: servedByReport.servers.map((s) => [s.name, s.transactions, s.grossSales, s.refunds, s.discounts, s.netSales, s.totalCollected]),
      };
  }
}

export default function SalesReportPage() {
  const [activeSection, setActiveSection] =
    useState<ReportSection>("Sales Summary");

  const doExport = (format: "csv" | "xlsx" | "pdf") => {
    const data = getExportData(activeSection);
    handleExport(format, data.headers, data.rows, `sales-${activeSection.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Sales</h1>
        <ExportButton onExport={doExport} />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <OutletSelector />
        <DateNavigator />
      </div>

      {/* Two-column layout */}
      <div className="flex gap-0 bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
        {/* Left sub-nav */}
        <div className="w-[260px] border-r border-gray-200 flex-shrink-0">
          {REPORT_SECTIONS.map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={clsx(
                "w-full text-left px-5 py-3.5 text-sm transition-colors border-b border-gray-100 last:border-b-0",
                activeSection === section
                  ? "bg-[#0B4DA2] text-white font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Right content */}
        <div className="flex-1 p-6 bg-gray-50 min-h-[500px]">
          {SECTION_CONTENT[activeSection]}
        </div>
      </div>
    </div>
  );
}
