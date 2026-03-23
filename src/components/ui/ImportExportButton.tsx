"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface ImportExportButtonProps {
  onImportClick: () => void;
  onExport: (format: "csv" | "xlsx") => void;
}

export default function ImportExportButton({
  onImportClick,
  onExport,
}: ImportExportButtonProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-[#2563eb] hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition-colors"
      >
        Import / Export
        <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
          <button
            onClick={() => {
              onImportClick();
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-t"
          >
            Import CSV
          </button>
          <button
            onClick={() => {
              onExport("csv");
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Export CSV
          </button>
          <button
            onClick={() => {
              onExport("xlsx");
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-b"
          >
            Export XLSX
          </button>
        </div>
      )}
    </div>
  );
}
