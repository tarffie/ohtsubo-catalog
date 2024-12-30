import React from "react";

import { ServiceInput as Service } from "@/lib/interfaces/Service";
import FormComponent from "@/app/components/FormComponent";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  /**
   * <image on the left>
   * <text on the right>
   * <button to buy below>
   */

  const { id } = await params;

  const response = await fetch(
    `http://localhost:3000/api/services/${id.toString()}`,
    { method: "GET" },
  );

  const data: Service = await response.json();

  const handleSubmit = async (event: React.FormEvent) => {
    // prevent page reload
    event.preventDefault();
  };

  const handleChange = (event: React.FormEvent) => {};

  return (
    <div>
      <p className="border border-solid border-white">{data.title}</p>
      <p className="border border-solid border-white">{data.description}</p>
      <p className="border border-solid border-white">{data.price}</p>
      <FormComponent />
    </div>
  );
}
