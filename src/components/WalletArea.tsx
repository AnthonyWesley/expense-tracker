import { useState } from "react";
import { useAppManager } from "../context/AppManagerContext";
import { formattedCurrency } from "../helpers/others";
import Chip from "./Chip";
import Logo from "./Logo";
import { EyeOff, Eye } from "lucide-react";
import { useApiContext } from "../context/ApiContext";

export default function WalletArea() {
  const { walletBalance } = useAppManager();
  const { dataUser } = useApiContext();
  const [visibility, setVisibility] = useState(false);

  return (
    <section className="w-full p-4 bg-appSecondaryColor/70 text-gray-50 rounded-lg flex flex-col col-span-1 gap-2 justify-between items-center text-sm lg:text-xl shadow-[0px_0px_0px_1px_rgba(0,0,0,0.10)]">
      <Logo />

      <div className="self-start ml-4">
        <Chip />
      </div>

      <footer className="w-1/2 h-2 self-start ml-4 font-semibold">
        <h1 className="text-sm text-gray-600">Saldo em conta</h1>
        <div className="font-bold flex items-center gap-2 rounded-md text-blue-800">
          {!visibility && (
            <EyeOff size={30} onClick={() => setVisibility(true)} />
          )}

          {visibility && <Eye size={30} onClick={() => setVisibility(false)} />}
          {visibility && formattedCurrency(walletBalance)}
        </div>
      </footer>

      <div className="self-end mr-4 font-semibold">
        <h1 className="text-sm text-gray-600">Nome</h1>
        <h1>{dataUser?.name}</h1>
      </div>
    </section>
  );
}
