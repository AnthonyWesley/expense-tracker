import { CreditCardDashboard } from "./components/CreditCardDashboard";
import FinanceChart from "./components/FinanceChart";
import FinanceDashboard from "./components/FinanceDashboard";

import { TransactionList } from "./components/TransactionList";

export default function index() {
  return (
    <main className="container lg:mt-14 mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
      <header className="border md:order-1 md:col-span-1 border-white/30 w-full h-64 p-4 text-gray-50 rounded-lg flex flex-col col-span-3 gap-2 justify-between items-center text-sm lg:text-xl shadow-[0px_0px_0px_1px_rgba(0,0,0,0.10)]">
        <CreditCardDashboard />
      </header>
      <section className="w-full md:order-3 lg:order-2 items-center justify-end col-span-3 md:col-span-2 lg:col-span-1 flex overflow-hidden rounded-lg text-center h-64 ">
        <FinanceDashboard />
      </section>
      <section className="border md:order-2 col-span-3 md:col-span-1 border-white/30 w-full h-64 flex flex-col items-center rounded-md lg:col-span-1">
        <FinanceChart />
      </section>

      <footer className="border md:order-4 border-white/30 max-h-[420px] lg:h-[335px] w-full mb-[70px] rounded-md overflow-hidden col-span-3">
        <TransactionList />
      </footer>
    </main>
  );
}
