import path from "path";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Prisma CLI resolves relative SQLite paths against the schema directory
// (prisma/), so mirror that at runtime regardless of cwd.
const url = process.env.DATABASE_URL?.startsWith("file:./")
  ? `file:${path.join(process.cwd(), "prisma", process.env.DATABASE_URL.slice("file:./".length))}`
  : process.env.DATABASE_URL;

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ datasourceUrl: url });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
