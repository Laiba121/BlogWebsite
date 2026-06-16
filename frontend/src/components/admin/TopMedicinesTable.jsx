import { Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TopMedicinesTable() {
  const medicines = [
    {
      id: 1,
      name: 'Amoxicillin',
      icon: '💊',
      category: 'Cardiology',
      monthlyViews: '24,500',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-700'
    },
    {
      id: 2,
      name: 'Metformin HCL',
      icon: '💉',
      category: 'Metabolic',
      monthlyViews: '18,270',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-700'
    },
    {
      id: 3,
      name: 'Amoxicillin/Clavuc',
      icon: '🩺',
      category: 'Antibiotics',
      monthlyViews: '15,401',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-700'
    },
    {
      id: 4,
      name: 'Oxycodone',
      icon: '⚠️',
      category: 'Pain Relief',
      monthlyViews: '12,100',
      status: 'Restricted',
      statusColor: 'bg-red-100 text-red-700'
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Top Medicines Performance</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">
            Export PDF
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            Add Details
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">MEDICINE NAME</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">CATEGORY</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">MONTHLY VIEWS</th>
              <th className="text-left py-3 px-4 text-gray-600 font-semibold">STATUS</th>
              <th className="text-center py-3 px-4 text-gray-600 font-semibold">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{medicine.icon}</span>
                    <span className="font-medium text-gray-900">{medicine.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">{medicine.category}</td>
                <td className="py-4 px-4 text-gray-900 font-semibold">{medicine.monthlyViews}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${medicine.statusColor}`}>
                    {medicine.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-1 text-gray-600 hover:bg-gray-200 rounded transition-colors">
                      <Edit size={18} />
                    </button>
                    <button className="p-1 text-gray-600 hover:bg-gray-200 rounded transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
        <span className="text-sm text-gray-600">Showing 1 of 12,482 entries</span>
        <div className="flex gap-2">
          <button className="p-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50">
            <ChevronLeft size={20} />
          </button>
          <button className="w-8 h-8 bg-blue-600 text-white rounded text-sm font-bold">1</button>
          <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded text-sm font-bold">2</button>
          <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded text-sm font-bold">3</button>
          <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded text-sm font-bold">4</button>
          <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
