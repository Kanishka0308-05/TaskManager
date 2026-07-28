import Navbar from './Navbar';
import Sidebar from './Sidebar';
import type { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <div className="mx-auto flex min-h-[calc(100vh-72px)] max-w-[1600px] gap-4 px-4 py-6 lg:px-8">
        <aside className="hidden w-72 shrink-0 rounded-3xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl shadow-slate-950/40 lg:block">
          <Sidebar />
        </aside>
        <main className="flex-1 rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/40">
          {children}
        </main>
      </div>
    </div>
  );
}
