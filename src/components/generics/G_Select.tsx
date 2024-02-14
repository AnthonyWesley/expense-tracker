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
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <div
      className={`z-20 flex items-center justify-between bg-gray-800 ${
        format ? "w-full" : "w-36 lg:w-44"
      }`}
    >
      <div className="group relative cursor-pointer w-full">
        <div className="flex items-center justify-between px-4 w-full">
          <span className="menu-hover my-2 py-2 font-medium text-white">
            {!selectedOption ? optionList[0] : selectedOption}
          </span>
          <ChevronDown className="ml-auto" />
        </div>

        <div
          className={`text-xs invisible absolute flex flex-col bg-gray-900 text-gray-800 shadow-xl group-hover:visible ${
            format ? "left-32 top-2" : "left-0 w-full"
          }`}
        >
          {optionList?.map((option, index) => (
            <div
              key={index}
              className={`p-3 block font-semibold text-gray-100 hover:bg-gray-800 ${
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
