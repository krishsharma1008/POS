"use client";

import { useState } from "react";
import {
  Category,
  initialCategories,
} from "@/lib/mock-data/library";
import ImportModal from "@/components/ui/ImportModal";
import EmptyState from "@/components/ui/EmptyState";
import { handleExport } from "@/lib/export";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  // Form state
  const [formName, setFormName] = useState("");

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditing(null);
    setFormName("");
    setShowModal(true);
  };

  const openEdit = (cat: Category) => {
    setEditing(cat);
    setFormName(cat.name);
    setShowModal(true);
  };

  const handleSave = () => {
    if (editing) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editing.id
            ? { ...c, name: formName }
            : c
        )
      );
    } else {
      setCategories((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          name: formName,
          itemCount: 0,
        },
      ]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const handleImport = (mapping: Record<string, string>, rows: string[][]) => {
    const csvHeaders = Object.keys(mapping);
    const imported: Category[] = rows.map((row) => {
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
        itemCount: 0,
      };
    });
    setCategories((prev) => [...prev, ...imported]);
  };

  const onExport = () => {
    handleExport(
      "csv",
      ["Name", "Item Count"],
      categories.map((c) => [c.name, String(c.itemCount)]),
      "categories"
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-800">Categories</h1>
          <span className="text-sm text-gray-500">{categories.length} total</span>
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
            Create Category
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
        <EmptyState title="No Data To Display" description="No categories found." />
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Count</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((cat) => (
                <tr key={cat.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">{cat.name}</td>
                  <td className="px-4 py-3">{cat.itemCount}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => openEdit(cat)} className="text-blue-500 text-xs hover:underline">Edit</button>
                    <span className="mx-1 text-gray-300">|</span>
                    <button onClick={() => handleDelete(cat.id)} className="text-red-500 text-xs hover:underline">Delete</button>
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
                {editing ? "Edit Category" : "Create Category"}
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
