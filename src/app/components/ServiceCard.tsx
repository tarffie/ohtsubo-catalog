"use client";

import TemplateImage from "@/assets/template.jpg";

import { Service } from "@/lib/interfaces/Service";

import Image from "next/image";
import Link from "next/link";

export const ServiceCard: React.FC<Service> = (service) => {
  return (
    <div>
      <Link href={`/services/${service.id}`}>
        <Image
          className="rounded block m-auto"
          height="168"
          width="168"
          src={TemplateImage}
          alt={service.title}
        />
        <p className="font-thin text-sm text-center">{service.title}</p>
      </Link>
    </div>
  );
};
