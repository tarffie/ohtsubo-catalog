"use client";

import React, { useEffect, ReactNode } from "react";

export interface Props {
  children: ReactNode;
}

export const MenuButton: React.FC<Props> = ({ children }) => {
  useEffect(() => {});

  return (
    <button
      onClick={() => console.warn("TODO")}
      className="border-solid border-indigo-500 rounded-md bg-indigo-300 font-bold text-white"
    >
      {children}
    </button>
  );
};
