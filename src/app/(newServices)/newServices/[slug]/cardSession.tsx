import React from "react";

import { ServiceInput as Service } from "@/lib/interfaces/Service";
import ItemCard from "./itemCard";

interface Props {
  product: Service;
}

/**
 * size,
 * weight,
 * color = "prussian_blue-500",
 * content,
 */

export default function CardSession({ product }: Props) {
  const price = product.price!.toFixed(2);

  return (
    <div className={"text-left"}>
      <ItemCard
        size={"lg"}
        weight={"black"}
        color={`sky_blue`}
        content={"Ohtsubo Terapias"}
      />
      <ItemCard size={"xl"} weight={"regular"} content={product.title!} />
      <ItemCard
        size={"xl"}
        weight={`regular`}
        color={`sky_blue`}
        content={`R$ ${price}`}
      />
      <ItemCard size={"lg"} weight={"regular"} content={product.description!} />
    </div>
  );
}
