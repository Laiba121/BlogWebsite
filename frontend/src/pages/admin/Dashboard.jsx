import { Pill, List, MessageSquare, Users } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import StatsCard from '../../components/admin/StatsCard';
import TrafficChart from '../../components/admin/TrafficChart';
import PopularSearches from '../../components/admin/PopularSearches';
import TopMedicinesTable from '../../components/admin/TopMedicinesTable';
import ActiveNewsletters from '../../components/admin/ActiveNewsletters';
import HealthBanner from '../../components/admin/HealthBanner';

export default function Dashboard() {
  const stats = [
    {
      icon: Pill,
      title: 'Medicines',
      value: '12,482',
      change: '+15% from last month',
      changeType: 'up',
      changePercent: '15',
      bgColor: 'bg-orange-500'
    },
    {
      icon: List,
      title: 'Total Categories',
      value: '148',
      change: '4 new added recently',
      changeType: 'up',
      changePercent: '4',
      bgColor: 'bg-teal-500'
    },
    {
      icon: Users,
      title: 'Total Views',
      value: '1.2M',
      change: '-2.4% vs last week',
      changeType: 'down',
      changePercent: '2',
      bgColor: 'bg-orange-400'
    },
    {
      icon: MessageSquare,
      title: 'Subscribers',
      value: '45,902',
      change: '+500 new signups',
      changeType: 'up',
      changePercent: '500',
      bgColor: 'bg-gray-500'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Overview</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                placeholder="Search data, reports, drugs..."
                className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 border border-gray-200 w-80 text-sm"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              changePercent={stat.changePercent}
              bgColor={stat.bgColor}
            />
          ))}
        </div>

        {/* Main Row: Traffic + Popular */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
              <h4 className="text-sm text-gray-600 mb-4">Traffic Analytics</h4>
              <TrafficChart />
            </div>
          </div>

          <div className="space-y-4">
            <PopularSearches />
            <HealthBanner />
          </div>
        </div>

        {/* Top Medicines Table */}
        <div>
          <TopMedicinesTable />
        </div>

        {/* Bottom Row - Newsletters + Network */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActiveNewsletters />
          </div>

          <div>
            <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
              <h4 className="text-sm text-gray-600">Global Status</h4>
              <div className="mt-4">
                <h3 className="text-lg font-bold text-gray-900">Network Healthy</h3>
                <p className="text-sm text-gray-500 mt-2">All pharmacological databases are synced across 4 regions with zero latency.</p>
                <div className="mt-4 text-xs text-gray-400">Last backup: 16 mins ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
