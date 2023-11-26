"use client";

import { useAppContext } from "@/context";
import { FormattedCurrency } from "@/helpers/others";
import { Eye, EyeOff, Wallet2 } from "lucide-react";
import { useState } from "react";

export default function WalletArea() {
  const { walletBalance } = useAppContext();
  const [visibility, setVisibility] = useState(false);

  return (
    <section className="w-full text-white rounded-lg p-2 flex flex-col justify-center items-center">
      <div className="text-3xl font-bold flex items-center gap-3  rounded-md p-10 text-[mediumSpringGreen]">
        {!visibility && <EyeOff onClick={() => setVisibility(true)} />}
        {!visibility && (
          <span className="w-48 border-b-2 border-[mediumSpringGreen]" />
        )}
        {visibility && <Eye onClick={() => setVisibility(false)} />}
        {visibility && FormattedCurrency(walletBalance)} <Wallet2 />
      </div>
    </section>
  );
}
