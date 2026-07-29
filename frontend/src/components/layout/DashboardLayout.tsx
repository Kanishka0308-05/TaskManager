import { useState } from 'react';
import type { PropsWithChildren } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <Navbar onMenuToggle={() => setSidebarOpen(true)} />

      <div className="relative">
        <div
          className={`fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
            sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        <div className="mx-auto flex min-h-[calc(100vh-72px)] max-w-[1600px] gap-4 px-4 py-6 lg:px-8">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          <main className="flex-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/10 transition-all duration-200 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-slate-950/40 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
