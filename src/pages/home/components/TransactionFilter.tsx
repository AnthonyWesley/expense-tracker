import Dropdown from "../../../components/Dropdown";

interface TransactionFilterProps {
  optionList: string[];
  selectList: (option: string) => void;
}

export function TransactionFilter({
  optionList,
  selectList,
}: TransactionFilterProps) {
  return (
    <header className="flex items-center justify-between">
      <div className="text-center p-4 ">REGISTROS</div>

      <Dropdown
        className="text-cyan-300 border-cyan-400 h-14 w-36"
        dropdownList={optionList}
        dropdownSelect={selectList}
      />
    </header>
  );
}
