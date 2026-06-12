import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import DrugImport from '../../components/admin/DrugImport';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

export default function Medicines() {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDrug, setNewDrug] = useState({
    title: '',
    brandName: '',
    genericName: '',
    category: '',
    shortDescription: '',
    splVersion: '',
    publishedDate: '',
    manufacturer: '',
    dosage: '',
    warnings: '',
    ingredients: ''
  });

  useEffect(() => {
    if (showAddModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showAddModal])

  const fetchDrugs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/drugs');
      setDrugs(res.data.drugs);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (showAddModal) {
      document.documentElement.classList.add('overflow-hidden')
    } else {
      document.documentElement.classList.remove('overflow-hidden')
    }
    return () => document.documentElement.classList.remove('overflow-hidden')
  }, [showAddModal])

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewDrug({
      title: '',
      brandName: '',
      genericName: '',
      category: '',
      shortDescription: '',
      splVersion: '',
      publishedDate: '',
      manufacturer: '',
      dosage: '',
      warnings: '',
      ingredients: ''
    });
  };

  const handleCreateDrug = async () => {
    if (!newDrug.title.trim()) {
      return alert('Please enter a medicine title.');
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/drugs', {
        title: newDrug.title,
        brandName: newDrug.brandName,
        genericName: newDrug.genericName,
        category: newDrug.category,
        shortDescription: newDrug.shortDescription,
        splVersion: newDrug.splVersion ? Number(newDrug.splVersion) : undefined,
        publishedDate: newDrug.publishedDate || new Date().toISOString(),
        manufacturer: newDrug.manufacturer,
        dosage: newDrug.dosage,
        warnings: newDrug.warnings,
        ingredients: newDrug.ingredients
      });

      setDrugs((current) => [res.data.drug, ...current]);
      handleCloseAddModal();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to create medicine.');
    }
    setLoading(false);
  };


  useEffect(() => {
    fetchDrugs();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchDrugs();
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/drugs/search?query=${searchQuery}`
      );
      setDrugs(res.data.drugs);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this medicine?')) return;
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/drugs/${id}`);
      await fetchDrugs();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleRefreshDetails = async (id) => {
    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:5000/api/drugs/${id}/refresh-details`);
      setDrugs((current) =>
        current.map((drug) => (drug._id === id ? res.data.drug : drug))
      );
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Medicines</h1>
          <p className="text-gray-600 mt-2">Manage medicines from DailyMed API</p>
        </div>

        {/* Import Section */}
        <DrugImport onImportComplete={fetchDrugs} />

        {/* Search and Medicines List */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                placeholder="Search medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Search size={18} />
                Search
              </button>
            </div>
            <button onClick={handleOpenAddModal} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
              <Plus size={18} />
              Add Manual
            </button>
          </div>

          {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-auto">
                <div className="flex items-start justify-between gap-4 border-b border-gray-200 pb-4 mb-4 sticky top-0 bg-white">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Add New Medicine</h2>
                    <p className="text-sm text-gray-500">Enter manual medicine details to store it with the imported list.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCloseAddModal}
                    className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 flex-shrink-0"
                  >
                    Close
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-gray-700">Brand Name</span>
                    <input
                      type="text"
                      value={newDrug.brandName}
                      onChange={(e) => setNewDrug((prev) => ({ ...prev, brandName: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Lipitor"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-gray-700">Generic Name</span>
                    <input
                      type="text"
                      value={newDrug.genericName}
                      onChange={(e) => setNewDrug((prev) => ({ ...prev, genericName: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Atorvastatin"
                    />
                  </label>
                  <label className="space-y-2 sm:col-span-2">
                    <span className="text-sm font-medium text-gray-700">Therapeutic Category</span>
                    <input
                      type="text"
                      value={newDrug.category}
                      onChange={(e) => setNewDrug((prev) => ({ ...prev, category: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Cardiovascular"
                    />
                  </label>
                  <label className="space-y-2 sm:col-span-2">
                    <span className="text-sm font-medium text-gray-700">Medicine Title</span>
                    <input
                      type="text"
                      value={newDrug.title}
                      onChange={(e) => setNewDrug((prev) => ({ ...prev, title: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter medicine title"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-gray-700">Version</span>
                    <input
                      type="number"
                      value={newDrug.splVersion}
                      onChange={(e) => setNewDrug((prev) => ({ ...prev, splVersion: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. 1"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-gray-700">Published Date</span>
                    <input
                      type="date"
                      value={newDrug.publishedDate}
                      onChange={(e) => setNewDrug((prev) => ({ ...prev, publishedDate: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-gray-700">Manufacturer</span>
                    <input
                      type="text"
                      value={newDrug.manufacturer}
                      onChange={(e) => setNewDrug((prev) => ({ ...prev, manufacturer: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Pfizer"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-gray-700">Dosage</span>
                    <input
                      type="text"
                      value={newDrug.dosage}
                      onChange={(e) => setNewDrug((prev) => ({ ...prev, dosage: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. 10 mg"
                    />
                  </label>
                  <label className="space-y-2 sm:col-span-2">
                    <span className="text-sm font-medium text-gray-700">Short Description</span>
                    <textarea
                      value={newDrug.shortDescription}
                      onChange={(e) => setNewDrug((prev) => ({ ...prev, shortDescription: e.target.value }))}
                      className="w-full min-h-24 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Brief summary of the drug's primary use..."
                    />
                  </label>
                  <label className="space-y-2 sm:col-span-2">
                    <span className="text-sm font-medium text-gray-700">Ingredients</span>
                    <input
                      type="text"
                      value={newDrug.ingredients}
                      onChange={(e) => setNewDrug((prev) => ({ ...prev, ingredients: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Comma separated ingredients"
                    />
                  </label>
                  <label className="space-y-2 sm:col-span-2">
                    <span className="text-sm font-medium text-gray-700">Warnings</span>
                    <textarea
                      value={newDrug.warnings}
                      onChange={(e) => setNewDrug((prev) => ({ ...prev, warnings: e.target.value }))}
                      className="w-full min-h-24 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Any safety warnings or precautions"
                    />
                  </label>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={handleCloseAddModal}
                    className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleCreateDrug}
                    className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Save Medicine
                  </button>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading medicines...</p>
            </div>
          ) : drugs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                      TITLE
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                      SET ID
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                      VERSION
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                      PUBLISHED DATE
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                      DETAILS
                    </th>
                    <th className="text-center py-3 px-4 text-gray-600 font-semibold">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {drugs.map((drug) => (
                    <tr key={drug._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <p className="font-medium text-gray-900 max-w-xs truncate">
                          {drug.title}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-gray-700 text-xs font-mono">
                        {drug.setId.substring(0, 8)}...
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        v{drug.splVersion || 'N/A'}
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        {new Date(drug.publishedDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        {drug.hasFullDetails ? (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                            ✓ Complete
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-semibold">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleRefreshDetails(drug._id)}
                            className="p-1 text-gray-600 hover:bg-gray-200 rounded transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(drug._id)}
                            className="p-1 text-gray-600 hover:bg-gray-200 rounded transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No medicines found. Start importing from DailyMed API above.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
