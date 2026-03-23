"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import OutletSelector from "@/components/ui/OutletSelector";
import ExportButton from "@/components/ui/ExportButton";
import { handleExport } from "@/lib/export";

export default function InventorySummaryPage() {
  const [startDate] = useState("22/3/2026");
  const [endDate] = useState("23/3/2026");
  const [search, setSearch] = useState("");
  const [itemLibrary, setItemLibrary] = useState("Item Library");

  const onExport = (format: "csv" | "xlsx" | "pdf") => {
    handleExport(
      format,
      ["Item", "Category", "Beginning Stock", "Stock In", "Stock Out", "Ending Stock"],
      [],
      "inventory-summary"
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Summary</h1>
        <ExportButton onExport={onExport} />
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-3 mb-6">
        <OutletSelector />
        {/* Date range nav */}
        <div className="flex items-center border border-gray-200 rounded">
          <button className="px-2 py-2 hover:bg-gray-50 border-r border-gray-200">
            <ChevronLeft size={16} />
          </button>
          <span className="px-3 py-2 text-sm text-gray-700">
            {startDate} - {endDate}
          </span>
          <button className="px-2 py-2 hover:bg-gray-50 border-l border-gray-200">
            <ChevronRight size={16} />
          </button>
        </div>
        {/* Item Library dropdown */}
        <select
          value={itemLibrary}
          onChange={(e) => setItemLibrary(e.target.value)}
          className="border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 bg-white"
        >
          <option>Item Library</option>
        </select>
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded px-3 py-2 pr-8 text-sm"
          />
          <Search size={16} className="absolute right-2.5 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Content */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <EmptyState
          title="No Data To Display"
          linkText="Upload Beginning Inventory Using Bulk Import"
        />
      </div>
    </div>
  );
}
