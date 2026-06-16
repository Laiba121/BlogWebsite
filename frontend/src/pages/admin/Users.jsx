import AdminLayout from '../../components/admin/AdminLayout';

export default function Users() {
  return (
    <AdminLayout>
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-600 mt-2">Manage user accounts and permissions</p>
        
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-8">
          <p className="text-gray-600">Users management page coming soon...</p>
        </div>
      </div>
    </AdminLayout>
  );
}
