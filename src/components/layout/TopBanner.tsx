export default function TopBanner() {
  return (
    <div className="flex items-center justify-between bg-[#0B4DA2] px-9 py-3 text-white">
      <p className="text-sm font-semibold">Your trial will end in 2 day(s)</p>
      <button className="rounded-sm bg-[#F5A623] px-4 py-1.5 text-sm font-bold text-[#082f5a] transition hover:bg-[#e09510]">
        Subscribe Now
      </button>
    </div>
  );
}
