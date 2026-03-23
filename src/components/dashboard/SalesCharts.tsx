"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { dayOfWeekData, hourlyData } from "@/lib/mock-data/dashboard";

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded shadow-sm p-5 flex-1">
      <p className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase mb-4">
        {title}
      </p>
      {children}
    </div>
  );
}

export default function SalesCharts() {
  return (
    <div className="flex gap-4">
      <ChartCard title="Day of the Week Gross Sales Amount">
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={dayOfWeekData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Hourly Gross Sales Amount">
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="hour"
              tick={{ fontSize: 9 }}
              interval={3}
            />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
