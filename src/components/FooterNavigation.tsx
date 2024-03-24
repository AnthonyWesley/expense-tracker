import { Icon } from "@iconify/react";

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import G_Confirm from "./generics/G_Confirm";
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
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const onConfirm = (confirm: boolean) => {
    if (confirm) {
      localStorage.removeItem("authTokens");
      window.location.reload();
      navigate("/login");
    }
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
    <nav className="z-40 w-full flex items-center justify-between fixed bottom-0 left-0 bg-appSecondaryColor p-1 lg:text-2xl">
      <G_Confirm
        description="Deseja fazer o logout ?"
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={onConfirm}
      />

      <div className={`flex justify-end lg:justify-center`}>
        <div
          className={`${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }  fixed mt-20 left-0 top-0 z-40 flex h-screen w-52 flex-col items-start justify-start bg-gray-800/95 transition-transform duration-300 ease-in-out`}
        >
          {links.map((link) => (
            <Link
              key={link.text}
              to={link.href}
              className={`relative cursor-pointer text-base w-full p-4 my-1${
                location.pathname == link.href
                  ? " text-zinc-50 bg-gray-700"
                  : " p-4 text-zinc-400 hover:text-zinc-50 hover:bg-gray-700"
              } `}
            >
              {link.text.toUpperCase()}
            </Link>
          ))}
          <button
            className="absolute -right-14 bottom-[85px] z-50 cursor-pointer hover:bg-appPrimaryColor transition duration-300 p-1 rounded-sm"
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
        onClick={() => setIsAlertOpen(true)}
        className="cursor-pointer hover:bg-appPrimaryColor transition duration-300 p-1 rounded-sm"
      >
        <Icon icon="line-md:logout" color="orange" width={40} />
      </div>
    </nav>
  );
}
