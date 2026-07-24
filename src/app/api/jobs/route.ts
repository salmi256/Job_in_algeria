import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const wilaya = searchParams.get("wilaya") || "";
  const category = searchParams.get("category") || "";
  const jobType = searchParams.get("jobType") || "";

  const jobs = await prisma.job.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                { title: { contains: q } },
                { company: { contains: q } },
                { description: { contains: q } },
              ],
            }
          : {},
        wilaya ? { wilaya } : {},
        category ? { category } : {},
        jobType ? { jobType } : {},
      ],
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json({ jobs });
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "يجب تسجيل الدخول أولاً" }, { status: 401 });
  }
  const { title, company, description, wilaya, category, jobType, salary } =
    await req.json();
  if (!title || !company || !description || !wilaya || !category) {
    return NextResponse.json({ error: "جميع الحقول مطلوبة" }, { status: 400 });
  }
  const job = await prisma.job.create({
    data: {
      title,
      company,
      description,
      wilaya,
      category,
      jobType: jobType || "full-time",
      salary: salary || null,
      postedById: user.id,
    },
  });
  return NextResponse.json({ job });
}
