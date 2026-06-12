import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Topbar />
      
      {/* Main Content */}
      <main className="lg:ml-64 mt-16 p-4 lg:p-8">
        {children}
      </main>
    </div>
  );
}
