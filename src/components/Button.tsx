import { HTMLAttributes } from "react";

interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: string | JSX.Element | (string | JSX.Element)[];
}

export default function Button({ className, children, ...rest }: ButtonProps) {
  return (
    <div
      className={` flex items-center text-white cursor-pointer hover:opacity-85 font-semibold rounded transition duration-300 ease-in-out ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
