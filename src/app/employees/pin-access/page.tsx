"use client";

import Link from "next/link";
import { useState } from "react";
import { Info } from "lucide-react";
import { pinAdministrators, pinFeatures } from "@/lib/mock-data/employees";

export default function PinAccessPage() {
  const [selectedFeatures, setSelectedFeatures] = useState<Record<string, boolean>>(
    () =>
      pinFeatures.reduce<Record<string, boolean>>((accumulator, feature) => {
        accumulator[feature.id] = false;
        return accumulator;
      }, {})
  );
  const [savedMessage, setSavedMessage] = useState("");

  const toggleFeature = (featureId: string) => {
    setSavedMessage("");
    setSelectedFeatures((current) => ({
      ...current,
      [featureId]: !current[featureId],
    }));
  };

  const handleSave = () => {
    setSavedMessage("PIN access settings saved.");
  };

  return (
    <div className="px-6 py-4">
      <div className="mb-12 max-w-[1500px] space-y-8">
        <h1 className="text-[2.6rem] font-bold leading-none text-[#2d3f54]">
          PIN Access
        </h1>

        <div className="max-w-[1320px] space-y-8 text-[1.05rem] leading-10 text-[#414c58]">
          <p>PIN Access is a feature to lock certain access in Moka Apps.</p>

          <p>
            This PIN configuration will apply to outlets who have staff with PIN
            assigned and allowed to use PIN for in-app permission as set on{" "}
            <Link href="/employees/slots" className="text-[#2d7fd2] hover:underline">
              Employee Slots
            </Link>
            , and have access to mobile apps, as set on{" "}
            <Link href="/employees/access" className="text-[#2d7fd2] hover:underline">
              Employee Access
            </Link>
            .
          </p>

          <div className="flex max-w-[510px] items-start gap-4 rounded border border-[#efbf72] bg-[#ffedcb] px-5 py-5 text-[1.02rem] leading-8 text-[#49525c]">
            <Info className="mt-1 shrink-0 text-[#f3aa35]" size={28} />
            <p>
              Pin Access requires at least Moka v.26.2 on iOS and Moka v.15.9.1
              on Android.
            </p>
          </div>
        </div>
      </div>

      <div className="grid max-w-[1550px] gap-10 xl:grid-cols-[minmax(0,0.96fr)_minmax(0,1fr)]">
        <section>
          <h2 className="border-b border-[#dfe4ea] pb-3 text-[1.05rem] font-medium uppercase tracking-wide text-[#666]">
            List of Administrator
          </h2>

          <div className="space-y-8 pt-10">
            <p className="max-w-[760px] text-[1.05rem] leading-10 text-[#414c58]">
              All outlets are recommended to have at least 1 employee with
              administrator role and PIN assigned. To assign employee, go to{" "}
              <Link href="/employees/slots" className="text-[#2d7fd2] hover:underline">
                Employee Slot
              </Link>
              .
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 text-left text-[15px] text-[#4c5967]">
                <thead>
                  <tr className="bg-[#ececec] text-[#3f3f3f]">
                    {["Outlet", "Employee Name", "PIN"].map((heading) => (
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
                  {pinAdministrators.map((administrator) => (
                    <tr key={administrator.id} className="bg-white">
                      <td className="border-b border-[#edf1f5] px-4 py-5">
                        {administrator.outlet}
                      </td>
                      <td className="border-b border-[#edf1f5] px-4 py-5">
                        {administrator.employeeName}
                      </td>
                      <td className="border-b border-[#edf1f5] px-4 py-5">
                        {administrator.pin}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="flex flex-col">
          <h2 className="border-b border-[#dfe4ea] pb-3 text-[1.05rem] font-medium uppercase tracking-wide text-[#666]">
            List of Features
          </h2>

          <div className="pt-10">
            {pinFeatures.map((feature) => (
              <label
                key={feature.id}
                className="flex cursor-pointer items-start gap-5 border-b border-[#edf1f5] py-6"
              >
                <input
                  type="checkbox"
                  checked={selectedFeatures[feature.id]}
                  onChange={() => toggleFeature(feature.id)}
                  className="mt-1 h-6 w-6 rounded-sm border border-[#cfd7df] accent-[#337ab7]"
                />
                <span className="space-y-1">
                  <span className="block text-[1.05rem] font-semibold text-[#474747]">
                    {feature.label}
                  </span>
                  {feature.hint ? (
                    <span className="block text-[0.98rem] italic text-[#777]">
                      {feature.hint}
                    </span>
                  ) : null}
                </span>
              </label>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-end gap-4">
            {savedMessage ? (
              <span className="text-sm text-[#4b8f6c]">{savedMessage}</span>
            ) : null}
            <button
              onClick={handleSave}
              className="rounded-md bg-[#337ab7] px-7 py-3 text-lg font-medium text-white transition hover:bg-[#2a6598]"
            >
              Save
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
