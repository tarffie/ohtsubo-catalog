"use client";

import React from "react";
import Image from "next/image";

import thumbnail from "@/assets/template.jpg";

import { fetchServiceFromApi } from "@/lib/utils/apiUtils";

import Form from "./form";
import Sidebar from "./sidebar";
import { useServiceContext } from "@/lib/providers/ServiceProvider";
import { notFound } from "next/navigation";

export default function Page() {
  /**
   * <image on the left>
   * <text on the right>
   * <button to buy below>
   */

  /*
    (page)
  |>-------------<
  | <image>
  | <logo name?>
  | <title>
  | <qty><price>
  | <button [payment]> <button [add_to_cart]>
  |>-------------<
    (page) -- do this perform better at mobile?
  |>-------------<
  | <image>
  | <logo name?>
  | <title>
  | <qty><price>
  | <button [sidebar]>
  |>-------------<

   -- isn't this kinda silly if we could just throw them at a payment page with the choices they might wanna?

     (page) |(sidebar)
  |>------------------------------------->
  |         |<picture>   <title>
  |         |          <qty |> price> <remove_item>
  |<content>|----------
  |         |total price
  |         |
  |         |<go to buying page button>
  |>------------------------------------->
  **/

  const { isSidebarVisible, currentService } = useServiceContext();

  if (currentService === undefined) return notFound();

  const brand = "Ohtsubo Terapias";

  return (
    <div className="place-items-center items-center grid-rows grid grid-cols-1 md:grid-cols-2 font-bold min-h-screen">
      {/*
       * logic to display side bar should come first
       */}
      {isSidebarVisible ? <Sidebar /> : null}
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
  );
}
