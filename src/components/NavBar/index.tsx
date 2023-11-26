"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav className="bg-gray-800 p-1 fixed bottom-0 left-0 w-full">
      <div className="container mx-auto flex justify-center items-center gap-4 text-white">
        <Link
          className="hover:bg-slate-600 transition duration-300 p-4 rounded-sm"
          href={"/record"}
          style={{ backgroundColor: pathname == "/record" ? "#778899" : "" }}
        >
          REGISTROS
        </Link>
        <Link
          className="hover:bg-slate-600 transition duration-300 p-4 rounded-sm"
          href={"/"}
          style={{ backgroundColor: pathname == "/" ? "#778899" : "" }}
        >
          HOME
        </Link>
        <Link
          className="hover:bg-slate-600 transition duration-300 p-4 rounded-sm"
          href={"detailedRecord"}
          style={{
            backgroundColor: pathname == "/detailedRecord" ? "#778899" : "",
          }}
        >
          DETALHADOS
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
