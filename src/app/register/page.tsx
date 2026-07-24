"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("seeker");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await res.json();
    setSubmitting(false);
    if (!res.ok) {
      setError(data.error || "حدث خطأ");
      return;
    }
    window.location.href = "/";
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">إنشاء حساب جديد</h1>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">الاسم الكامل</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 outline-none focus:border-green-700"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 outline-none focus:border-green-700"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">كلمة المرور</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 outline-none focus:border-green-700"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">نوع الحساب</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 outline-none"
            >
              <option value="seeker">باحث عن عمل</option>
              <option value="employer">صاحب عمل</option>
            </select>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-green-700 py-2.5 font-semibold text-white hover:bg-green-800 disabled:opacity-50"
          >
            {submitting ? "جاري الإنشاء..." : "إنشاء الحساب"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          لديك حساب بالفعل؟{" "}
          <Link href="/login" className="font-medium text-green-700">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}
