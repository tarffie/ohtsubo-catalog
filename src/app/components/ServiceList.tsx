"use client";

import { useState, useEffect } from "react";

import { ServiceCard } from "@/app/components/ServiceCard";
import { Service, ServiceInput } from "@/lib/interfaces/Service";
import { fetchServiceFromApi } from "@/lib/utils/apiUtils";

const noop = () => {};

export const ServiceList = () => {
  const [services, setServices] = useState(new Array<ServiceInput>());

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchServiceFromApi("get", "");

        if (data) {
          const serviceArr: ServiceInput[] = Object.values(data);
          const parsedServices = serviceArr.slice(0, -1); // request sends some more data than necessary here

          serviceArr === services ? noop : setServices(serviceArr);
        } else {
          throw new Error("Couldn't fetch services from server");
        }

        return;
      } catch (e) {
        console.error(`Error retrieving products: ${e}`);
      }
    })();
  }, []);

  return (
    <div className="flex items-stretch grid grid-cols-2 md:grid-cols-4">
      {services.map((item, index) => (
        <div key={index}>
          <ServiceCard {...(item as ServiceInput)} />
        </div>
      ))}
    </div>
  );
};
