import { CircleUser, LockKeyhole } from "lucide-react";
import G_InputArea from "./generics/G_InputArea";
import { useState } from "react";
import { useApiContext } from "../context/ApiContext";
import G_Button from "./generics/G_Button";

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
        icon={<CircleUser />}
      />
      <G_InputArea
        name="Email"
        type="email"
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
        icon={<CircleUser />}
      />
      <G_InputArea
        name="Password"
        type="password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        icon={<LockKeyhole />}
      />
      <G_Button
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-800"
        onClick={handleLogin}
      >
        Login
      </G_Button>
    </div>
  );
};
