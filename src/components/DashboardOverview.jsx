import React from 'react';
import { Users, FileText, Calendar, Folder, BarChart2 } from 'lucide-react';

const CARD_CONFIG = {
  admin: [
    { label: 'Total Users', value: '1,248', icon: Users, color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Active Cases', value: '342', icon: FileText, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Hearings Today', value: '18', icon: Calendar, color: 'bg-amber-50 text-amber-600' },
    { label: 'Reports', value: '12', icon: BarChart2, color: 'bg-sky-50 text-sky-600' },
  ],
  lawyer: [
    { label: 'My Cases', value: '76', icon: FileText, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Hearings This Week', value: '9', icon: Calendar, color: 'bg-amber-50 text-amber-600' },
    { label: 'Documents', value: '534', icon: Folder, color: 'bg-sky-50 text-sky-600' },
    { label: 'Client Feedback', value: '27', icon: Users, color: 'bg-indigo-50 text-indigo-600' },
  ],
  client: [
    { label: 'Open Cases', value: '3', icon: FileText, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Next Hearing', value: 'Nov 12', icon: Calendar, color: 'bg-amber-50 text-amber-600' },
    { label: 'Uploaded Docs', value: '18', icon: Folder, color: 'bg-sky-50 text-sky-600' },
    { label: 'Lawyer Team', value: '4', icon: Users, color: 'bg-indigo-50 text-indigo-600' },
  ],
  staff: [
    { label: 'Assigned Tasks', value: '24', icon: FileText, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Today\'s Hearings', value: '6', icon: Calendar, color: 'bg-amber-50 text-amber-600' },
    { label: 'Shared Docs', value: '89', icon: Folder, color: 'bg-sky-50 text-sky-600' },
    { label: 'Teams', value: '5', icon: Users, color: 'bg-indigo-50 text-indigo-600' },
  ],
};

export default function DashboardOverview({ role }) {
  const cards = CARD_CONFIG[role] || CARD_CONFIG.admin;
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
              <Icon size={18} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
