"use client";

import TemplateImage from "@/assets/servicoTemplate.jpg";

import { Service } from "@/lib/types";

import Image from "next/image";
import Link from "next/link";

export const ServiceCard: React.FC<Service> = (service) => {
  const { id, title } = service;

  return (
    <div className="m-2">
      <Link href={`/services/${id}`}>
        <div>
          <Image
            className="rounded block m-auto mb-1"
            height="168"
            width="168"
            src={TemplateImage}
            alt={title || "another great service"}
          />

          <p className="font-thin text-sm text-center">
            {title?.toUpperCase()}
          </p>
        </div>
      </Link>
    </div>
  );
};
