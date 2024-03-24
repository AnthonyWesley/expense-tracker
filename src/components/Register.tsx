import G_InputArea from "./generics/G_InputArea";
import { useState } from "react";
import { useApiContext } from "../context/ApiContext";
import G_Button from "./generics/G_Button";
import { Icon } from "@iconify/react/dist/iconify.js";

export const Register = () => {
  const { registerUser, loginUser } = useApiContext();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const responseRegister = await registerUser({
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
    });
    if (!responseRegister) {
      console.error("Erro ao fazer o Registro");
      return;
    }
    await loginUser({
      email: credentials.email,
      password: credentials.password,
    });
  };
  return (
    <div className="flex flex-col gap-2 items-center justify-center text-blue-800">
      <G_InputArea
        name="Name"
        type="text"
        value={credentials.name}
        onChange={(e) =>
          setCredentials({ ...credentials, name: e.target.value })
        }
        icon={<Icon icon="ph:user-duotone" />}
      />
      <G_InputArea
        name="Email"
        type="email"
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
        icon={<Icon icon="ph:user-duotone" />}
      />
      <G_InputArea
        name="Password"
        type="password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        icon={<Icon icon="ri:lock-password-line" />}
      />
      <G_Button
        className="w-full bg-blue-500 flex justify-center text-white p-2 rounded-md hover:bg-blue-800"
        onClick={handleLogin}
      >
        REGISTER
      </G_Button>
    </div>
  );
};
