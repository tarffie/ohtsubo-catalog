"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddToCart() {
  const [formData, setFormData] = useState({ quantity: 1 });
  const router = useRouter();

  const qtyIncrement = (e: any) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      quantity: (prev.quantity || 0) + 1,
    }));
  };

  const qtyDecrement = (e: any) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      quantity: Math.max((prev.quantity || 0) - 1, 0),
    }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10) || 0;
    setFormData((prev) => ({ ...prev, quantity: Math.max(value, 0) }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    // prevent page reload
    event.preventDefault();

    const { quantity } = formData;

    //const shoppingJson = JSON.stringify(shoppingCart);

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: shoppingJson,
      });

      if (res.ok) {
        return router.push("/cart");
      } else {
        console.error("Falha ao adicionar item ao carrinho");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form className="mb-auto text-center" onSubmit={handleSubmit}>
      <div>
        <a href="#" onClick={qtyDecrement}>
          -
        </a>

        <input
          type="tel"
          id="quantity"
          name="quantity"
          className="text-black placeholder:text-black w-5 text-center mx-2 my-2 "
          placeholder="1"
          value={formData.quantity}
          onChange={handleChange}
        />

        <a href="#" onClick={qtyIncrement}>
          +
        </a>
      </div>
      <div>
        <button
          className="font-bold text-center mt-2 mb-4 shadow shadow-md rounded px-2 py-2 bg-sky_blue"
          type="submit"
        >
          Agendar
        </button>
      </div>
    </form>
  );
}
