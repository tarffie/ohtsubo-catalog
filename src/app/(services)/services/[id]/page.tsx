"use client";

import React from "react";
import Image from "next/image";

import thumbnail from "@/assets/servicoTemplate.jpg";

import Form from "./form";
import { useServiceContext } from "@/lib/providers/ServiceProvider";
import { isServiceUndefined } from "@/lib/utils/apiUtils";
import NotFound from "@/pages/404";

export default function Page() {
  const { currentService } = useServiceContext();
  const product = currentService;

  //if (!product) return notFound();

  return (
    <>
      {isServiceUndefined(currentService) ? (
        <>
          <NotFound />
        </>
      ) : (
        <div className="place-items-center items-center grid-rows grid grid-cols-1 md:grid-cols-2 font-bold min-h-screen">
          <div className="mt-auto ">
            <Image
              className="rounded block mt-5 -mb-5"
              src={thumbnail}
              alt="thumbnail com título e fundo"
            />
          </div>
          <div className="">
            {currentService ? (
              <Form />
            ) : (
              <div>
                <p> Loading service.. </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
