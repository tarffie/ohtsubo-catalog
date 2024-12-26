import React from "react";
import Link from "next/link";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";

export default function HeaderProduct() {
  return (
    <nav className="align-middle">
      <div className="mx-auto max-w-7xl">
        <div className="min-h-10 flex justify-between items-center border border-indigo-500 font-bold mt-2 px-4 bg-indigo-300 rounded">
          <div className="">
            <Link href={"/"}>
              <FaArrowLeft />
            </Link>
          </div>

          {/* the freaking search bar.. */}
          <div className="">
            <FaShoppingCart />
          </div>
        </div>
      </div>
    </nav>
  );
}
