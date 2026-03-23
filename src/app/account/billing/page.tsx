"use client";

import { useState } from "react";
import { CalendarClock, WalletCards, ChevronRight } from "lucide-react";
import { billingHistoryRows } from "@/lib/mock-data/account";

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState("Moka Monthly");

  return (
    <div className="px-6 py-4">
      <h1 className="mb-14 text-[2.6rem] font-bold leading-none text-[#0d2a42]">
        Billing
      </h1>

      <div className="grid gap-12 xl:grid-cols-[1fr_0.95fr]">
        <section>
          <h2 className="mb-10 text-[1.15rem] font-semibold text-[#0d2a42]">
            Current Plan
          </h2>
          <div className="rounded-[22px] bg-[#fafafa] px-8 py-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#ebeff3] pb-8">
              <div className="flex items-center gap-5 text-[#3d5568]">
                <CalendarClock size={30} />
                <span className="text-[1.1rem] font-semibold">Subscription plan</span>
              </div>
              <span className="text-[1.1rem] text-[#445f73]">Moka POS Trial</span>
            </div>
            <div className="flex items-center justify-between pt-8">
              <div className="flex items-center gap-5 text-[#3d5568]">
                <WalletCards size={30} />
                <span className="text-[1.1rem] font-semibold">Last payment</span>
              </div>
              <span className="text-[1.1rem] text-[#445f73]">N/A</span>
            </div>
          </div>

          <h2 className="mb-8 mt-14 text-[1.15rem] font-semibold text-[#0d2a42]">
            Active Outlet
          </h2>
          <div className="overflow-hidden rounded-[22px] bg-[#fafafa] shadow-sm">
            <table className="min-w-full text-left text-[1.02rem] text-[#4b6478]">
              <thead className="bg-[#ececec] text-[#3f5669]">
                <tr>
                  <th className="px-6 py-5 font-semibold">Outlet Name</th>
                  <th className="px-6 py-5 font-semibold">Expiry Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-6 py-6">Outlet 1</td>
                  <td className="px-6 py-6">25 Mar 2026</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="mb-8 mt-16 text-[1.15rem] font-semibold text-[#0d2a42]">
            Billing History
          </h2>
          <div className="overflow-hidden rounded-[22px] bg-[#fafafa] shadow-sm">
            <table className="min-w-full text-left text-[1.02rem] text-[#4b6478]">
              <thead className="bg-[#ececec] text-[#3f5669]">
                <tr>
                  <th className="px-6 py-5 font-semibold">Invoice Date</th>
                  <th className="px-6 py-5 font-semibold">Invoice Number</th>
                  <th className="px-6 py-5 font-semibold">Period</th>
                  <th className="px-6 py-5 font-semibold">Total Amount</th>
                  <th className="px-6 py-5 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {billingHistoryRows.map((row) => (
                  <tr key={row.id} className="bg-white">
                    <td className="px-6 py-6" colSpan={5}>
                      <div className="text-center font-semibold text-[#0d2a42]">
                        {row.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside>
          <h2 className="mb-10 text-[1.15rem] font-semibold text-[#0d2a42]">
            Payment
          </h2>
          <div className="rounded-[22px] bg-[#fafafa] px-8 py-8 shadow-sm">
            <div className="mb-4 flex items-center justify-between rounded-[18px] bg-white px-8 py-7">
              <span className="text-[1.1rem] font-semibold text-[#3d5568]">
                Billing Cycle
              </span>
              <select
                value={billingCycle}
                onChange={(event) => setBillingCycle(event.target.value)}
                className="rounded-xl border border-[#d7dde5] bg-white px-5 py-3 text-[1rem] text-[#0d2a42]"
              >
                <option>Moka Monthly</option>
                <option>Moka Quarterly</option>
              </select>
            </div>

            <button className="mb-4 flex w-full items-center justify-between rounded-[18px] bg-white px-8 py-7 text-left">
              <div>
                <div className="text-[1.1rem] font-semibold text-[#3d5568]">Outlets (1)</div>
                <div className="mt-1 text-[0.98rem] text-[#5f7688]">
                  Expand for detail payment per outlet.
                </div>
              </div>
              <ChevronRight size={28} className="text-[#0d2a42]" />
            </button>

            <div className="rounded-[18px] bg-white px-8 py-7">
              <div className="mb-8 flex">
                <input
                  type="text"
                  placeholder="Insert coupon code"
                  className="flex-1 rounded-l-xl border border-[#d7dde5] px-5 py-4 text-[1rem] outline-none"
                />
                <button className="rounded-r-xl bg-[#c5cfd7] px-7 py-4 text-[1rem] font-semibold text-[#617888]">
                  Apply
                </button>
              </div>

              <div className="border-t border-[#e6ebf0] pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[1.2rem] font-semibold text-[#0d2a42]">
                      Total
                    </div>
                    <div className="mt-2 text-[1.02rem] text-[#5f7688]">
                      expiration date will be extended to
                    </div>
                    <div className="text-[1.02rem] text-[#1662c2]">25 Apr 2026</div>
                  </div>
                  <div className="text-[2rem] font-bold text-[#0d2a42]">Rp 299.000</div>
                </div>
              </div>
            </div>

            <button className="mt-5 w-full rounded-xl bg-[#0d5ab8] px-6 py-4 text-[1.2rem] font-semibold text-white">
              Pay
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
