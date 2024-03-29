"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const navItems = [
    { id: 1, text: "Invertir Ahora", link: "invertir" },
    { id: 2, text: "Mi Inversion", link: "inversion" },
    { id: 3, text: "Admin", link: "login" },
  ];

  return (
    <div className="bg-black flex justify-between px-5 items-center h-24 w-screen  text-white">
      {/* Logo */}
      <h1 className=" text-3xl font-bold text-[#00df9a]">
        <Link href="/">ProInvest</Link>
      </h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <Link key={item.id} href={item.link}>
            <li
              // key={item.id}
              className="p-4 hover:bg-[#00df9a] rounded-xl  cursor-pointer duration-300 hover:text-black"
            >
              {item.text}
            </li>
          </Link>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Mobile Logo */}
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">
          <Link href="/">ProInvest</Link>
        </h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <Link key={item.id} href={item.link}>
            <li className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600">
              {/* {item.text} */}
              {item.text}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
