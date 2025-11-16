import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-maroon text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-bold text-lg">ZShield</div>
          <nav className="flex gap-4">
            <Link className={router.pathname === "/" ? "underline" : ""} href="/">Home</Link>
            <Link className={router.pathname === "/dashboard" ? "underline" : ""} href="/dashboard">Dashboard</Link>
            <Link className={router.pathname === "/simulator" ? "underline" : ""} href="/simulator">Simulator</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}