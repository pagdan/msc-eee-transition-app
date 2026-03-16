"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Users,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

interface Club {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  memberCount: number;
  contactEmail: string | null;
  website: string | null;
  imageUrl: string | null;
  isActive: boolean;
  instagram: string | null;
  facebook: string | null;
  linkedin: string | null;
}

const EMPTY_FORM = {
  name: "",
  slug: "",
  description: "",
  category: "Academic",
  memberCount: 0,
  contactEmail: "",
  website: "",
  imageUrl: "",
  isActive: true,
  instagram: "",
  facebook: "",
  linkedin: "",
};

const CATEGORY_OPTIONS = ["Academic", "Technical", "Professional", "Social"];

export default function AdminClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Club | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClubs();
  }, []);

  async function fetchClubs() {
    setLoading(true);
    const res = await fetch("/api/admin/clubs");
    const data = await res.json();
    setClubs(data);
    setLoading(false);
  }

  function openCreate() {
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setError(null);
    setShowForm(true);
  }

  function openEdit(club: Club) {
    setEditingItem(club);
    setForm({
      name: club.name,
      slug: club.slug,
      description: club.description,
      category: club.category,
      memberCount: club.memberCount,
      contactEmail: club.contactEmail ?? "",
      website: club.website ?? "",
      imageUrl: club.imageUrl ?? "",
      isActive: club.isActive,
      instagram: club.instagram ?? "",
      facebook: club.facebook ?? "",
      linkedin: club.linkedin ?? "",
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

  // Auto-generate slug from name
  function handleNameChange(name: string) {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    setForm({ ...form, name, slug });
  }

  async function handleSubmit() {
    if (!form.name || !form.slug || !form.description) {
      setError("Name, slug, and description are required.");
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      ...form,
      memberCount: Number(form.memberCount),
      contactEmail: form.contactEmail || null,
      website: form.website || null,
      imageUrl: form.imageUrl || null,
      instagram: form.instagram || null,
      facebook: form.facebook || null,
      linkedin: form.linkedin || null,
      ...(editingItem && { id: editingItem.id }),
    };

    const res = await fetch("/api/admin/clubs", {
      method: editingItem ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      await fetchClubs();
      closeForm();
    } else {
      const data = await res.json();
      setError(data.error ?? "Something went wrong. Please try again.");
    }

    setSaving(false);
  }

  async function handleToggle(club: Club) {
    setToggling(club.id);
    await fetch("/api/admin/clubs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: club.id, isActive: !club.isActive }),
    });
    await fetchClubs();
    setToggling(null);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this club?")) return;
    setDeleting(id);
    await fetch("/api/admin/clubs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await fetchClubs();
    setDeleting(null);
  }

  const CATEGORY_STYLES: Record<string, string> = {
    Academic: "bg-violet-100 text-violet-700",
    Technical: "bg-sky-100 text-sky-700",
    Professional: "bg-amber-100 text-amber-700",
    Social: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clubs</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage EEE clubs shown on the Community page.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-[#D7143F] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#b91139] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Club
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : clubs.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Users className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No clubs yet</p>
          <p className="text-sm mt-1">
            Click &quot;Add Club&quot; to create one.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 font-medium text-gray-600">
                  Club
                </th>
                <th className="text-left px-5 py-3 font-medium text-gray-600 hidden md:table-cell">
                  Category
                </th>
                <th className="text-left px-5 py-3 font-medium text-gray-600 hidden lg:table-cell">
                  Members
                </th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">
                  Status
                </th>
                <th className="text-right px-5 py-3 font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clubs.map((club) => (
                <tr key={club.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900">{club.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">/{club.slug}</p>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span
                      className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${CATEGORY_STYLES[club.category] ?? "bg-gray-100 text-gray-600"}`}
                    >
                      {club.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-600 hidden lg:table-cell">
                    {club.memberCount.toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleToggle(club)}
                      disabled={toggling === club.id}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                        club.isActive
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {toggling === club.id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : club.isActive ? (
                        <Eye className="w-3 h-3" />
                      ) : (
                        <EyeOff className="w-3 h-3" />
                      )}
                      {club.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(club)}
                        className="p-1.5 text-gray-400 hover:text-[#181D62] hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(club.id)}
                        disabled={deleting === club.id}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        {deleting === club.id ? (
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
                {editingItem ? "Edit Club" : "Add Club"}
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
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7143F]"
                  placeholder="e.g. MLDA@EEE"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7143F]"
                  placeholder="e.g. mlda-eee"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Auto-generated from name. Used in the club detail URL.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7143F] resize-none"
                  placeholder="Brief description of the club"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7143F] bg-white"
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Member Count
                  </label>
                  <input
                    type="number"
                    value={form.memberCount}
                    onChange={(e) =>
                      setForm({ ...form, memberCount: Number(e.target.value) })
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7143F]"
                    min={0}
                  />
                </div>
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
                  placeholder="/images/clubs/my-club.jpg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) =>
                    setForm({ ...form, contactEmail: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7143F]"
                  placeholder="e.g. club@e.ntu.edu.sg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="text"
                  value={form.website}
                  onChange={(e) =>
                    setForm({ ...form, website: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7143F]"
                  placeholder="https://..."
                />
              </div>

              {/* Social Media */}
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs font-medium text-gray-700 mb-3">
                  Social Media
                </p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Instagram URL
                    </label>
                    <input
                      type="text"
                      value={form.instagram}
                      onChange={(e) =>
                        setForm({ ...form, instagram: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7143F]"
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Facebook URL
                    </label>
                    <input
                      type="text"
                      value={form.facebook}
                      onChange={(e) =>
                        setForm({ ...form, facebook: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7143F]"
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      LinkedIn URL
                    </label>
                    <input
                      type="text"
                      value={form.linkedin}
                      onChange={(e) =>
                        setForm({ ...form, linkedin: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7143F]"
                      placeholder="https://linkedin.com/company/..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({ ...form, isActive: e.target.checked })
                  }
                  className="w-4 h-4 accent-[#D7143F]"
                />
                <label htmlFor="isActive" className="text-sm text-gray-700">
                  Active (visible to students)
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
                {editingItem ? "Save Changes" : "Add Club"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
