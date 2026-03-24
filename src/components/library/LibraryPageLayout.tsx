"use client";

import React from "react";
import EmptyState from "@/components/ui/EmptyState";
import ImportExportButton from "@/components/ui/ImportExportButton";

interface Column {
  key: string;
  label: string;
}

interface LibraryPageLayoutProps {
  title: string;
  entityName: string;
  total: number;
  columns: Column[];
  rows: Record<string, React.ReactNode>[];
  filters?: React.ReactNode;
  onCreateClick: () => void;
  onImportClick: () => void;
  onExport: (format: "csv" | "xlsx") => void;
  actions?: (row: Record<string, React.ReactNode>, index: number) => React.ReactNode;
}

export default function LibraryPageLayout({
  title,
  entityName,
  total,
  columns,
  rows,
  filters,
  onCreateClick,
  onImportClick,
  onExport,
  actions,
}: LibraryPageLayoutProps) {
  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            Total: {total}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ImportExportButton
            onImportClick={onImportClick}
            onExport={onExport}
          />
          <button
            onClick={onCreateClick}
            className="bg-[#0B4DA2] hover:bg-[#083d82] text-white text-sm px-4 py-2 rounded transition-colors"
          >
            Create {entityName}
          </button>
        </div>
      </div>

      {/* Optional filters row */}
      {filters && <div className="mb-4">{filters}</div>}

      {/* Table or EmptyState */}
      {rows.length > 0 ? (
        <div className="bg-white rounded border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {col.label}
                  </th>
                ))}
                {actions && (
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-gray-700">
                      {row[col.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-3">{actions(row, index)}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
