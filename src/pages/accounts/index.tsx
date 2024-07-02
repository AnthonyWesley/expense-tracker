import { Icon } from "@iconify/react/dist/iconify.js";
import Modal from "../../components/Modal";
import AccountCreate from "./components/AccountCreate";
import AccountList from "./components/AccountList";

export default function index() {
  return (
    <div className="flex flex-col items-center lg:my-14 my-24">
      <AccountList />
      <Modal
        className="bg-slate-900"
        icon={
          <Icon
            icon="heroicons:plus-small"
            width={50}
            className="fixed bottom-20 right-0 m-2 cursor-pointer md:static lg:static opacity-80 hover:opacity-100 transition-all bg-white text-gray-800 rounded-full"
          />
        }
      >
        <AccountCreate />
      </Modal>
    </div>
  );
}
