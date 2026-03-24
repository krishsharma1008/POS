"use client";

import { useState } from "react";
import OutletSelector from "@/components/ui/OutletSelector";
import DateNavigator from "@/components/ui/DateNavigator";
import { transactions, cancelledOrders, voidItems } from "@/lib/mock-data/reports";
import { formatRupiah } from "@/lib/format";
import { Search } from "lucide-react";
import ExportButton from "@/components/ui/ExportButton";
import { handleExport } from "@/lib/export";
import clsx from "clsx";

type Tab = "Success Orders" | "Cancelled Orders" | "Void Items";

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Success Orders");

  const doExport = (format: "csv" | "xlsx" | "pdf") => {
    handleExport(
      format,
      ["Outlet", "Time", "Collected By", "Items", "Total Price"],
      transactions.map((tx) => [tx.outlet, tx.time, tx.collectedBy, tx.items, tx.totalPrice]),
      "transactions-report"
    );
  };

  const tabs: Tab[] = ["Success Orders", "Cancelled Orders", "Void Items"];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Transactions
      </h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "px-4 pb-3 text-sm font-medium transition-colors border-b-2 mr-2",
              activeTab === tab
                ? "border-[#0B4DA2] text-[#0B4DA2]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5">
        <OutletSelector value="All Outlet" />
        <DateNavigator />
        {/* Receipt number search */}
        <div className="flex items-center border border-gray-200 rounded bg-white px-3 py-2 gap-2 flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Receipt Number"
            className="text-sm text-gray-700 placeholder-gray-400 outline-none flex-1 bg-transparent"
          />
          <Search size={14} className="text-gray-400" />
        </div>
        {/* Export */}
        <div className="ml-auto">
          <ExportButton onExport={doExport} variant="dark" />
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 border border-gray-200 rounded bg-white shadow-sm mb-5 overflow-hidden">
        {[
          { label: "TRANSACTIONS", value: "0" },
          { label: "TOTAL COLLECTED", value: formatRupiah(0) },
          { label: "NET SALES", value: formatRupiah(0) },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className={clsx(
              "py-5 text-center",
              i < 2 && "border-r border-gray-200"
            )}
          >
            <p className="text-lg font-semibold text-gray-800">{stat.value}</p>
            <p className="text-[11px] text-gray-400 tracking-wider uppercase mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              {["Outlet", "Time", "Collected By", "Items", "Total Price"].map(
                (col) => (
                  <th
                    key={col}
                    className="text-left px-5 py-3 text-sm font-semibold text-gray-700"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {activeTab === "Success Orders" && transactions.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-12">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    No Transactions
                  </p>
                  <p className="text-xs text-gray-400">
                    You can make transactions through your device, or select a
                    different time frame.
                  </p>
                </td>
              </tr>
            )}
            {activeTab === "Cancelled Orders" && cancelledOrders.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-12">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    No Cancelled Orders
                  </p>
                </td>
              </tr>
            )}
            {activeTab === "Void Items" && voidItems.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-12">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    No Void Items
                  </p>
                </td>
              </tr>
            )}
            {activeTab === "Success Orders" &&
              transactions.map((tx) => (
                <tr key={tx.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-5 py-3 text-sm text-gray-700">{tx.outlet}</td>
                  <td className="px-5 py-3 text-sm text-gray-700">{tx.time}</td>
                  <td className="px-5 py-3 text-sm text-gray-700">{tx.collectedBy}</td>
                  <td className="px-5 py-3 text-sm text-gray-700">{tx.items}</td>
                  <td className="px-5 py-3 text-sm text-gray-700">{formatRupiah(tx.totalPrice)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
