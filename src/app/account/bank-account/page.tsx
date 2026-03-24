import { ClipboardX, Search } from "lucide-react";

export default function BankAccountPage() {
  return (
    <div className="px-6 py-4">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="mb-8 text-[2.6rem] font-bold leading-none text-[#2d3f54]">
            Bank Account
          </h1>
          <div className="relative max-w-[272px]">
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-full border border-[#D1D5DB] bg-white py-3 pl-5 pr-12 text-[1.02rem] text-[#425466] outline-none"
            />
            <Search
              size={19}
              className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#b5bec8]"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-md border border-[#0B4DA2] bg-white px-5 py-3 text-lg font-medium text-[#2d7fd2]">
            Activity Log
          </button>
          <button className="rounded-md bg-[#337ab7] px-5 py-3 text-lg font-medium text-white">
            Add Bank
          </button>
        </div>
      </div>

      <div className="flex min-h-[540px] flex-col items-center justify-center text-center">
        <div className="mb-8 flex h-36 w-36 items-center justify-center rounded-full border-[5px] border-[#dddddd] text-[#cfcfcf]">
          <ClipboardX size={64} strokeWidth={1.4} />
        </div>
        <h2 className="mb-4 text-[1.1rem] font-semibold text-[#4c4c4c]">
          No Data To Display
        </h2>
        <p className="text-[1rem] text-[#9a9a9a]">
          Add your bank account and activate mobile payment to join endless promo
          from our partner.
        </p>
        <p className="mt-3 text-[1rem] text-[#9a9a9a]">
          Learn more about{" "}
          <button className="text-[#2d7fd2] hover:underline">
            Mobile payment acceptance
          </button>
        </p>
      </div>
    </div>
  );
}
