import { Icon } from "@iconify/react/dist/iconify.js";

import { InputHTMLAttributes, useState } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  name?: string;
  rows?: number;
  icon?: string | JSX.Element;
}

export default function Input({
  name,
  rows,
  icon,
  value,
  ...rest
}: InputProps) {
  const [focus, setFocus] = useState(false);
  return (
    <div
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      className={`w-full text-white p-2 rounded-md border-b bg-slate-700 ${
        focus || value ? " border-yellow-300" : "border-white/10 "
      } `}
    >
      {name && (
        <label
          htmlFor={name}
          className="text-left block text-sm font-medium opacity-20"
        >
          {name}
        </label>
      )}

      {rows ? (
        <div className="flex items-end">
          <Icon icon="line-md:text-box-multiple" />
          <textarea
            id={name}
            name={name}
            rows={rows}
            className="p-2 w-full rounded-sm outline-none bg-transparent"
            value={value}
            {...rest}
          ></textarea>
        </div>
      ) : (
        <div className="flex items-center">
          {icon}
          <input
            id={name}
            name={name}
            className="p-2 w-full rounded-sm outline-none bg-transparent no-spin-arrows custom-placeholder"
            value={value}
            {...rest}
          />
        </div>
      )}
    </div>
  );
}
