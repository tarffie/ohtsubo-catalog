/**
 * a function that gets a slug and returns a {Promise<any | Array<any>>} json from api
 *
 * @param {string} slug
 * @return {Promise<any | Array<any>> | undefined} json
 * @throws {Error} error
 */

export async function fetchFromApi(
  endpoint: string,
  slug?: string,
): Promise<any | Array<any>> {
  let url = slug
    ? `${process.env.URL}/api/${endpoint}/${slug}`
    : `/api/${endpoint}/`;

  try {
    const request = await fetch(url, {
      method: "GET",
      cache: slug ? "no-cache" : "force-cache",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!request.ok) {
      throw new Error(`HTTP ERROR! status: ${request.status}`);
    }

    const data = await request.json();
    return slug ? data || [] : data.body || [];
  } catch (e) {
    const error = e as Error;
    throw new Error(error.message);
  }
}
