"use client";

import { useAppContext } from "@/context";
import { FormattedCurrency } from "@/helpers/dateFilter";
import { Wallet2 } from "lucide-react";

export default function WalletArea() {
  const { walletBalance } = useAppContext();
  return (
    <section className=" text-white rounded-lg p-2 flex flex-col items-center justify-center">
      <div className="text-2xl font-bold flex items-center gap-2">
        {FormattedCurrency(walletBalance)} <Wallet2 />
      </div>
    </section>
  );
}
