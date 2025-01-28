import React from "react";

import { Service } from "@/lib/interfaces/Service";
import ItemCard from "./itemCard";

interface Props {
  product: Service;
}

export default function CardSession({ product }: Props) {
  const { title, description, price } = product;

  return (
    <div className={"text-left"}>
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
  );
}
