import { useState } from "react";
import { CircleUser, LockKeyhole } from "lucide-react";
import G_InputArea from "./generics/G_InputArea";
import { useApiContext } from "../context/ApiContext";
import { useNavigate } from "react-router-dom";
import G_Button from "./generics/G_Button";

export const Login = () => {
  const { loginUser, setLoading } = useApiContext();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    setLoading(true);
    if (credentials.email) {
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
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full items-center justify-center text-blue-800">
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
