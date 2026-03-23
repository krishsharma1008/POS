"use client";

import { useState } from "react";
import OutletSelector from "@/components/ui/OutletSelector";
import DateNavigator from "@/components/ui/DateNavigator";
import ExportButton from "@/components/ui/ExportButton";
import EmptyState from "@/components/ui/EmptyState";
import { handleExport } from "@/lib/export";
import { Search, ChevronDown } from "lucide-react";

type InvoiceStatus = "All" | "Paid" | "Unpaid" | "Overdue" | "Void";

const invoices: {
  id: string;
  outlet: string;
  invoiceNumber: string;
  customer: string;
  date: string;
  dueDate: string;
  status: string;
  amount: number;
}[] = [];

export default function InvoicesPage() {
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus>("All");
  const [search, setSearch] = useState("");

  const doExport = (format: "csv" | "xlsx" | "pdf") => {
    handleExport(
      format,
      ["Invoice #", "Customer", "Date", "Due Date", "Status", "Amount"],
      invoices.map((inv) => [
        inv.invoiceNumber,
        inv.customer,
        inv.date,
        inv.dueDate,
        inv.status,
        inv.amount,
      ]),
      "invoices-report"
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Invoice</h1>
        <ExportButton onExport={doExport} variant="dark" />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <OutletSelector />
        <DateNavigator />

        {/* Status filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as InvoiceStatus)}
            className="appearance-none border border-gray-200 rounded bg-white px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <option value="All">Select Status</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Overdue">Overdue</option>
            <option value="Void">Void</option>
          </select>
          <ChevronDown
            size={13}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        {/* Search */}
        <div className="flex items-center border border-gray-200 rounded bg-white px-3 py-2 gap-2 flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm text-gray-700 placeholder-gray-400 outline-none flex-1 bg-transparent"
          />
          <Search size={14} className="text-gray-400" />
        </div>
      </div>

      {/* Content */}
      <div className="bg-white border border-gray-200 rounded shadow-sm min-h-[400px]">
        {invoices.length === 0 ? (
          <EmptyState
            title="No Data To Display"
            description="You can make invoice through your device, or select different time frame."
            linkText="Make an Invoice"
          />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                {[
                  "Invoice #",
                  "Customer",
                  "Date",
                  "Due Date",
                  "Status",
                  "Amount",
                ].map((col) => (
                  <th
                    key={col}
                    className="text-left px-5 py-3 font-semibold text-gray-700"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-5 py-3 text-gray-700">
                    {inv.invoiceNumber}
                  </td>
                  <td className="px-5 py-3 text-gray-700">{inv.customer}</td>
                  <td className="px-5 py-3 text-gray-700">{inv.date}</td>
                  <td className="px-5 py-3 text-gray-700">{inv.dueDate}</td>
                  <td className="px-5 py-3 text-gray-700">{inv.status}</td>
                  <td className="px-5 py-3 text-gray-700">{inv.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
