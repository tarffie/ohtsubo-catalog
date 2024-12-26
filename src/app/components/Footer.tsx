import React from "react";
import { FaShoppingCart, FaHome, FaUser } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="min-h-10 flex justify-between items-center border border-indigo-500 font-bold mt-2 px-4 bg-indigo-300 rounded">
      {/* those need to be buttons */}
      <button className="">
        <FaHome />
      </button>
      <button className="">
        <FaShoppingCart />
      </button>
      <button className="">
        <FaUser />
      </button>
    </footer>
  );
}
