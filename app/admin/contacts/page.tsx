"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  Loader2,
  Mail,
  Clock,
  CheckCheck,
  Eye,
  Trash2,
  X,
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

const STATUS_OPTIONS = ["all", "new", "read", "resolved"];

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<Contact | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    setLoading(true);
    const res = await fetch("/api/admin/contacts");
    const data = await res.json();
    setContacts(data);
    setLoading(false);
  }

  async function handleStatusChange(id: string, status: string) {
    setUpdating(id);
    await fetch("/api/admin/contacts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    await fetchContacts();
    // Update selected if it's the one being changed
    if (selected?.id === id) {
      setSelected((prev) => (prev ? { ...prev, status } : null));
    }
    setUpdating(null);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this submission?")) return;
    setDeleting(id);
    await fetch("/api/admin/contacts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (selected?.id === id) setSelected(null);
    await fetchContacts();
    setDeleting(null);
  }

  function openSubmission(contact: Contact) {
    setSelected(contact);
    // Auto-mark as read when opened
    if (contact.status === "new") {
      handleStatusChange(contact.id, "read");
    }
  }

  const filtered =
    statusFilter === "all"
      ? contacts
      : contacts.filter((c) => c.status === statusFilter);

  const newCount = contacts.filter((c) => c.status === "new").length;

  const STATUS_STYLES: Record<string, string> = {
    new: "bg-red-100 text-red-700",
    read: "bg-blue-100 text-blue-700",
    resolved: "bg-green-100 text-green-700",
  };

  const STATUS_ICONS: Record<string, React.ReactNode> = {
    new: <Mail className="w-3 h-3" />,
    read: <Eye className="w-3 h-3" />,
    resolved: <CheckCheck className="w-3 h-3" />,
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Contact Submissions
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            View and manage messages from students.
            {newCount > 0 && (
              <span className="ml-2 inline-flex items-center gap-1 bg-red-100 text-red-600 text-[11px] font-bold px-2 py-0.5 rounded-full">
                {newCount} new
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 mb-5">
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              statusFilter === s
                ? "bg-[#181D62] text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {s}
            {s === "new" && newCount > 0 && (
              <span className="ml-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {newCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No submissions found</p>
          <p className="text-sm mt-1">
            {statusFilter !== "all"
              ? `No ${statusFilter} submissions.`
              : "No contact submissions yet."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 font-medium text-gray-600">
                  From
                </th>
                <th className="text-left px-5 py-3 font-medium text-gray-600 hidden md:table-cell">
                  Subject
                </th>
                <th className="text-left px-5 py-3 font-medium text-gray-600 hidden lg:table-cell">
                  Received
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
              {filtered.map((contact) => (
                <tr
                  key={contact.id}
                  className={`hover:bg-gray-50 cursor-pointer ${contact.status === "new" ? "bg-red-50/30" : ""}`}
                  onClick={() => openSubmission(contact)}
                >
                  <td className="px-5 py-4">
                    <p
                      className={`font-medium ${contact.status === "new" ? "text-gray-900" : "text-gray-700"}`}
                    >
                      {contact.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {contact.email}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-gray-600 hidden md:table-cell">
                    <p className="truncate max-w-xs">{contact.subject}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-xs hidden lg:table-cell">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(contact.createdAt).toLocaleDateString("en-SG", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </td>
                  <td
                    className="px-5 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <select
                      value={contact.status}
                      onChange={(e) =>
                        handleStatusChange(contact.id, e.target.value)
                      }
                      disabled={updating === contact.id}
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#D7143F] ${STATUS_STYLES[contact.status] ?? "bg-gray-100 text-gray-600"}`}
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                  <td
                    className="px-5 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openSubmission(contact)}
                        className="p-1.5 text-gray-400 hover:text-[#181D62] hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(contact.id)}
                        disabled={deleting === contact.id}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        {deleting === contact.id ? (
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

      {/* Submission detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelected(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Submission Detail</h2>
              <button
                onClick={() => setSelected(null)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-900">{selected.name}</p>
                  <a
                    href={`mailto:${selected.email}`}
                    className="text-sm text-[#D7143F] hover:underline"
                  >
                    {selected.email}
                  </a>
                </div>
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[selected.status]}`}
                >
                  {STATUS_ICONS[selected.status]}
                  {selected.status.charAt(0).toUpperCase() +
                    selected.status.slice(1)}
                </span>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">
                  Subject
                </p>
                <p className="text-sm text-gray-900 font-medium">
                  {selected.subject}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">
                  Message
                </p>
                <div className="bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </div>
              </div>

              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Received {new Date(selected.createdAt).toLocaleString("en-SG")}
              </p>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex gap-2">
                {["new", "read", "resolved"].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(selected.id, s)}
                    disabled={selected.status === s || updating === selected.id}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 ${
                      selected.status === s
                        ? `${STATUS_STYLES[s]} opacity-60 cursor-default`
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {STATUS_ICONS[s]}
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
              <a
                href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#181D62] text-white text-xs font-medium rounded-lg hover:bg-[#0f1340] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
