import { AlertCircle } from 'lucide-react';

export default function HealthBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
      <div className="flex items-start gap-4">
        <div className="bg-blue-700 p-2 rounded-lg">
          <AlertCircle size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Network Healthy</h3>
          <p className="text-blue-100 text-sm">
            All pharmacological databases are synced across 4 regional servers. Everything is operating at peak efficiency.
          </p>
          <p className="text-blue-200 text-xs mt-2">Last checked 4 hours ago</p>
        </div>
      </div>
    </div>
  );
}
