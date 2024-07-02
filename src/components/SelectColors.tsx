import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useRef, useEffect } from "react";
import { tableColors } from "../data/tableColors";
import { CategoryApiType } from "../type/CategoryType";

interface SelectColorProps {
  onSelect: (option: string) => void;
  categories: CategoryApiType[];
  value?: string | boolean | undefined;
}

export default function SelectColors({
  onSelect,
  categories,
  value,
}: SelectColorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const overlay = useRef<HTMLDivElement>(null);

  const colorsUsed = categories.map((category) => category.color);
  const removeColorUsed = tableColors.filter(
    (color) => !colorsUsed.includes(color)
  );

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setSelectedOption(value as string);
  }, [value]);

  useEffect(() => {
    const clickCloseRef: EventListenerOrEventListenerObject = (event) => {
      if (overlay.current && !overlay.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", clickCloseRef);
    return () => {
      document.removeEventListener("mousedown", clickCloseRef);
    };
  }, []);

  return (
    <div
      ref={overlay}
      //   onClick={clickCloseRef}
      className={`z-20 flex items-center bg-gray-800 border rounded-md  ${
        selectedOption ? "border-blue-600" : "border-white/10"
      } `}
    >
      <div className="relative w-full">
        <div
          className="flex items-center justify-center w-full rounded-sm cursor-pointer"
          onClick={toggleDropdown}
          style={{ backgroundColor: selectedOption ? selectedOption : "" }}
        >
          <span className="p-3 rounded-sm overflow-hidden">COR</span>

          <Icon
            icon="pepicons-print:triangle-down"
            className="mr-2"
            width={30}
          />
        </div>

        {isOpen && (
          <div
            className={`h-[365px] min-w-[365px] grid grid-cols-5 p-1 gap-[2px] 
            rounded-sm text-xs absolute overflow-y-scroll mt-1 bg-gray-900
            text-gray-800 shadow-xl border-2 border-blue-600`}
          >
            {removeColorUsed?.map((color, index) => (
              <div
                key={index}
                className={`cursor-pointer w-[65px] h-[65px] flex justify-center items-center
           `}
                style={{
                  backgroundColor: color,
                }}
                onClick={() => handleOptionClick(color)}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
