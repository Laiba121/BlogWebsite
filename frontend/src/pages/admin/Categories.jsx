import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Plus, Save, Search, ShieldCheck } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [search, setSearch] = useState('');
  const [selectedMedicineIds, setSelectedMedicineIds] = useState([]);
  const [message, setMessage] = useState('');

  const selectedCategory = useMemo(
    () => categories.find((category) => category._id === selectedCategoryId) || null,
    [categories, selectedCategoryId]
  );

  const filteredMedicines = useMemo(() => {
    const q = search.trim().toLowerCase();
    return medicines.filter((medicine) => {
      if (!q) return true;
      const haystack = `${medicine.title || ''} ${medicine.brandName?.[0] || ''} ${medicine.genericName?.[0] || ''}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [medicines, search]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [categoriesRes, drugsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/categories'),
        axios.get('http://localhost:5000/api/drugs', { params: { limit: 500 } }),
      ]);

      const fetchedCategories = categoriesRes.data || [];
      const fetchedMedicines = drugsRes.data?.drugs || [];

      setCategories(fetchedCategories);
      setMedicines(fetchedMedicines);

      if (!selectedCategoryId && fetchedCategories.length) {
        setSelectedCategoryId(fetchedCategories[0]._id);
      }
    } catch (error) {
      console.error(error);
      setMessage('Unable to load categories and medicines right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedCategory || !medicines.length) {
      setSelectedMedicineIds([]);
      return;
    }

    const assignedIds = medicines
      .filter((medicine) => medicine.category === selectedCategory.name)
      .map((medicine) => medicine._id);

    setSelectedMedicineIds(assignedIds);
  }, [selectedCategory, medicines]);

  const handleCreateCategory = async (event) => {
    event.preventDefault();
    if (!newCategory.name.trim()) return;

    setSaving(true);
    try {
      const response = await axios.post('http://localhost:5000/api/categories', newCategory);
      const createdCategory = response.data.category;
      setCategories((current) => [...current, createdCategory]);
      setSelectedCategoryId(createdCategory._id);
      setNewCategory({ name: '', description: '' });
      setMessage(`Category "${createdCategory.name}" created.`);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Could not create category.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAssignments = async () => {
    if (!selectedCategory) return;

    setSaving(true);
    try {
      await axios.post(`http://localhost:5000/api/categories/${selectedCategory._id}/assign-medicines`, {
        medicineIds: selectedMedicineIds,
      });
      await fetchData();
      setMessage(`Medicines were assigned to ${selectedCategory.name}.`);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Unable to save assignments.');
    } finally {
      setSaving(false);
    }
  };

  const toggleMedicineSelection = (medicineId) => {
    setSelectedMedicineIds((current) =>
      current.includes(medicineId)
        ? current.filter((id) => id !== medicineId)
        : [...current, medicineId]
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Medicine Categories</h1>
          <p className="text-gray-600 mt-2">
            Group imported and manually created medicines into categories such as antibiotics, antifungals, and more.
          </p>
        </div>

        {message ? (
          <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            {message}
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
                <p className="text-sm text-gray-500">Create a category and assign medicines to it.</p>
              </div>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <input
                type="text"
                value={newCategory.name}
                onChange={(event) => setNewCategory((current) => ({ ...current, name: event.target.value }))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Antibiotics"
              />
              <textarea
                value={newCategory.description}
                onChange={(event) => setNewCategory((current) => ({ ...current, description: event.target.value }))}
                className="min-h-20 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Optional category description"
              />
              <button
                type="submit"
                disabled={saving}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                <Plus size={16} />
                {saving ? 'Creating...' : 'Create category'}
              </button>
            </form>

            <div className="space-y-2">
              {loading ? (
                <p className="text-sm text-gray-500">Loading categories...</p>
              ) : categories.length ? (
                categories.map((category) => {
                  const assignedCount = medicines.filter((medicine) => medicine.category === category.name).length;
                  const isActive = selectedCategoryId === category._id;

                  return (
                    <button
                      key={category._id}
                      type="button"
                      onClick={() => setSelectedCategoryId(category._id)}
                      className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                        isActive
                          ? 'border-blue-500 bg-blue-50 shadow-sm'
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-gray-900">{category.name}</span>
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                          {assignedCount}
                        </span>
                      </div>
                      {category.description ? (
                        <p className="mt-1 text-sm text-gray-500">{category.description}</p>
                      ) : null}
                    </button>
                  );
                })
              ) : (
                <p className="rounded-lg border border-dashed border-gray-200 px-4 py-6 text-center text-sm text-gray-500">
                  No categories yet. Create one to start grouping medicines.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            {selectedCategory ? (
              <>
                <div className="flex flex-col gap-3 border-b border-gray-200 pb-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={18} className="text-blue-600" />
                      <h2 className="text-xl font-semibold text-gray-900">{selectedCategory.name}</h2>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Select all medicines that belong in this category. Medicines already assigned to this category will be preselected.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveAssignments}
                    disabled={saving}
                    className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
                  >
                    <Save size={16} />
                    {saving ? 'Saving...' : 'Save assignments'}
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                  <Search size={16} className="text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search medicines..."
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>

                {loading ? (
                  <p className="mt-6 text-sm text-gray-500">Loading medicines...</p>
                ) : filteredMedicines.length ? (
                  <div className="mt-4 max-h-140 space-y-2 overflow-auto pr-2">
                    {filteredMedicines.map((medicine) => {
                      const isSelected = selectedMedicineIds.includes(medicine._id);
                      return (
                        <label
                          key={medicine._id}
                          className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition ${
                            isSelected ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleMedicineSelection(medicine._id)}
                            className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <div className="min-w-0">
                            <div className="font-medium text-gray-900">
                              {medicine.title || medicine.brandName?.[0] || 'Untitled medicine'}
                            </div>
                            <div className="mt-1 text-sm text-gray-500">
                              {medicine.genericName?.[0] || medicine.brandName?.[0] || 'Manual or imported medicine'}
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-6 rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-8 text-center text-sm text-gray-500">
                    No medicines match your search.
                  </div>
                )}
              </>
            ) : (
              <div className="flex min-h-80 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center text-sm text-gray-500">
                Select or create a category to start assigning medicines.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
