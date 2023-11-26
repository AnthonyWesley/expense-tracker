"use client";
import React, { useState, useEffect } from "react";

export const Toast = ({
  children,
  activate,
}: {
  children: JSX.Element[];
  activate: boolean;
}) => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (activate) {
      // setShowToast(true);
    }
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [activate, showToast, setShowToast]);

  return (
    <div
      className={`fixed top-0  m-4 p-4 font-medium text-white ${
        activate ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300 ease-in-out`}
      style={{ zIndex: 9999 }}
    >
      {children}
    </div>
  );
};

export default Toast;
