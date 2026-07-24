"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import JobCard, { JobItem } from "@/components/JobCard";
import { WILAYAS, CATEGORIES, JOB_TYPES } from "@/lib/constants";

function JobsContent() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const [wilaya, setWilaya] = useState(params.get("wilaya") || "");
  const [category, setCategory] = useState(params.get("category") || "");
  const [jobType, setJobType] = useState(params.get("jobType") || "");
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (wilaya) p.set("wilaya", wilaya);
    if (category) p.set("category", category);
    if (jobType) p.set("jobType", jobType);
    const res = await fetch(`/api/jobs?${p.toString()}`);
    const data = await res.json();
    setJobs(data.jobs || []);
    setLoading(false);
  }, [q, wilaya, category, jobType]);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wilaya, category, jobType]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold">البحث عن الوظائف</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          load();
        }}
        className="mt-6 grid gap-3 rounded-xl border bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-5"
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="كلمة البحث..."
          className="rounded-lg border px-3 py-2 outline-none focus:border-green-700"
        />
        <select
          value={wilaya}
          onChange={(e) => setWilaya(e.target.value)}
          className="rounded-lg border px-3 py-2 outline-none"
        >
          <option value="">كل الولايات</option>
          {WILAYAS.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border px-3 py-2 outline-none"
        >
          <option value="">كل القطاعات</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="rounded-lg border px-3 py-2 outline-none"
        >
          <option value="">كل أنواع الدوام</option>
          {Object.entries(JOB_TYPES).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-lg bg-green-700 px-4 py-2 font-semibold text-white hover:bg-green-800"
        >
          بحث
        </button>
      </form>

      {loading ? (
        <p className="mt-8 text-gray-500">جاري التحميل...</p>
      ) : (
        <>
          <p className="mt-6 text-sm text-gray-500">{jobs.length} وظيفة</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          {jobs.length === 0 && (
            <p className="mt-6 text-gray-500">لا توجد نتائج مطابقة لبحثك.</p>
          )}
        </>
      )}
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense>
      <JobsContent />
    </Suspense>
  );
}
