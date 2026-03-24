"use client";

import { useState } from "react";
import { initialDiscounts, type Discount } from "@/lib/mock-data/library";
import ImportModal from "@/components/ui/ImportModal";
import EmptyState from "@/components/ui/EmptyState";
import { handleExport } from "@/lib/export";
import { formatRupiah } from "@/lib/format";

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState<Discount[]>(initialDiscounts);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [editing, setEditing] = useState<Discount | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formType, setFormType] = useState<"percentage" | "fixed">("percentage");
  const [formValue, setFormValue] = useState(0);
  const [formActive, setFormActive] = useState(true);

  const filtered = discounts.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditing(null);
    setFormName("");
    setFormType("percentage");
    setFormValue(0);
    setFormActive(true);
    setShowModal(true);
  };

  const openEdit = (d: Discount) => {
    setEditing(d);
    setFormName(d.name);
    setFormType(d.type);
    setFormValue(d.value);
    setFormActive(d.active);
    setShowModal(true);
  };

  const handleSave = () => {
    if (editing) {
      setDiscounts((prev) =>
        prev.map((d) =>
          d.id === editing.id
            ? { ...d, name: formName, type: formType, value: formValue, active: formActive }
            : d
        )
      );
    } else {
      setDiscounts((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          name: formName,
          type: formType,
          value: formValue,
          active: formActive,
        },
      ]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setDiscounts((prev) => prev.filter((d) => d.id !== id));
  };

  const handleImport = (mapping: Record<string, string>, rows: string[][]) => {
    const csvHeaders = Object.keys(mapping);
    const imported: Discount[] = rows.map((row) => {
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
        type: (item.type === "fixed" ? "fixed" : "percentage") as "percentage" | "fixed",
        value: parseFloat(item.value) || 0,
        active: true,
      };
    });
    setDiscounts((prev) => [...prev, ...imported]);
  };

  const onExport = () => {
    handleExport(
      "csv",
      ["Name", "Type", "Value", "Status"],
      discounts.map((d) => [
        d.name,
        d.type,
        d.type === "percentage" ? `${d.value}%` : formatRupiah(d.value),
        d.active ? "Active" : "Inactive",
      ]),
      "discounts"
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-800">Discounts</h1>
          <span className="text-sm text-gray-500">{discounts.length} total</span>
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
            className="bg-[#0B4DA2] text-white text-sm px-4 py-2 rounded"
          >
            Create Discount
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-200 rounded px-3 py-2 text-sm w-64"
        />
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState title="No Data To Display" description="No discounts found." />
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">{d.name}</td>
                  <td className="px-4 py-3">{d.type === "percentage" ? "Percentage" : "Fixed"}</td>
                  <td className="px-4 py-3">
                    {d.type === "percentage" ? `${d.value}%` : formatRupiah(d.value)}
                  </td>
                  <td className="px-4 py-3">
                    {d.active ? (
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">Active</span>
                    ) : (
                      <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-xs">Inactive</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => openEdit(d)} className="text-blue-500 text-xs hover:underline">Edit</button>
                    <span className="mx-1 text-gray-300">|</span>
                    <button onClick={() => handleDelete(d.id)} className="text-red-500 text-xs hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-[480px]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                {editing ? "Edit Discount" : "Create Discount"}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value as "percentage" | "fixed")}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                <input
                  type="number"
                  value={formValue}
                  onChange={(e) => setFormValue(parseFloat(e.target.value) || 0)}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Active</label>
                <button
                  type="button"
                  onClick={() => setFormActive(!formActive)}
                  className={`w-10 h-5 rounded-full relative transition-colors ${formActive ? "bg-blue-500" : "bg-gray-300"}`}
                >
                  <span
                    className={`block w-4 h-4 bg-white rounded-full shadow absolute top-0.5 transition-transform ${formActive ? "translate-x-5" : "translate-x-0.5"}`}
                  />
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
                className="px-4 py-2 text-sm text-white bg-[#0B4DA2] rounded hover:bg-[#083d82]"
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
        fields={["name", "type", "value"]}
        onImport={handleImport}
      />
    </div>
  );
}
