import Link from "next/link";
import { JOB_TYPES } from "@/lib/constants";

export interface JobItem {
  id: string;
  title: string;
  company: string;
  wilaya: string;
  category: string;
  jobType: string;
  salary?: string | null;
  createdAt: string;
}

export default function JobCard({ job }: { job: JobItem }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="block rounded-xl border bg-white p-5 shadow-sm transition hover:border-green-700 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
          <p className="mt-1 text-sm text-gray-600">{job.company}</p>
        </div>
        <span className="whitespace-nowrap rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
          {JOB_TYPES[job.jobType] || job.jobType}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
        <span className="rounded bg-gray-100 px-2 py-1">📍 {job.wilaya}</span>
        <span className="rounded bg-gray-100 px-2 py-1">🏷️ {job.category}</span>
        {job.salary && (
          <span className="rounded bg-gray-100 px-2 py-1">💰 {job.salary}</span>
        )}
      </div>
    </Link>
  );
}
