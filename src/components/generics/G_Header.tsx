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
  change,
  setChange,
}) => {
  return (
    <header className="flex flex-col justify-between bg-gray-900 rounded-sm p-4">
      {title && (
        <div className="flex justify-center items-center">
          <span className="px-2"> </span>
          <h1 className="text-lg">{title}</h1>
        </div>
      )}

      <div className="flex justify-center gap-3 py-2 text-xl">
        <label
          className="w-full cursor-pointer"
          onClick={() => setChange(true)}
        >
          <input type="radio" className="sr-only" name="pricing" />
          <div
            className={`max-w-xl rounded-md p-5 ${
              change
                ? "border border-blue-600 bg-gray-800 text-gray-50"
                : "text-gray-700 "
            }`}
          >
            <div className="flex flex-col gap-1">{subtitleOne}</div>
          </div>
        </label>

        <span className="border border-gray-500"></span>

        <label
          className="cursor-pointer w-full"
          onClick={() => setChange(false)}
        >
          <input type="radio" className="sr-only" name="pricing" />
          <div
            className={`max-w-xl rounded-md  p-5 ${
              !change
                ? "border border-blue-600 bg-gray-800 text-gray-50"
                : "text-gray-700"
            }`}
          >
            <div className="flex flex-col gap-1">{subtitleTwo}</div>
          </div>
        </label>
      </div>
    </header>
  );
};

export default G_Header;
