import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiContext } from "../../../context/ApiContext";

export default function useUserAuth() {
  const { loginUser, setLoading, registerUser } = useApiContext();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    const responseRegister = await registerUser({
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
    });
    if (!responseRegister) {
      console.error("Erro ao fazer o Registro");
      return;
    }
    handleLogin();
  };

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

  return { handleLogin, handleRegister, setCredentials, credentials };
}
