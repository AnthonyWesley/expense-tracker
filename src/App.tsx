import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useApiContext } from "./context/ApiContext";
import HeaderNavigation from "./components/HeaderNavigation";
import Detailed from "./pages/Detailed";
import LoginPage from "./pages/LoginPage";
import PrivateRoutes from "./pages/PrivateRoute";
import Record from "./pages/Record";
import Records from "./pages/Records";
import Home from "./pages/Home";
import Spin from "./components/Spin";
import Categories from "./pages/Categories";
import FooterNavigation from "./components/FooterNavigation";
import { Toast } from "./components/generics/Toast";

const App = () => {
  const { dataUser, loading } = useApiContext();

  return (
    <main className="container m-auto flex flex-col">
      {loading && <Spin />}

      {dataUser?.name && <HeaderNavigation />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoutes />}>
            <Route index element={<Home />} />
            <Route path="records" element={<Records />} />
            <Route path="record/:id" element={<Record />} />
            <Route path="record/detailed" element={<Detailed />} />
            <Route path="categories" element={<Categories />} />
          </Route>

          <Route path="login" element={<LoginPage />} />
        </Routes>

        {dataUser?.name && <FooterNavigation />}
      </BrowserRouter>
      <Toast />
    </main>
  );
};

export default App;
