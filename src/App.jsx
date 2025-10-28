import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import DashboardOverview from './components/DashboardOverview.jsx';
import DataTable from './components/DataTable.jsx';
import QuickActions from './components/QuickActions.jsx';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function App() {
  const [role, setRole] = useState('admin');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [tableData, setTableData] = useState({ title: '', data: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const tableColumns = useMemo(() => {
    switch (tableData.title) {
      case 'Recent Users':
        return [
          { header: 'Name', accessor: 'name' },
          { header: 'Email', accessor: 'email' },
          { header: 'Role', accessor: 'role' },
        ];
      case 'My Cases':
        return [
          { header: 'Case ID', accessor: 'id' },
          { header: 'Client', accessor: 'client' },
          { header: 'Status', accessor: 'status' },
          { header: 'Next Hearing', accessor: 'hearing' },
        ];
      case 'My Case Status':
        return [
          { header: 'Case ID', accessor: 'id' },
          { header: 'Lawyer', accessor: 'lawyer' },
          { header: 'Status', accessor: 'status' },
          { header: 'Next Step', accessor: 'next' },
        ];
      case 'Assigned Tasks':
        return [
          { header: 'Task', accessor: 'task' },
          { header: 'Case', accessor: 'case' },
          { header: 'Due', accessor: 'due' },
          { header: 'Status', accessor: 'status' },
        ];
      default:
        return [];
    }
  }, [tableData.title]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        // ensure demo data is present
        await axios.post(`${BASE_URL}/api/seed`).catch(() => {});
        const [overviewRes, tableRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/dashboard/overview`, { params: { role } }),
          axios.get(`${BASE_URL}/api/dashboard/table`, { params: { role } }),
        ]);
        setCards(overviewRes.data || []);
        setTableData(tableRes.data || { title: '', data: [] });
      } catch (e) {
        setError('Failed to load data from backend.');
        setCards([]);
        setTableData({ title: 'Unavailable', data: [] });
      } finally {
        setLoading(false);
      }
    };
    load();
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

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-10 text-sm text-gray-500">Loading data...</div>
          ) : (
            <>
              <DashboardOverview role={role} cards={cards} />
              <QuickActions role={role} />
              <DataTable title={tableData.title} columns={tableColumns} data={tableData.data} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
