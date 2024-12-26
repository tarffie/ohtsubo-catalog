import { Service } from "@/lib/interfaces/Service";

export async function findServiceById(id: number): Promise<Service> {
  const service = await fetch(`https://dummyjson.com/products/${id}`).then(
    (item) => item.json(),
  );

  return service;
}
