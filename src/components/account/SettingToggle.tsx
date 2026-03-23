"use client";

interface SettingToggleProps {
  checked: boolean;
  onChange?: (value: boolean) => void;
  onLabel?: string;
  offLabel?: string;
}

export default function SettingToggle({
  checked,
  onChange,
  onLabel = "ON",
  offLabel = "OFF",
}: SettingToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={() => onChange?.(!checked)}
      className="flex h-10 w-[120px] overflow-hidden rounded-md border border-[#c9d0d7] bg-white shadow-sm"
    >
      <span
        className={`flex flex-1 items-center justify-center text-[0.95rem] font-semibold transition ${
          checked ? "bg-[#1670d4] text-white" : "bg-[#eef2f5] text-[#8a99a8]"
        }`}
      >
        {onLabel}
      </span>
      <span
        className={`flex flex-1 items-center justify-center text-[0.95rem] font-semibold transition ${
          checked ? "bg-[#eef2f5] text-[#3f3f3f]" : "bg-[#f8fafc] text-[#3f3f3f]"
        }`}
      >
        {offLabel}
      </span>
    </button>
  );
}
