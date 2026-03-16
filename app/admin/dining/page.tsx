"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  UtensilsCrossed,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

interface DiningLocation {
  id: string;
  name: string;
  location: string;
  cuisine: string[];
  openingHours: string | null;
  imageUrl: string | null;
  isOpen: boolean;
}

const EMPTY_FORM = {
  name: "",
  location: "",
  cuisine: "",
  openingHours: "",
  imageUrl: "",
  isOpen: true,
};

export default function AdminDiningPage() {
  const [dining, setDining] = useState<DiningLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<DiningLocation | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDining();
  }, []);

  async function fetchDining() {
    setLoading(true);
    const res = await fetch("/api/admin/dining");
    const data = await res.json();
    setDining(data);
    setLoading(false);
  }

  function openCreate() {
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setError(null);
    setShowForm(true);
  }

  function openEdit(item: DiningLocation) {
    setEditingItem(item);
    setForm({
      name: item.name,
      location: item.location,
      cuisine: item.cuisine.join(", "),
      openingHours: item.openingHours ?? "",
      imageUrl: item.imageUrl ?? "",
      isOpen: item.isOpen,
    });
    setError(null);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setError(null);
  }

  async function handleSubmit() {
    if (!form.name || !form.location) {
      setError("Name and location are required.");
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      ...form,
      cuisine: form.cuisine
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      ...(editingItem && { id: editingItem.id }),
    };

    const res = await fetch("/api/admin/dining", {
      method: editingItem ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      await fetchDining();
      closeForm();
    } else {
      setError("Something went wrong. Please try again.");
    }

    setSaving(false);
  }

  async function handleToggle(item: DiningLocation) {
    setToggling(item.id);
    await fetch("/api/admin/dining", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, isOpen: !item.isOpen }),
    });
    await fetchDining();
    setToggling(null);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this dining location?"))
      return;
    setDeleting(id);
    await fetch("/api/admin/dining", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await fetchDining();
    setDeleting(null);
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dining Locations</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage dining locations shown on the Food Recommendations page.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-[#D7143F] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#b91139] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Location
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : dining.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <UtensilsCrossed className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No dining locations yet</p>
          <p className="text-sm mt-1">
            Click &quot;Add Location&quot; to create one.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 font-medium text-gray-600">
                  Name
                </th>
                <th className="text-left px-5 py-3 font-medium text-gray-600 hidden md:table-cell">
                  Location
                </th>
                <th className="text-left px-5 py-3 font-medium text-gray-600 hidden lg:table-cell">
                  Cuisine
                </th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">
                  Visibility
                </th>
                <th className="text-right px-5 py-3 font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dining.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900 truncate max-w-xs">
                      {item.name}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-gray-600 hidden md:table-cell">
                    {item.location}
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {item.cuisine.slice(0, 3).map((c) => (
                        <span
                          key={c}
                          className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full"
                        >
                          {c}
                        </span>
                      ))}
                      {item.cuisine.length > 3 && (
                        <span className="text-[10px] text-gray-400">
                          +{item.cuisine.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleToggle(item)}
                      disabled={toggling === item.id}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                        item.isOpen
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {toggling === item.id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : item.isOpen ? (
                        <Eye className="w-3 h-3" />
                      ) : (
                        <EyeOff className="w-3 h-3" />
                      )}
                      {item.isOpen ? "Visible" : "Hidden"}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="p-1.5 text-gray-400 hover:text-[#181D62] hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deleting === item.id}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        {deleting === item.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeForm} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">
                {editingItem ? "Edit Dining Location" : "Add Dining Location"}
              </h2>
              <button
                onClick={closeForm}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7143F]"
                  placeholder="e.g. McDonald's @ North Spine Plaza"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7143F]"
                  placeholder="e.g. North Spine Plaza"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Cuisine Tags
                </label>
                <input
                  type="text"
                  value={form.cuisine}
                  onChange={(e) =>
                    setForm({ ...form, cuisine: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7143F]"
                  placeholder="e.g. Western, Halal, Vegetarian (comma-separated)"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Separate tags with commas. Use &quot;Halal&quot; and
                  &quot;Vegetarian&quot; for dietary badges.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Opening Hours
                </label>
                <input
                  type="text"
                  value={form.openingHours}
                  onChange={(e) =>
                    setForm({ ...form, openingHours: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7143F]"
                  placeholder="e.g. Mon–Fri: 8am–9pm | Sat, Sun & PH: 11am–7pm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm({ ...form, imageUrl: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7143F]"
                  placeholder="/images/food/my-location.jpg"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isOpen"
                  checked={form.isOpen}
                  onChange={(e) =>
                    setForm({ ...form, isOpen: e.target.checked })
                  }
                  className="w-4 h-4 accent-[#D7143F]"
                />
                <label htmlFor="isOpen" className="text-sm text-gray-700">
                  Visible to students
                </label>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={closeForm}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#D7143F] text-white text-sm font-medium rounded-lg hover:bg-[#b91139] transition-colors disabled:opacity-60"
              >
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {editingItem ? "Save Changes" : "Add Location"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
