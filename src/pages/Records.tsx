import { TransactionList } from "../components/home/TransactionList";

export default function Records() {
  return (
    <div className="flex flex-col gap-2 mt-16 items-center ">
      <TransactionList className="h-5/6" />
      {/* <Expenses /> */}
    </div>
  );
}
