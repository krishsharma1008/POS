"use client";

import { useState } from "react";
import { Store, Upload, Phone } from "lucide-react";
import { receiptPreviewItems } from "@/lib/mock-data/account";

export default function ReceiptPage() {
  const [activeTab, setActiveTab] = useState<"customization" | "sharing">(
    "customization"
  );

  return (
    <div className="px-6 py-4">
      <h1 className="mb-8 text-[2.6rem] font-bold leading-none text-[#2d3f54]">
        Receipt
      </h1>

      <div className="mb-8 border-b border-[#D1D5DB]">
        <div className="flex items-center gap-16">
          <button
            onClick={() => setActiveTab("customization")}
            className={`border-b-[4px] pb-3 text-[1rem] font-semibold ${
              activeTab === "customization"
                ? "border-[#4560ab] text-[#4560ab]"
                : "border-transparent text-[#4560ab]"
            }`}
          >
            Customization
          </button>
          <button
            onClick={() => setActiveTab("sharing")}
            className={`flex items-center gap-4 border-b-[4px] pb-3 text-[1rem] font-semibold ${
              activeTab === "sharing"
                ? "border-[#4560ab] text-[#4560ab]"
                : "border-transparent text-[#4560ab]"
            }`}
          >
            Sharing Settings
            <span className="h-4 w-4 rounded-full bg-[#c64b3d]" />
          </button>
        </div>
      </div>

      <div className="mb-8 max-w-[304px]">
        <button className="flex w-full items-center gap-3 rounded-md border border-[#D1D5DB] bg-white px-4 py-3 text-[1rem] text-[#4c5967]">
          <Store size={20} className="text-[#9aa9b9]" />
          Outlet 1
        </button>
      </div>

      <div className="grid gap-10 xl:grid-cols-[1fr_0.98fr]">
        <section className="rounded-sm bg-white">
          <div className="border-b border-[#D1D5DB] pb-3 text-[1rem] font-medium uppercase tracking-wide text-[#6a6a6a]">
            Receipt Info
          </div>

          <div className="py-6">
            <div className="mb-6 text-[0.98rem] uppercase text-[#4c4c4c]">Outlet Logo</div>
            <div className="mb-8 flex gap-8">
              <div className="flex h-[170px] w-[170px] shrink-0 cursor-pointer flex-col items-center justify-center gap-3 rounded border-2 border-dashed border-[#bfc7cf] text-[#555]">
                <Upload size={34} />
                <span className="text-center text-[0.98rem] leading-tight">
                  Upload
                  <br />
                  outlet logo
                </span>
              </div>
              <p className="max-w-[420px] text-[1rem] leading-10 text-[#a0a0a0]">
                If you choose not to upload anything, outlet logo will set to
                default to image uploaded in{" "}
                <button className="text-[#2d7fd2] hover:underline">
                  public profile page
                </button>
                . Uploading image here will only affect selected outlet logo
                (Outlet 1) and make the business name in receipt changed to Outlet
                Name.
              </p>
            </div>

            <div className="mb-4 text-[0.98rem] uppercase text-[#4c4c4c]">Outlet Info</div>
            <div className="space-y-8">
              <input
                type="text"
                value="Outlet 1"
                readOnly
                className="w-full rounded border border-[#cfd6dd] bg-white px-4 py-3 text-[1rem] text-[#666] outline-none"
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full rounded border border-[#cfd6dd] bg-white px-4 py-3 text-[1rem] text-[#666] outline-none"
              />
              <div className="grid grid-cols-3 gap-8">
                <input
                  type="text"
                  placeholder="City"
                  className="rounded border border-[#cfd6dd] bg-white px-4 py-3 text-[1rem] text-[#666] outline-none"
                />
                <input
                  type="text"
                  placeholder="State"
                  className="rounded border border-[#cfd6dd] bg-white px-4 py-3 text-[1rem] text-[#666] outline-none"
                />
                <input
                  type="text"
                  placeholder="Zip"
                  className="rounded border border-[#cfd6dd] bg-white px-4 py-3 text-[1rem] text-[#666] outline-none"
                />
              </div>
              <div className="flex overflow-hidden rounded border border-[#cfd6dd] bg-white">
                <div className="flex items-center gap-2 border-r border-[#cfd6dd] px-4 text-[1rem] text-[#666]">
                  <span className="inline-block h-6 w-8 rounded-sm bg-[linear-gradient(180deg,#d82433_0%,#d82433_50%,#ffffff_50%,#ffffff_100%)]" />
                  <span>+62</span>
                </div>
                <input
                  type="text"
                  value="87778232299"
                  readOnly
                  className="flex-1 bg-white px-4 py-3 text-[1rem] text-[#666] outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end border-t border-[#edf1f5] pt-6">
            <button className="rounded-md bg-[#337ab7] px-7 py-3 text-lg font-medium text-white">
              Save
            </button>
          </div>
        </section>

        <aside>
          <div className="border-b border-[#D1D5DB] pb-3 text-[1rem] font-medium uppercase tracking-wide text-[#6a6a6a]">
            Receipt Preview
          </div>

          <div className="bg-white px-8 py-8">
            <div className="mx-auto max-w-[520px]">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-6 flex h-[190px] w-[190px] items-center justify-center rounded-full bg-[#efefef] text-[#b0b0b0]">
                  140x140
                </div>
                <h2 className="text-[2rem] font-semibold text-[#444]">Buku Bakery</h2>
                <p className="mt-3 text-[1rem] text-[#787878]">null, null, null, null</p>
                <p className="mt-2 flex items-center justify-center gap-2 text-[1rem] text-[#6a6a6a]">
                  <Phone size={20} />
                  +62 87778232299
                </p>
              </div>

              <div className="border-t border-[#D1D5DB] py-5 text-[1rem] text-[#666]">
                <div className="flex justify-between">
                  <span>23 Mar 2026</span>
                  <span>14:09</span>
                </div>
                <div className="mt-2 grid grid-cols-[1fr_auto] gap-y-1">
                  <span>Receipt Number</span>
                  <span>QGKTER5</span>
                  <span>Served By</span>
                  <span>John Doe</span>
                  <span>Collected By</span>
                  <span>Anne Doe</span>
                </div>
              </div>

              <div className="border-t border-[#D1D5DB] py-5">
                {receiptPreviewItems.map((item) => (
                  <div key={item.id} className="mb-6">
                    <div className="grid grid-cols-[1fr_auto_auto] gap-4 text-[1rem] text-[#444]">
                      <span className="font-medium">{item.name}</span>
                      <span>x{item.quantity}</span>
                      <span>{item.price}</span>
                    </div>
                    {item.modifiers?.map((modifier) => (
                      <div key={modifier} className="mt-1 pl-3 text-[0.95rem] text-[#9a9a9a]">
                        {modifier}
                      </div>
                    ))}
                    {item.promo ? (
                      <div className="mt-2 grid grid-cols-[1fr_auto] gap-4 pl-3 text-[0.95rem] italic text-[#9a9a9a]">
                        <span>{item.promo}</span>
                        <span>{item.promoAmount}</span>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
