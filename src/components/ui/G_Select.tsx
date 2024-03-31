import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

interface GSelectProps {
  onSelect: (option: string) => void;
  optionList: string[];
  value?: string | boolean | undefined;
  subtitle?: string;
  className?: string;
}

export default function G_Select({
  onSelect,
  optionList,
  subtitle,
  // value,
  className,
}: GSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    subtitle ? "" : optionList[0]
  );

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`z-20 flex items-center bg-gray-800 border rounded-md ${
        selectedOption ? "border-blue-600" : "border-white/10"
      } ${className}`}
    >
      <div className="relative w-full">
        {subtitle && (
          <label className="block text-left text-sm font-medium p-2 opacity-20">
            {subtitle}
          </label>
        )}

        <div
          className="flex items-center justify-center w-full cursor-pointer"
          onClick={toggleDropdown}
          style={{ backgroundColor: selectedOption ? selectedOption : "" }}
        >
          <span className="p-2 mx-2 text-left menu-hover font-medium text-white w-full">
            {selectedOption}
          </span>

          <Icon
            icon="pepicons-print:triangle-down"
            className="mr-2"
            width={30}
          />
        </div>

        {isOpen && (
          <div
            className={`w-full max-h-[150px]
             rounded-md overflow-auto text-xs absolute top-full mt-1 bg-gray-900 text-gray-800 shadow-xl`}
          >
            {optionList?.map((option, index) => (
              <div
                key={index}
                className={`p-4 border border-gray-950/40 block font-semibold text-gray-100 hover:bg-gray-600 ${
                  selectedOption === option ? "bg-gray-600" : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
