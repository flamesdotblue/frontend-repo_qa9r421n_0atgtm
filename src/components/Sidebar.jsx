import React from 'react';
import { Home, Users, FileText, Calendar, Folder, MessageSquare, BarChart2 } from 'lucide-react';

const NAV = {
  admin: [
    { icon: Home, label: 'Overview' },
    { icon: Users, label: 'Users' },
    { icon: Users, label: 'Staff' },
    { icon: BarChart2, label: 'Reports' },
    { icon: Folder, label: 'Documents' },
  ],
  lawyer: [
    { icon: Home, label: 'Overview' },
    { icon: FileText, label: 'Cases' },
    { icon: Calendar, label: 'Hearings' },
    { icon: Folder, label: 'Documents' },
    { icon: MessageSquare, label: 'Feedback' },
  ],
  client: [
    { icon: Home, label: 'Overview' },
    { icon: FileText, label: 'My Cases' },
    { icon: Calendar, label: 'Hearings' },
    { icon: Folder, label: 'Documents' },
    { icon: MessageSquare, label: 'Feedback' },
  ],
  staff: [
    { icon: Home, label: 'Overview' },
    { icon: FileText, label: 'Assigned Cases' },
    { icon: Calendar, label: 'Schedule' },
    { icon: Folder, label: 'Resources' },
  ],
};

export default function Sidebar({ role = 'admin', open = true }) {
  const items = NAV[role] || NAV.admin;
  return (
    <aside
      className={`$${''} ${open ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-20 w-72 border-r bg-white/80 backdrop-blur transition-transform duration-200 ease-in-out lg:static lg:translate-x-0`}
    >
      <div className="flex h-16 items-center border-b px-6">
        <span className="text-sm font-medium text-gray-500">Navigation</span>
      </div>
      <nav className="space-y-1 p-3">
        {items.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            <Icon size={18} className="text-gray-500" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="absolute bottom-0 w-full border-t p-4 text-xs text-gray-500">
        <p>Signed in as</p>
        <p className="font-medium capitalize">{role}</p>
      </div>
    </aside>
  );
}
