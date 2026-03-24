"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import OutletSelector from "@/components/ui/OutletSelector";

type AdjustmentReason = "Damaged" | "Lost" | "Stocktake" | "Other";

interface Adjustment {
  id: string;
  adjustmentNumber: string;
  outlet: string;
  reason: AdjustmentReason;
  date: string;
  items: number;
}

let adjCounter = 1;
function generateAdjustmentNumber() {
  return `ADJ-${String(adjCounter++).padStart(4, "0")}`;
}

const emptyForm = {
  adjustmentNumber: "",
  outlet: "",
  reason: "Damaged" as AdjustmentReason,
  date: "",
  items: 0,
};

export default function AdjustmentPage() {
  const [adjustments, setAdjustments] = useState<Adjustment[]>([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = adjustments.filter(
    (a) =>
      a.adjustmentNumber.toLowerCase().includes(search.toLowerCase()) ||
      a.outlet.toLowerCase().includes(search.toLowerCase()) ||
      a.reason.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setForm({ ...emptyForm, adjustmentNumber: generateAdjustmentNumber() });
    setEditingId(null);
    setModalOpen(true);
  };

  const openEdit = (adj: Adjustment) => {
    setForm({
      adjustmentNumber: adj.adjustmentNumber,
      outlet: adj.outlet,
      reason: adj.reason,
      date: adj.date,
      items: adj.items,
    });
    setEditingId(adj.id);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      setAdjustments((prev) =>
        prev.map((a) => (a.id === editingId ? { ...a, ...form } : a))
      );
    } else {
      setAdjustments((prev) => [
        ...prev,
        { id: crypto.randomUUID(), ...form },
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setAdjustments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Adjustment</h1>
        <button
          onClick={openCreate}
          className="bg-[#0B4DA2] hover:bg-[#083d82] text-white text-sm px-4 py-2 rounded transition-colors"
        >
          Create Adjustment
        </button>
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-3 mb-6">
        <OutletSelector />
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded px-3 py-2 pr-8 text-sm"
          />
          <Search size={16} className="absolute right-2.5 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Content */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg">
          <EmptyState title="No Data To Display" />
        </div>
      ) : (
        <table className="w-full bg-white border border-gray-200 rounded-lg text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-medium text-gray-600">Adjustment Number</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Outlet</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Reason</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Items</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-b border-gray-100">
                <td className="px-4 py-3 text-gray-800">{a.adjustmentNumber}</td>
                <td className="px-4 py-3 text-gray-700">{a.outlet}</td>
                <td className="px-4 py-3 text-gray-700">{a.reason}</td>
                <td className="px-4 py-3 text-gray-700">{a.date}</td>
                <td className="px-4 py-3 text-gray-700">{a.items}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => openEdit(a)}
                    className="text-blue-500 text-xs hover:underline mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="text-red-500 text-xs hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[480px] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId ? "Edit Adjustment" : "Create Adjustment"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adjustment Number</label>
                <input
                  type="text"
                  value={form.adjustmentNumber}
                  readOnly
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Outlet</label>
                <input
                  type="text"
                  value={form.outlet}
                  onChange={(e) => setForm({ ...form, outlet: e.target.value })}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <select
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value as AdjustmentReason })}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-white"
                >
                  <option>Damaged</option>
                  <option>Lost</option>
                  <option>Stocktake</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="text"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  placeholder="DD/MM/YYYY"
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Items</label>
                <input
                  type="number"
                  value={form.items}
                  onChange={(e) => setForm({ ...form, items: Number(e.target.value) })}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setModalOpen(false)}
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
    </div>
  );
}
