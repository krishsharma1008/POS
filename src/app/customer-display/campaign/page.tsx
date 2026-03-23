"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Store,
} from "lucide-react";
import CustomerEmptyPanel from "@/components/customers/CustomerEmptyPanel";
import {
  customerDisplayCampaignSlides,
  customerDisplayFilters,
} from "@/lib/mock-data/customer-display";

export default function CustomerDisplayCampaignPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedOutlet, setSelectedOutlet] = useState(
    customerDisplayFilters.outlets[0]
  );
  const [selectedStatus, setSelectedStatus] = useState(
    customerDisplayFilters.statuses[0]
  );

  const slide = customerDisplayCampaignSlides[activeSlide];

  const goPrevious = () => {
    setActiveSlide((current) =>
      current === 0 ? customerDisplayCampaignSlides.length - 1 : current - 1
    );
  };

  const goNext = () => {
    setActiveSlide((current) => (current + 1) % customerDisplayCampaignSlides.length);
  };

  return (
    <div className="px-6 py-4">
      <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <h1 className="text-[2.6rem] font-bold leading-none text-[#0d2a42]">
          Customer Display
        </h1>

        <button className="rounded-md bg-[#0d5ab8] px-6 py-3 text-lg font-semibold text-white transition hover:bg-[#0a4a98]">
          Create Campaign
        </button>
      </div>

      <section className="relative mb-7 overflow-hidden rounded-xl bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.10),transparent_24%),linear-gradient(135deg,#0f9fdb_0%,#13bfe7_52%,#2dc5f1_100%)] px-8 py-10 text-white shadow-sm">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,transparent_68%,rgba(255,255,255,0.08)_68%,rgba(255,255,255,0.08)_74%,transparent_74%)]" />

        <button
          onClick={goPrevious}
          className="absolute left-5 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
          aria-label="Previous slide"
        >
          <ChevronLeft size={34} />
        </button>

        <button
          onClick={goNext}
          className="absolute right-5 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
          aria-label="Next slide"
        >
          <ChevronRight size={34} />
        </button>

        <div className="relative grid min-h-[285px] gap-8 lg:grid-cols-[330px_minmax(0,1fr)] lg:items-center">
          <div className="flex items-center justify-center">
            <div className="relative flex h-[240px] w-[220px] items-end justify-center">
              <div className="absolute bottom-0 h-8 w-[210px] rounded-full bg-[#0f77b2]/50 blur-md" />
              <div className="relative h-[205px] w-[100px] rounded-b-[14px] bg-[linear-gradient(180deg,#fdfefe,#dbe7ef)] shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
                <div className="absolute -left-10 top-0 h-[140px] w-[170px] rounded-[10px] border-[10px] border-[#eef4f8] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.15)]">
                  <div className="absolute inset-3 rounded bg-[linear-gradient(135deg,#f7fbff,#e6eef5)]">
                    <div className="mx-auto mt-4 h-14 w-14 rounded border-4 border-[#dce7ef] bg-white" />
                    <div className="mx-auto mt-3 h-2 w-16 rounded bg-[#d8e4ed]" />
                    <div className="mx-auto mt-2 h-2 w-11 rounded bg-[#d8e4ed]" />
                  </div>
                </div>
                <div className="absolute bottom-[70px] left-1/2 h-[88px] w-[18px] -translate-x-1/2 rounded bg-[linear-gradient(180deg,#eef4f8,#cddae4)]" />
                <div className="absolute bottom-0 left-1/2 h-[18px] w-[150px] -translate-x-1/2 rounded-[14px] bg-[linear-gradient(180deg,#fdfefe,#dbe7ef)]" />
                <div className="absolute bottom-[26px] left-1/2 -translate-x-1/2 text-sm font-semibold uppercase tracking-wider text-[#0892da]">
                  Moka
                </div>
              </div>
            </div>
          </div>

          <div className="pr-8">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="max-w-[1040px] rounded-[28px] bg-[linear-gradient(90deg,#0d53d0,#0f8ddb)] px-9 py-5 shadow-[0_18px_30px_rgba(13,83,208,0.18)]">
                <h2 className="text-[3rem] font-semibold leading-none tracking-tight">
                  {slide.title}
                </h2>
              </div>
              <div className="hidden pt-2 text-right text-[1.2rem] font-semibold tracking-[0.18em] text-white/90 lg:block">
                MOKA ULTRA
              </div>
            </div>

            <div className="rounded-[22px] bg-white px-9 py-7 text-[1.15rem] leading-[1.35] text-[#0f4d95] shadow-[0_10px_24px_rgba(0,0,0,0.12)]">
              {slide.description}
            </div>

            <div className="mt-4 flex justify-center gap-4">
              {customerDisplayCampaignSlides.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSlide(index)}
                  className={`h-4 w-4 rounded-full transition ${
                    index === activeSlide ? "bg-white" : "bg-white/45"
                  }`}
                  aria-label={`Go to ${item.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mb-9 flex flex-col gap-3 md:flex-row">
        <div className="relative">
          <Store
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white"
          />
          <select
            value={selectedOutlet}
            onChange={(event) => setSelectedOutlet(event.target.value)}
            className="min-w-[304px] appearance-none rounded-2xl bg-[#c7cdd3] py-4 pl-11 pr-12 text-[1.02rem] text-white outline-none"
          >
            {customerDisplayFilters.outlets.map((outlet) => (
              <option key={outlet} value={outlet}>
                {outlet}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white"
          />
        </div>

        <div className="relative">
          <Monitor
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white"
          />
          <select
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value)}
            className="min-w-[304px] appearance-none rounded-2xl bg-[#c7cdd3] py-4 pl-11 pr-12 text-[1.02rem] text-white outline-none"
          >
            {customerDisplayFilters.statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white"
          />
        </div>
      </div>

      <CustomerEmptyPanel
        linkHref="/customer-display/campaign"
        linkLabel="purchase the device here"
        learnMoreLabel="This page is dedicated for Customer Display user. Customer Display is a standalone hardware that support customer facing screen. Click Create Campaign if you already have one or"
        minHeightClassName="min-h-[430px]"
      />

      <p className="mt-10 text-right text-sm text-[#c1c7cf]">v2026.02.24-1</p>

      <div className="sr-only">
        <Link href="/customer-display/settings">Settings</Link>
      </div>
    </div>
  );
}
