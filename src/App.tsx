import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useApiContext } from "./context/ApiContext";
import HeaderNavigation from "./components/HeaderNavigation";

import LoginPage from "./pages/LoginPage";
import PrivateRoutes from "./pages/PrivateRoute";
import Record from "./pages/Record";
import Records from "./pages/Records";
import Home from "./pages/Home";
import Spin from "./components/home/Spin";
import Categories from "./pages/Categories";
import FooterNavigation from "./components/FooterNavigation";
import { Toast } from "./components/ui/Toast";
import Confirm from "./components/ui/Confirm";
import Movements from "./pages/Movements";

const App = () => {
  const { dataUser, loading } = useApiContext();

  return (
    <main className="container m-auto lg:mt-4 flex flex-col">
      {loading && <Spin />}

      <BrowserRouter>
        {dataUser?.name && <FooterNavigation />}
        <Routes>
          <Route path="/" element={<PrivateRoutes />}>
            <Route index element={<Home />} />
            <Route path="records" element={<Records />} />
            <Route path="record/:id" element={<Record />} />
            <Route path="movements" element={<Movements />} />
            <Route path="categories" element={<Categories />} />
          </Route>

          <Route path="login" element={<LoginPage />} />
        </Routes>

        {dataUser?.name && <HeaderNavigation />}

        <Toast />
        <Confirm />
      </BrowserRouter>
    </main>
  );
};

export default App;
