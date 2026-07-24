import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "يجب تسجيل الدخول أولاً" }, { status: 401 });
  }
  const applications = await prisma.application.findMany({
    where: { userId: user.id },
    include: { job: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ applications });
}
