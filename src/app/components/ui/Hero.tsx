import React from "react";

import Image from "next/image";

import ohtsuboLogo from "@/assets/logo.svg";
import heroBg from "@/assets/heroBg.jpeg";

function Hero() {
  return (
    <div className="w-full relative flex items-center justify-center h-28 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={heroBg}
          alt="picture from sky with a ton of stars"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Logo - Centered */}
      <div className="relative z-10 flex items-center justify-center">
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
