"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search, ArrowRight } from "lucide-react";
import { handleExport } from "@/lib/export";
import CustomerEmptyPanel from "@/components/customers/CustomerEmptyPanel";
import { customerImportExportOptions } from "@/lib/mock-data/customers";

export default function CustomersListPage() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const hasQuery = useMemo(() => search.trim().length > 0, [search]);

  const exportCustomers = () => {
    handleExport("csv", ["Name", "Email", "Phone"], [], "customers");
    setMenuOpen(false);
  };

  return (
    <div className="px-6 py-4">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <h1 className="text-[2.6rem] font-bold leading-none text-[#2d3f54]">
          Customer List
        </h1>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((current) => !current)}
            className="flex items-center gap-2 rounded-md bg-[#337ab7] px-5 py-3 text-lg font-medium text-white transition hover:bg-[#2a6598]"
          >
            Import / Export
            <ChevronDown size={18} />
          </button>

          {menuOpen ? (
            <div className="absolute right-0 top-full z-10 mt-2 min-w-[240px] rounded-md border border-[#d9e1e8] bg-white shadow-lg">
              <button
                onClick={() => setMenuOpen(false)}
                className="block w-full px-4 py-3 text-left text-sm text-[#4c5967] transition hover:bg-[#f6f9fc]"
              >
                {customerImportExportOptions[0]}
              </button>
              <button
                onClick={exportCustomers}
                className="block w-full px-4 py-3 text-left text-sm text-[#4c5967] transition hover:bg-[#f6f9fc]"
              >
                {customerImportExportOptions[1]}
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <section className="relative mb-8 overflow-hidden rounded-md border border-[#d8e1ea] bg-[linear-gradient(90deg,#3f66d9_18%,#59a0e2_100%)] shadow-sm">
        <div className="absolute inset-y-0 left-0 w-[360px] bg-white [clip-path:polygon(0_0,100%_0,86%_66%,47%_100%,0_100%)]" />

        <div className="relative flex min-h-[164px] flex-col gap-8 px-12 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full max-w-[340px] text-[2.2rem] font-semibold leading-[1.05] text-[#4f95ea]">
            Loyalty
            <br />
            Program
          </div>

          <div className="max-w-[760px] text-white">
            <h2 className="mb-3 text-[2rem] font-light leading-tight lg:text-[2.15rem]">
              Turn Your <span className="font-semibold">Customer</span>
              <br />
              Into <span className="font-semibold">Loyal Member</span>
            </h2>
            <p className="text-lg text-white/90">
              Digital Membership
              <span className="px-4">•</span>
              Point Reward System
              <span className="px-4">•</span>
              Increase Sales
            </p>
          </div>

          <button className="shrink-0 rounded-[28px] bg-[#4ccc00] px-11 py-5 text-[1.15rem] font-semibold text-white shadow-[0_6px_14px_rgba(53,115,0,0.25)] transition hover:bg-[#41b800]">
            <span className="inline-flex items-center gap-2">
              FIND OUT MORE <ArrowRight size={22} />
            </span>
          </button>
        </div>
      </section>

      <div className="mb-6 max-w-[272px]">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Name, email, phone"
            className="w-full rounded-full border border-[#D1D5DB] bg-white py-3 pl-5 pr-12 text-[1.02rem] text-[#425466] outline-none transition focus:border-[#0B4DA2]"
          />
          <Search
            size={19}
            className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#7f8ea3]"
          />
        </div>
      </div>

      <CustomerEmptyPanel
        linkHref="/customers/list"
        linkLabel={
          hasQuery ? "Try another name, email, or phone search" : "Import Your Existing Customer Database"
        }
      />
    </div>
  );
}
