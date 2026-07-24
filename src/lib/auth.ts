import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const COOKIE_NAME = "jia_token";

export interface TokenPayload {
  userId: string;
}

export function signToken(userId: string): string {
  return jwt.sign({ userId } satisfies TokenPayload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function setAuthCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export function clearAuthCookie() {
  cookies().delete(COOKIE_NAME);
}

export async function getCurrentUser() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, name: true, role: true },
    });
  } catch {
    return null;
  }
}
