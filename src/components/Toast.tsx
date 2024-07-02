import { useState, useEffect } from "react";
import { create } from "zustand";
import Button from "./Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ulid } from "ulid";

export type ToastType = {
  id?: string;
  message?: string | undefined;
  type: "error" | "warning" | "success" | undefined;
};

type State = {
  alerts: ToastType[];
};

type Action = {
  showAlert: (message: string, type: ToastType["type"]) => void;
  removeAlert: (id: string) => void;
};

export const useToastStore = create<State & Action>((set) => ({
  alerts: [],
  showAlert: (message, type) => {
    const id = ulid();
    set((state) => ({
      alerts: [...state.alerts, { id, message, type }],
    }));
  },
  removeAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    })),
}));

export const Toast = () => {
  const { alerts, removeAlert } = useToastStore();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (alerts.length > 0) {
      setShowToast(true);
      const timeoutId = setTimeout(() => {
        setShowToast(false);
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [alerts]);

  useEffect(() => {
    if (alerts.length > 0) {
      const timeoutId = setTimeout(() => {
        alerts.forEach((alert) => {
          removeAlert(alert.id ?? "");
        });
      }, 4100);

      return () => clearTimeout(timeoutId);
    }
  }, [alerts]);

  return (
    <div
      className={`${
        showToast ? "-translate-x-0" : "translate-x-[500%]"
      }  fixed right-0 top-0 z-40 flex flex-col items-start justify-start transition-transform duration-300 ease-in-out`}
    >
      {alerts &&
        alerts?.map((value, key) => (
          <div
            style={{
              backgroundColor:
                value.type === "warning"
                  ? "orange"
                  : value.type === "success"
                  ? "green"
                  : "red",
            }}
            key={key}
            className="w-full min-h-16 flex justify-between items-center text-base rounded-md my-2"
          >
            <div className="flex items-center justify-center p-3 gap-3 font-bold">
              <Icon icon="line-md:alert-circle-twotone" width={30} />
              {value.message?.toUpperCase()}
            </div>

            <Button
              className=" self-start"
              onClick={() => removeAlert(value.id ?? "")}
            >
              <Icon icon="line-md:close-small" width={30} />
            </Button>
          </div>
        ))}
    </div>
  );
};
