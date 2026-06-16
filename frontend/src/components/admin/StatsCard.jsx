import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatsCard({ icon: Icon, title, value, change, changeType, changePercent, bgColor }) {
  const isPositive = changeType === 'up';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center gap-1 text-sm font-semibold ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {changePercent}%
        </span>
        <span className="text-gray-600 text-sm">{change}</span>
      </div>
    </div>
  );
}
