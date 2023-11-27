"use client";

import { useAppContext } from "@/context";
import { formattedCurrency } from "@/helpers/others";
import { Eye, EyeOff, Wallet2 } from "lucide-react";
import { useState } from "react";

export default function WalletArea() {
  const { walletBalance } = useAppContext();
  const [visibility, setVisibility] = useState(false);

  return (
    <section className="lg:w-1/3 h-24 m-auto text-white rounded-lg flex flex-col justify-center items-center">
      <div className="text-3xl font-bold flex items-center gap-3  rounded-md text-[mediumSpringGreen]">
        {!visibility && <EyeOff onClick={() => setVisibility(true)} />}
        {!visibility && (
          <span className="w-36 border-b-2 border-[mediumSpringGreen]" />
        )}
        {visibility && <Eye onClick={() => setVisibility(false)} />}
        {visibility && formattedCurrency(walletBalance)} <Wallet2 />
      </div>
    </section>
  );
}
