import React from "react";
import { notFound } from "next/navigation";

import { ServiceInput as Service } from "@/lib/interfaces/Service";
import ItemCard from "./itemCard";

interface Props {
  service: Service;
}

/**
 * size,
 * weight,
 * color = "prussian_blue-500",
 * content,
 */

export default function CardSession({ service }: Props) {
  const price = service.price!.toFixed(2);

  return (
    <div className={"text-left"}>
      <ItemCard size={"lg"} weight={"black"} color={`sky_blue`} content={"Ohtsubo Terapias"} />
      <ItemCard size={"xl"} weight={"regular"} content={service.title!} />
      <ItemCard
        size={"xl"}
        weight={`regular`}
        color={`sky_blue`}
        content={`R$ ${price}`}
      />
      <ItemCard size={"lg"} weight={"regular"} content={service.description!} />
    </div>
  );
}
