import { AccountType } from "../../../type/AccountType";

type AccountNavProps = {
  accountList: AccountType[];
  index: number;
  activePanel: number;
  handlePanelChange: (index: number) => void;
};

export default function AccountNav({
  accountList,
  index,
  handlePanelChange,
  activePanel,
}: AccountNavProps) {
  return (
    <label
      key={index}
      title={accountList[index].name}
      onClick={() => handlePanelChange(index)}
      className={` flex justify-center items-center font-semibold cursor-pointer ml-4 mt-2 w-10 h-10 text-center rounded-full text-white shadow-md ${
        activePanel === index
          ? "bg-gradient-to-tl from-yellow-200 to-yellow-500 text-appSecondaryColor"
          : "text-appPrimaryColor  bg-appPrimaryColor/50 transition-all hover:text-yellow-400"
      } `}
    >
      {accountList[index].name[0]}
    </label>
  );
}
