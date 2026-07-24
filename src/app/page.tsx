"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import JobCard, { JobItem } from "@/components/JobCard";
import { WILAYAS, CATEGORIES } from "@/lib/constants";

export default function HomePage() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [jobs, setJobs] = useState<JobItem[]>([]);

  useEffect(() => {
    fetch("/api/jobs")
      .then((r) => r.json())
      .then((d) => setJobs((d.jobs || []).slice(0, 6)));
  }, []);

  function search(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (wilaya) params.set("wilaya", wilaya);
    router.push(`/jobs?${params.toString()}`);
  }

  return (
    <div>
      <section className="bg-gradient-to-b from-green-800 to-green-700 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl font-bold sm:text-5xl">
            ابحث عن وظيفتك في الجزائر
          </h1>
          <p className="mt-4 text-green-100">
            آلاف الوظائف في جميع ولايات الوطن — ابدأ مسيرتك المهنية اليوم
          </p>
          <form
            onSubmit={search}
            className="mt-8 flex flex-col gap-2 rounded-xl bg-white p-2 shadow-lg sm:flex-row"
          >
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="المسمى الوظيفي أو الشركة..."
              className="flex-1 rounded-lg px-4 py-3 text-gray-900 outline-none"
            />
            <select
              value={wilaya}
              onChange={(e) => setWilaya(e.target.value)}
              className="rounded-lg border px-4 py-3 text-gray-700 outline-none"
            >
              <option value="">كل الولايات</option>
              {WILAYAS.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-lg bg-green-700 px-8 py-3 font-semibold text-white hover:bg-green-800"
            >
              بحث
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">أحدث الوظائف</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        {jobs.length === 0 && (
          <p className="mt-6 text-gray-500">لا توجد وظائف حالياً.</p>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-2xl font-bold">تصفح حسب القطاع</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => router.push(`/jobs?category=${encodeURIComponent(c)}`)}
              className="rounded-full border bg-white px-4 py-2 text-sm hover:border-green-700 hover:text-green-700"
            >
              {c}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
