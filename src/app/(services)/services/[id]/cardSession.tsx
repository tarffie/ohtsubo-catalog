import React from "react";

import { ServiceInput as Service } from "@/lib/interfaces/Service";
import ItemCard from "./itemCard";

interface Props {
  service: Service;
}

export default function CardSession({ service }: Props) {
  return (
    <div className={/*TODO*/ ""}>
      <ItemCard content={"Ohtsubo Terapias"} />

      <p className="border border-solid border-white text-xl">
        {service.title}
      </p>
      <p className="border border-solid border-white text-xl">
        {service.price}
      </p>
      <p className="border border-solid border-white text-md">
        {service.description}
      </p>
    </div>
  );
}
