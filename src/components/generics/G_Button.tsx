import { HTMLAttributes } from "react";

interface G_ButtonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: string | JSX.Element | JSX.Element[];
}

export default function G_Button({
  className,
  children,
  ...rest
}: G_ButtonProps) {
  return (
    <div
      className={` flex items-center text-white cursor-pointer hover:opacity-85 font-semibold rounded transition duration-300 ease-in-out ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
