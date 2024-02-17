import { Text } from "lucide-react";
import { InputHTMLAttributes, useState } from "react";

interface G_InputAreaProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  name: string;
  rows?: number;
  icon?: string | JSX.Element;
}

export default function G_InputArea({
  name,
  rows,
  icon,
  value,
  ...rest
}: G_InputAreaProps) {
  const [focus, setFocus] = useState(false);
  return (
    <div
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      className={`w-full text-white p-2 rounded-md border  ${
        focus || value ? "border-white" : "border-white/10 "
      } `}
    >
      <label htmlFor={name} className="block text-sm font-medium opacity-50">
        {name}
      </label>

      {rows ? (
        <div className="flex items-end">
          <Text />
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
            className="p-2 w-full rounded-sm outline-none bg-transparent no-spin-arrows"
            value={value}
            {...rest}
          />
        </div>
      )}
    </div>
  );
}
