const Sidebar = () => {
  return (
    <aside className="w-72 bg-white border-r p-5">
      <h2 className="font-semibold mb-3">
        Search Directory
      </h2>

      <input
        type="text"
        placeholder="Search medicines..."
        className="w-full border rounded-md p-2 mb-6"
      />

      <div>
        <div className="flex justify-between mb-3">
          <h3 className="font-semibold">
            Browse A-Z
          </h3>

          <button className="text-blue-700">
            Clear
          </button>
        </div>

        <div className="grid grid-cols-6 gap-2">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            .split("")
            .slice(0, 9)
            .map((letter) => (
              <button
                key={letter}
                className="border rounded h-8 text-sm"
              >
                {letter}
              </button>
            ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold mb-3">
          Categories
        </h3>

        {[
          "Analgesics",
          "Antipyretics",
          "Antibiotics",
          "Antidepressants",
          "Cardiovascular",
        ].map((item) => (
          <label
            key={item}
            className="flex gap-2 mb-2"
          >
            <input type="checkbox" />
            {item}
          </label>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="font-semibold mb-3">
          Sort Options
        </h3>

        <select className="w-full border rounded-md p-2">
          <option>Name: A to Z</option>
          <option>Name: Z to A</option>
        </select>
      </div>
    </aside>
  );
};

export default Sidebar;