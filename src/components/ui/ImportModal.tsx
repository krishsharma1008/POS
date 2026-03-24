"use client";

import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { parseCSV, type ParsedCSV } from "@/lib/csv-import";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  fields: string[];
  onImport: (mapping: Record<string, string>, rows: string[][]) => void;
}

export default function ImportModal({
  isOpen,
  onClose,
  fields,
  onImport,
}: ImportModalProps) {
  const [parsed, setParsed] = useState<ParsedCSV | null>(null);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFile = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const result = parseCSV(text);
      setParsed(result);
      // Auto-map matching headers
      const autoMap: Record<string, string> = {};
      result.headers.forEach((h) => {
        const lower = h.toLowerCase().replace(/[_\s]+/g, "");
        const match = fields.find(
          (f) => f.toLowerCase().replace(/[_\s]+/g, "") === lower
        );
        if (match) autoMap[h] = match;
      });
      setMapping(autoMap);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith(".csv")) handleFile(file);
  };

  const handleConfirm = () => {
    if (parsed) {
      onImport(mapping, parsed.rows);
      setParsed(null);
      setMapping({});
      setFileName("");
      onClose();
    }
  };

  const reset = () => {
    setParsed(null);
    setMapping({});
    setFileName("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[640px] max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Import CSV</h2>
          <button
            onClick={() => {
              reset();
              onClose();
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!parsed ? (
            /* Upload area */
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-blue-400 transition-colors"
            >
              <Upload size={32} className="text-gray-400" />
              <p className="text-sm text-gray-500">
                Drag & drop a CSV file here, or click to browse
              </p>
              <p className="text-xs text-gray-400">Only .csv files accepted</p>
              <input
                ref={fileRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                }}
              />
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-4">
                File: <span className="font-medium">{fileName}</span> —{" "}
                {parsed.rows.length} rows found.{" "}
                <button
                  onClick={reset}
                  className="text-blue-500 hover:underline"
                >
                  Change file
                </button>
              </p>

              {/* Column mapping */}
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Column Mapping
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {parsed.headers.map((header) => (
                  <div key={header} className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-28 truncate">
                      {header}
                    </span>
                    <span className="text-xs text-gray-400">→</span>
                    <select
                      value={mapping[header] || ""}
                      onChange={(e) =>
                        setMapping((prev) => ({
                          ...prev,
                          [header]: e.target.value,
                        }))
                      }
                      className="flex-1 text-xs border border-gray-200 rounded px-2 py-1 outline-none"
                    >
                      <option value="">Skip</option>
                      {fields.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              {/* Preview */}
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Preview (first 5 rows)
              </h3>
              <div className="overflow-x-auto border border-gray-200 rounded">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-50">
                      {parsed.headers.map((h) => (
                        <th
                          key={h}
                          className="px-3 py-2 text-left font-medium text-gray-600"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {parsed.rows.slice(0, 5).map((row, i) => (
                      <tr key={i} className="border-t border-gray-100">
                        {row.map((cell, j) => (
                          <td key={j} className="px-3 py-1.5 text-gray-600">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={() => {
              reset();
              onClose();
            }}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!parsed}
            className="px-4 py-2 text-sm text-white bg-[#0B4DA2] rounded hover:bg-[#083d82] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Import {parsed ? `(${parsed.rows.length} rows)` : ""}
          </button>
        </div>
      </div>
    </div>
  );
}
