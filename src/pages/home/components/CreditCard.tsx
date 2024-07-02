import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useApiContext } from "../../../context/ApiContext";
import { useAppManager } from "../../../context/AppManager";
import { toCurrency } from "../../../helpers/others";
import { AccountType } from "../../../type/AccountType";
import chip from "../../../assets/images/chip.png";

export default function AccountCard({
  account,
  index,
}: {
  account: AccountType[];
  index: number;
}) {
  const { walletBalance } = useAppManager();
  const { dataUser } = useApiContext();
  const [visibility, setVisibility] = useState(false);

  return (
    <section className="w-full flex flex-col h-full overflow-auto">
      <div className="h-1/3 flex justify-end ml-4 font-semibold">
        <div className="">
          <p className="text-[12px] text-gray-400 opacity-25 h-4 text-right">
            CONTA
          </p>
          <h1 className="text-2xl text-gray-400">
            {account[index as number]?.name}
          </h1>
        </div>
        {/* <G_Logo mini={true} className="self-start" /> */}
      </div>

      <div className="flex justify-between items-center h-1/3 px-2">
        <div className="w-12 lg:w-14">
          <img src={chip} alt="Logo" />
        </div>
      </div>
      <div className="h-1/3 flex justify-between items-end font-semibold">
        <div className="">
          <p className="text-[12px] text-gray-400 opacity-25 h-5">NOME</p>
          <h1 className="text-md text-gray-400">{dataUser?.name}</h1>
        </div>

        <div className="font-bold flex items-center gap-2 rounded-md text-yellow-500">
          {visibility && toCurrency(walletBalance)}
          {!visibility && (
            <Icon
              icon="bi:eye-fill"
              width={30}
              onClick={() => setVisibility(true)}
            />
          )}

          {visibility && (
            <Icon
              icon="bi:eye-slash-fill"
              width={30}
              onClick={() => setVisibility(false)}
            />
          )}
        </div>
      </div>
    </section>
  );
}
