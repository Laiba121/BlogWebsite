import { Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'

export default function TopMedicinesTable({ medicines = [], loading }) {
  const rows = loading
    ? Array.from({ length: 4 }).map((_, idx) => ({
        id: `loading-${idx}`,
        name: 'Loading...',
        icon: '💊',
        category: 'Loading',
        monthlyViews: '--',
        status: 'Loading',
        statusColor: 'bg-gray-100 text-gray-700',
      }))
    : medicines

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm relative">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Top Medicines Performance</h3>
        <div className="flex gap-3">
          <button className="px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-50">
            Export PDF
          </button>
          <button className="px-4 py-2 bg-primary-500 text-white rounded-md text-sm hover:bg-primary-700 shadow">
            Bulk Action
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left py-3 px-4 text-gray-500 text-xs font-semibold">MEDICINE NAME</th>
              <th className="text-left py-3 px-4 text-gray-500 text-xs font-semibold">CATEGORY</th>
              <th className="text-left py-3 px-4 text-gray-500 text-xs font-semibold">MONTHLY VIEWS</th>
              <th className="text-left py-3 px-4 text-gray-500 text-xs font-semibold">STATUS</th>
              <th className="text-center py-3 px-4 text-gray-500 text-xs font-semibold">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((medicine) => (
              <tr key={medicine.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center text-xl">{medicine.icon}</div>
                    <div>
                      <div className="font-medium text-gray-900">{medicine.name}</div>
                      <div className="text-xs text-gray-500">#id-{medicine.id}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">{medicine.category}</td>
                <td className="py-4 px-4 text-gray-900 font-semibold">{medicine.monthlyViews}</td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${medicine.statusColor}`}>
                    {medicine.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
        <span className="text-sm text-gray-600">Showing 1 of {Math.max(1, rows.length)} entries</span>
        <div className="flex gap-2">
          <button className="p-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50">
            <ChevronLeft size={20} />
          </button>
          <button className="w-8 h-8 bg-primary-500 text-white rounded text-sm font-bold">1</button>
          <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded text-sm font-bold">2</button>
          <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded text-sm font-bold">3</button>
          <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded text-sm font-bold">4</button>
          <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <button className="absolute right-6 bottom-6 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-700">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  )
}
