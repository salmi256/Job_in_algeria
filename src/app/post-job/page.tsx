"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { WILAYAS, CATEGORIES, JOB_TYPES } from "@/lib/constants";

export default function PostJobPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
    wilaya: "",
    category: "",
    jobType: "full-time",
    salary: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSubmitting(false);
    if (res.status === 401) {
      router.push("/login");
      return;
    }
    if (!res.ok) {
      setError(data.error || "حدث خطأ");
      return;
    }
    router.push(`/jobs/${data.job.id}`);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">نشر وظيفة جديدة</h1>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              المسمى الوظيفي *
            </label>
            <input
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className="w-full rounded-lg border px-3 py-2 outline-none focus:border-green-700"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">الشركة *</label>
            <input
              required
              value={form.company}
              onChange={(e) => set("company", e.target.value)}
              className="w-full rounded-lg border px-3 py-2 outline-none focus:border-green-700"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">الولاية *</label>
              <select
                required
                value={form.wilaya}
                onChange={(e) => set("wilaya", e.target.value)}
                className="w-full rounded-lg border px-3 py-2 outline-none"
              >
                <option value="">اختر الولاية</option>
                {WILAYAS.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">القطاع *</label>
              <select
                required
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className="w-full rounded-lg border px-3 py-2 outline-none"
              >
                <option value="">اختر القطاع</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">نوع الدوام</label>
              <select
                value={form.jobType}
                onChange={(e) => set("jobType", e.target.value)}
                className="w-full rounded-lg border px-3 py-2 outline-none"
              >
                {Object.entries(JOB_TYPES).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                الراتب (اختياري)
              </label>
              <input
                value={form.salary}
                onChange={(e) => set("salary", e.target.value)}
                placeholder="مثال: 60,000 دج"
                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-green-700"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              وصف الوظيفة *
            </label>
            <textarea
              required
              rows={6}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="w-full rounded-lg border px-3 py-2 outline-none focus:border-green-700"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-green-700 px-6 py-2.5 font-semibold text-white hover:bg-green-800 disabled:opacity-50"
          >
            {submitting ? "جاري النشر..." : "نشر الوظيفة"}
          </button>
        </form>
      </div>
    </div>
  );
}
