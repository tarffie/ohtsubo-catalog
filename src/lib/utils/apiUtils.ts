import { Service } from "../interfaces/Service";

const API_URL = process.env.APP_URL;
const API_PORT = process.env.NODE_LOCAL_PORT;

/**
 * a function that gets a slug and returns a {Service} json from api
 *
 * @param {string} slug
 * @return {object | undefined} json
 * @throws {Error} error
 */
// i'd really like to implement this

export async function fetchFromApi(
  param: string,
  slug?: string,
): Promise<Service> {
  const url = `${API_URL}:${API_PORT}/api/${param}/${slug}`;

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
    const error = e as Error;
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

export async function fetchAllFromApi(param: string): Promise<Array<Service>> {
  const url = `${API_URL}:${API_PORT}/api/${param}/`;

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
    throw new Error(error.message);
  }
}

/**
 * sends a request to authenticate a user and returns a status and token
 * @param {string} email - The email from the user who'd like to be authenticated
 * @param {string} password - The password from the user who'd like to be authenticated
 * @returns Promise<T> returns a response with a token or undefined if error
 * @throws {Error} Error is thrown whenever try fails
 */
export async function authRequest(
  email: string,
  password: string,
): Promise<number | undefined> {
  try {
    const request = await fetch(`${API_URL}:${API_PORT}/api/login`, {
      body: JSON.stringify({ email: email, password: password }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return request.status;
  } catch (e) {
    const error = e as Error;
    throw new Error(error.message);
  }
}

export async function postToCartFromApi() {
  throw new Error("TODO");
  /*
  const url = `${API_URL}:${API_PORT}/api/cart/`;

  try {
  } catch (e) {}
  */
}
