"use client";
import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiPlus } from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-white font-bold text-lg cursor-pointer">
            GovGuide
          </span>
        </Link>
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link href="/">
              <span className="text-white hover:text-gray-300 cursor-pointer">
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <span className="text-white hover:text-gray-300 cursor-pointer">
                About
              </span>
            </Link>
          </li>
        </ul>
        <div className="md:hidden">
          {/* Hamburger menu for mobile */}
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <FiPlus className="h-6 w-6 transition duration-500 transform rotate-45" />
            ) : (
              <FiMenu className="h-6 w-6 transition duration-500" />
            )}
          </button>
        </div>
      </div>
      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link href="/">
                <span
                  onClick={toggleMenu}
                  className="text-white hover:text-gray-300 cursor-pointer"
                >
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <span
                  onClick={toggleMenu}
                  className="text-white hover:text-gray-300 cursor-pointer"
                >
                  About
                </span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
