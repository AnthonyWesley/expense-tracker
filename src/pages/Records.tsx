import { TransactionList } from "../components/TransactionList";

export default function Records() {
  return (
    <div className="flex flex-col gap-2 mt-20 justify-between items-center">
      <TransactionList />
    </div>
  );
}
