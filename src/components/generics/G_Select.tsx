import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface GSelectProps {
  onSelect: (option: string) => void;
  optionList: string[];
}

export default function G_Select({ onSelect, optionList }: GSelectProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <div className="flex items-center justify-center bg-gray-900">
      <div className="group relative cursor-pointer">
        <div className="flex items-center justify-between space-x-5 bg-gray-800 px-4">
          <span className="menu-hover w-14 lg:w-20 my-2 py-2 text-base font-medium text-white ">
            {!selectedOption ? optionList[0] : selectedOption}
          </span>
          <ChevronDown />
        </div>

        <div className="invisible absolute flex w-full flex-col bg-gray-900 py-1  text-gray-800 shadow-xl group-hover:visible">
          {optionList.map((option, index) => (
            <div
              key={index}
              className={`p-4 block font-semibold text-gray-100 hover:bg-gray-800 ${
                selectedOption === option ? "bg-gray-900" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
