import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import useUserAuth from "../hooks/useUserAuth";

export const Register = () => {
  const { handleRegister, setCredentials, credentials } = useUserAuth();
  return (
    <div className="flex flex-col gap-2 items-center justify-center text-blue-800">
      <Input
        name="Name"
        type="text"
        value={credentials.name}
        onChange={(e) =>
          setCredentials({ ...credentials, name: e.target.value })
        }
        icon={<Icon icon="ph:user-duotone" />}
      />
      <Input
        name="Email"
        type="email"
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
        icon={<Icon icon="ph:user-duotone" />}
      />
      <Input
        name="Password"
        type="password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        icon={<Icon icon="ri:lock-password-line" />}
      />
      <Button
        className="w-full bg-gradient-to-tl from-yellow-200 to-yellow-500 flex justify-center text-white p-2 rounded-md hover:bg-blue-800"
        onClick={handleRegister}
      >
        REGISTER
      </Button>
    </div>
  );
};
