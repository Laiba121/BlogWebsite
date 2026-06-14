const stats = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    value: "450+ Reviewers",
    label: "Global medical network",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    value: "24/7 Updates",
    label: "Real-time clinical monitoring",
  },
];

export default function CommitmentStats() {
  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-900 rounded-2xl overflow-hidden">
      {/* Left – text block */}
      <div className="p-8 flex flex-col justify-between">
        <div>
          <h3 className="text-white font-bold text-lg mb-2">Our Commitment to Accuracy</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            We believe that medical information should be accessible, current, and above all, correct. Our editorial policy is a living document that evolves alongside pharmacological science.
          </p>
        </div>
        <button className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors w-fit">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Download Policy PDF
        </button>
      </div>

      {/* Right – stats */}
      <div className="bg-gray-800 p-8 flex flex-col justify-center gap-6">
        {stats.map((stat) => (
          <div key={stat.value} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-900/60 text-blue-400 flex items-center justify-center flex-shrink-0">
              {stat.icon}
            </div>
            <div>
              <p className="text-white font-bold text-sm">{stat.value}</p>
              <p className="text-gray-400 text-xs">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
