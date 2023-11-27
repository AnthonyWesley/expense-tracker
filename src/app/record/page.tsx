"use client";
import GenericButton from "@/components/GenericButton";
import { TransactionList } from "@/components/TransactionList";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Record() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2 my-16 justify-between items-center">
      <div className="p-2 w-full bg-white rounded-lg">
        <TransactionList />
      </div>
      <div onClick={() => router.back()}>
        <GenericButton tailwind="bg-white">
          <MoveLeft size={21} color="navy" />
        </GenericButton>
      </div>
    </div>
  );
}
