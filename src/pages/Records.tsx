import { TransactionList } from "../components/TransactionList";

export default function Records() {
  return (
    <div className="flex flex-col gap-2 mt-20 items-center ">
      <TransactionList className="h-5/6" />
      {/* <Expenses /> */}
    </div>
  );
}
