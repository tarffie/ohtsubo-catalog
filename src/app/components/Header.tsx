import React from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/app/components/SearchBar";

import logo from "@/assets/logo.svg";

export default function Header() {
  return (
    <nav className="align-middle">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between mb-4 text-center">
          <div className="grid grid-cols-2 justify-center md:items-stretch md:justify-start">
            <div className="grid-cols-1 ml-4">
              <Link href={"/"}>
                {" "}
                <Image
                  src={logo}
                  className="rounded-full"
                  width={`75`}
                  alt={"Logo Ohtsubo"}
                />{" "}
              </Link>
            </div>

            {/* the freaking search bar.. */}
            <div className="mt-5 grid-cols-1 pl-2 -mr-[69]">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
