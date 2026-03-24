"use client";

import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Store } from "lucide-react";
import CustomerEmptyPanel from "@/components/customers/CustomerEmptyPanel";
import { feedbackFilters } from "@/lib/mock-data/customers";

export default function FeedbackPage() {
  const [selectedEmployee, setSelectedEmployee] = useState(
    feedbackFilters.employees[0]
  );
  const [selectedFeedbackType, setSelectedFeedbackType] = useState(
    feedbackFilters.feedbackTypes[0]
  );

  return (
    <div className="px-6 py-4">
      <div className="mb-10">
        <h1 className="mb-8 text-[2.6rem] font-bold leading-none text-[#2d3f54]">
          Feedback
        </h1>

        <div className="border-b border-[#d6dce3]">
          <button className="border-b-[4px] border-[#3f59a7] px-0 pb-3 text-[1rem] font-semibold text-[#3f59a7]">
            Summary
          </button>
        </div>
      </div>

      <div className="mb-11 flex flex-col gap-3 xl:flex-row xl:items-center">
        <button className="flex min-w-[304px] items-center gap-3 rounded-md border border-[#D1D5DB] bg-white px-4 py-3 text-[1rem] text-[#4c5967]">
          <Store size={20} className="text-[#9aa9b9]" />
          Outlet 1
        </button>

        <div className="flex overflow-hidden rounded-md border border-[#D1D5DB] bg-white">
          <button className="border-r border-[#D1D5DB] px-4 text-[#6f7f8f] transition hover:bg-[#f6f9fc]">
            <ChevronLeft size={20} />
          </button>
          <button className="flex min-w-[258px] items-center justify-center gap-2 px-6 py-3 text-[1rem] text-[#4c5967]">
            23/3/2026
            <ChevronDown size={18} className="text-[#6f7f8f]" />
          </button>
          <button className="border-l border-[#D1D5DB] px-4 text-[#6f7f8f] transition hover:bg-[#f6f9fc]">
            <ChevronRight size={20} />
          </button>
        </div>

        <select
          value={selectedEmployee}
          onChange={(event) => setSelectedEmployee(event.target.value)}
          className="rounded-md border border-[#D1D5DB] bg-white px-4 py-3 text-[1rem] text-[#4c5967] outline-none transition focus:border-[#0B4DA2]"
        >
          {feedbackFilters.employees.map((employee) => (
            <option key={employee} value={employee}>
              {employee}
            </option>
          ))}
        </select>

        <select
          value={selectedFeedbackType}
          onChange={(event) => setSelectedFeedbackType(event.target.value)}
          className="rounded-md border border-[#D1D5DB] bg-white px-4 py-3 text-[1rem] text-[#4c5967] outline-none transition focus:border-[#0B4DA2]"
        >
          {feedbackFilters.feedbackTypes.map((feedbackType) => (
            <option key={feedbackType} value={feedbackType}>
              {feedbackType}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-11 grid gap-10 xl:grid-cols-2">
        <div className="rounded-xl border border-[#c5cfdf] bg-[#f1f3f6] px-7 py-8">
          <p className="mb-2 text-[1rem] font-semibold uppercase text-[#9a9a9a]">
            Good Feedbacks
          </p>
          <p className="text-[2rem] font-semibold leading-none text-[#666]">0</p>
        </div>

        <div className="rounded-xl border border-[#c5cfdf] bg-[#f1f3f6] px-7 py-8">
          <p className="mb-2 text-[1rem] font-semibold uppercase text-[#9a9a9a]">
            Bad Feedbacks
          </p>
          <p className="text-[2rem] font-semibold leading-none text-[#666]">0</p>
        </div>
      </div>

      <CustomerEmptyPanel
        linkHref="/customers/feedback"
        linkLabel="View and Respond to Customer Feedback"
        minHeightClassName="min-h-[500px]"
      />
    </div>
  );
}
