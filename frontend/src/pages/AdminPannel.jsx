import { Outlet } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import Dashboard from './admin/Dashboard';

export default function AdminPannel() {
  return (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  );
}