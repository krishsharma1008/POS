"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { outletRows } from "@/lib/mock-data/account";

export default function OutletsPage() {
  const [filter, setFilter] = useState("All Gobiz Status");

  return (
    <div className="px-6 py-4">
      <div className="mb-8 flex items-start justify-between">
        <h1 className="text-[2.6rem] font-bold leading-none text-[#2d3f54]">Outlet</h1>
        <div className="flex items-center gap-4">
          <button className="rounded-md border border-[#d1d8df] bg-white px-4 py-3 text-[1rem] text-[#3f5669]">
            Outlet: 1
          </button>
          <button className="rounded-md bg-[#337ab7] px-5 py-3 text-lg font-medium text-white">
            Create Outlet
          </button>
        </div>
      </div>

      <div className="mb-8 flex gap-4">
        <div className="relative max-w-[272px]">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-full border border-[#d7dde5] bg-white py-3 pl-5 pr-12 text-[1.02rem] text-[#425466] outline-none"
          />
          <Search
            size={19}
            className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#b5bec8]"
          />
        </div>

        <div className="relative">
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="min-w-[204px] appearance-none rounded-full border border-[#d7dde5] bg-white px-5 py-3 pr-12 text-[1.02rem] text-[#6b6b6b]"
          >
            <option>All Gobiz Status</option>
            <option>Linked</option>
            <option>Not Linked</option>
          </select>
          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#a7b3bf]"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-[15px] text-[#4c5967]">
          <thead>
            <tr className="bg-[#ececec] text-[#3f3f3f]">
              {["Outlet Name", "Address", "Phone", "GoBiz Linking", "Action"].map((heading) => (
                <th key={heading} className="px-4 py-4 text-[15px] font-semibold">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {outletRows.map((row) => (
              <tr key={row.id} className="bg-white">
                <td className="border-b border-[#edf1f5] px-4 py-5">
                  <div className="mb-2">
                    <span className="rounded-full bg-[#63be63] px-3 py-1 text-sm font-semibold text-white">
                      {row.status}
                    </span>
                  </div>
                  <div className="text-[1.05rem] text-[#666]">{row.name}</div>
                </td>
                <td className="border-b border-[#edf1f5] px-4 py-5 text-[1.05rem] text-[#666]">
                  {row.address}
                </td>
                <td className="border-b border-[#edf1f5] px-4 py-5 text-[1.05rem] text-[#666]">
                  {row.phone}
                </td>
                <td className="border-b border-[#edf1f5] px-4 py-5">
                  <span className="rounded-full bg-[#a7acb2] px-3 py-1 text-sm font-semibold text-white">
                    {row.gobizLinking}
                  </span>
                </td>
                <td className="border-b border-[#edf1f5] px-4 py-5">
                  <button className="rounded-md border border-[#4d9cf5] px-5 py-3 text-[1rem] text-[#2d7fd2]">
                    Link to GoBiz
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-20 max-w-[560px] overflow-hidden rounded-xl border border-[#e6ebf0] bg-white shadow-sm">
        <div className="flex">
          <div className="w-28 bg-[linear-gradient(180deg,#9120b7,#f15bb5)]" />
          <div className="flex-1 px-6 py-5">
            <div className="text-[1.1rem] font-semibold text-[#666]">
              Enjoy All Benefits of GoBiz Linking
            </div>
            <button className="mt-3 text-[1rem] text-[#2d7fd2] hover:underline">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
