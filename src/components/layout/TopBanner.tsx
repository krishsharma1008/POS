export default function TopBanner() {
  return (
    <div className="flex items-center justify-between border-b border-[#f3e4bf] bg-[#fff4da] px-9 py-3 text-[#142a3c]">
      <p className="text-sm font-semibold">Your trial will end in 2 day(s)</p>
      <button className="rounded-sm border border-[#d6e2ef] bg-white px-4 py-1.5 text-sm font-semibold text-[#6aa8f1] transition hover:bg-[#f7fbff]">
        Subscribe Now
      </button>
    </div>
  );
}
