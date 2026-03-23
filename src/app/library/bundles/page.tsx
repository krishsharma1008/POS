"use client";

import { useState } from "react";
import {
  Bundle,
  initialBundles,
} from "@/lib/mock-data/library";
import ImportModal from "@/components/ui/ImportModal";
import EmptyState from "@/components/ui/EmptyState";
import { handleExport } from "@/lib/export";
import { formatRupiah } from "@/lib/format";

export default function BundlesPage() {
  const [bundles, setBundles] = useState<Bundle[]>(initialBundles);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [editing, setEditing] = useState<Bundle | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formItems, setFormItems] = useState("");
  const [formPrice, setFormPrice] = useState(0);

  const filtered = bundles.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditing(null);
    setFormName("");
    setFormItems("");
    setFormPrice(0);
    setShowModal(true);
  };

  const openEdit = (bundle: Bundle) => {
    setEditing(bundle);
    setFormName(bundle.name);
    setFormItems(bundle.items.join(", "));
    setFormPrice(bundle.price);
    setShowModal(true);
  };

  const handleSave = () => {
    const itemsArr = formItems
      ? formItems.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    if (editing) {
      setBundles((prev) =>
        prev.map((b) =>
          b.id === editing.id
            ? { ...b, name: formName, items: itemsArr, price: formPrice }
            : b
        )
      );
    } else {
      setBundles((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          name: formName,
          items: itemsArr,
          price: formPrice,
        },
      ]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setBundles((prev) => prev.filter((b) => b.id !== id));
  };

  const handleImport = (mapping: Record<string, string>, rows: string[][]) => {
    const csvHeaders = Object.keys(mapping);
    const imported: Bundle[] = rows.map((row) => {
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
        items: item.items ? item.items.split(",").map((s) => s.trim()).filter(Boolean) : [],
        price: Number(item.price) || 0,
      };
    });
    setBundles((prev) => [...prev, ...imported]);
  };

  const onExport = () => {
    handleExport(
      "csv",
      ["Name", "Items", "Price"],
      bundles.map((b) => [b.name, b.items.join(", "), String(b.price)]),
      "bundles"
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-800">Bundle Package</h1>
          <span className="text-sm text-gray-500">{bundles.length} total</span>
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
            Create Bundle
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
        <EmptyState title="No Data To Display" description="No bundles found." />
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((bundle) => (
                <tr key={bundle.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">{bundle.name}</td>
                  <td className="px-4 py-3">{bundle.items.join(", ")}</td>
                  <td className="px-4 py-3">{formatRupiah(bundle.price)}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => openEdit(bundle)} className="text-blue-500 text-xs hover:underline">Edit</button>
                    <span className="mx-1 text-gray-300">|</span>
                    <button onClick={() => handleDelete(bundle.id)} className="text-red-500 text-xs hover:underline">Delete</button>
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
                {editing ? "Edit Bundle" : "Create Bundle"}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Items (comma-separated)</label>
                <input
                  type="text"
                  value={formItems}
                  onChange={(e) => setFormItems(e.target.value)}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  value={formPrice}
                  onChange={(e) => setFormPrice(parseFloat(e.target.value) || 0)}
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
        fields={["name", "items", "price"]}
        onImport={handleImport}
      />
    </div>
  );
}
