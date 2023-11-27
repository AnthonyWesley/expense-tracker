"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav className="w-full fixed bottom-0 left-0 ">
      <div className="Container flex justify-center items-center gap-2 bg-appSecondaryColor rounded-lg p-1 z-50 text-sm lg:text-xl">
        <Link
          className="hover:bg-appPrimaryColor transition duration-300 p-4 rounded-sm"
          href={"/record"}
          style={{ backgroundColor: pathname == "/record" ? "#164e63" : "" }}
        >
          REGISTROS
        </Link>
        <Link
          className="hover:bg-appPrimaryColor transition duration-300 p-4 rounded-sm"
          href={"/"}
          style={{ backgroundColor: pathname == "/" ? "#164e63" : "" }}
        >
          HOME
        </Link>
        <Link
          className="hover:bg-appPrimaryColor transition duration-300 p-4 rounded-sm"
          href={"detailedRecord"}
          style={{
            backgroundColor: pathname == "/detailedRecord" ? "#164e63" : "",
          }}
        >
          DETALHADOS
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
