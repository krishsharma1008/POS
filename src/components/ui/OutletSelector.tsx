"use client";

import { Store, ChevronDown } from "lucide-react";

interface OutletSelectorProps {
  value?: string;
}

export default function OutletSelector({ value = "Outlet 1" }: OutletSelectorProps) {
  return (
    <button className="flex items-center gap-2 border border-gray-200 rounded bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
      <Store size={15} className="text-gray-500" />
      {value}
      <ChevronDown size={13} className="text-gray-400 ml-1" />
    </button>
  );
}
