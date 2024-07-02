import { useState } from "react";
import { useApiContext } from "../../../context/ApiContext";
import AccountCard from "./CreditCard";
import AccountNav from "./CreditCardNav";
import SliderBar from "../../../components/SliderBar";
import { Icon } from "@iconify/react/dist/iconify.js";

export const CreditCardDashboard = () => {
  const [activePanel, setActivePanel] = useState(0);
  const { accountList, setAccountCount } = useApiContext();

  const handlePanelChange = (index: number) => {
    setActivePanel(index);
    setAccountCount(index);
  };

  return (
    <>
      <div className="overflow-hidden w-full h-64 rounded-md">
        <div
          className="h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateY(-${activePanel * 100}%)` }}
        >
          {accountList.map((_, index) => (
            <AccountCard account={accountList} index={index} key={index} />
          ))}
        </div>
      </div>
      <SliderBar
        title="CONTAS"
        className="bg-transparent top-14"
        zIndex="z-30"
        icon={
          <Icon
            icon="material-symbols:price-change-outline"
            width={40}
            color="#22d3ee"
          />
        }
      >
        {accountList.map((_, index) => (
          <AccountNav
            accountList={accountList}
            activePanel={activePanel}
            handlePanelChange={handlePanelChange}
            index={index}
            key={index}
          />
        ))}
      </SliderBar>
      {/* <div className="fixed top-12 left-0 flex-col flex items-center p-2"></div> */}
    </>
  );
};
