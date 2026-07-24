"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user))
      .finally(() => setLoaded(true));
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="rounded-lg bg-green-700 px-2 py-1 text-white">JIA</span>
          <span>
            Job in <span className="text-green-700">Algeria</span>
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/jobs" className="hover:text-green-700">
            الوظائف
          </Link>
          {user && (
            <>
              <Link href="/post-job" className="hover:text-green-700">
                نشر وظيفة
              </Link>
              <Link href="/dashboard" className="hover:text-green-700">
                طلباتي
              </Link>
            </>
          )}
          {loaded &&
            (user ? (
              <div className="flex items-center gap-3">
                <span className="hidden text-gray-600 sm:inline">
                  مرحباً، {user.name}
                </span>
                <button
                  onClick={logout}
                  className="rounded-lg border border-green-700 px-3 py-1.5 text-green-700 hover:bg-green-50"
                >
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="rounded-lg border border-green-700 px-3 py-1.5 text-green-700 hover:bg-green-50"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-green-700 px-3 py-1.5 text-white hover:bg-green-800"
                >
                  إنشاء حساب
                </Link>
              </div>
            ))}
        </nav>
      </div>
    </header>
  );
}
