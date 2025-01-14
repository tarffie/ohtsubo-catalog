"use client";

import React from "react";
import Image from "next/image";

import thumbnail from "@/assets/template.jpg";

import Form from "./form";
import { useServiceContext } from "@/lib/providers/ServiceProvider";
import { isServiceUndefined } from "@/lib/utils/apiUtils";
import NotFound from "@/pages/404";

export default function Page() {
  const { currentService } = useServiceContext();

  const brand = "Ohtsubo Terapias";

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
              className="rounded block -mb-10"
              src={thumbnail}
              alt="thumbnail com título e fundo"
              width={348}
              height={348}
            />
          </div>
          <div className="">
            {currentService ? (
              <Form>{currentService}</Form>
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
