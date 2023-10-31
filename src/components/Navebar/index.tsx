"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navebar() {
  const pathName = usePathname();
  console.log(pathName);

  type LinksProps = {
    rout: string;
    href: string;
  };
  const links: LinksProps[] = [
    {
      rout: "Home",
      href: "/",
    },
    {
      rout: "Projects",
      href: "/projects",
    },
    {
      rout: "About",
      href: "/about",
    },
  ];
  return (
    <div className="bg-slate-400 text-lg flex justify-between">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={
            pathName == link.href ? "bg-slate-500  p-4 text-white" : " p-4 "
          }
        >
          {link.rout}
        </Link>
      ))}
    </div>
  );
}
