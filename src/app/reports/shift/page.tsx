"use client";

import OutletSelector from "@/components/ui/OutletSelector";
import DateNavigator from "@/components/ui/DateNavigator";
import ExportButton from "@/components/ui/ExportButton";
import EmptyState from "@/components/ui/EmptyState";
import { handleExport } from "@/lib/export";

const shifts: {
  id: string;
  outlet: string;
  employee: string;
  startTime: string;
  endTime: string;
  startingCash: number;
  expectedCash: number;
  actualCash: number;
  difference: number;
}[] = [];

export default function ShiftPage() {
  const doExport = (format: "csv" | "xlsx" | "pdf") => {
    handleExport(
      format,
      [
        "Employee",
        "Start Time",
        "End Time",
        "Starting Cash",
        "Expected Cash",
        "Actual Cash",
        "Difference",
      ],
      shifts.map((s) => [
        s.employee,
        s.startTime,
        s.endTime,
        s.startingCash,
        s.expectedCash,
        s.actualCash,
        s.difference,
      ]),
      "shift-report"
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Shift</h1>
        <ExportButton onExport={doExport} variant="dark" />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <OutletSelector />
        <DateNavigator />
      </div>

      {/* Content */}
      <div className="bg-white border border-gray-200 rounded shadow-sm min-h-[400px]">
        {shifts.length === 0 ? (
          <EmptyState
            title="No Data To Display"
            description="You can start shift through your device, or select different time frame."
            linkText="Start Shift"
          />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                {[
                  "Employee",
                  "Start Time",
                  "End Time",
                  "Starting Cash",
                  "Expected Cash",
                  "Actual Cash",
                  "Difference",
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
              {shifts.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-5 py-3 text-gray-700">{s.employee}</td>
                  <td className="px-5 py-3 text-gray-700">{s.startTime}</td>
                  <td className="px-5 py-3 text-gray-700">{s.endTime}</td>
                  <td className="px-5 py-3 text-gray-700">{s.startingCash}</td>
                  <td className="px-5 py-3 text-gray-700">{s.expectedCash}</td>
                  <td className="px-5 py-3 text-gray-700">{s.actualCash}</td>
                  <td className="px-5 py-3 text-gray-700">{s.difference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
