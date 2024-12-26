import React from "react";

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

  const args = await params;

  const data = await fetch(`https://dummyjson.com/products/${args.id}`);
  const product = await data.json();

  const handleSubmit = (event: React.FormEvent) => {
    // prevent page reload
    event.preventDefault();
    console.log();
  };

  return (
    <div>
      <p className="border border-solid border-white">{product.title}</p>
      <p className="border border-solid border-white">{product.price}</p>
      <p className="border border-solid border-white">{product.description}</p>

      <form onSubmit={handleSubmit} className="flex-col gap-4 w-full max-w-xs">
        <div className="mb-5">
          <input
            className="rounded-lg px-2 border-solid border-2 placeholder-marian-blue-500  border-marian-blue-500"
            type="text"
            id="username"
            name="username"
            placeholder="username"
            value={undefined}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <input
            className="rounded-lg px-2 border-solid border-2 placeholder-marian-blue-500  border-marian-blue-500 "
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={undefined}
            onChange={handleChange}
          />
          <button type="submit"> agendar </button>
        </div>
      </form>
    </div>
  );
}
