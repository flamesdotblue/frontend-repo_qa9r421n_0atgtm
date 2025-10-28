import React, { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import DashboardOverview from './components/DashboardOverview.jsx';
import DataTable from './components/DataTable.jsx';
import QuickActions from './components/QuickActions.jsx';

export default function App() {
  const [role, setRole] = useState('admin');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tableConfig = useMemo(() => {
    switch (role) {
      case 'admin':
        return {
          title: 'Recent Users',
          columns: [
            { header: 'Name', accessor: 'name' },
            { header: 'Email', accessor: 'email' },
            { header: 'Role', accessor: 'role' },
          ],
          data: [
            { name: 'Sarah Connor', email: 'sarah@example.com', role: 'Lawyer' },
            { name: 'John Doe', email: 'john@example.com', role: 'Client' },
            { name: 'Jane Smith', email: 'jane@example.com', role: 'Staff' },
          ],
        };
      case 'lawyer':
        return {
          title: 'My Cases',
          columns: [
            { header: 'Case ID', accessor: 'id' },
            { header: 'Client', accessor: 'client' },
            { header: 'Status', accessor: 'status' },
            { header: 'Next Hearing', accessor: 'hearing' },
          ],
          data: [
            { id: 'EC-2024-0912', client: 'Acme Corp', status: 'Active', hearing: 'Nov 12' },
            { id: 'EC-2024-1045', client: 'Jane Cooper', status: 'Pending', hearing: 'Nov 28' },
            { id: 'EC-2024-0870', client: 'Wayne LLC', status: 'Closed', hearing: '-' },
          ],
        };
      case 'client':
        return {
          title: 'My Case Status',
          columns: [
            { header: 'Case ID', accessor: 'id' },
            { header: 'Lawyer', accessor: 'lawyer' },
            { header: 'Status', accessor: 'status' },
            { header: 'Next Step', accessor: 'next' },
          ],
          data: [
            { id: 'EC-2024-2001', lawyer: 'A. Khan', status: 'In Progress', next: 'Hearing Nov 12' },
            { id: 'EC-2024-1862', lawyer: 'M. Patel', status: 'Evidence', next: 'Docs review' },
          ],
        };
      case 'staff':
        return {
          title: 'Assigned Tasks',
          columns: [
            { header: 'Task', accessor: 'task' },
            { header: 'Case', accessor: 'case' },
            { header: 'Due', accessor: 'due' },
            { header: 'Status', accessor: 'status' },
          ],
          data: [
            { task: 'Prepare bundle', case: 'EC-2024-0912', due: 'Nov 10', status: 'In Progress' },
            { task: 'Notify client', case: 'EC-2024-1045', due: 'Nov 09', status: 'Pending' },
            { task: 'File index', case: 'EC-2024-0870', due: 'Nov 08', status: 'Done' },
          ],
        };
      default:
        return { title: 'Overview', columns: [], data: [] };
    }
  }, [role]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header
        role={role}
        onRoleChange={setRole}
        onToggleSidebar={() => setSidebarOpen((s) => !s)}
      />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[18rem_1fr] lg:px-8">
        <Sidebar role={role} open={sidebarOpen} />

        <main className="space-y-6">
          <div className="rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-500 p-6 text-white">
            <h1 className="text-2xl font-semibold tracking-tight">
              {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
            </h1>
            <p className="mt-1 text-sm opacity-90">
              A unified workspace to manage cases, hearings, documents and more.
            </p>
          </div>

          <DashboardOverview role={role} />

          <QuickActions role={role} />

          <DataTable title={tableConfig.title} columns={tableConfig.columns} data={tableConfig.data} />
        </main>
      </div>
    </div>
  );
}
