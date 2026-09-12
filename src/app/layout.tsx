import type { Metadata, Viewport } from "next";
import { DemoBanner } from "@/components/DemoBanner";
import { Nav } from "@/components/Nav";
import {
  THEME_INIT_SCRIPT,
  ThemeProvider,
} from "@/components/ThemeProvider";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Budget Bite Planner",
  description:
    "Plan budget meals and compare DEMO grocery costs across Dollar Tree, Dollar General, and Walmart.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#059669" },
    { media: "(prefers-color-scheme: dark)", color: "#064e3b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
      </head>
      <body className="min-h-screen antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <ThemeProvider>
          <AppProvider>
            <DemoBanner />
            <Nav />
            <main className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
              {children}
            </main>
            <footer className="mx-auto max-w-6xl px-4 pb-10 pt-4 text-center text-xs text-slate-400 dark:text-slate-500">
              Budget Bite Planner · Mock store catalogs · No live pricing APIs
            </footer>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
