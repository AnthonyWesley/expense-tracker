import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocation, useNavigate, Link } from "react-router-dom";
import logo from "../assets/images/logo-02-light.png";
import { useConfirmStore } from "./Confirm";
import SliderBar from "./SliderBar";
export const links = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/accounts",
    text: "Contas",
  },
  {
    href: "/categories",
    text: "Categorias",
  },
  {
    href: "/movements",
    text: "Movimentações",
  },
];
export default function FooterNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleConfirm } = useConfirmStore();

  const onConfirm = () => {
    handleConfirm({
      message: "Deseja fazer o logout ?",
      callback: logOut,
    });
  };

  const logOut = () => {
    localStorage.removeItem("authTokens");
    window.location.reload();
    navigate("/login");
  };

  return (
    <nav className="z-40 w-full flex items-center justify-between fixed top-0 left-0 lg:text-2xl bg-gray-900/90 p-2">
      <div></div>
      <SliderBar
        icon={
          <Icon
            icon="line-md:close-to-menu-alt-transition"
            color="#22d3ee"
            width={40}
          />
        }
      >
        {links.map((link) => (
          <Link
            key={link.text}
            to={link.href}
            className={`relative cursor-pointer text-base w-full p-4 mb-1${
              location.pathname == link.href
                ? " text-zinc-50 bg-gray-700"
                : " p-4 text-zinc-400 hover:text-zinc-50 hover:bg-gray-700"
            } `}
          >
            {link.text.toUpperCase()}
          </Link>
        ))}
      </SliderBar>

      <div className="ml-10 w-44 lg:w-52">
        <img src={logo} alt="Logo" />
      </div>

      <div
        onClick={onConfirm}
        className="cursor-pointer hover:bg-appPrimaryColor transition duration-300 p-1 rounded-sm"
      >
        <Icon icon="line-md:logout" color="#22d3ee" width={40} />
      </div>
    </nav>
  );
}
