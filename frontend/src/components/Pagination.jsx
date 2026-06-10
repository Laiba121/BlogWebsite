const Pagination = () => {
  return (
    <div className="flex justify-center gap-2 mt-10">
      <button className="border px-3 py-2 rounded">
        ‹
      </button>

      <button className="bg-blue-800 text-white px-4 py-2 rounded">
        1
      </button>

      <button className="border px-4 py-2 rounded">
        2
      </button>

      <button className="border px-4 py-2 rounded">
        3
      </button>

      <button className="border px-4 py-2 rounded">
        ...
      </button>

      <button className="border px-4 py-2 rounded">
        42
      </button>

      <button className="border px-3 py-2 rounded">
        ›
      </button>
    </div>
  );
};

export default Pagination;