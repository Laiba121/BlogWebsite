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
      change: '+15% from last',
      changeType: 'up',
      changePercent: '15',
      bgColor: 'bg-orange-500'
    },
    {
      icon: List,
      title: 'Total Categories',
      value: '148',
      change: '4 new admin recently',
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
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Title */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Traffic Chart */}
        <TrafficChart />

        {/* Second Row - Popular Searches and Right Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PopularSearches />
          </div>
          
          <div>
            <HealthBanner />
          </div>
        </div>

        {/* Top Medicines Table */}
        <TopMedicinesTable />

        {/* Newsletter and Health Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActiveNewsletters />
          
          {/* Health Status - Alternative placement if needed */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-lg p-6 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-blue-100">GLOBAL STATUS</h3>
                  <p className="text-3xl font-bold mt-2">Network Healthy</p>
                </div>
                <div className="text-4xl">🌐</div>
              </div>
              <p className="text-blue-100 text-sm">
                All pharmacological databases are synced across 4 regional servers. Everything is operating at peak efficiency.
              </p>
              <p className="text-blue-200 text-xs mt-4">Last checked: 4 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
