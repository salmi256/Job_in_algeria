"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { JOB_TYPES } from "@/lib/constants";

interface ApplicationItem {
  id: string;
  message?: string | null;
  createdAt: string;
  job: {
    id: string;
    title: string;
    company: string;
    wilaya: string;
    jobType: string;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/applications").then(async (res) => {
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      setApplications(data.applications || []);
      setLoading(false);
    });
  }, [router]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold">طلبات التوظيف الخاصة بي</h1>
      {loading ? (
        <p className="mt-6 text-gray-500">جاري التحميل...</p>
      ) : applications.length === 0 ? (
        <p className="mt-6 text-gray-500">
          لم تتقدم لأي وظيفة بعد.{" "}
          <Link href="/jobs" className="text-green-700 underline">
            تصفح الوظائف
          </Link>
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {applications.map((a) => (
            <Link
              key={a.id}
              href={`/jobs/${a.job.id}`}
              className="block rounded-xl border bg-white p-5 shadow-sm hover:border-green-700"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{a.job.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {a.job.company} — {a.job.wilaya}
                  </p>
                </div>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-800">
                  {JOB_TYPES[a.job.jobType] || a.job.jobType}
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-400">
                تاريخ التقديم: {new Date(a.createdAt).toLocaleDateString("ar-DZ")}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
