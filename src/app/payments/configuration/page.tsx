"use client";

import { Search, Info } from "lucide-react";
import { paymentConfigurationRows } from "@/lib/mock-data/payments";

export default function PaymentConfigurationPage() {
  return (
    <div className="px-6 py-4">
      <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="mb-8 text-[2.6rem] font-bold leading-none text-[#686868]">
            Payment Configuration
          </h1>

          <div className="relative max-w-[272px]">
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-full border border-[#D1D5DB] bg-white py-3 pl-5 pr-12 text-[1.02rem] text-[#425466] outline-none transition focus:border-[#0B4DA2]"
            />
            <Search
              size={19}
              className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#b5bec8]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 xl:items-end">
          <div className="flex items-center gap-4 rounded-md border border-[#f2dda6] bg-[#fff5dc] px-5 py-4 text-[#a17b34]">
            <Info size={18} className="shrink-0" />
            <p className="text-[1rem]">
              Please update to the latest version of BUKU-POS on iOS and Android
              devices to use this feature.
            </p>
          </div>

          <button className="rounded-md bg-[#337ab7] px-5 py-3 text-lg font-medium text-white transition hover:bg-[#2a6598]">
            Add Configuration
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-[15px] text-[#4c5967]">
          <thead>
            <tr className="bg-[#ececec] text-[#3f3f3f]">
              {["Configuration Name", "Assigned Outlet"].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-4 text-[15px] font-semibold first:rounded-l-sm last:rounded-r-sm"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paymentConfigurationRows.map((row) => (
              <tr key={row.id} className="bg-white">
                <td className="border-b border-[#d9dfe5] px-4 py-5 text-[1.05rem] text-[#666]">
                  {row.name}
                </td>
                <td className="border-b border-[#d9dfe5] px-4 py-5 text-[1.05rem] text-[#666]">
                  {row.assignedOutlets}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
