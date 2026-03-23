export default function NoDataCard({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded shadow-sm p-5 ${className}`}
    >
      <p className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase mb-4">
        {title}
      </p>
      <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
        No Data
      </div>
    </div>
  );
}
