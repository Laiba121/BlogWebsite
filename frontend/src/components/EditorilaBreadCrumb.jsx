import { Link } from "react-router-dom";

/**
 * Breadcrumb component
 * @param {{ items: { label: string; to?: string }[] }} props
 */
export default function EditorialBreadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6" aria-label="Breadcrumb">
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-1.5">
          {idx > 0 && <span>/</span>}
          {item.to ? (
            <Link to={item.to} className="hover:text-blue-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-600 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
