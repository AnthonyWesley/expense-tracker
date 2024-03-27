import { useState } from "react";
import { Register } from "../components/login/Register";
import { Login } from "../components/login/Login";

import G_Header from "../components/ui/G_Header";
import G_Logo from "../components/ui/G_Logo";

export default function LoginPage() {
  const [change, setChange] = useState(true);

  return (
    <section className="container mx-auto mt-7 lg:w-[500px] bg-appSecondaryColor text-blue-500 shadow-md rounded-md p-4">
      <div className="px-2">
        <G_Logo />
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
