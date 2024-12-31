import { Service } from "@/lib/interfaces/Service";

/**
 * a function that gets a target, a method and returns a json from api
 * since it runs inside docker and the other components, it can fetch data from localhost
 * might have to implement a exaustive targeting later
 * @param {string} target
 * @param {string} method
 * @return {Service} json
 */

export async function fetchFromApi(
  target: string,
  method: string = "GET",
  args?: string,
): Promise<Object> {
  const response = await fetch(`http://localhost:3000/api/${target}/${args}`, {
    method: method,
  });

  const data: Object = await response.json();

  return data;
}
