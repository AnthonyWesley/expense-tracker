"use client";
import FinancialSummary from "@/components/FinancialSummary";
import HeaderInfo from "@/components/HeaderInfo";
import { TransactionList } from "@/components/TransactionList";

import WalletArea from "@/components/WalletArea";
import React from "react";

export default function Home() {
  return (
    <div className="container  mx-auto rounded-lg m-2">
      <main className="flex flex-col gap-2 m-2">
        <HeaderInfo />
        <WalletArea />
        <FinancialSummary />
        {/* <Expenses /> */}
        <TransactionList />
      </main>

      <footer className="w-full  bg-white rounded-lg"></footer>
    </div>
  );
}
