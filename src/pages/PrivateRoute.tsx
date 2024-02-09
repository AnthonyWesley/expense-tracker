import { Outlet } from "react-router-dom";
import { useApiContext } from "../context/ApiContext";
import LoginPage from "./LoginPage";

const PrivateRoutes = () => {
  const { dataUser } = useApiContext();

  return dataUser?.name ? <Outlet /> : <LoginPage />;
};

export default PrivateRoutes;
