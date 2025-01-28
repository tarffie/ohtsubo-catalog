import { Service } from "@/lib/interfaces/Service";

/**
 * a function that gets a method, desired arguments and possibly a request body
 * and returns a {Service} json from api
 * since it runs inside docker and the other components, it can fetch data from localhost
 * might have to implement a exaustive targeting later
 *
 * @param {string} method
 * @return {Service | undefined} json
 * @throws {Error} error
 */

export async function fetchServiceFromApi(
  method: string = "GET",
  args?: string,
  ...options: RequestInit[]
): Promise<any> {
  const url = `http://172.21.0.3:3000/api/services/${args ? args : ""}`;

  try {
    const response: Service = await fetch(url, {
      method: method.toUpperCase(),
      ...options,
    }).then((res) => res.json());

    return response;
  } catch (e) {
    // typescript doesn't let me use {e} because e has type {any}
    const error = e as Error;
    console.error(`failed with error: ${error.name}`);
    throw new Error(error.message);
  }
}

export const isServiceUndefined = (service: any) => {
  return service === undefined ? true : false;
};
