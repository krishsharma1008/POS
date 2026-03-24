"use client";

import { useState } from "react";
import { CircleCheckBig } from "lucide-react";
import { inventoryConfigurations } from "@/lib/mock-data/account";

function ConfigCard({
  title,
  description,
  selected,
  onClick,
  cta,
}: {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  cta: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border p-4 text-left transition ${
        selected ? "border-[#2d7fd2] bg-[#f4f8ff]" : "border-[#D1D5DB] bg-white"
      }`}
    >
      <div className="mb-4 flex items-start gap-3">
        <span
          className={`mt-1 h-5 w-5 rounded-full border-2 ${
            selected ? "border-[#2d7fd2]" : "border-[#c5ccd3]"
          }`}
        />
        <div>
          <div className="text-[1rem] font-semibold text-[#666]">{title}</div>
          <div className="mt-2 text-[1rem] leading-9 text-[#666]">{description}</div>
        </div>
      </div>
      <div className="relative mt-6 h-[240px] overflow-hidden rounded bg-[linear-gradient(180deg,#b7d7f8,#79b5ee)]">
        <div className="absolute left-10 top-10 h-[170px] w-[220px] rounded bg-white shadow-sm" />
        <div className="absolute left-10 top-10 h-[170px] w-10 rounded-l bg-[#30495b]" />
        <div className="absolute right-14 top-18 flex h-14 w-14 items-center justify-center rounded-full bg-[#4caf50] text-white">
          <CircleCheckBig size={28} />
        </div>
        <div className="absolute bottom-12 right-16 rounded bg-[#4b7cc0] px-8 py-3 text-white">
          {cta}
        </div>
      </div>
    </button>
  );
}

export default function AccountInventoryPage() {
  const [selectedPo, setSelectedPo] = useState("simple-po");
  const [selectedTransfer, setSelectedTransfer] = useState("simple-transfer");

  return (
    <div className="px-6 py-4">
      <h1 className="mb-10 text-[2.6rem] font-bold leading-none text-[#686868]">
        Inventory
      </h1>

      <section className="mb-16 border-y border-[#ebeff3] py-8">
        <h2 className="text-[1.15rem] font-semibold text-[#666]">
          Configure based on your business needs.
        </h2>
        <p className="mt-4 max-w-[1500px] text-[1rem] leading-9 text-[#666]">
          Introducing advanced configuration for Purchase Order, Transfer, and
          Adjustment settings, allowing your business to add <b>Approval</b>,{" "}
          <b>Shipment</b>, and <b>Fulfillment</b> processes to better track your
          inventory stocks.
        </p>
      </section>

      <section className="mb-20 grid gap-10 xl:grid-cols-[0.7fr_1.3fr]">
        <div>
          <h3 className="text-[1.15rem] font-semibold text-[#082f5a]">
            Purchase Order Configuration
          </h3>
          <p className="mt-4 text-[1rem] leading-9 text-[#666]">
            Set your business level Inventory process for Purchase Order. This
            will be applied to All Outlets.{" "}
            <button className="font-semibold text-[#2d7fd2] hover:underline">
              Learn more
            </button>
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {inventoryConfigurations.purchaseOrder.map((option) => (
            <ConfigCard
              key={option.id}
              title={option.title}
              description={option.description}
              cta={option.cta}
              selected={selectedPo === option.id}
              onClick={() => setSelectedPo(option.id)}
            />
          ))}
        </div>
      </section>

      <section className="mb-12 grid gap-10 xl:grid-cols-[0.7fr_1.3fr]">
        <div>
          <h3 className="text-[1.15rem] font-semibold text-[#082f5a]">
            Transfer Configuration
          </h3>
          <p className="mt-4 text-[1rem] leading-9 text-[#666]">
            Set your business-level inventory process for Transfer. This will be
            applied to all outlets.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {inventoryConfigurations.transfer.map((option) => (
            <ConfigCard
              key={option.id}
              title={option.title}
              description={option.description}
              cta={option.cta}
              selected={selectedTransfer === option.id}
              onClick={() => setSelectedTransfer(option.id)}
            />
          ))}
        </div>
      </section>

      <div className="flex justify-end gap-4">
        <button className="rounded-md border border-[#D1D5DB] bg-white px-6 py-3 text-[1.1rem] text-[#333]">
          Cancel
        </button>
        <button className="rounded-md bg-[#337ab7] px-6 py-3 text-[1.1rem] font-medium text-white">
          Save
        </button>
      </div>
    </div>
  );
}
