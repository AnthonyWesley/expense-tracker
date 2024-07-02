import { useApiContext } from "../../../context/ApiContext";
import AccountCard from "./AccountCard";

export default function AccountList() {
  const { accountList } = useApiContext();

  return (
    <div className="container w-full flex flex-wrap items-center justify-center gap-2">
      {accountList.map((account, index) => (
        <AccountCard key={index} acc={account} />
      ))}
    </div>
  );
}
