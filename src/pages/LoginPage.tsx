import { useState } from "react";
import { Register } from "../components/Register";
import { Login } from "../components/Login";
import Logo from "../components/Logo";
import G_Header from "../components/generics/G_Header";

export default function LoginPage() {
  const [change, setChange] = useState(true);

  return (
    <section className="container mx-auto mt-7 lg:w-[500px] bg-appSecondaryColor text-blue-500 shadow-md rounded-md p-4">
      <div className="px-2">
        <Logo />
      </div>

      <G_Header
        change={change}
        setChange={setChange}
        subtitleOne="LOGIN"
        subtitleTwo="REGISTER"
      />
      <div className="px-4">{change ? <Login /> : <Register />}</div>
    </section>
  );
}
