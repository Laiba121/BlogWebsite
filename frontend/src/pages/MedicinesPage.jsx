import Navbar from "../components/Navbar";
import MedicineSidebar from "../components/MedicineSidebar";
import MedicineGrid from "../components/MedicineGrid";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";

const MedicinesPage = () => {
  return (
    <>
      <Navbar />

      <div className="flex min-h-screen bg-gray-50">
        <MedicineSidebar />

        <main className="flex-1 p-8">
          <div className="mb-6">
            <p className="text-gray-400 text-sm">
              Directory / Medicines
            </p>

            <h1 className="text-4xl font-bold mt-2">
              Browse Medicines
            </h1>

            <p className="text-gray-500 mt-2">
              Showing 1-12 of 1,248 medical profiles
            </p>
          </div>

          <div className="flex justify-end gap-3 mb-6">
            <button className="border px-4 py-2 rounded">
              Grid
            </button>

            <button className="border px-4 py-2 rounded">
              List
            </button>
          </div>

          <MedicineGrid />

          <Pagination />

          <Footer />
        </main>
      </div>
    </>
  );
};

export default MedicinesPage;