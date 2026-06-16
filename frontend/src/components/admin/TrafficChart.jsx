import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TrafficChart() {
  const data = [
    { date: '1 mon', value: 85 },
    { date: '2 mon', value: 72 },
    { date: '3 mon', value: 95 },
    { date: '4 mon', value: 88 },
    { date: '5 mon', value: 102 },
    { date: '6 mon', value: 94 },
    { date: '7 mon', value: 110 },
    { date: '8 mon', value: 98 },
    { date: '9 mon', value: 105 },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Traffic Analytics</h3>
          <p className="text-xs text-gray-600 mt-1">Data shown below last 30 days</p>
        </div>
        <span className="text-xs text-gray-500">Last 30 Days</span>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
          <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
