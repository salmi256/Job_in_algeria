import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "يجب تسجيل الدخول أولاً" }, { status: 401 });
  }
  const job = await prisma.job.findUnique({ where: { id: params.id } });
  if (!job) {
    return NextResponse.json({ error: "الوظيفة غير موجودة" }, { status: 404 });
  }
  const existing = await prisma.application.findUnique({
    where: { jobId_userId: { jobId: job.id, userId: user.id } },
  });
  if (existing) {
    return NextResponse.json(
      { error: "لقد تقدمت لهذه الوظيفة من قبل" },
      { status: 409 }
    );
  }
  const { message } = await req.json().catch(() => ({ message: null }));
  const application = await prisma.application.create({
    data: { jobId: job.id, userId: user.id, message: message || null },
  });
  return NextResponse.json({ application });
}
