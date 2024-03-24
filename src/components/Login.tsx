import { useState } from "react";

import G_InputArea from "./generics/G_InputArea";
import { useApiContext } from "../context/ApiContext";
import { useNavigate } from "react-router-dom";
import G_Button from "./generics/G_Button";
import { Icon } from "@iconify/react/dist/iconify.js";

export const Login = () => {
  const { loginUser, setLoading } = useApiContext();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    if (credentials.email && credentials.password) {
      setLoading(true);
      try {
        const user = await loginUser({
          email: credentials.email,
          password: credentials.password,
        });
        if (user.name) {
          setLoading(false);
          navigate("/");
        }
      } catch (error) {
        console.error("Erro durante o login:", error);
      }
    } else {
      alert("Insira Email/Senha correta");
      return;
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full items-center justify-center text-blue-800">
      <G_InputArea
        name="Email"
        type="email"
        placeholder="john@doe.com"
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
        icon={<Icon icon="ph:user-duotone" />}
      />
      <G_InputArea
        name="Password"
        type="password"
        placeholder="123"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        icon={<Icon icon="ri:lock-password-line" />}
      />
      <G_Button
        className="w-full text-center flex justify-center bg-blue-800 text-white py-4 p-2 mb-2 rounded-md hover:bg-blue-800"
        onClick={handleLogin}
      >
        LOGIN
      </G_Button>
    </div>
  );
};
