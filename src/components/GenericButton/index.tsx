import React from "react";

export default function GenericButton({
  children,
  tailwind,
}: {
  children: JSX.Element | string;
  tailwind?: string;
}) {
  return (
    <div
      className={`cursor-pointer hover:opacity-95 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out ${tailwind}`}
    >
      {children}
    </div>
  );
}
