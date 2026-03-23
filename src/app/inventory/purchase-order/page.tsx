"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import OutletSelector from "@/components/ui/OutletSelector";
import { formatRupiah } from "@/lib/format";

type POStatus = "Pending" | "Approved" | "Received";

interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplier: string;
  status: POStatus;
  date: string;
  total: number;
}

const statusBadge: Record<POStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Received: "bg-blue-100 text-blue-700",
};

let poCounter = 1;
function generatePONumber() {
  return `PO-${String(poCounter++).padStart(4, "0")}`;
}

const emptyForm = {
  poNumber: "",
  supplier: "",
  status: "Pending" as POStatus,
  date: "",
  total: 0,
};

export default function PurchaseOrderPage() {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.poNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.supplier.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openCreate = () => {
    setForm({ ...emptyForm, poNumber: generatePONumber() });
    setEditingId(null);
    setModalOpen(true);
  };

  const openEdit = (po: PurchaseOrder) => {
    setForm({
      poNumber: po.poNumber,
      supplier: po.supplier,
      status: po.status,
      date: po.date,
      total: po.total,
    });
    setEditingId(po.id);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      setOrders((prev) =>
        prev.map((o) => (o.id === editingId ? { ...o, ...form } : o))
      );
    } else {
      setOrders((prev) => [
        ...prev,
        { id: crypto.randomUUID(), ...form },
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Purchase Order</h1>
        <button
          onClick={openCreate}
          className="bg-[#2563eb] hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition-colors"
        >
          Create PO
        </button>
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-3 mb-6">
        <OutletSelector />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 bg-white"
        >
          <option>All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Received</option>
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
              <th className="text-left px-4 py-3 font-medium text-gray-600">PO Number</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Supplier</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Total</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-b border-gray-100">
                <td className="px-4 py-3 text-gray-800">{o.poNumber}</td>
                <td className="px-4 py-3 text-gray-700">{o.supplier}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${statusBadge[o.status]}`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">{o.date}</td>
                <td className="px-4 py-3 text-gray-700">{formatRupiah(o.total)}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => openEdit(o)}
                    className="text-blue-500 text-xs hover:underline mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(o.id)}
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
                {editingId ? "Edit Purchase Order" : "Create Purchase Order"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PO Number</label>
                <input
                  type="text"
                  value={form.poNumber}
                  readOnly
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                <input
                  type="text"
                  value={form.supplier}
                  onChange={(e) => setForm({ ...form, supplier: e.target.value })}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as POStatus })}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-white"
                >
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Received</option>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                <input
                  type="number"
                  value={form.total}
                  onChange={(e) => setForm({ ...form, total: Number(e.target.value) })}
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
