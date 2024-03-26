import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useEffect } from "react";

interface GSelectProps {
  onSelect: (option: string) => void;
  optionList: string[];
  value?: string | boolean | undefined;
  subtitle?: string;
  type?: "Colors";
  className?: string;
}

export default function G_Select({
  onSelect,
  optionList,
  value,
  subtitle,
  type,
  className,
}: GSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    type !== "Colors" ? optionList[0] : null
  );

  useEffect(() => {
    if (type === "Colors") setSelectedOption(value as string);
  }, [value]);

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
          {type === "Colors" && <span className="p-3 rounded-sm">COR</span>}
          {type !== "Colors" && (
            <span className="p-2 mx-2 text-left menu-hover font-medium text-white w-full">
              {optionList[0] ? (
                selectedOption
              ) : (
                <p className="text-red-600 text-base italic font-semibold">
                  "Cadastre uma categoria!"
                </p>
              )}
            </span>
          )}

          <Icon
            icon="pepicons-print:triangle-down"
            className="mr-2"
            width={30}
          />
        </div>

        {isOpen && (
          <div
            className={`${
              type === "Colors"
                ? "w-[380px] h-[380px] grid grid-cols-5 p-1 gap-1 overflow-hidden rounded-md"
                : "w-full max-h-[150px]"
            } rounded-md overflow-auto text-xs absolute top-full mt-1 bg-gray-900 text-gray-800 shadow-xl`}
          >
            {optionList?.map((option, index) => (
              <div
                key={index}
                className={`p-4 border border-gray-950/40 block font-semibold text-gray-100 hover:bg-gray-600 ${
                  selectedOption === option ? "bg-gray-600" : ""
                }`}
                style={{
                  backgroundColor: type === "Colors" ? option : "",
                }}
                onClick={() => handleOptionClick(option)}
              >
                {type != "Colors" && option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
