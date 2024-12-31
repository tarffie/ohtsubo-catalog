import React from "react";
import Image from "next/image";

import thumbnail from "@/assets/template.jpg";

import { ServiceInput as Service } from "@/lib/interfaces/Service";
import { fetchServiceFromApi } from "@/lib/utils/apiUtils";

import Form from "./form";
import Sidebar from "./sidebar";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let isSidebarVisible: boolean = false;

  /**
   * <image on the left>
   * <text on the right>
   * <button to buy below>
   */

  const { id } = await params;

  const service = await fetchServiceFromApi("get", id);

  console.log(service);
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

  return (
    <div className="place-items-center items-center grid grid-cols-1 md:grid-cols-2 font-bold min-h-screen">
      {/*
       * logic to display side bar should come first
       */}
      <Image
        className="rounded block"
        src={thumbnail}
        alt="thumbnail com título e fundo"
        width={348}
        height={348}
      />

      <div className="">
        {" "}
        {/* item-card? */}
        <p className="text-lg">Ohtsubo Terapias</p>
      </div>

      <p className="border border-solid border-white text-xl">
        {service.title}
      </p>
      <p className="border border-solid border-white text-xl">
        {service.price}
      </p>
      <p className="border border-solid border-white text-md">
        {service.description}
      </p>
      {/* decided to put all form related logic inside a component o> */}
      <Form>{service}</Form>
    </div>
  );
}
