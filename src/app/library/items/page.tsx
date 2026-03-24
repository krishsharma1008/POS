"use client";

import { useState } from "react";
import {
  LibraryItem,
  initialItems,
} from "@/lib/mock-data/library";
import ImportModal from "@/components/ui/ImportModal";
import EmptyState from "@/components/ui/EmptyState";
import { handleExport } from "@/lib/export";
import { formatRupiah } from "@/lib/format";

export default function ItemLibraryPage() {
  const [items, setItems] = useState<LibraryItem[]>(initialItems);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [inventoryFilter, setInventoryFilter] = useState("All Inventory");
  const [showModal, setShowModal] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [editing, setEditing] = useState<LibraryItem | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formSku, setFormSku] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formPrice, setFormPrice] = useState(0);
  const [formCost, setFormCost] = useState(0);
  const [formStock, setFormStock] = useState(0);
  const [formOutlet, setFormOutlet] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const categories = Array.from(new Set(items.map((i) => i.category).filter(Boolean)));

  const filtered = items.filter((item) => {
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (categoryFilter !== "All Categories" && item.category !== categoryFilter) return false;
    if (inventoryFilter === "In Stock" && item.stock <= 0) return false;
    if (inventoryFilter === "Out of Stock" && item.stock > 0) return false;
    return true;
  });

  const openCreate = () => {
    setEditing(null);
    setFormName("");
    setFormSku("");
    setFormCategory("");
    setFormPrice(0);
    setFormCost(0);
    setFormStock(0);
    setFormOutlet("");
    setFormDescription("");
    setShowModal(true);
  };

  const openEdit = (item: LibraryItem) => {
    setEditing(item);
    setFormName(item.name);
    setFormSku(item.sku);
    setFormCategory(item.category);
    setFormPrice(item.price);
    setFormCost(item.cost);
    setFormStock(item.stock);
    setFormOutlet(item.outlet);
    setFormDescription(item.description);
    setShowModal(true);
  };

  const handleSave = () => {
    if (editing) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === editing.id
            ? {
                ...i,
                name: formName,
                sku: formSku,
                category: formCategory,
                price: formPrice,
                cost: formCost,
                stock: formStock,
                outlet: formOutlet,
                description: formDescription,
              }
            : i
        )
      );
    } else {
      setItems((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          name: formName,
          sku: formSku,
          category: formCategory,
          price: formPrice,
          cost: formCost,
          stock: formStock,
          outlet: formOutlet,
          description: formDescription,
        },
      ]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleImport = (mapping: Record<string, string>, rows: string[][]) => {
    const csvHeaders = Object.keys(mapping);
    const imported: LibraryItem[] = rows.map((row) => {
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
        sku: item.sku || "",
        category: item.category || "",
        price: Number(item.price) || 0,
        cost: Number(item.cost) || 0,
        stock: Number(item.stock) || 0,
        outlet: item.outlet || "",
        description: item.description || "",
      };
    });
    setItems((prev) => [...prev, ...imported]);
  };

  const onExport = () => {
    handleExport(
      "csv",
      ["Name", "SKU", "Category", "Price", "Cost", "Stock", "Outlet", "Description"],
      items.map((i) => [
        i.name,
        i.sku,
        i.category,
        String(i.price),
        String(i.cost),
        String(i.stock),
        i.outlet,
        i.description,
      ]),
      "items"
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-800">Item Library</h1>
          <span className="text-sm text-gray-500">{items.length} total</span>
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
            Create Item
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-200 rounded px-3 py-2 text-sm w-64"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-200 rounded px-3 py-2 text-sm"
        >
          <option>All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={inventoryFilter}
          onChange={(e) => setInventoryFilter(e.target.value)}
          className="border border-gray-200 rounded px-3 py-2 text-sm"
        >
          <option>All Inventory</option>
          <option>In Stock</option>
          <option>Out of Stock</option>
        </select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState title="No Data To Display" description="No items found." />
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.sku}</td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">{formatRupiah(item.price)}</td>
                  <td className="px-4 py-3">{formatRupiah(item.cost)}</td>
                  <td className="px-4 py-3">{item.stock}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => openEdit(item)} className="text-blue-500 text-xs hover:underline">Edit</button>
                    <span className="mx-1 text-gray-300">|</span>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 text-xs hover:underline">Delete</button>
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
                {editing ? "Edit Item" : "Create Item"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
            </div>
            <div className="px-6 py-4 space-y-4 max-h-[60vh] overflow-y-auto">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input
                  type="text"
                  value={formSku}
                  onChange={(e) => setFormSku(e.target.value)}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
                <input
                  type="number"
                  value={formCost}
                  onChange={(e) => setFormCost(parseFloat(e.target.value) || 0)}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  type="number"
                  value={formStock}
                  onChange={(e) => setFormStock(parseInt(e.target.value) || 0)}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Outlet</label>
                <input
                  type="text"
                  value={formOutlet}
                  onChange={(e) => setFormOutlet(e.target.value)}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
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
        fields={["name", "sku", "category", "price", "cost", "stock", "outlet", "description"]}
        onImport={handleImport}
      />
    </div>
  );
}
