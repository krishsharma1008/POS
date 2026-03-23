"use client";

import { useState } from "react";
import {
  Modifier,
  initialModifiers,
} from "@/lib/mock-data/library";
import ImportModal from "@/components/ui/ImportModal";
import EmptyState from "@/components/ui/EmptyState";
import { handleExport } from "@/lib/export";
import { formatRupiah } from "@/lib/format";

export default function ModifiersPage() {
  const [modifiers, setModifiers] = useState<Modifier[]>(initialModifiers);
  const [showModal, setShowModal] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [editing, setEditing] = useState<Modifier | null>(null);

  // Form state for custom modal
  const [formName, setFormName] = useState("");
  const [formOptions, setFormOptions] = useState<{ name: string; price: number }[]>([
    { name: "", price: 0 },
  ]);

  const openCreate = () => {
    setEditing(null);
    setFormName("");
    setFormOptions([{ name: "", price: 0 }]);
    setShowModal(true);
  };

  const openEdit = (mod: Modifier) => {
    setEditing(mod);
    setFormName(mod.name);
    setFormOptions(mod.options.length > 0 ? [...mod.options] : [{ name: "", price: 0 }]);
    setShowModal(true);
  };

  const handleSave = () => {
    const cleanedOptions = formOptions.filter((o) => o.name.trim() !== "");
    if (editing) {
      setModifiers((prev) =>
        prev.map((m) =>
          m.id === editing.id
            ? { ...m, name: formName, options: cleanedOptions }
            : m
        )
      );
    } else {
      setModifiers((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          name: formName,
          options: cleanedOptions,
        },
      ]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setModifiers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleImport = (mapping: Record<string, string>, rows: string[][]) => {
    const csvHeaders = Object.keys(mapping);
    const imported: Modifier[] = rows.map((row) => {
      const item: Record<string, string> = {};
      csvHeaders.forEach((csvH, idx) => {
        const field = mapping[csvH];
        if (field && idx < row.length) {
          item[field] = row[idx];
        }
      });
      return {
        id: crypto.randomUUID(),
        name: item.name || "",
        options: [],
      };
    });
    setModifiers((prev) => [...prev, ...imported]);
  };

  const onExport = () => {
    handleExport(
      "csv",
      ["Name", "Options"],
      modifiers.map((m) => [
        m.name,
        m.options.map((o) => `${o.name} (+${formatRupiah(o.price)})`).join(", "),
      ]),
      "modifiers"
    );
  };

  const addOption = () => {
    setFormOptions((prev) => [...prev, { name: "", price: 0 }]);
  };

  const updateOption = (index: number, field: "name" | "price", value: string | number) => {
    setFormOptions((prev) =>
      prev.map((o, i) => (i === index ? { ...o, [field]: value } : o))
    );
  };

  const removeOption = (index: number) => {
    setFormOptions((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-800">Modifiers</h1>
          <span className="text-sm text-gray-500">{modifiers.length} total</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowImport(true)}
            className="border border-gray-200 text-sm px-3 py-2 rounded hover:bg-gray-50"
          >
            Import CSV
          </button>
          <button
            onClick={onExport}
            className="border border-gray-200 text-sm px-3 py-2 rounded hover:bg-gray-50"
          >
            Export
          </button>
          <button
            onClick={openCreate}
            className="bg-[#2563eb] text-white text-sm px-4 py-2 rounded"
          >
            Create Modifier
          </button>
        </div>
      </div>

      {/* Table */}
      {modifiers.length === 0 ? (
        <EmptyState title="No Data To Display" description="No modifiers found." />
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Options</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {modifiers.map((mod) => (
                <tr key={mod.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">{mod.name}</td>
                  <td className="px-4 py-3">
                    {mod.options
                      .map((o) => `${o.name} (+${formatRupiah(o.price)})`)
                      .join(", ")}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => openEdit(mod)} className="text-blue-500 text-xs hover:underline">Edit</button>
                    <span className="mx-1 text-gray-300">|</span>
                    <button onClick={() => handleDelete(mod.id)} className="text-red-500 text-xs hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Custom Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-[480px]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                {editing ? "Edit Modifier" : "Create Modifier"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                {formOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Option name"
                      value={opt.name}
                      onChange={(e) => updateOption(idx, "name", e.target.value)}
                      className="border border-gray-200 rounded px-3 py-2 text-sm flex-1"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={opt.price}
                      onChange={(e) => updateOption(idx, "price", Number(e.target.value))}
                      className="border border-gray-200 rounded px-3 py-2 text-sm w-24"
                    />
                    <button
                      onClick={() => removeOption(idx)}
                      className="text-red-500 text-xs hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={addOption}
                  className="text-blue-500 text-sm hover:underline"
                >
                  Add Option
                </button>
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm text-white bg-[#2563eb] rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      <ImportModal
        isOpen={showImport}
        onClose={() => setShowImport(false)}
        fields={["name"]}
        onImport={handleImport}
      />
    </div>
  );
}
