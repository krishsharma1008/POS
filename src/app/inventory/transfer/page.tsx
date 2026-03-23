"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";

type TransferStatus = "Pending" | "Completed";

interface Transfer {
  id: string;
  transferNumber: string;
  fromOutlet: string;
  toOutlet: string;
  status: TransferStatus;
  date: string;
  itemsCount: number;
}

const statusBadge: Record<TransferStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
};

let transferCounter = 1;
function generateTransferNumber() {
  return `TRF-${String(transferCounter++).padStart(4, "0")}`;
}

const emptyForm = {
  transferNumber: "",
  fromOutlet: "",
  toOutlet: "",
  status: "Pending" as TransferStatus,
  date: "",
  itemsCount: 0,
};

export default function TransferPage() {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = transfers.filter((t) => {
    const matchesSearch =
      t.transferNumber.toLowerCase().includes(search.toLowerCase()) ||
      t.fromOutlet.toLowerCase().includes(search.toLowerCase()) ||
      t.toOutlet.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openCreate = () => {
    setForm({ ...emptyForm, transferNumber: generateTransferNumber() });
    setEditingId(null);
    setModalOpen(true);
  };

  const openEdit = (transfer: Transfer) => {
    setForm({
      transferNumber: transfer.transferNumber,
      fromOutlet: transfer.fromOutlet,
      toOutlet: transfer.toOutlet,
      status: transfer.status,
      date: transfer.date,
      itemsCount: transfer.itemsCount,
    });
    setEditingId(transfer.id);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      setTransfers((prev) =>
        prev.map((t) => (t.id === editingId ? { ...t, ...form } : t))
      );
    } else {
      setTransfers((prev) => [
        ...prev,
        { id: crypto.randomUUID(), ...form },
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setTransfers((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Transfer</h1>
        <button
          onClick={openCreate}
          className="bg-[#2563eb] hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition-colors"
        >
          Create Transfer
        </button>
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-3 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 bg-white"
        >
          <option>All Status</option>
          <option>Pending</option>
          <option>Completed</option>
        </select>
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
              <th className="text-left px-4 py-3 font-medium text-gray-600">Transfer Number</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">From Outlet</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">To Outlet</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Items Count</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-b border-gray-100">
                <td className="px-4 py-3 text-gray-800">{t.transferNumber}</td>
                <td className="px-4 py-3 text-gray-700">{t.fromOutlet}</td>
                <td className="px-4 py-3 text-gray-700">{t.toOutlet}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${statusBadge[t.status]}`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">{t.date}</td>
                <td className="px-4 py-3 text-gray-700">{t.itemsCount}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => openEdit(t)}
                    className="text-blue-500 text-xs hover:underline mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
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
                {editingId ? "Edit Transfer" : "Create Transfer"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transfer Number</label>
                <input
                  type="text"
                  value={form.transferNumber}
                  readOnly
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Outlet</label>
                <input
                  type="text"
                  value={form.fromOutlet}
                  onChange={(e) => setForm({ ...form, fromOutlet: e.target.value })}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Outlet</label>
                <input
                  type="text"
                  value={form.toOutlet}
                  onChange={(e) => setForm({ ...form, toOutlet: e.target.value })}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as TransferStatus })}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-white"
                >
                  <option>Pending</option>
                  <option>Completed</option>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Items Count</label>
                <input
                  type="number"
                  value={form.itemsCount}
                  onChange={(e) => setForm({ ...form, itemsCount: Number(e.target.value) })}
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
                className="px-4 py-2 text-sm text-white bg-[#2563eb] rounded hover:bg-blue-700"
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
