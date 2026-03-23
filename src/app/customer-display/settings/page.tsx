"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { customerDisplaySettingsNotice } from "@/lib/mock-data/customer-display";

export default function CustomerDisplaySettingsPage() {
  const [feedbackEnabled, setFeedbackEnabled] = useState(true);

  return (
    <div className="max-w-[980px] px-6 py-4">
      <h1 className="mb-12 text-[2.6rem] font-bold leading-none text-[#0d2a42]">
        Customer Display Settings
      </h1>

      <section>
        <h2 className="border-b border-[#d7dde5] pb-4 text-[1.05rem] font-semibold text-[#395468]">
          Feedback
        </h2>

        <div className="flex flex-col gap-8 py-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-[560px]">
            <h3 className="mb-2 text-[1.1rem] font-semibold text-[#3d5a70]">
              Enable CRM Feedback
            </h3>
            <p className="text-[1rem] leading-10 text-[#3d5a70]">
              When turned on, customers can give feedback directly to customer
              facing display
            </p>
          </div>

          <button
            type="button"
            aria-pressed={feedbackEnabled}
            onClick={() => setFeedbackEnabled((current) => !current)}
            className="flex h-12 w-[132px] overflow-hidden rounded-md border border-[#c4ccd5] bg-white shadow-sm"
          >
            <span
              className={`flex flex-1 items-center justify-center text-[1rem] font-semibold transition ${
                feedbackEnabled ? "bg-[#2f76c3] text-white" : "bg-[#eef2f5] text-[#8a99a8]"
              }`}
            >
              ON
            </span>
            <span
              className={`flex flex-1 items-center justify-center text-[1rem] font-semibold transition ${
                feedbackEnabled ? "bg-[#eef2f5] text-[#8a99a8]" : "bg-[#2f76c3] text-white"
              }`}
            >
              OFF
            </span>
          </button>
        </div>

        <div className="mb-8 flex items-start gap-4 rounded-md border border-[#f2c26f] bg-[#fff3d7] px-5 py-5 text-[1rem] text-[#3d5a70]">
          <Info className="mt-0.5 shrink-0 text-[#f0ac3f]" size={30} />
          <p>{customerDisplaySettingsNotice}</p>
        </div>

        <div className="border-b border-[#e3e8ee]" />
      </section>

      <p className="fixed bottom-2 right-3 text-sm text-[#c1c7cf]">v2026.02.24-1</p>
    </div>
  );
}
