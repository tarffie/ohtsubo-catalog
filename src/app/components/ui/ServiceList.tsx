"use client";

import { useState, useEffect } from "react";

import { ServiceCard } from "@/app/components/ui/ServiceCard";
import { Service } from "@/lib/types";
import { fetchFromApi } from "@/lib/utils/apiUtils";

export const ServiceList = () => {
  const [services, setServices] = useState(new Array<Service>());

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchFromApi("services");

        if (Object.keys(data).length < 0) {
          throw new Error("Couldn't fetch services from server");
        }

        if (data) {
          const serviceArr: Service[] = Object.values(data);
          setServices(serviceArr);
        } else {
          throw new Error("Something went wrong.");
        }
      } catch (e) {
        const error = e as Error;
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="w-full mb-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {services.map((item, index) => (
          <div key={index} className="w-full">
            <ServiceCard {...(item as Service)} />
          </div>
        ))}
      </div>
    </div>
  );
};
