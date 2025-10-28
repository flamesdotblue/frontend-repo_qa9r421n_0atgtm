import React from 'react';

export default function DataTable({ title, columns, data }) {
  return (
    <section className="rounded-xl border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        <div className="text-xs text-gray-500">{data.length} items</div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  className="whitespace-nowrap px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.accessor} className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
                    {row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-sm text-gray-500" colSpan={columns.length}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
