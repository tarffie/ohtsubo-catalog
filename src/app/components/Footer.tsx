import React from "react";
import Link from "next/link";
import { FaShoppingCart, FaHome, FaUser } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="min-h-10 flex justify-between items-center border border-sky_blue-500 font-bold mt-2 px-4 bg-sky_blue rounded">
      {/* those need to be buttons */}
      <button className="">
        <FaHome />
      </button>
      <Link href="/cart">
        <button className="">
          <FaShoppingCart />
        </button>
      </Link>
      <button className="">
        <FaUser />
      </button>
    </footer>
  );
}
