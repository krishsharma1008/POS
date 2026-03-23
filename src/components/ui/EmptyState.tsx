import { ClipboardX } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  linkText?: string;
  linkHref?: string;
}

export default function EmptyState({
  title = "No Data To Display",
  description,
  linkText,
  linkHref = "#",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
        <ClipboardX size={36} className="text-gray-400" />
      </div>
      <p className="text-base font-semibold text-gray-800 mb-2">{title}</p>
      {description && (
        <p className="text-sm text-gray-400 mb-1">{description}</p>
      )}
      {linkText && (
        <p className="text-sm text-gray-400">
          Learn more about{" "}
          <a href={linkHref} className="text-blue-500 underline">
            {linkText}
          </a>
        </p>
      )}
    </div>
  );
}
