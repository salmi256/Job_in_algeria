import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: { postedBy: { select: { name: true } } },
  });
  if (!job) {
    return NextResponse.json({ error: "الوظيفة غير موجودة" }, { status: 404 });
  }
  return NextResponse.json({ job });
}
