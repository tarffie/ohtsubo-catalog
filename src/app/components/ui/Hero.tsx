import React from "react";

import Image from "next/image";

import ohtsuboLogo from "@/assets/logo.svg";
import heroBg from "@/assets/heroBg.jpeg";

function Hero() {
  return (
    <div className="relative w-full h-auto">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroBg}
          alt="picture from sky with a ton of stars"
          layout="fill" // Ensures the image covers the entire container
          objectFit="cover" // Ensures the image maintains its aspect ratio
        />
      </div>

      {/* Logo */}
      <div className="relative flex items-center justify-center h-full">
        <Image
          src={ohtsuboLogo}
          alt="Logomarca Ohtsubo Terapias"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}

export default Hero;
