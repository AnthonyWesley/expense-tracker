import { Icon } from "@iconify/react/dist/iconify.js";
import G_Button from "./G_Button";
import { create } from "zustand";
import { useEffect, useState } from "react";

type State = {
  confirm: {
    message: string;
    callback: () => void;
  } | null;
};

type Action = {
  handleConfirm: (alert: State["confirm"]) => void;
};

export const useConfirmStore = create<State & Action>((set) => ({
  confirm: null,
  handleConfirm: (confirmed) => set(() => ({ confirm: confirmed })),
}));

export default function Confirm() {
  const { confirm, handleConfirm } = useConfirmStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (confirm !== null) {
      setIsOpen(true);
    }
  }, [confirm]);

  const handleCancel = () => {
    setIsOpen(false);
    handleConfirm(null);
  };

  const handleConfirmAction = () => {
    if (confirm) {
      confirm.callback();
    }
    setIsOpen(false);
    handleConfirm(null);
  };

  return (
    <>
      {isOpen && (
        <section className="fixed inset-0 z-40 rounded-xl border p-4 bg-black/10 backdrop-blur-sm border-none">
          <main className="h-44 bg-gray-800 rounded-lg md:max-w-md md:mx-auto p-2 bottom-0 mb-4 relative shadow-lg">
            <header className="flex items-center justify-between gap-4 self-start">
              <Icon
                icon="line-md:alert-circle-twotone"
                color="red"
                width={30}
              />

              <G_Button
                className="text-red-500 transition hover:text-red-600 "
                onClick={handleCancel}
              >
                <Icon icon="line-md:close-small" width={30} />
              </G_Button>
            </header>
            <main className="p-4 flex items-center text-xl h-20">
              <p>{confirm?.message}</p>
            </main>
            <footer className="flex justify-end gap-2 m-2 text-sm">
              <G_Button className="bg-gray-700 p-2" onClick={handleCancel}>
                CANCELAR
              </G_Button>
              <G_Button
                onClick={handleConfirmAction}
                className="bg-blue-900 p-2"
              >
                CONFIRMAR
              </G_Button>
            </footer>
          </main>
        </section>
      )}
    </>
  );
}
