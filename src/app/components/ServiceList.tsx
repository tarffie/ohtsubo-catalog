"use client";

import { useState, useEffect } from "react";

import { ServiceCard } from "@/app/components/ServiceCard";
import { Service } from "@/lib/interfaces/Service";
import { fetchServiceFromApi } from "@/lib/utils/apiUtils";

export const ServiceList = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {

        const data = await fetch(`https://dummyjson.com/products`).then(
          (response) => response.json(),
        );
        setServices(data["products"]);
      } catch (e) {
        console.error(`Error retrieving products: ${e}`);
      }
    };

    fetchData();
  });

  return (
    <div className="flex items-stretch grid grid-cols-2 md:grid-cols-4">
      {services.map((item, index) => (
        <div key={index}>
          {" "}
          <ServiceCard {...(item as Service)} />{" "}
        </div>
      ))}
    </div>
  );
};
