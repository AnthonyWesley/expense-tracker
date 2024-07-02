import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import useUserAuth from "../hooks/useUserAuth";

export const Login = () => {
  const { handleLogin, setCredentials, credentials } = useUserAuth();

  return (
    <div className="flex flex-col gap-3 w-full items-center justify-center text-blue-800">
      <Input
        name="Email"
        type="email"
        placeholder="john@doe.com"
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
        icon={<Icon icon="ph:user-duotone" />}
      />
      <Input
        name="Password"
        type="password"
        placeholder="123"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        icon={<Icon icon="ri:lock-password-line" />}
      />
      <Button
        className="w-full text-center flex justify-center bg-gradient-to-tl from-yellow-200 to-yellow-500 text-white py-4 p-2 mb-2 rounded-md hover:bg-blue-800"
        onClick={handleLogin}
      >
        LOGIN
      </Button>
    </div>
  );
};
