"use client";
import Expenses from "@/components/Expenses";
import FinancialSummary from "@/components/FinancialSummary";

import { TransactionList } from "@/components/TransactionList";

import WalletArea from "@/components/WalletArea";
import React from "react";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col gap-2 my-16 mx-2">
        <WalletArea />

        <FinancialSummary />
        <div className="flex flex-col lg:flex-row gap-2 lg:h-[300px] ">
          <Expenses />
          <TransactionList />
        </div>
      </main>
    </div>
  );
}
