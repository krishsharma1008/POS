import Link from "next/link";
import { ArrowRight, CircleHelp, Play } from "lucide-react";
import { loyaltyResources } from "@/lib/mock-data/customers";

export default function LoyaltyProgramPage() {
  return (
    <div className="px-6 py-4">
      <h1 className="mb-12 text-[2.6rem] font-bold leading-none text-[#2d3f54]">
        Loyalty Program
      </h1>

      <div className="grid max-w-[1450px] gap-10 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <section>
          <div className="relative overflow-hidden rounded-sm bg-[#ececec] shadow-sm">
            <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(0,0,0,0.72),rgba(0,0,0,0.1))]" />
            <div className="absolute left-11 top-7 z-10">
              <div className="flex items-center gap-4 text-white">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3f66d9] text-2xl font-semibold">
                  m
                </div>
                <div>
                  <p className="text-[1.15rem] font-semibold">
                    Introduction to Moka Loyalty Program
                  </p>
                  <p className="text-base text-white/85">Moka Indonesia</p>
                </div>
              </div>
            </div>

            <div className="aspect-[16/9] bg-[radial-gradient(circle_at_18%_72%,#ffffff_0_16%,transparent_17%),radial-gradient(circle_at_52%_27%,#ffffff_0_14%,transparent_15%),linear-gradient(180deg,#f2f2f2_0%,#f3edd5_43%,#d9e6d5_44%,#d9e6d5_48%,#f0f0f0_49%,#f0f0f0_100%)]">
              <div className="absolute inset-x-[32%] top-[18%] rounded-[32px] bg-white px-10 py-5 text-center shadow-sm">
                <p className="text-lg font-semibold uppercase tracking-wide text-[#222]">
                  Member
                </p>
                <p className="text-[3rem] font-bold leading-none text-[#222]">16</p>
              </div>

              <div className="absolute left-[38%] top-[43%] flex h-16 w-24 items-center justify-center rounded-[18px] bg-[#ff2018] shadow-lg">
                <Play size={28} className="fill-white text-white" />
              </div>

              <div className="absolute bottom-6 right-10 rounded-[26px] bg-[#5f5f5f] px-10 py-4 text-xl font-semibold text-white">
                Watch on YouTube
              </div>
            </div>
          </div>

          <div className="mt-16 space-y-7 text-[1.02rem] leading-9 text-[#444]">
            <p className="flex items-start gap-4">
              <CircleHelp className="mt-1 shrink-0 text-[#555]" size={34} />
              <span>
                If you need more help, you can go to{" "}
                <Link href="/customers/loyalty-program" className="font-semibold text-[#4b8fe4] hover:underline">
                  {loyaltyResources.knowledgeCenterLabel}
                </Link>
              </span>
            </p>

            <p className="pl-[50px]">
              Or you can read articles about Loyalty Program from{" "}
              <Link href="/customers/loyalty-program" className="font-semibold text-[#4b8fe4] hover:underline">
                {loyaltyResources.blogLabel}
              </Link>
            </p>
          </div>
        </section>

        <section className="flex flex-col pt-2">
          <h2 className="mb-4 text-[3.8rem] font-light leading-[1.15] text-[#222]">
            Turn Your <span className="font-semibold">Customer</span>
            <br />
            Into <span className="font-semibold">Loyalty Member</span>
          </h2>

          <div className="mb-7 h-[5px] w-36 bg-[#888]" />

          <p className="mb-10 max-w-[640px] text-[1.02rem] leading-9 text-[#444]">
            Set up your Loyalty Program today and keep your customers coming back
            for repeat purchases!
          </p>

          <p className="mb-10 text-[1.02rem] text-[#444]">One Program for all outlets.</p>

          <button className="mb-20 w-fit rounded-[28px] bg-[#4ccc00] px-11 py-5 text-[1.15rem] font-semibold text-white shadow-[0_6px_14px_rgba(53,115,0,0.25)] transition hover:bg-[#41b800]">
            <span className="inline-flex items-center gap-2">
              TRY IT NOW <ArrowRight size={22} />
            </span>
          </button>

          <div className="max-w-[560px] rounded-md border border-[#f2d28c] bg-[#fff5dc] px-6 py-6 text-[1rem] text-[#9a7331]">
            <span className="font-semibold text-[#9a7331]">Compatibility:</span>{" "}
            <span className="italic">{loyaltyResources.compatibility}</span>
          </div>
        </section>
      </div>
    </div>
  );
}
