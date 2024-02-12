import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useAppManager } from "../context/AppManagerContext";
import { dateHelpers } from "../helpers/DateHelpers";
import { useNavigate } from "react-router-dom";
import G_Alert from "./generics/G_Alert";
import { useState } from "react";

export default function HeaderNavigation() {
  const { prevMonth, nextMonth, currentMonth } = useAppManager();
  const navigate = useNavigate();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const openAlert = () => {
    setIsAlertOpen(true);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };
  const logout = () => {
    localStorage.removeItem("authTokens");
    window.location.reload();
    navigate("/login");
  };

  return (
    <header className="w-full fixed top-0 left-0 bg-appSecondaryColor rounded-lg p-1 z-30 lg:text-2xl">
      <div className="Container flex justify-between items-center">
        <div className="invisible">$$$$</div>
        <div
          onClick={prevMonth}
          className="cursor-pointer hover:bg-appPrimaryColor transition duration-300 p-4 rounded-sm"
        >
          <ChevronLeft />
        </div>
        <div className="w-72 flex justify-center">
          {dateHelpers.formatCurrentMonth(currentMonth).toUpperCase()}
        </div>
        <div
          onClick={nextMonth}
          className="cursor-pointer hover:bg-appPrimaryColor transition duration-300 p-4 rounded-sm"
        >
          <ChevronRight />
        </div>
        <div
          onClick={openAlert}
          className="cursor-pointer hover:bg-appPrimaryColor transition duration-300 p-4 rounded-sm"
        >
          <LogOut color="orange" />
        </div>
      </div>
      <G_Alert
        description="Deseja fazer o logout ?"
        isOpen={isAlertOpen}
        onClose={closeAlert}
        functionProp={{
          action: () => logout(),
        }}
      />
    </header>
  );
}
