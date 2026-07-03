import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatsCard({ icon: Icon, title, value, change, changeType, changePercent, bgColor }) {
  const isPositive = changeType === 'up';

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bgColor}`}>
            <Icon size={20} className="text-white" />
          </div>

          <div>
            <p className="text-gray-500 text-xs font-medium">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
          </div>
        </div>
        <div className="text-sm text-gray-400">{change}</div>
      </div>

      <div className="mt-2">
        <span className={`inline-flex items-center gap-2 text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span className="text-xs">{changePercent}%</span>
        </span>
      </div>
    </div>
  );
}
