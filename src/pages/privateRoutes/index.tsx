import { Outlet } from "react-router-dom";
import { useApiContext } from "../../context/ApiContext";
import UserAuth from "../userAuth";

export default function index() {
  const { dataUser } = useApiContext();

  return dataUser?.name ? <Outlet /> : <UserAuth />;
}
