"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import SettingToggle from "@/components/account/SettingToggle";

export default function CheckoutPage() {
  const [taxEnabled, setTaxEnabled] = useState(false);
  const [gratuityEnabled, setGratuityEnabled] = useState(false);
  const [roundingEnabled, setRoundingEnabled] = useState(false);
  const [shiftEnabled, setShiftEnabled] = useState(true);

  return (
    <div className="max-w-[980px] px-6 py-4">
      <h1 className="mb-14 text-[2.6rem] font-bold leading-none text-[#2d3f54]">
        Checkout
      </h1>

      <section className="mb-16">
        <h2 className="mb-6 border-b border-[#D1D5DB] pb-3 text-[1rem] font-medium uppercase tracking-wide text-[#6a6a6a]">
          Tax and Gratuity Settings
        </h2>
        <div className="space-y-10">
          <div className="flex items-center justify-between">
            <span className="text-[1rem] text-[#666]">Enable Tax</span>
            <SettingToggle checked={taxEnabled} onChange={setTaxEnabled} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[1rem] text-[#666]">Enable Gratuity</span>
            <SettingToggle checked={gratuityEnabled} onChange={setGratuityEnabled} />
          </div>
          <select className="w-full rounded border border-[#cfd6dd] bg-white px-4 py-3 text-[1rem] text-[#666] outline-none">
            <option>Add Tax and Gratuity to Item Price</option>
          </select>

          <div className="flex items-start justify-between gap-8">
            <div>
              <div className="text-[1rem] font-medium text-[#666]">
                Outlet&apos;s Tax-Discount Preference
              </div>
              <p className="mt-2 max-w-[680px] text-[1rem] leading-9 text-[#666]">
                Settings for applying tax before/after discount. Gratuity will
                follow tax setting, whether it is put before or after discount
              </p>
            </div>
            <button className="rounded-md border border-[#0B4DA2] px-5 py-3 text-[1rem] text-[#2d7fd2]">
              Set Outlets
            </button>
          </div>

          <div className="flex items-center gap-4 rounded-md border border-[#f2c26f] bg-[#fff3d7] px-5 py-5 text-[1rem] text-[#666]">
            <Info className="shrink-0 text-[#f0ac3f]" size={30} />
            <p>
              This feature currently only works on iOS (v26.5 the least), coming
              soon on Android
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 border-b border-[#D1D5DB] pb-3 text-[1rem] font-medium uppercase tracking-wide text-[#6a6a6a]">
          Rounding Settings
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-[1rem] text-[#666]">Enable Rounding</span>
          <SettingToggle checked={roundingEnabled} onChange={setRoundingEnabled} />
        </div>
      </section>

      <section>
        <h2 className="mb-6 border-b border-[#D1D5DB] pb-3 text-[1rem] font-medium uppercase tracking-wide text-[#6a6a6a]">
          Shift Settings
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-[1rem] text-[#666]">Start Shift Automatically</span>
          <SettingToggle checked={shiftEnabled} onChange={setShiftEnabled} />
        </div>
      </section>
    </div>
  );
}
