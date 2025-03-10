import React from "react";

import Image from "next/image";
import thumbnail from "@/assets/servicoTemplate.jpg";

import { Service } from "@/lib/types";
import ItemCard from "./itemCard";

interface Props {
  product: Service;
}

export default function CardSession({ product }: Props) {
  const { title, description, price } = product;

  return (
    <div className="product-information md:grid md:grid-cols-2 md:items-center md:mb-[2.5em]">
      <div className="md:justify-self-center">
        <Image
          src={thumbnail}
          alt="product name and description"
          className="w-full md:max-w-[350px]"
        />
      </div>
      <div className="text-left md:justify-self-start">
        <ItemCard size={"lg"} weight={"bold"} content={"Ohtsubo Terapias"} />
        <ItemCard size={"2xl"} weight={"regular"} content={title!} />
        <ItemCard
          size={"1xl"}
          weight={`black`}
          color={"text-sky_blue"}
          content={`R$ ${price?.toFixed(2)}`}
        />
        <ItemCard size={"lg"} weight={"regular"} content={description!} />
      </div>
    </div>
  );
}
