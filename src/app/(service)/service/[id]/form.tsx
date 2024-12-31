"use client"
import React, { ReactElement } from "react";
import { ServiceInput as Service } from "@/lib/interfaces/Service";

interface Props {
  children: Service;
}

export default function Form({ children }: Props) {
  const service = children;

  const handleSubmit = async (event: React.FormEvent) => {
    // prevent page reload
    event.preventDefault();

    // when finish we wanna call little side bar menu to finish or
    // keep buying. might have to save cookie

  };

  return (
    <form className="mb-auto" onSubmit={handleSubmit}>
      <button className='font-bold' type='submit'>Submit</button>
    </form>
  );
}
