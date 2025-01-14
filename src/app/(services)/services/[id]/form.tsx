"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ServiceInput as Service } from "@/lib/interfaces/Service";

import CardSession from "./cardSession";
import { useServiceContext } from "@/lib/providers/ServiceProvider";

export default function Form() {
  const { currentService, shoppingCart, setShoppingCart } = useServiceContext();
  const [formData, setFormData] = useState({ quantity: 1 });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
    setFormData((prev) => ({ ...prev, quantity: Math.max(value, 0) }));
  };

  const qtyIncrement = () => {
    setFormData((prev) => ({
      ...prev,
      quantity: (prev.quantity || 0) + 1,
    }));
  };

  const qtyDecrement = () => {
    setFormData((prev) => ({
      ...prev,
      quantity: Math.max((prev.quantity || 0) - 1, 0),
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    // prevent page reload
    event.preventDefault();

    const { quantity } = formData;

    if (currentService) {
      currentService.quantity = quantity;

      setShoppingCart((prevState: Service[]) => {
        prevState.push(currentService);
      });
    }

    try {
      const res = await fetch("/api/add-to-cart", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(shoppingCart),
      });

      console.log(res, shoppingCart);

      if (res.ok) {
        router.push("/cart");
      } else {
        console.error("Falha ao adicionar item ao carrinho");
      }
    } catch (e) {
      console.error(e);
    }
  };
  console.log("shoppingCart at beggining: ", shoppingCart);
  return (
    <form className="mb-auto text-center" onSubmit={handleSubmit}>
      {currentService ? (
        <CardSession service={currentService} />
      ) : (
        <p>Loading service...</p>
      )}
      <div>
        <div>
          <button type="button" onClick={qtyDecrement}>
            {" "}
            -{" "}
          </button>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className="text-black placeholder:text-black w-5 text-center mx-2 my-2"
            placeholder="1"
            value={formData.quantity}
            onChange={handleChange}
          />
          <button type="button" onClick={qtyIncrement}>
            {" "}
            +{" "}
          </button>
        </div>
        <div>
          <button
            className="font-bold text-center mt-4 border-solid border-indigo-500 rounded px-2 py-2 bg-indigo-500"
            type="submit"
          >
            Agendar
          </button>
        </div>
      </div>
    </form>
  );
}
