import React, { Suspense } from "react";
import Image from "next/image";

import { fetchServiceFromApi } from "@/lib/utils/apiUtils";

import { Metadata } from "next";
import { notFound } from "next/navigation";

import thumbnail from "@/assets/servicoTemplate.jpg";
import CardSession from "./cardSession";
import AddToCart from "@/app/components/addToCart";

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
  const { slug } = await props.params;
  const product = await fetchServiceFromApi("get", `${slug}`);

  if (!product) return notFound();
  return (
    <div className="mt-20">
      <Image src={thumbnail} alt="product name and description" />
      <CardSession product={product} />
      <AddToCart />
      {/*Input*/}
    </div>
  );
};

const ProductPage = ({ params }: { params: { slug: string } }) => {
  const result = (async () => Promise.resolve(params))();
  return (
    <Suspense>
      <ShowProductSingle params={result} />
    </Suspense>
  );
};

export default ProductPage;
