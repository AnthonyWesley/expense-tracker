import { useState } from "react";
import { Register } from "../components/Register";
import { Login } from "../components/Login";
import Logo from "../components/Logo";

export default function LoginPage() {
  const [change, setChange] = useState(true);
  return (
    <section className="container mx-auto mt-7 lg:w-[500px] bg-appSecondaryColor text-blue-500 p-4 shadow-md rounded-md">
      <Logo />

      <main className="flex justify-around text-center py-2">
        <h2
          onClick={() => setChange(true)}
          className="w-full rounded-md text-blue-500 text-2xl font-bold p-2 mr-1 text-left hover:bg-appPrimaryColor"
          style={{
            backgroundColor: change ? "rgb(31 41 55)" : "",
          }}
        >
          LOGIN
        </h2>
        <span className="border border-blue-500 "></span>
        <h2
          onClick={() => setChange(false)}
          className="w-full rounded-md text-blue-500 text-2xl font-bold p-2 ml-1 text-right hover:bg-appPrimaryColor"
          style={{
            backgroundColor: !change ? "rgb(31 41 55)" : "",
          }}
        >
          REGISTER
        </h2>
      </main>

      {change && <Login />}
      {!change && <Register />}
    </section>
  );
}
