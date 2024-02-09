import Expenses from "../components/Expenses";
import FinancialSummary from "../components/FinancialSummary";
import { TransactionList } from "../components/TransactionList";
import WalletArea from "../components/WalletArea";

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
