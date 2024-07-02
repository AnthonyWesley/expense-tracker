import { useEffect, useState } from "react";

interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  dropdownSelect: (option: string) => void;
  dropdownList: string[];

  subtitle?: string;
  className?: string;
}

export default function Select({
  dropdownSelect,
  dropdownList,
  subtitle,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    dropdownSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    setSelectedOption(dropdownList[0]);
    dropdownSelect(dropdownList[0]);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`z-20 flex items-center border rounded-md ${
        selectedOption ? "border-yellow-300" : "border-white/10"
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
        >
          <span className="p-2 mx-2 text-left menu-hover font-medium text-white w-full">
            {selectedOption}
          </span>
          <svg
            className={` ${isOpen ? "rotate-180" : "rotate-90 "} mr-4 `}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z"
            />
          </svg>
        </div>

        {isOpen && (
          <div
            className={`absolute w-full max-h-[150px] shadow-lg top-full left-0 h-max p-1 bg-zinc-900 border border-zinc-200 rounded-sm flex items-start flex-col gap-2`}
          >
            {dropdownList?.map((option, index) => (
              <div
                key={index}
                className={`flex flex-col items-start hover:bg-zinc-800 p-2 rounded-sm w-full ${
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
