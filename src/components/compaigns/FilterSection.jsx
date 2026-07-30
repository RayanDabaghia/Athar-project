import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FilterSection = ({
  title,
  options,
  selected,
  onSelect,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-white"
      >
        <span>{title}</span>

        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* Line */}
      <div className="h-[2px] bg-[#FFC107] my-3"></div>

      {/* Options */}
      {open && (
        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={`block text-left w-full ${
                selected === option
                  ? "text-yellow-400"
                  : "text-white"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSection;