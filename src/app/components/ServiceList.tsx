"use client";

import { useState, useEffect } from "react";

import { ServiceCard } from "@/app/components/ServiceCard";
import { ServiceInput as Service } from "@/lib/interfaces/Service";
import { fetchServiceFromApi } from "@/lib/utils/apiUtils";

const noop = () => {};

export const ServiceList = () => {
  const [services, setServices] = useState(new Array<Service>());

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchServiceFromApi("get", "");

        if (data) {
          const serviceArr: Service[] = Object.values(data);

          serviceArr.pop(); // request sends some more data than necessary here
          setServices(serviceArr);
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
          <ServiceCard {...(item as Service)} />
        </div>
      ))}
    </div>
  );
};
