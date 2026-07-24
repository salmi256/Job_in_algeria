import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Job in Algeria — وظائف في الجزائر",
  description: "منصة البحث عن الوظائف في الجزائر — ابحث عن عمل في جميع الولايات",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Navbar />
        <main>{children}</main>
        <footer className="mt-16 border-t bg-white py-6 text-center text-sm text-gray-500">
          Job in Algeria © {new Date().getFullYear()} — منصة الوظائف الأولى في الجزائر
        </footer>
      </body>
    </html>
  );
}
