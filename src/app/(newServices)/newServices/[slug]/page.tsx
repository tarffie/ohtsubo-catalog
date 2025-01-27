import React, { Suspense } from "react";
import Image from "next/image";

import { fetchServiceFromApi } from "@/lib/utils/apiUtils";

import { Metadata } from "next";
//import Image from "next/image";
import { notFound } from "next/navigation";
//import { Suspense } from "react";

import thumbnail from "@/assets/servicoTemplate.jpg";
import CardSession from "./cardSession";
import { ServiceInput } from "@/lib/interfaces/Service";

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const params = await props.params;
  const product = await fetchServiceFromApi("get", `${params?.slug}`);

  if (!product) return notFound();
  return {
    title: product.title,
    description: product.description,
  };
};

const ShowProductSingle = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await props.params;
  const product = await fetchServiceFromApi("get", `${params.slug}`);

  if (!product) return notFound;
  const { id, title, description, price } = product;
  return (
    <div className="mt-20">
      <p>{id}</p>
      <p>{title}</p>
      <p>{description}</p>
      <p>{price}</p>
    </div>
  );
};

const ProductPage = ({ params }: { params: { slug: string } }) => {
  return (
    <Suspense>
      <ShowProductSingle params={params} />
    </Suspense>
  );
};

export default ProductPage;
