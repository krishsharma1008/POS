import clsx from "clsx";

interface StatCardProps {
  label: string;
  value: string | number;
  className?: string;
}

export default function StatCard({ label, value, className }: StatCardProps) {
  return (
    <div
      className={clsx(
        "bg-white border border-gray-200 rounded p-5 shadow-sm",
        className
      )}
    >
      <p className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase mb-2">
        {label}
      </p>
      <p className="text-xl font-medium text-gray-800">{value}</p>
    </div>
  );
}
