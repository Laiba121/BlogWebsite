/**
 * PhaseCard – displays a single editorial phase block
 *
 * Props:
 *   phase        {string}     e.g. "PHASE 01"
 *   title        {string}
 *   description  {string}
 *   icon         {ReactNode}  SVG icon element
 *   accentColor  {string}     Tailwind bg color class, e.g. "bg-blue-100"
 *   iconColor    {string}     Tailwind text color class, e.g. "text-blue-600"
 *   tags         {string[]}   optional tag pills
 *   checks       {string[]}   optional checkmark list items
 *   reviewer     {{ name: string; role: string } | null}
 *   badge        {string | null}  optional bottom badge text
 */
export default function PhaseCard({
  phase,
  title,
  description,
  icon,
  accentColor = "bg-blue-100",
  iconColor = "text-blue-600",
  tags = [],
  checks = [],
  reviewer = null,
  badge = null,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex gap-5 hover:shadow-md transition-shadow">
      {/* Icon */}
      <div className={`flex-shrink-0 w-11 h-11 rounded-lg ${accentColor} flex items-center justify-center ${iconColor}`}>
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">{phase}</p>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">{description}</p>

        {/* Tag pills */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Checklist items */}
        {checks.length > 0 && (
          <ul className="space-y-1.5 mb-3">
            {checks.map((check) => (
              <li key={check} className="flex items-start gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {check}
              </li>
            ))}
          </ul>
        )}

        {/* Reviewer card */}
        {reviewer && (
          <div className="flex items-center gap-3 mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {reviewer.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{reviewer.name}</p>
              <p className="text-xs text-gray-500">{reviewer.role}</p>
            </div>
          </div>
        )}

        {/* Badge */}
        {badge && (
          <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
            {badge}
          </div>
        )}
      </div>
    </div>
  );
}
