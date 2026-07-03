import { useState, useEffect } from 'react';
import { Download, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import api from '../../api';

export default function DrugImport({ onImportComplete }) {
  const [loadingFirstPage, setLoadingFirstPage] = useState(false);
  const [loadingPages, setLoadingPages] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadingOpenFda, setLoadingOpenFda] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [unmatched, setUnmatched] = useState([]);
  const [status, setStatus] = useState(null);
  const [pageRange, setPageRange] = useState({ start: 1, end: 5 });
  const isBusy = loadingFirstPage || loadingPages || loadingDetails || loadingOpenFda;

  const fetchStatus = async () => {
    try {
      const res = await api.get('/api/drugs/status');
      setStatus(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleImportFirstPage = async () => {
    setLoadingFirstPage(true);
    setError('');
    setMessage('');
    try {
      const res = await api.post('/api/drugs/import-first-page');
      setMessage(res.data.message);
      await fetchStatus();
      if (onImportComplete) onImportComplete();
    } catch (err) {
      const message = err.response?.data?.error || err.response?.data?.message || err.message || 'Import failed';
      console.error(err.response?.data || err);
      setError(message);
    } finally {
      setLoadingFirstPage(false);
    }
  };

  const handleImportAll = async () => {
    if (pageRange.start > pageRange.end) {
      setError('Start page must be less than end page');
      return;
    }

    setLoadingPages(true);
    setError('');
    setMessage('');
    try {
      const res = await api.post('/api/drugs/import-all', {
        startPage: Number(pageRange.start),
        endPage: Number(pageRange.end)
      });
      setMessage(
        `Imported: ${res.data.totalImported}, Skipped: ${res.data.totalSkipped}`
      );
      await fetchStatus();
      if (onImportComplete) onImportComplete();
    } catch (err) {
      const message = err.response?.data?.error || err.response?.data?.message || err.message || 'Import failed';
      console.error(err.response?.data || err);
      setError(message);
    } finally {
      setLoadingPages(false);
    }
  };

  const handleImportDetails = async () => {
    setLoadingDetails(true);
    setError('');
    setMessage('');
    try {
      const res = await api.post('/api/drugs/import-all-details', { limit: 100 });
      setMessage(
        `Processed: ${res.data.processed}, Failed: ${res.data.failed}`
      );
      await fetchStatus();
      if (onImportComplete) onImportComplete();
    } catch (err) {
      const message = err.response?.data?.error || err.response?.data?.message || err.message || 'Import failed';
      console.error(err.response?.data || err);
      setError(message);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleImportOpenFda = async () => {
    setLoadingOpenFda(true);
    setError('');
    setMessage('');
    setUnmatched([]);
    try {
      const res = await api.post('/api/drugs/import-openfda-label', { limit: 100 });
      setMessage(
        `Updated: ${res.data.updatedCount}, Not found: ${res.data.notFoundCount}`
      );
      setUnmatched(res.data.notFound || []);
      await fetchStatus();
      if (onImportComplete) onImportComplete();
    } catch (err) {
      const message = err.response?.data?.error || err.response?.data?.message || err.message || 'Import failed';
      console.error(err.response?.data || err);
      setError(message);
    } finally {
      setLoadingOpenFda(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Card */}
      {status && (
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Import Status</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-gray-600 text-sm">Total Drugs</p>
              <p className="text-3xl font-bold text-primary-500">
                {status.totalDrugs.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">With Full Details</p>
              <p className="text-3xl font-bold text-green-600">
                {status.withFullDetails.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Import Progress</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${status.importedPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-700 mt-1">
                {status.importedPercentage}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Import Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Download size={20} />
          Import Drugs from DailyMed
        </h3>

        <div className="space-y-6">
          {/* Option 1: First Page */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">
                  Import First 100 Drugs
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Quick start - imports the latest 100 drugs from DailyMed
                </p>
              </div>
              <button
                onClick={handleImportFirstPage}
                disabled={isBusy}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 flex items-center gap-2"
              >
                {loadingFirstPage ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    Start Import
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Option 2: Multiple Pages */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">
                  Import Multiple Pages
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Import a range of pages (100 drugs per page)
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <input
                    type="number"
                    min="1"
                    value={pageRange.start}
                    onChange={(e) =>
                      setPageRange({ ...pageRange, start: e.target.value })
                    }
                    className="w-20 px-3 py-2 border border-gray-300 rounded text-sm"
                    placeholder="Start"
                  />
                  <span className="text-gray-600">to</span>
                  <input
                    type="number"
                    min="1"
                    value={pageRange.end}
                    onChange={(e) =>
                      setPageRange({ ...pageRange, end: e.target.value })
                    }
                    className="w-20 px-3 py-2 border border-gray-300 rounded text-sm"
                    placeholder="End"
                  />
                  <span className="text-sm text-gray-600">
                    ({(pageRange.end - pageRange.start + 1) * 100} drugs)
                  </span>
                </div>
              </div>
              <button
                onClick={handleImportAll}
                disabled={isBusy}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 flex items-center gap-2"
              >
                {loadingPages ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    Import Pages
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Option 3: Full Details */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">
                  Import Full Details
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Fetch detailed information (ingredients, warnings, dosage) for
                  up to 100 drugs
                </p>
              </div>
              <button
                onClick={handleImportDetails}
                disabled={isBusy}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
              >
                {loadingDetails ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Fetching...
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    Fetch Details
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Option 4: OpenFDA Metadata */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">
                  Import OpenFDA Metadata
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Fetch OpenFDA label metadata and merge it into existing DailyMed drugs
                </p>
              </div>
              <button
                onClick={handleImportOpenFda}
                disabled={isBusy}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
              >
                {loadingOpenFda ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Fetching...
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    Fetch OpenFDA
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {message && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
            <CheckCircle size={18} className="text-green-600 shrink-0 mt-0.5" />
            <p className="text-sm text-green-700">{message}</p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {unmatched.length > 0 && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm font-semibold text-yellow-800 mb-2">Unmatched OpenFDA records</p>
            <p className="text-sm text-yellow-700 mb-3">
              These OpenFDA records did not match any DailyMed drug by <code>spl_set_id</code>.
            </p>
            <div className="max-h-40 overflow-y-auto border border-yellow-200 rounded bg-white p-3 text-xs text-yellow-900">
              {unmatched.map((item, index) => (
                <div key={`${item.setId || index}-${index}`} className="mb-2">
                  {item.setId ? (
                    <span>setId: <strong>{item.setId}</strong></span>
                  ) : (
                    <span><strong>No setId</strong></span>
                  )}
                  {item.reason && <span className="text-yellow-700"> — {item.reason}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Refresh Status Button */}
        <button
          onClick={fetchStatus}
          className="mt-4 text-primary-500 hover:text-primary-700 text-sm font-medium"
        >
          Refresh Status
        </button>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">ℹ️ How it works</h4>
        <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
          <li>Start with "Import First 100 Drugs" to test the connection</li>
          <li>Use "Import Multiple Pages" for bulk imports</li>
          <li>Once drugs are imported, use "Import Full Details" to get complete DailyMed details</li>
          <li>Use "Import OpenFDA Metadata" to merge OpenFDA label fields into DailyMed drugs</li>
          <li>Check status anytime to monitor progress</li>
        </ol>
      </div>
    </div>
  );
}
