import React from "react";

interface G_HeaderProps {
  title?: string;
  subtitleOne: string;
  subtitleTwo: string;
  change: boolean;
  setChange: (value: boolean) => void;
}

const G_Header: React.FC<G_HeaderProps> = ({
  title,
  subtitleOne,
  subtitleTwo,
  // change
  setChange,
}) => {
  return (
    <header className="flex flex-col justify-between bg-gray-900  rounded-sm">
      {title && (
        <div className="flex justify-center items-center">
          <span className="px-2"> </span>
          <h1 className="text-lg">{title}</h1>
        </div>
      )}

      <div className="flex justify-center gap-3 py-2 px-4">
        <label
          className="w-full cursor-pointer"
          onClick={() => setChange(true)}
        >
          <input type="radio" className="peer sr-only" name="pricing" />
          <div className="max-w-xl rounded-md bg-transparent p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-green-600 peer-checked:ring-green-400">
            <div className="flex flex-col gap-1">{subtitleOne}</div>
          </div>
        </label>

        <span className="border border-gray-500"></span>

        <label
          className="cursor-pointer w-full"
          onClick={() => setChange(false)}
        >
          <input type="radio" className="peer sr-only" name="pricing" />
          <div className="max-w-xl rounded-md bg-transparent p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-red-600 peer-checked:ring-red-400">
            <div className="flex flex-col gap-1">{subtitleTwo}</div>
          </div>
        </label>
      </div>
    </header>
  );
};

export default G_Header;
