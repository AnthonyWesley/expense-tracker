import { useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { create } from "zustand";

export type ModalType = {
  closeModal: () => void;
  openModal: () => void;
};

type State = {
  isOpen: boolean;
};

type Action = {
  openModal: () => void;
  closeModal: () => void;
};

export const useModalStore = create<State & Action>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: string | JSX.Element;
  className?: string;
  children?: JSX.Element[] | JSX.Element;
}
export default function Modal({
  icon,
  className,

  children,
}: ModalProps) {
  const overlay = useRef(null);
  const { closeModal, isOpen, openModal } = useModalStore();

  const clickCloseRef: React.MouseEventHandler<HTMLElement> = (event) => {
    if (event.target === overlay.current) closeModal();
  };

  return (
    <>
      <div
        className="flex p-2 justify-center text-white font-semibold rounded transition duration-300 ease-in-out"
        onClick={openModal}
      >
        <div
          className={`flex items-center text-white cursor-pointer hover:opacity-85 font-semibold rounded transition duration-300 ease-in-out `}
        >
          {icon}
        </div>
      </div>
      <section
        ref={overlay}
        onClick={clickCloseRef}
        className={`fixed inset-0 z-40 backdrop-blur-sm border-none text-sm ${
          isOpen ? "flex" : "hidden"
        } justify-center items-center`}
      >
        <div
          className={`${className} bg-gray-900/95 pb-4 px-1 flex flex-col items-center justify-center border border-white/90 rounded-lg shadow-2xl w-full max-w-lg`}
        >
          <Icon
            onClick={closeModal}
            className="self-end z-40 cursor-pointer hover:text-red-600 transition-all"
            icon="line-md:close-small"
            width={30}
          />
          {children}
        </div>
      </section>
    </>
  );
}
