import React, { Suspense } from "react";

import { fetchServiceFromApi } from "@/lib/utils/apiUtils";

import { Metadata } from "next";
import { notFound } from "next/navigation";

import CardSession from "./cardSession";
import AddToCart from "@/app/components/addToCart";

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  try {
    const { slug } = await props.params;
    const product = await fetchServiceFromApi(slug);

    return {
      title: product?.title,
      description: product?.description,
    };
  } catch (e) {
    const error = e as Error;
    console.error(error.message);
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
      <div className="mt-[1em] lg:mt-[2.5em]">
        <CardSession product={product} />
        <AddToCart />
      </div>
    );
  } catch (e) {
    console.error(e);
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
