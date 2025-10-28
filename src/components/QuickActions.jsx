import React from 'react';
import { Plus, Upload, Calendar, MessageSquare } from 'lucide-react';

export default function QuickActions({ role }) {
  const actionsByRole = {
    admin: [
      { label: 'Add User', icon: Plus },
      { label: 'Generate Report', icon: Upload },
    ],
    lawyer: [
      { label: 'New Case', icon: Plus },
      { label: 'Upload Document', icon: Upload },
      { label: 'Schedule Hearing', icon: Calendar },
    ],
    client: [
      { label: 'Upload Document', icon: Upload },
      { label: 'Give Feedback', icon: MessageSquare },
    ],
    staff: [
      { label: 'Add Task', icon: Plus },
      { label: 'Upload Resource', icon: Upload },
    ],
  };

  const actions = actionsByRole[role] || actionsByRole.admin;

  return (
    <section className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Quick Actions</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {actions.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm hover:border-indigo-300 hover:bg-indigo-50"
          >
            <Icon size={16} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
