"use client";
import Expenses from "@/components/Expenses";
import FinancialSummary from "@/components/FinancialSummary";
import HeaderInfo from "@/components/HeaderInfo";
import { TransactionList } from "@/components/TransactionList";

import WalletArea from "@/components/WalletArea";
import React from "react";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col gap-2 mb-16">
        <WalletArea />
        <FinancialSummary />
        <div className="flex flex-col sm:flex-row gap-2 md:h-64 ">
          <Expenses />
          <TransactionList />
        </div>
      </main>

      <footer className="w-full  bg-white rounded-lg"></footer>
    </div>
  );
}
