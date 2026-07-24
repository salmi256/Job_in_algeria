"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { JOB_TYPES } from "@/lib/constants";

interface JobDetail {
  id: string;
  title: string;
  company: string;
  description: string;
  wilaya: string;
  category: string;
  jobType: string;
  salary?: string | null;
  createdAt: string;
  postedBy?: { name: string } | null;
}

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [job, setJob] = useState<JobDetail | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/jobs/${id}`)
      .then((r) => r.json())
      .then((d) => (d.job ? setJob(d.job) : setNotFound(true)));
  }, [id]);

  async function apply(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    const res = await fetch(`/api/jobs/${id}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setSubmitting(false);
    if (res.status === 401) {
      router.push("/login");
      return;
    }
    if (!res.ok) {
      setStatus({ ok: false, text: data.error || "حدث خطأ" });
    } else {
      setStatus({ ok: true, text: "تم إرسال طلبك بنجاح!" });
      setMessage("");
    }
  }

  if (notFound)
    return <p className="mx-auto max-w-3xl px-4 py-12">الوظيفة غير موجودة.</p>;
  if (!job)
    return <p className="mx-auto max-w-3xl px-4 py-12 text-gray-500">جاري التحميل...</p>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="mt-1 text-gray-600">{job.company}</p>
          </div>
          <span className="whitespace-nowrap rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
            {JOB_TYPES[job.jobType] || job.jobType}
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-600">
          <span className="rounded bg-gray-100 px-2 py-1">📍 {job.wilaya}</span>
          <span className="rounded bg-gray-100 px-2 py-1">🏷️ {job.category}</span>
          {job.salary && (
            <span className="rounded bg-gray-100 px-2 py-1">💰 {job.salary}</span>
          )}
        </div>
        <h2 className="mt-6 font-semibold">وصف الوظيفة</h2>
        <p className="mt-2 whitespace-pre-line leading-relaxed text-gray-700">
          {job.description}
        </p>
      </div>

      <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">التقدم لهذه الوظيفة</h2>
        <form onSubmit={apply} className="mt-4 space-y-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="رسالة تحفيزية (اختياري)..."
            rows={4}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-green-700"
          />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-green-700 px-6 py-2.5 font-semibold text-white hover:bg-green-800 disabled:opacity-50"
          >
            {submitting ? "جاري الإرسال..." : "إرسال الطلب"}
          </button>
          {status && (
            <p className={status.ok ? "text-green-700" : "text-red-600"}>
              {status.text}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
