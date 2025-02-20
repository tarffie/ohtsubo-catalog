"use client";

import React, { useEffect, ReactNode } from "react";

export interface Props {
  children: ReactNode;
}

export const MenuButton: React.FC<Props> = ({ children }) => {
  useEffect(() => {});

  return (
    <button
      onClick={() => console.error("TODO")}
      className="border-solid border-sky_blue-300
        rounded-md bg-sky_blue
        font-bold text-center
        mx-2 py-2 px-auto
        text-prussian_blue-300 text-xs
        inline-block"
    >
      {children}
    </button>
  );
};
