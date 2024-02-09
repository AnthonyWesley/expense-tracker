import { useState, useEffect } from "react";
import G_Button from "./generics/G_Button";

export type ErrorObject = {
  errorValue?: string;
  errorDescription?: string;
  errorDate?: string;
  errorCategory?: string;
};

export const Toast = ({ text }: { text: ErrorObject | undefined }) => {
  const [showToast, setShowToast] = useState(false);
  const [position, setPosition] = useState(0);
  const [errors, setErrors] = useState<ErrorObject>({});

  useEffect(() => {
    if (text) {
      setShowToast(true);

      const timeoutId = setTimeout(() => {
        setShowToast(false);
        setPosition(0);
        setErrors({});
      }, 3000);

      setErrors(text);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [text]);

  return (
    <div>
      {showToast && (
        <div
          style={{ top: `${position}px` }}
          className="fixed z-50 right-0 m-4 p-4 bg-red-800 text-white rounded-md"
        >
          <div className="flex justify-between items-start text-lg">
            <div className="p-2">
              {Object.entries(errors).map(([key, value]) => (
                <p key={key}>{value}</p>
              ))}
            </div>

            <G_Button className="text-sm" onClick={() => setShowToast(false)}>
              X
            </G_Button>
          </div>
        </div>
      )}
    </div>
  );
};
