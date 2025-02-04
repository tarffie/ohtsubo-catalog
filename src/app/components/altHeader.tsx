import React from "react";
import Link from "next/link";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";

export default function AltHeader() {
  return (
    <nav className="align-middle">
      <div className="mx-auto max-w-7xl">
        <div className="min-h-10 mb-[30] md:mb-0 flex justify-between items-center border border-sky_blue-500 font-bold mt-2 px-4 bg-sky_blue rounded">
          <div className="">
            <Link href={"/"}>
              <FaArrowLeft />
            </Link>
          </div>
          <div className="">
            <Link href="/cart">
              <FaShoppingCart />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
