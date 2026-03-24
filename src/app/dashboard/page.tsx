"use client";

import { useState } from "react";
import OutletSelector from "@/components/ui/OutletSelector";
import DateNavigator from "@/components/ui/DateNavigator";
import SalesSummaryCards from "@/components/dashboard/SalesSummaryCards";
import SalesCharts from "@/components/dashboard/SalesCharts";
import NoDataCard from "@/components/dashboard/NoDataCard";
import clsx from "clsx";

type Tab = "Summary" | "Outlet Comparison";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Summary");

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Dashboard</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-5">
        {(["Summary", "Outlet Comparison"] as Tab[]).map((tab) => (
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
      <div className="flex items-center gap-3 mb-6">
        <OutletSelector />
        <DateNavigator />
      </div>

      {activeTab === "Summary" && (
        <div className="space-y-5">
          {/* Section header */}
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Sales Summary
          </p>

          <SalesSummaryCards />
          <SalesCharts />

          <NoDataCard title="Top Items" className="min-h-[300px]" />

          <div className="flex gap-4">
            <NoDataCard title="Category by Volume" className="flex-1" />
            <NoDataCard title="Category by Sales" className="flex-1" />
          </div>

          <NoDataCard title="Top Items by Category" className="min-h-[200px]" />
        </div>
      )}

      {activeTab === "Outlet Comparison" && (
        <div className="flex items-center justify-center h-64 text-gray-400 text-sm bg-white border border-gray-200 rounded shadow-sm">
          No Data
        </div>
      )}
    </div>
  );
}
