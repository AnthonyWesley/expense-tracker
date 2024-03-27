import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useConfirmStore } from "./ui/Confirm";
const links = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/record/detailed",
    text: "Registros",
  },
  {
    href: "/categories",
    text: "Categorias",
  },
];
export default function FooterNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    links.map((link) =>
      location.pathname == link.href
        ? setTimeout(() => {
            setIsOpen(false);
          }, 500)
        : ""
    );
  };

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  return (
    <nav className="z-40 w-full flex items-center justify-between fixed top-0 left-0 bg-appSecondaryColor p-1 lg:text-2xl">
      <div className={`flex justify-end lg:justify-center`}>
        <div
          className={`${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }  fixed left-0 bottom-0 z-40 flex h-dvh w-52 flex-col items-start justify-start bg-gray-800/95 transition-transform duration-300 ease-in-out`}
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
          <button
            className="fixed -right-14 -top-[0px] z-50 cursor-pointer hover:bg-appPrimaryColor transition duration-300 p-2 rounded-sm"
            onClick={toggleMenu}
          >
            {!isOpen && (
              <Icon
                icon="line-md:close-to-menu-alt-transition"
                color="orange"
                width={40}
              />
            )}

            {isOpen && (
              <Icon
                icon="line-md:menu-to-close-alt-transition"
                color="orange"
                width={40}
              />
            )}
          </button>
        </div>
      </div>

      <div
        onClick={onConfirm}
        className="cursor-pointer hover:bg-appPrimaryColor transition duration-300 p-1 rounded-sm"
      >
        <Icon icon="line-md:logout" color="orange" width={40} />
      </div>
    </nav>
  );
}
