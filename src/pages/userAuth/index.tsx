import { useState } from "react";
// import logo from "../../assets/images/logo-01-light.png";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import Header from "../../components/Header";

export default function index() {
  const [change, setChange] = useState(true);

  return (
    <section className="container mx-auto mt-7 lg:w-[500px]">
      {/* <div className="px-4">
        <img src={logo} alt="" />
      </div> */}

      <div className="z-20 border bg-gray-900 border-white/30 mx-auto mt-7 lg:w-[500px] shadow-md rounded-md p-4">
        <Header
          change={change}
          setChange={setChange}
          subtitleOne="LOGIN"
          subtitleTwo="REGISTER"
        />
        <div className="px-4">{change ? <Login /> : <Register />}</div>
      </div>
    </section>
  );
}
