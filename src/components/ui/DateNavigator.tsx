"use client";

import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

function formatDate(date: Date): string {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

interface DateNavigatorProps {
  date?: Date;
  onChange?: (date: Date) => void;
}

export default function DateNavigator({ date, onChange }: DateNavigatorProps) {
  const [current, setCurrent] = useState(date ?? new Date());

  const go = (delta: number) => {
    const next = new Date(current);
    next.setDate(next.getDate() + delta);
    setCurrent(next);
    onChange?.(next);
  };

  return (
    <div className="flex items-center border border-gray-200 rounded bg-white overflow-hidden">
      <button
        onClick={() => go(-1)}
        className="px-3 py-2 hover:bg-gray-50 border-r border-gray-200 text-gray-500 transition-colors"
      >
        <ChevronLeft size={14} />
      </button>
      <button className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
        {formatDate(current)}
        <ChevronDown size={13} className="text-gray-400" />
      </button>
      <button
        onClick={() => go(1)}
        className="px-3 py-2 hover:bg-gray-50 border-l border-gray-200 text-gray-500 transition-colors"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
