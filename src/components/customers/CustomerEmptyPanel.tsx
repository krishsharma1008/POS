import Link from "next/link";
import { ClipboardX } from "lucide-react";

interface CustomerEmptyPanelProps {
  linkHref: string;
  linkLabel: string;
  learnMoreLabel?: string;
  minHeightClassName?: string;
}

export default function CustomerEmptyPanel({
  linkHref,
  linkLabel,
  learnMoreLabel = "Learn more about",
  minHeightClassName = "min-h-[540px]",
}: CustomerEmptyPanelProps) {
  return (
    <div
      className={`flex items-end justify-center rounded-sm border border-[#ebeff3] bg-white px-6 pb-16 ${minHeightClassName}`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-8 flex h-36 w-36 items-center justify-center rounded-full border-[5px] border-[#dddddd] text-[#cfcfcf]">
          <ClipboardX size={64} strokeWidth={1.4} />
        </div>

        <h2 className="mb-4 text-[1.1rem] font-semibold text-[#111]">
          No Data To Display
        </h2>

        <p className="text-[0.98rem] text-[#8c8c8c]">
          {learnMoreLabel}{" "}
          <Link href={linkHref} className="text-[#2d7fd2] hover:underline">
            {linkLabel}
          </Link>
        </p>
      </div>
    </div>
  );
}
