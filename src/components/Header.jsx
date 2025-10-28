import React from 'react';
import { Bell, LogOut, Search } from 'lucide-react';

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'lawyer', label: 'Lawyer' },
  { value: 'client', label: 'Client' },
  { value: 'staff', label: 'Staff' },
];

export default function Header({ role, onRoleChange, onToggleSidebar }) {
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle sidebar"
            onClick={onToggleSidebar}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-indigo-600" />
            <span className="text-lg font-semibold tracking-tight">eCourt Manager</span>
          </div>
        </div>

        <div className="hidden flex-1 items-center justify-center px-6 lg:flex">
          <div className="relative w-full max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search cases, clients, hearings..."
              className="w-full rounded-md border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm outline-none ring-indigo-500 focus:ring-2"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={role}
            onChange={(e) => onRoleChange(e.target.value)}
            className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2"
            aria-label="Select role"
          >
            {roles.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
          <button className="relative rounded-md p-2 text-gray-600 hover:bg-gray-100" aria-label="Notifications">
            <Bell size={18} />
            <span className="absolute -right-0.5 -top-0.5 inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-red-500" />
          </button>
          <button className="rounded-full bg-gray-100 p-1.5 hover:bg-gray-200" aria-label="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
