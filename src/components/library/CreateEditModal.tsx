"use client";

import { useState } from "react";
import { X } from "lucide-react";

export interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "number" | "select" | "toggle";
  options?: string[];
  placeholder?: string;
}

interface CreateEditModalProps {
  title: string;
  fields: FieldConfig[];
  values?: Record<string, unknown>;
  onSave: (values: Record<string, unknown>) => void;
  onClose: () => void;
}

function buildInitialFormState(
  fields: FieldConfig[],
  values: Record<string, unknown>
) {
  return fields.reduce<Record<string, unknown>>((initial, field) => {
    if (values[field.key] !== undefined) {
      initial[field.key] = values[field.key];
    } else if (field.type === "toggle") {
      initial[field.key] = true;
    } else {
      initial[field.key] = "";
    }
    return initial;
  }, {});
}

export function CreateEditModal({
  title,
  fields,
  values = {},
  onSave,
  onClose,
}: CreateEditModalProps) {
  const [formState, setFormState] = useState<Record<string, unknown>>(() =>
    buildInitialFormState(fields, values)
  );

  const updateField = (key: string, value: unknown) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(formState);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 space-y-4">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>

              {field.type === "text" && (
                <input
                  type="text"
                  value={(formState[field.key] as string) ?? ""}
                  placeholder={field.placeholder}
                  onChange={(e) => updateField(field.key, e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}

              {field.type === "number" && (
                <input
                  type="number"
                  value={(formState[field.key] as string | number) ?? ""}
                  placeholder={field.placeholder}
                  onChange={(e) => updateField(field.key, e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}

              {field.type === "select" && (
                <select
                  value={(formState[field.key] as string) ?? ""}
                  onChange={(e) => updateField(field.key, e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">
                    {field.placeholder ?? "Select an option"}
                  </option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {field.type === "toggle" && (
                <button
                  type="button"
                  onClick={() =>
                    updateField(field.key, !formState[field.key])
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formState[field.key] ? "bg-[#2563eb]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formState[field.key] ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                  <span className="ml-14 text-sm text-gray-600">
                    {formState[field.key] ? "Active" : "Inactive"}
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm text-white bg-[#2563eb] hover:bg-blue-700 rounded transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
