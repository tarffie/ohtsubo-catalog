/**
 * a function that gets a slug and returns a {Service} json from api
 *
 * @param {string} slug
 * @return {Service | undefined} json
 * @throws {Error} error
 */
export async function fetchServiceFromApi(slug?: string): Promise<any> {
  const url = `http://172.21.0.3:3000/api/services/${slug}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ERROR! status: ${response.status}`);
    }

    const data = await response.json();
    return data.service;
  } catch (e) {
    // typescript doesn't let me use {e} because e has type {any}
    const error = e as Error;
    console.error(`failed with error: ${error.message}`);
    throw new Error(error.message);
  }
}

/**
 * a function that returns a {Promise<Array<any>>} json with all services
 * from our api
 *
 * @returns {Promise<Array<any>>} data
 * @throws {Error} error
 */

export async function fetchAllServicesFromApi(): Promise<Array<any>> {
  const url = `http://172.21.0.3:3000/api/services/`;

  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "force-cache",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ERROR! status: ${response.status}`);
    }

    const data = (await response.json()).body;
    return data;
  } catch (e) {
    const error = e as Error;
    throw new Error(`HTTP ERROR! status: ${error.message}`);
  }
}

export async function postToCartFromApi() {
  throw new Error("TODO");
  const url = `http://172.21.0.3:3000/api/cart/`;

  try {
  } catch (e) {}
}
