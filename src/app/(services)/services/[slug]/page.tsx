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
  try {
    const { slug } = await props.params;
    const product = await fetchServiceFromApi(slug);

    return {
      title: product.title,
      description: product.description,
    };
  } catch (e) {
    return {
      title: "product not found",
      description: "The requested product could not be found",
    };
  }
};

const ShowProductSingle = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  try {
    const { slug } = await props.params;
    const product = await fetchServiceFromApi(slug);

    if (!product) return notFound();
    return (
      <div className="mt-20">
        <Image src={thumbnail} alt="product name and description" />
        <CardSession product={product} />
        <AddToCart />
      </div>
    );
  } catch (e) {
    return notFound();
  }
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
