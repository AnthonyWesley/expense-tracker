// import Expenses from "../components/home/Expenses";
import Expenses from "../components/home/Expenses";
import FinancialSummary from "../components/home/FinancialSummary";
import { TransactionList } from "../components/home/TransactionList";
import WalletArea from "../components/home/WalletArea";

export default function Home() {
  return (
    <section className="container mt-20 flex flex-col lg:grid lg:grid-cols-3 gap-2">
      <WalletArea />
      <FinancialSummary />
      <Expenses />

      <TransactionList />
    </section>
  );
}
