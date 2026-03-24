"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";

interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
}

const emptySupplier: Omit<Supplier, "id"> = {
  name: "",
  contact: "",
  email: "",
  phone: "",
  address: "",
};

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptySupplier);

  const filtered = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.contact.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setForm(emptySupplier);
    setEditingId(null);
    setModalOpen(true);
  };

  const openEdit = (supplier: Supplier) => {
    setForm({
      name: supplier.name,
      contact: supplier.contact,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
    });
    setEditingId(supplier.id);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      setSuppliers((prev) =>
        prev.map((s) => (s.id === editingId ? { ...s, ...form } : s))
      );
    } else {
      setSuppliers((prev) => [
        ...prev,
        { id: crypto.randomUUID(), ...form },
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Suppliers</h1>
        <button
          onClick={openCreate}
          className="bg-[#0B4DA2] hover:bg-[#083d82] text-white text-sm px-4 py-2 rounded transition-colors"
        >
          Create Supplier
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 w-72">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-200 rounded px-3 py-2 pr-8 text-sm w-full"
        />
        <Search size={16} className="absolute right-2.5 top-2.5 text-gray-400" />
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
              <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Contact</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Phone</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-b border-gray-100">
                <td className="px-4 py-3 text-gray-800">{s.name}</td>
                <td className="px-4 py-3 text-gray-700">{s.contact}</td>
                <td className="px-4 py-3 text-gray-700">{s.email}</td>
                <td className="px-4 py-3 text-gray-700">{s.phone}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => openEdit(s)}
                    className="text-blue-500 text-xs hover:underline mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
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
                {editingId ? "Edit Supplier" : "Create Supplier"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              {(["name", "contact", "email", "phone", "address"] as const).map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {field}
                  </label>
                  <input
                    type="text"
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                  />
                </div>
              ))}
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
