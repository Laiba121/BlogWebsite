import { useEffect, useState } from 'react'
import { Pill, List, MessageSquare, Users } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import StatsCard from '../../components/admin/StatsCard'
import TrafficChart from '../../components/admin/TrafficChart'
import PopularSearches from '../../components/admin/PopularSearches'
import TopMedicinesTable from '../../components/admin/TopMedicinesTable'
import ActiveNewsletters from '../../components/admin/ActiveNewsletters'
import HealthBanner from '../../components/admin/HealthBanner'
import { getAdminDashboard } from '../../api'

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('pharmacontext_token')
    if (!token) {
      setError('Missing authentication token.')
      setLoading(false)
      return
    }

    getAdminDashboard(token)
      .then((data) => {
        setDashboard(data)
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Unable to load dashboard data.')
      })
      .finally(() => setLoading(false))
  }, [])

  const stats = dashboard
    ? [
        {
          icon: Pill,
          title: 'Medicines',
          value: dashboard.totalDrugs.toLocaleString(),
          change: `${dashboard.drugsWithDetails.toLocaleString()} with details`,
          changeType: 'up',
          changePercent: Math.max(0, Math.round((dashboard.drugsWithDetails / Math.max(1, dashboard.totalDrugs)) * 100)),
          bgColor: 'bg-orange-500',
        },
        {
          icon: List,
          title: 'Total Categories',
          value: dashboard.totalCategories.toLocaleString(),
          change: `${dashboard.totalArticles.toLocaleString()} articles published`,
          changeType: 'up',
          changePercent: dashboard.totalCategories,
          bgColor: 'bg-teal-500',
        },
        {
          icon: Users,
          title: 'Active Users',
          value: dashboard.totalUsers.toLocaleString(),
          change: `${dashboard.verifiedUsers.toLocaleString()} verified`,
          changeType: 'up',
          changePercent: dashboard.verifiedUsers,
          bgColor: 'bg-orange-400',
        },
        {
          icon: MessageSquare,
          title: 'Admin Accounts',
          value: dashboard.totalAdmins.toLocaleString(),
          change: `${dashboard.totalArticles.toLocaleString()} articles`,
          changeType: 'up',
          changePercent: dashboard.totalAdmins,
          bgColor: 'bg-gray-500',
        },
      ]
    : []

  return (
    <AdminLayout>
      <div className="space-y-6">
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

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-32 rounded-lg bg-gray-100 animate-pulse" />
              ))
            : stats.map((stat, index) => (
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
              <h4 className="text-sm text-gray-600 mb-4">Traffic Analytics</h4>
              <TrafficChart data={dashboard?.traffic || []} loading={loading} />
            </div>
          </div>

          <div className="space-y-4">
            <PopularSearches searches={dashboard?.popularSearches || []} loading={loading} />
            <HealthBanner network={dashboard?.network} loading={loading} />
          </div>
        </div>

        <div>
          <TopMedicinesTable medicines={dashboard?.topMedicines || []} loading={loading} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActiveNewsletters newsletters={dashboard?.newsletters || []} loading={loading} />
          </div>

          <div>
            <HealthBanner network={dashboard?.network} loading={loading} condensed />
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
