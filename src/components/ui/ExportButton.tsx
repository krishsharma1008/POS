"use client";

import { useState, useRef, useEffect } from "react";
import { Download, ChevronDown } from "lucide-react";

interface ExportButtonProps {
  onExport: (format: "csv" | "xlsx" | "pdf") => void;
  variant?: "primary" | "dark";
}

export default function ExportButton({
  onExport,
  variant = "primary",
}: ExportButtonProps) {
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

  const bgClass =
    variant === "dark"
      ? "bg-[#1e3a5f] hover:bg-[#16304f]"
      : "bg-[#0B4DA2] hover:bg-[#083d82]";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 ${bgClass} text-white text-sm px-4 py-2 rounded transition-colors`}
      >
        <Download size={14} />
        Export
        <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded shadow-lg z-10">
          {(["csv", "xlsx", "pdf"] as const).map((format) => (
            <button
              key={format}
              onClick={() => {
                onExport(format);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors first:rounded-t last:rounded-b"
            >
              Export as {format.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
