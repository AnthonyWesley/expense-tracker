import { BrowserRouter, Routes, Route } from "react-router-dom";
import Confirm from "./components/Confirm";
import FooterNav from "./components/FooterNavi";
import HeaderNav from "./components/HeaderNav";
import Spin from "./components/Spin";
import { Toast } from "./components/Toast";
import { useApiContext } from "./context/ApiContext";
import Accounts from "./pages/accounts";
import Categories from "./pages/categories";
import Home from "./pages/home";
import Movements from "./pages/movements";
import PrivateRoutes from "./pages/privateRoutes";
import Records from "./pages/records";
import UserAuth from "./pages/userAuth";

const App = () => {
  const { dataUser, loading } = useApiContext();

  return (
    <main className="container m-auto lg:mt-4 flex flex-col">
      {loading && <Spin />}

      <BrowserRouter>
        {dataUser?.name && <FooterNav />}
        <Routes>
          <Route path="/" element={<PrivateRoutes />}>
            <Route index element={<Home />} />
            <Route path="record/:id" element={<Records />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="movements" element={<Movements />} />
            <Route path="categories" element={<Categories />} />
          </Route>

          <Route path="login" element={<UserAuth />} />
        </Routes>
        {dataUser?.name && <HeaderNav />}

        <Toast />
        <Confirm />
      </BrowserRouter>
    </main>
  );
};

export default App;
