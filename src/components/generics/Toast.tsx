import { useState, useEffect } from "react";
import { create } from "zustand";
import G_Button from "./G_Button";
import { Icon } from "@iconify/react/dist/iconify.js";

export type ToastType = {
  message?: string | undefined;
  type?: "error" | "warning" | "success" | undefined;
  // time?: number;
};

type State = {
  alerts: ToastType[];
};

type Action = {
  addAlert: (alert: State["alerts"]) => void;
};

export const useToastStore = create<State & Action>((set) => ({
  alerts: [],
  addAlert: (alert) => set(() => ({ alerts: alert })),
}));

export const Toast = () => {
  const { alerts, addAlert } = useToastStore();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (alerts.length > 0) {
      setShowToast(true);
      const timeoutId = setTimeout(() => {
        addAlert(alerts);
        setShowToast(false);
      }, 4000);

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

            <G_Button
              className=" self-start"
              onClick={() => addAlert(alerts.filter((item) => item != value))}
            >
              <Icon icon="line-md:close-small" width={30} />
            </G_Button>
          </div>
        ))}
    </div>
  );
};
