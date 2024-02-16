import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface GSelectProps {
  onSelect: (option: string) => void;
  optionList: string[];
  format?: boolean;
}

export default function G_Select({
  onSelect,
  optionList,
  format,
}: GSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

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
      className={`z-20 flex items-center justify-between bg-gray-800 border rounded-md ${
        selectedOption ? "border-white" : "border-white/10 "
      } ${format ? "w-full" : "w-36 lg:w-44"}`}
    >
      <div className="relative w-full">
        <div
          className="flex items-center justify-between w-full cursor-pointer"
          onClick={toggleDropdown}
        >
          <span className="p-6 menu-hover font-medium text-white">
            {selectedOption
              ? selectedOption
              : format
              ? "CATEGORIA"
              : optionList[0]}
          </span>

          <ChevronDown className="mr-4" />
        </div>

        {isOpen && (
          <div className="w-full h-[230px] rounded-md overflow-auto text-xs absolute top-full mt-1 bg-gray-700 text-gray-800 shadow-xl">
            {optionList?.map((option, index) => (
              <div
                key={index}
                className={`p-6 border border-gray-900/20 block font-semibold text-gray-100 hover:bg-gray-600 ${
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
