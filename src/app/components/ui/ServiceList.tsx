"use client";

import { useState, useEffect } from "react";

import { ServiceCard } from "@/app/components/ui/ServiceCard";
import { Service } from "@/lib/interfaces/Service";
import { fetchAllFromApi } from "@/lib/utils/apiUtils";

export const ServiceList = () => {
  const [services, setServices] = useState(new Array<Service>());

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchAllFromApi("services");

        if (data) {
          const serviceArr: Service[] = Object.values(data);
          setServices(serviceArr);
        } else {
          throw new Error("Couldn't fetch services from server");
        }
      } catch (e) {
        const error = e as Error;
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="flex items-stretch grid grid-cols-2 md:grid-cols-4">
      {services.map((item, index) => (
        <div key={index}>
          <ServiceCard {...(item as Service)} />
        </div>
      ))}
    </div>
  );
};
