import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppManager } from "../context/AppManager";
import { dateHelpers } from "../helpers/DateHelpers";

export default function HeaderNavigation() {
  const { prevMonth, nextMonth, currentMonth } = useAppManager();

  return (
    <header className="w-full fixed bottom-0 left-0 bg-appSecondaryColor rounded-lg p-1 z-30 lg:text-2xl">
      <div className="flex justify-around items-center">
        <div
          onClick={prevMonth}
          className="cursor-pointer hover:bg-appPrimaryColor transition duration-300 p-1 rounded-sm"
        >
          <Icon icon="solar:double-alt-arrow-left-line-duotone" width={50} />
        </div>
        <div className="w-72 flex justify-center">
          {dateHelpers.formatCurrentMonth(currentMonth).toUpperCase()}
        </div>
        <div
          onClick={nextMonth}
          className="cursor-pointer hover:bg-appPrimaryColor transition duration-300 p-1 rounded-sm"
        >
          <Icon icon="solar:double-alt-arrow-right-line-duotone" width={50} />
        </div>
      </div>
    </header>
  );
}
