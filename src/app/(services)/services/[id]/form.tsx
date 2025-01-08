"use client";

import React, { ReactElement } from "react";
import { ServiceInput as Service } from "@/lib/interfaces/Service";

import CardSession from "./cardSession";
import { useServiceContext } from "@/lib/providers/ServiceProvider";

interface Props {
  children: Service;
}

export default function Form({ children }: Props) {
  const { isSidebarVisible, setIsSidebarVisible, currentService } =
    useServiceContext();

  const handleSubmit = (event: React.FormEvent) => {
    // prevent page reload
    event.preventDefault();

    // when finish we wanna call little side bar menu to finish or
    // keep buying. might have to save cookie

    setIsSidebarVisible((prevState: boolean) => !prevState);
  };

  return (
    <form className="mb-auto" onSubmit={handleSubmit}>
      {currentService ? (
        <CardSession service={currentService} />
      ) : (
        <p>Loading service...</p>
      )}
      <button className="font-bold text-center" type="submit">
        Submit
      </button>
    </form>
  );
}
