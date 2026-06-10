import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const AccordionSection = ({ title, content }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-lg bg-white mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between p-4"
      >
        <span>{title}</span>
        <FaChevronDown />
      </button>

      {open && (
        <div className="px-4 pb-4 text-gray-600">
          {content}
        </div>
      )}
    </div>
  );
};

export default AccordionSection;