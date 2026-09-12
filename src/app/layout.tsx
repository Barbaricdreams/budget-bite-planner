import type { Metadata } from "next";
import { DemoBanner } from "@/components/DemoBanner";
import { Nav } from "@/components/Nav";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Budget Bite Planner",
  description:
    "Plan budget meals and compare DEMO grocery costs across Dollar Tree, Dollar General, and Walmart.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <AppProvider>
          <DemoBanner />
          <Nav />
          <main className="mx-auto max-w-6xl px-4 py-6 sm:py-8">{children}</main>
          <footer className="mx-auto max-w-6xl px-4 pb-10 pt-4 text-center text-xs text-slate-400">
            Budget Bite Planner · Mock store catalogs · No live pricing APIs
          </footer>
        </AppProvider>
      </body>
    </html>
  );
}
