import G_Button from "./G_Button";
import { AlertCircle } from "lucide-react";

type G_AlertProps = {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  functionProp?: {
    action?: () => void;
  };
};

export default function G_Alert({
  title,
  description,
  isOpen,
  onClose,
  functionProp,
}: G_AlertProps) {
  const handleFunctionAction = () => {
    if (functionProp?.action) {
      functionProp.action();
    }
    onClose(); // Fechar o alerta após a ação ser executada
  };

  return (
    <>
      <section
        className={`fixed inset-0 z-40 rounded-xl border p-4 bg-black/10 backdrop-blur-sm border-none  ${
          isOpen ? "" : "hidden"
        }`}
      >
        <main className="bg-gray-800 text-lg rounded-lg md:max-w-md md:mx-auto p-4 bottom-0 mb-4 mx-4 relative shadow-lg">
          <header className="flex items-center gap-4">
            <span className="text-red-600">
              <AlertCircle />
            </span>

            <div className="flex-1 my-2">
              {title && <strong className="block font-medium">{title}</strong>}

              <p>{description}</p>
            </div>

            <G_Button
              className="text-red-500 transition hover:text-red-600"
              onClick={onClose}
            >
              X
            </G_Button>
          </header>
          <footer className="flex justify-end gap-2 mt-2">
            <G_Button className="bg-gray-700 p-2" onClick={onClose}>
              CANCELAR
            </G_Button>
            <G_Button
              onClick={handleFunctionAction}
              className="bg-blue-900 p-2"
            >
              CONFIRMAR
            </G_Button>
          </footer>
        </main>
      </section>
    </>
  );
}
