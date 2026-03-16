"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  BookOpen,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

interface StudySpot {
  id: string;
  name: string;
  location: string;
  capacity: string;
  amenities: string[];
  openingHours: string | null;
  imageUrl: string | null;
  isAvailable: boolean;
}

const EMPTY_FORM = {
  name: "",
  location: "",
  capacity: "medium",
  amenities: "",
  openingHours: "",
  imageUrl: "",
  isAvailable: true,
};

const CAPACITY_OPTIONS = ["small", "medium", "large"];

export default function AdminStudySpotsPage() {
  const [spots, setSpots] = useState<StudySpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<StudySpot | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSpots();
  }, []);

  async function fetchSpots() {
    setLoading(true);
    const res = await fetch("/api/admin/study-spots");
    const data = await res.json();
    setSpots(data);
    setLoading(false);
  }

  function openCreate() {
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setError(null);
    setShowForm(true);
  }

  function openEdit(spot: StudySpot) {
    setEditingItem(spot);
    setForm({
      name: spot.name,
      location: spot.location,
      capacity: spot.capacity,
      amenities: spot.amenities.join(", "),
      openingHours: spot.openingHours ?? "",
      imageUrl: spot.imageUrl ?? "",
      isAvailable: spot.isAvailable,
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
      amenities: form.amenities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      ...(editingItem && { id: editingItem.id }),
    };

    const res = await fetch("/api/admin/study-spots", {
      method: editingItem ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      await fetchSpots();
      closeForm();
    } else {
      setError("Something went wrong. Please try again.");
    }

    setSaving(false);
  }

  async function handleToggle(spot: StudySpot) {
    setToggling(spot.id);
    await fetch("/api/admin/study-spots", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: spot.id, isAvailable: !spot.isAvailable }),
    });
    await fetchSpots();
    setToggling(null);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this study spot?")) return;
    setDeleting(id);
    await fetch("/api/admin/study-spots", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await fetchSpots();
    setDeleting(null);
  }

  const CAPACITY_STYLES: Record<string, string> = {
    small: "bg-blue-100 text-blue-700",
    medium: "bg-amber-100 text-amber-700",
    large: "bg-green-100 text-green-700",
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Study Spots</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage study spots shown on the Study Spots page.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-[#D7143F] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#b91139] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Spot
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : spots.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No study spots yet</p>
          <p className="text-sm mt-1">
            Click &quot;Add Spot&quot; to create one.
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
                  Capacity
                </th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">
                  Availability
                </th>
                <th className="text-right px-5 py-3 font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {spots.map((spot) => (
                <tr key={spot.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900 truncate max-w-xs">
                      {spot.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">
                      {spot.amenities.slice(0, 3).join(" · ")}
                      {spot.amenities.length > 3 &&
                        ` +${spot.amenities.length - 3}`}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-gray-600 hidden md:table-cell">
                    {spot.location}
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span
                      className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full capitalize ${CAPACITY_STYLES[spot.capacity] ?? "bg-gray-100 text-gray-600"}`}
                    >
                      {spot.capacity}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleToggle(spot)}
                      disabled={toggling === spot.id}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                        spot.isAvailable
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {toggling === spot.id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : spot.isAvailable ? (
                        <Eye className="w-3 h-3" />
                      ) : (
                        <EyeOff className="w-3 h-3" />
                      )}
                      {spot.isAvailable ? "Visible" : "Hidden"}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(spot)}
                        className="p-1.5 text-gray-400 hover:text-[#181D62] hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(spot.id)}
                        disabled={deleting === spot.id}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        {deleting === spot.id ? (
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
                {editingItem ? "Edit Study Spot" : "Add Study Spot"}
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
                  placeholder="e.g. Lee Wee Nam Library @ North Spine"
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
                  placeholder="e.g. North Spine"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Capacity
                </label>
                <select
                  value={form.capacity}
                  onChange={(e) =>
                    setForm({ ...form, capacity: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7143F] bg-white"
                >
                  {CAPACITY_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Amenities
                </label>
                <input
                  type="text"
                  value={form.amenities}
                  onChange={(e) =>
                    setForm({ ...form, amenities: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7143F]"
                  placeholder="e.g. WiFi, Power Outlets, Quiet Zone, Group Study"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Separate with commas. Use WiFi, Power Outlets, Quiet Zone,
                  Group Study, Café, or Screens for icon badges.
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
                  placeholder="e.g. Open 24 hours"
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
                  placeholder="/images/study-spots/my-spot.jpg"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isAvailable"
                  checked={form.isAvailable}
                  onChange={(e) =>
                    setForm({ ...form, isAvailable: e.target.checked })
                  }
                  className="w-4 h-4 accent-[#D7143F]"
                />
                <label htmlFor="isAvailable" className="text-sm text-gray-700">
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
                {editingItem ? "Save Changes" : "Add Spot"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
